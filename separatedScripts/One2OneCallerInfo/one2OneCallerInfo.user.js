// ==UserScript==
// @name            One2OneCallerInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выводит информацию о вызывающем Вас на бой персонаже в одиночных боях (HP, дальность оружия, умение, ссылки-изображения на экипировку, бонусы). Звуковое оповещение при вызове.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/One2OneCallerInfo/one2OneCallerInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/One2OneCallerInfo/one2OneCallerInfo.user.js
// @include         http://www.gwars.ru/warlist.php*
// @grant           none
// @license         MIT
// @version         2.19-200219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    regexp: true
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

    // ================== НАСТРОЙКИ ==========================
    var warSound = 1;  // номер звука при вызове на бой (0 - без звука)
    // =============== КОНЕЦ НАСТРОЕК ========================

    /**
     * @class General
     * @constructor
     */
    var General = function () {
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
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
    };

    /**
     * @lends General.prototype
     */
    General.prototype = {
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
        }
    };

    var general = new General();

    /**
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method init
         * @param   {String}    url
         * @param   {Function}  onsuccess
         */
        this.init = function (url, onsuccess) {
            var xmlHttpRequest = new XMLHttpRequest();

            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
                xmlHttpRequest.abort();
            }, 10000);

            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState === 4) {
                    clearTimeout(timeout);
                    if (xmlHttpRequest.status === 200) {
                        onsuccess(xmlHttpRequest);
                    }
                }
            };
        };
    };

    /**
     * @class One2OneCallerInfo
     * @constructor
     */
    var One2OneCallerInfo = function () {
        /**
         * @property weapon
         * @type {Node|null}
         */
        this.weapon = null;
        /**
         * @property twoHand
         * @type {Boolean}
         */
        this.twoHand = false;

        /**
         * @method playSound
         * @param   {int}   sound
         */
        this.playSound = function (sound) {
            if (sound) {
                var audio = general.doc.querySelector('#cpingw_audio');
                if (!audio) {
                    audio = general.doc.createElement('audio');
                    audio.setAttribute('id', 'cpingw_audio');
                    var divAudio = general.doc.createElement('div');
                    divAudio.setAttribute('style', 'display: none;');
                    divAudio.appendChild(audio);
                    general.doc.body.appendChild(divAudio);
                }

                audio.volume = 0.3;
                audio.src = 'https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/sounds/' + sound + '.ogg';
                // noinspection JSIgnoredPromiseFromCall
                audio.play();
            }
        };

        /**
         * @method getRange
         * @param   {int}       ind
         * @param   {string}    str
         */
        this.getRange = function (ind, str) {
            var _this = this,
                a = _this.weapon.querySelectorAll('a'),
                url = a[ind].href,
                range;

            new AjaxQuery().init(url, function (xml) {
                range = /стрельбы: (\d+) ходов/i.exec(xml.responseText);
                str += range ? range[1] : 'не найдена';

                if (!_this.twoHand || ind || (a[1].href === url)) {
                    var div = general.doc.createElement('div');
                    div.setAttribute('style', 'color: #0000FF; ' +
                        'font-weight: bold;');
                    div.innerHTML = str;
                    _this.weapon.appendChild(div);
                } else {
                    str += ', ';
                    general.root.setTimeout(function () {
                        _this.getRange(1, str);
                    }, 1000);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getRange(ind, str);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var called = general.doc.querySelector('td[class="greengreenbg"]' +
                    '[colspan="2"]>center>b>a[href*="/info.php?id="]');

            if (!called || !general.root.bgqs) {
                return;
            }

            general.doc.title = 'БОЙ !!!';
            this.playSound(warSound);

            var _this = this;
            new AjaxQuery().init(called.href, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    spanHp = general.doc.createElement('span');

                spanContent.innerHTML = xml.responseText;
                // здоровье
                spanHp.innerHTML = /\[(\d+) \/ (\d+)\]/.exec(spanContent.
                    querySelector('td[style="padding-top:3px;"]').innerHTML)[0];
                spanHp.setAttribute('style', 'color: #990000; ' +
                    'margin-left: 5px;');
                called.parentNode.appendChild(spanHp);

                // узел td с изображениями на оружие
                _this.weapon = spanContent.
                    querySelector('table[style="margin-right:1px;"]').
                        parentNode;
                general.doc.querySelector('table[style="padding-top:10px;"]' +
                    '[border="0"][cellspacing="1"][cellpadding="5"]' +
                        '[width="450"]').removeAttribute('width');
                _this.weapon.removeAttribute('rowspan');
                _this.weapon.firstElementChild.removeAttribute('align');
                var target = general.doc.
                        querySelector('td[class="greengreenbg"][colspan="2"]');
                target.parentNode.appendChild(_this.weapon);

                // раскрашиваем умелку
                target.innerHTML = target.innerHTML.replace(/(\(\d+\))/g,
                    '<span style="color: #00C000;">$1</span>');

                // две руки
                _this.twoHand = /Левая/.test(target.innerHTML) &&
                    /Правая/.test(target.innerHTML);

                // узел td со списком умелок
                var cssSelector = 'tr>td+td[align="right"][valign="top"]',
                    skills = spanContent.querySelectorAll(cssSelector)[2],
                    tr = general.doc.createElement('tr');

                skills.setAttribute('colspan', '2');
                tr.appendChild(skills);
                target = target.parentNode.parentNode;
                target.insertBefore(tr, target.lastElementChild);

                // узел td со списком бонусов
                var bonuses = spanContent.
                        querySelectorAll('td[align="center"][valign="top"]')[2];
                tr.appendChild(bonuses);

                // дальность оружия
                general.root.setTimeout(function () {
                    _this.getRange(0, 'Дальность оружия: ');
                }, 1000);
            });
        };
    };

    var mainObj = general;
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new One2OneCallerInfo().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

