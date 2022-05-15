// ==UserScript==
// @name            CurrentQuestOnInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Вывод текущего ужедневного мини-квеста на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CurrentQuestOnInfo/currentQuestOnInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CurrentQuestOnInfo/currentQuestOnInfo.user.js
// @include         https://*gwars*/info.php?id=*
// @grant           none
// @license         MIT
// @version         1.20-130522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458], идея kaa
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, regexp: true,
    plusplus: true
*/

/*eslint-env browser */
/*eslint no-useless-escape: 'warn', linebreak-style: ['error', 'unix'],
    quotes: ['error', 'single'], semi: ['error', 'always'],
    eqeqeq: 'error', curly: 'error'
*/

/*jscs:disable requireMultipleVarDecl, requireVarDeclFirst */
/*jscs:disable disallowKeywords, disallowDanglingUnderscores */
/*jscs:disable validateIndentation */

(function () {
    'use strict';

    /**
     * @class CurrentQuestOnInfo
     * @constructor
     */
    var CurrentQuestOnInfo = function () {
        /**
         * @property root
         * @type {Object}
         */
        this.root = this.getRoot();
        /**
         * @property doc
         * @type {Object}
         */
        this.doc = this.root.document;
        /**
         * @property persID
         * @type {String}
         */
        this.persID = /\?id=(\d+)/.exec(this.root.location.href)[1];
        /**
         * @property target
         * @type {Element|null}
         */
        this.target = this.doc.querySelector('#actiondivin');
        /**
         * @property domain
         * @type {String}
         */
        this.domain = this.doc.domain;
    };

    /**
     * @lends CurrentQuestOnInfo.prototype
     */
    CurrentQuestOnInfo.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method $
         * @param   {String}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
        },

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        ajax: function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (xmlHttpRequest) {
                xmlHttpRequest.open('GET', url, true);
                xmlHttpRequest.send(null);

                var timeout = this.root.setTimeout(function () {
                    xmlHttpRequest.abort();
                }, 10000);

                xmlHttpRequest.onreadystatechange = function () {
                    if (xmlHttpRequest.readyState === 4) {
                        clearTimeout(timeout);
                        if (xmlHttpRequest.status === 200) {
                            onsuccess(xmlHttpRequest);
                        } else {
                            onfailure();
                        }
                    }
                };
            }
        },

        /**
         * @method showQuest
         * @param   {String}    url
         */
        showQuest: function (url) {
            var _this = this;
            this.ajax(url, function (xhr) {
                var spanContent = _this.doc.createElement('span');
                spanContent.innerHTML = xhr.responseText;

                // noinspection JSUnresolvedVariable
                var cssSelector = 'td[valign="top"][align="right"]>' +
                        'a[href*="/help/index.php?sid="]',
                    td = spanContent.querySelector(cssSelector).parentNode.
                         previousElementSibling,
                    questDescr = td.firstElementChild.nextSibling.nodeValue,
                    reg = /^\s*(.*):\s*(\d+) из (\d+)/.exec(questDescr),
                    acQuests = />(\d+)</.exec(td.innerHTML),
                    bLevel = _this.doc.
                        querySelector('span[onclick^="return pip_load("]').
                            previousElementSibling.firstElementChild.innerHTML;

                if (!reg || !acQuests || !bLevel) {
                    return;
                }

                var isDone = +reg[2] >= +reg[3],
                    span = _this.doc.createElement('span');

                span.setAttribute('style', 'margin-left: 7px; font-size: 8pt;');
                span.innerHTML = '<span id="questDesc">' + reg[1] + ' [' +
                    '<a href="https://' + _this.domain + '/questlog.php?id=' +
                    _this.persID + '" style="color: ' +
                    (isDone ? '#008700' : '#AA5500') + '; ' +
                    'text-decoration: none; font-size: 8pt;" target="_blank">' +
                    reg[2] + '</a>/' + reg[3] + ']</span> ' +
                    '(<a target="_blank" style="color:#007700; ' +
                    'font-weight: bold; text-decoration: none;" ' +
                    'href="https://' + _this.domain + '/help/index.php?' +
                    'sid=102&pid=45">' + acQuests[1] + '</a>)' +
                    '<img src="https://images.' +
                    _this.domain.replace('www.', '') + '/i/home/wlog.gif" ' +
                    'id="showHideQuestList" border="0" width="12" ' +
                    'height="10" style="margin-left: 3px; cursor: pointer;" ' +
                    'alt="img" />' +
                    '<div id="questList" style="display: none;">' +
                    '<ul>' +
                        '<li>Поймать рыбу 1 раз<br>' +
                            '<span style="color: #4E4E4E;">(ловить можно не ' +
                            'чаще, чем раз в 40 минут, с 8 до 11 и с 17 до ' +
                            '20 часов по серверу)</span>' +
                            '<li>Зайти на замену и выжить в 2 боях' +
                        '<li>Выжить в 5 боях на Outland<br>' +
                            '<span style="color: #4E4E4E;">(засчитывается и ' +
                            'в прибрежной зоне)</span>' +
                        '<li>Нанести в синдикатных боях суммарный урон в ' +
                            (bLevel * 20).toString() + ' HP' +
                        '<li>Убить хотя бы одного врага в 3 синдикатных ' +
                            'боях<br><span style="color: #4E4E4E;">(бои за ' +
                            'бункер не учитываются)</span>' +
                        '<li>Сделать 3 критических попадания из снайперской ' +
                            'винтовки или автомата<br>' +
                            '<span style="color: #4E4E4E;">(Если после боя ' +
                            'ломается оружие и персонаж оказывается с ' +
                            'пустыми руками, то все попадания, сделанные в ' +
                            'этом бою, не засчитаются. Для двуручного оружия ' +
                            'криты считаются с левой, при этом в правой ' +
                            'должен быть тип оружия, на которое в квесте ' +
                            'запрошены криты.)</span>' +
                        '<li>Сделать 30 критических попаданий из пулемета' +
                        '<li>На Outland нанести Z-Lands суммарный урон ' +
                            (bLevel * 20).toString() + ' HP' +
                        '<li>Убить гранатой 2 Z-Lands<br>' +
                            '<span style="color: #4E4E4E;">(горение идёт в ' +
                            'зачёт)</span>' +
                        '<li>Привезти 5 предметов с Outland' +
                        '<li>Сделать 4 критических попаданий из ' +
                            'пистолетов-пулеметов<br>' +
                            '<span style="color: #4E4E4E;">(для двуручного ' +
                            'оружия криты считаются с левой, при этом в ' +
                            'правой должен быть тип оружия, на которое в ' +
                            'квесте запрошены криты)</span>' +
                            '<li>Выполнить 2 задания NPC' +
                        '<li>Убить 3 врагов в уличных боях' +
                        '<li>Выжить в 5 общих групповых боях<br>' +
                            '<span style="color: #4E4E4E;">(в зачёт идут ' +
                            'нападения на бункер для всех)</span>' +
                        '<li>Убить 7 Z-Lands на Outland<br>' +
                            '<span style="color: #4E4E4E;">(Засчитывается и ' +
                            'в прибрежной зоне. Горение идёт в зачёт.)</span>' +
                        '<li>5 раз нанести врагу урон гранатой<br>' +
                            '<span style="color: #4E4E4E;">(Подразумевается, ' +
                            'что в пяти боях, туз в рукаве не засчитывается. ' +
                            'Горение идёт в зачёт.)</span>' +
                        '<li>Выжить в 4 синдикатных боях<br>' +
                            '<span style="color: #4E4E4E;">(бои за бункер ' +
                            'не учитываются)</span>' +
                    '</ul></div>';

                _this.target.parentNode.setAttribute('width', '100%');
                _this.target.parentNode.nextElementSibling.
                    removeAttribute('width');
                _this.target.appendChild(span);

                var desc = _this.$('questDesc');
                if (/суммарный урон.* \d+ HP/.test(desc.innerHTML)) {
                    var val = bLevel * 20;
                    desc.innerHTML = desc.innerHTML.
                        replace(/\d+ HP/, val + ' HP');
                    desc.innerHTML = desc.innerHTML.
                        replace(/\/\d+\]/, '/' + val + ']');
                }

                var questList = _this.$('questList'),
                    li = questList.querySelectorAll('li'),
                    i;

                desc = /^(.*) \[/.exec(desc.innerHTML)[1];
                for (i = 0; i < li.length; i++) {
                    if (li[i].innerHTML.indexOf(desc) !== -1) {
                        li[i].setAttribute('style', 'border: #000000 1px ' +
                            'dotted; background: ' +
                            (isDone ? '#D0EED0;' : '#DADADA') + ';');

                        break;
                    }
                }

                _this.$('showHideQuestList').
                    addEventListener('click', function () {
                        var display = questList.style.display;
                        questList.style.display = display ? '' : 'none';
                    }, false);
            }, function () {
                _this.root.setTimeout(function () {
                    _this.showQuest(url);
                }, 1200);
            });
        },

        /**
         * @method init
         */
        init: function () {
            if (this.persID && this.target) {
                this.showQuest('https://' + this.domain + '/questlog.php?id=' +
                    this.persID);
            }
        }
    };

    new CurrentQuestOnInfo().init();

}());

