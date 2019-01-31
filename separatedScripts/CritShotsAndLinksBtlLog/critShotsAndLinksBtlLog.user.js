// ==UserScript==
// @name            CritShotsAndLinksBtlLog
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В JS-версии боя и на страницax логов боев делает все ники персонажей ссылками. Показывает критические выстрелы вашего персонажа и их общее количество (опционально).
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CritShotsAndLinksBtlLog/critShotsAndLinksBtlLog.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CritShotsAndLinksBtlLog/critShotsAndLinksBtlLog.user.js
// @include         http://www.gwars.ru/b0/*
// @include         http://www.gwars.ru/warlog.php*
// @grant           none
// @license         MIT
// @version         2.47-310119
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, plusplus: true,
    nomen: true, continue: true
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

    // ================ НАСТРОЙКИ =======================
    var showCritShots = 1; // 1 - показывать криты, 0 - нет
    // ============= КОНЕЦ НАСТРОЕК =====================

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
         * @property loc
         * @type {String}
         */
        this.loc = this.root.location.href;
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property viewMode
         * @type {Boolean}
         */
        this.viewMode = /\/warlog\.php/.test(this.loc);
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
         * @param   {string}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
        }
    };

    var general = new General();

    /**
     * @class CritShotsLinksOnBattleLog
     * @constructor
     */
    var CritShotsLinksOnBattleLog = function () {
        /**
         * @class
         * @constructor
         */
        this.CriticalShots = function () {
            /**
             * @property groin
             * @type {int}
             */
            this.groin = 0;     //пах
            /**
             * @property neck
             * @type {int}
             */
            this.neck = 0;      //шея
            /**
             * @property ear
             * @type {int}
             */
            this.ear = 0;       //ухо
            /**
             * @property temple
             * @type {int}
             */
            this.temple = 0;    //висок

            /**
             * @method getAllCrits
             * @return  {int}
             */
            this.getAllCrits = function () {
                return this.groin + this.neck + this.ear + this.temple;
            };
        };

        /**
         * @method getCrits
         * @param   {NodeList}  b
         * @return  {Object|null}
         */
        this.getCrits = function (b) {
            var criticalShots = new this.CriticalShots(),
                myNik = general.doc.querySelector('a[href$="/info.php?id=' +
                    general.myID + '"]>b'),
                linkStyle,
                nik,
                font,
                str,
                node,
                next,
                prev,
                i;

            for (i = 0; i < b.length; i++) {
                // если это урон (-XX), 'vs', пок с '['
                if ((/^-\d+$|vs|\[|,/.test(b[i].innerHTML)) ||
                        (/может взять предметы/.test(b[i].innerHTML))) {
                    continue;
                }

                // делаем ссылки на персов, если ссылка еще не установлена
                if (!b[i].querySelector('a:first-child') &&
                        !b[i].getAttribute('style')) {
                    linkStyle = 'text-decoration: none; font-weight: 700; ' +
                        'font-size: ' + (general.viewMode ? '12px;' : '11px;');

                    // Победа за ...
                    font = b[i].parentNode;
                    if (font.nodeName === 'FONT') {
                        linkStyle += ' color: ' + font.color + ';';
                    }

                    // если это окрашенный ник, то внутри будет <font>
                    font = b[i].querySelector('font:first-child');
                    if (font) {
                        linkStyle += ' color: ' + font.color + ';';
                        nik = font.innerHTML;
                    } else {
                        nik = b[i].innerHTML;
                    }

                    // noinspection JSUndefinedPropertyAssignment
                    b[i].innerHTML = '<a target="_blank" style="' + linkStyle +
                        '"  href="http://www.gwars.ru/search.php?key=' +
                        nik + '">' + nik + '</a>';
                }

                // наш ник не найден или в настройках не установлен checkbox
                // "показывать критические выстрелы" или это не наш ник
                if (!myNik || !showCritShots ||
                        b[i].innerHTML.indexOf(myNik.innerHTML) === -1) {
                    continue;
                }

                // проверяем и считаем криты
                prev = b[i].previousSibling || b[i].parentNode.previousSibling;
                if (prev && prev.nodeValue &&
                        /\d+:\d+, #\d+ :/.test(prev.nodeValue)) {
                    // получаем запись своего хода
                    str = '';
                    node = b[i].previousSibling ? b[i] : b[i].parentNode;

                    while (node && node.nodeName !== 'BR') {
                        next = node.nextElementSibling;
                        if (next.nodeName === 'I') {
                            str += next.innerHTML;
                        }

                        node = next;
                    }

                    if (str) {
                        // считаем криты
                        if (/в пах/.test(str)) {
                            if (/\d+ в пах/.test(str)) {
                                criticalShots.groin += (+(/(\d+) в пах/.
                                            exec(str)[1]));
                            } else {
                                criticalShots.groin++;
                            }
                        }

                        if (/в шею/.test(str)) {
                            if (/\d+ в шею/.test(str)) {
                                criticalShots.neck += (+(/(\d+) в шею/.
                                            exec(str)[1]));
                            } else {
                                criticalShots.neck++;
                            }
                        }

                        if (/в ухо/.test(str)) {
                            if (/\d+ в ухо/.test(str)) {
                                criticalShots.ear += (+(/(\d+) в ухо/.
                                            exec(str)[1]));
                            } else {
                                criticalShots.ear++;
                            }
                        }

                        if (/в висок/.test(str)) {
                            if (/\d+ в висок/.test(str)) {
                                criticalShots.temple += (+(/(\d+) в висок/.
                                            exec(str)[1]));
                            } else {
                                criticalShots.temple++;
                            }
                        }
                    }
                }
            }

            return showCritShots ? criticalShots : null;
        };

        /**
         * @method showCrits
         * @param   {Object}    result
         */
        this.showCrits = function (result) {
            if (result && result.getAllCrits()) {
                general.$('count_all_crits').innerHTML = result.getAllCrits();
                general.$('crits_groin').innerHTML = result.groin;
                general.$('crits_neck').innerHTML = result.neck;
                general.$('crits_ear').innerHTML = result.ear;
                general.$('crits_temple').innerHTML = result.temple;
            }
        };

        /**
         * @method change_updatechatlines
         */
        this.change_updatechatlines = function () {
            var _this = this;

            general.root.updatechatlines = function () {
                /** @namespace general.root.frames.bsrc */
                var logDiv = general.root.frames.bsrc.document.
                        querySelector('#log'),
                    battleLog;

                if (logDiv && logDiv.childNodes.length) {
                    battleLog = general.doc.querySelector('#log');
                    battleLog.innerHTML = logDiv.innerHTML +
                        battleLog.innerHTML;
                    logDiv.innerHTML = '';
                    _this.showCrits(_this.getCrits(general.doc.
                            querySelector('#log').querySelectorAll('b')));
                }
            };
        };

        /**
         * @method setDataDiv
         * @param   {Object}    target
         * @param   {Boolean}   mode
         */
        this.setDataDiv = function (target, mode) {
            if (showCritShots) {
                var d = general.doc.createElement('div');
                d.innerHTML = '<span style="color: #008000; font-weight: ' +
                    'bold;">Криты:</span> <span id="count_all_crits" ' +
                    'style="color: #FF0000; font-weight: bold;">0</span> ' +
                    '[ <span style="text-decoration: underline;">в пах:' +
                    '</span> <span id="crits_groin" style="color: ' +
                    '#FF0000;">0</span> <span style="text-decoration: ' +
                    'underline;">в шею:</span> <span id="crits_neck" ' +
                    'style="color: #FF0000;">0</span> <span style=' +
                    '"text-decoration: underline;">в ухо:</span> ' +
                    '<span id="crits_ear" style="color: #FF0000;">0</span> ' +
                    '<span style="text-decoration: underline;">в висок:' +
                    '</span> <span id="crits_temple" style="color: ' +
                    '#FF0000;">0</span> ]';
                target.appendChild(d);

                if (!mode) {    // в бою
                    target.appendChild(general.doc.createElement('br'));
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            // НЕ JS-версия боя
            if (/\/b0\/b\.php/.test(general.loc)) {
                return;
            }

            var chat = general.doc.querySelector('form[name="battlechat"]'),
                _this = this,
                log;

            if (!general.viewMode) {    // в бою
                // ждем загрузки данных на странице
                var lPers = general.$('listleft');
                log = general.$('log');
                if (!lPers || (/загружаются данные/i.test(lPers.innerHTML)) ||
                        !log || !chat) {
                    general.root.setTimeout(function () {
                        _this.init();
                    }, 200);
                    return;
                }

                this.setDataDiv(chat.parentNode, false);
                // изменяем функцию обновления чата на странице
                this.change_updatechatlines();
            } else {    // режим наблюдения за боем
                var center = general.doc.querySelector('td[valign="top"]' +
                        '[width="70%"]>center');
                // noinspection JSCheckFunctionSignatures
                center.appendChild(general.doc.createElement('br'));
                // noinspection JSCheckFunctionSignatures
                center.appendChild(general.doc.createElement('br'));
                this.setDataDiv(center, true);
                this.showCrits(this.getCrits(general.doc.
                        querySelector('td>span[class="txt"]').
                    querySelectorAll('b')));
            }
        };
    };

    new CritShotsLinksOnBattleLog().init();

}());

