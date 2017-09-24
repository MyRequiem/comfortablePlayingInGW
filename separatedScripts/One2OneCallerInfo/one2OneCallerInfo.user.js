// ==UserScript==
// @name            One2OneCallerInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выводит информацию о вызывающем Вас на бой персонаже в одиночных боях (HP, дальность оружия, умение, ссылки-изображения на экипировку, бонусы). Звуковое оповещение при вызове.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/One2OneCallerInfo/one2OneCallerInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/One2OneCallerInfo/one2OneCallerInfo.user.js
// @include         http://www.ganjawars.ru/warlist.php*
// @grant           none
// @license         MIT
// @version         2.11-240917
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true */

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
         * @property cons
         * @type {Object}
         */
        this.cons = this.root.console;
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
         * @param   {Function}  onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.root.console.log('Error create xmlHttpRequest !!!');
                return;
            }

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
                    } else {
                        onfailure();
                    }
                }
            };
        };
    };

    /**
     * @class PlaySound
     * @constructor
     */
    var PlaySound = function () {
        /**
         * @method init
         * @param   {int|String}    sound
         */
        this.init = function (sound) {
            if (sound && sound !== '0') {
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
                audio.src = '/sounds/' + sound + '.ogg';
                audio.play();
            }
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
         * @method getRange
         * @param   {int}       ind
         * @param   {string}    str
         */
        this.getRange = function (ind, str) {
            var _this = this,
                a = _this.weapon.querySelectorAll('a'),
                url = a[ind].href;

            new AjaxQuery().init(url, function (xml) {
                if (/Дальность стрельбы: \d+ ходов/i.test(xml.responseText)) {
                    str += (/Дальность стрельбы: (\d+) ходов/i.
                            exec(xml.responseText))[1];
                } else {
                    str += '<span style="color: #FF0000; font-weight: ' +
                        'normal;">не найдена</span>';
                }

                if (!_this.twoHand || ind || (a[1].href === url)) {
                    _this.weapon.innerHTML += '<span style="color: #0000FF; ' +
                        'font-weight: bold;">' + str + '</span>';
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
            var called = general.doc.
                    querySelector('hr+b>a[href*="/info.php?id="]');

            if (!called) {
                return;
            }

            general.doc.title = 'БОЙ !!!';
            new PlaySound().init(warSound);

            var _this = this;
            new AjaxQuery().init(called.href, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    spanHp = general.doc.createElement('span');

                spanContent.innerHTML = xml.responseText;
                // здоровье
                spanHp.innerHTML = /\[(\d+) \/ (\d+)\]/.exec(spanContent.
                        querySelector('td[style="padding-top:3px;"]').
                            innerHTML)[0];
                spanHp.
                    setAttribute('style', 'color: #990000; margin-left: 5px;');
                called.parentNode.appendChild(spanHp);

                // узел td со ссылками и изображениями на оружие
                _this.weapon = spanContent.
                    querySelector('table[style="margin-right:1px;"]').
                        parentNode;
                _this.weapon.firstElementChild.removeAttribute('align');
                _this.weapon.removeAttribute('rowspan');
                _this.weapon.setAttribute('style', 'padding-left: 30px;');
                var target = general.doc.
                        querySelector('td[class="txt"]>hr').parentNode;
                target.parentNode.appendChild(_this.weapon);

                // раскрашиваем умелку
                var li = target.querySelectorAll('li'),
                    i;

                for (i = 0; i < li.length; i++) {
                    if (/\(\d+\)/.test(li[i].innerHTML)) {
                        li[i].innerHTML = li[i].innerHTML.replace(/(\(\d+\))/,
                            '<span style="color: #00C000; ' +
                                'font-weight: bold;">$1</span>');
                        _this.twoHand = i === 1;
                    }
                }

                // узел td со списком умелок
                var skills = spanContent.querySelectorAll('tr>td+' +
                    'td[align="right"][valign="top"]')[2];
                skills.setAttribute('style', 'padding-bottom: 10px;');
                skills.removeAttribute('class');
                var tr = general.doc.createElement('tr');
                target = target.parentNode.parentNode;
                target.insertBefore(tr, target.lastElementChild);
                tr.appendChild(skills);

                // узел td со списком бонусов
                var bonuses = spanContent.
                        querySelectorAll('td[align="center"][valign="top"]')[2];
                bonuses.removeAttribute('class');
                tr.appendChild(bonuses);

                // дальность оружия
                general.root.setTimeout(function () {
                    _this.getRange(0, 'Дальность оружия: ');
                }, 1000);
            }, function () {
                general.cons.log('Error xhr on One2OneCallerInfo');
            });
        };
    };

    new One2OneCallerInfo().init();

}());

