// ==UserScript==
// @name            BlacklistHighlighting
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах игры подсвечивает ники персонажей, которые занесены в черный список. Делает неактивной ссылку принятия боя в одиночках (опционально).
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BlacklistHighlighting/blacklistHighlighting.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BlacklistHighlighting/blacklistHighlighting.user.js
// @include         http://www.gwars.ru/*
// @grant           none
// @license         MIT
// @version         2.07-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    devel: true, regexp: true
*/

/*eslint-env browser */
/*eslint indent: ['error', 4], linebreak-style: ['error', 'unix'],
    quotes: ['error', 'single'], semi: ['error', 'always'],
    eqeqeq: 'error', curly: 'error'
*/

/*jscs:disable requireMultipleVarDecl, requireVarDeclFirst */
/*jscs:disable disallowKeywords, disallowDanglingUnderscores */
/*jscs:disable validateIndentation */

(function () {
    'use strict';

    // =================== НАСТРОЙКИ ======================
    // если в заявке одиночных боев Вас вызвает персонаж из
    // черного списка, то ссылка "Подтвердить" будет:
    // не активной          - 1
    // оставить активной    - 0
    var blockLinkOne2One = 0;
    // ================ КОНЕЦ НАСТРОЕК ====================

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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'blacklistHighlighting';
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
         * @method getData
         * @return  {String}
         */
        getData: function () {
            return this.st.getItem(this.STNAME);
        },

        /**
         * @method setData
         * @param   {String} data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data);
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
     * @class BlacklistHighlighting
     * @constructor
     */
    var BlacklistHighlighting = function () {
        /**
         * @property blTable
         * @type {HTMLTableElement|null}
         */
        this.blTable = null;

        /**
         * @method rememberClick
         * @param   {Object}    _this
         */
        this.rememberClick = function (_this) {
            var a = _this.blTable.querySelectorAll('a[href*="/info.php?id="]'),
                mass,
                i;

            //в ЧС никого нет
            if (!a.length) {
                general.setData('');
                alert('Ваш ЧС пуст. Сначала нужно добавить персонажей.');
                return;
            }

            mass = [];
            for (i = 0; i < a.length; i++) {
                mass.push(/info\.php\?id=(\d+)/.exec(a[i].href)[1]);
            }

            general.setData(mass.join(','));
            _this.setHighlighting();
        };

        /**
         * @method clearClick
         * @param   {Object}    _this
         */
        this.clearClick = function (_this) {
            if (general.getData()) {
                general.setData('');
                _this.setHighlighting();
            } else {
                alert('В памяти скрипта нет ЧС');
            }
        };

        /**
         * @method setHighlighting
         */
        this.setHighlighting = function () {
            var a = general.doc.querySelectorAll('a[href*="/info.php?id="]'),
                link,
                id,
                i;

            for (i = 0; i < a.length; i++) {
                a[i].style.background = '';
                id = /\?id=(\d+)$/.exec(a[i].href);
                id = id && id[1].length > 3 ? id[1] : null;
                if (id && general.getData().indexOf(id) !== -1) {
                    a[i].style.background = '#B6B5B5';
                    // блокировка ссылки принятия боя в одиночных заявках
                    // noinspection JSUnresolvedVariable
                    if (blockLinkOne2One &&
                            (/Подтверждаете бой с/.
                                test(a[i].parentNode.innerHTML))) {
                        link = general.doc.
                            querySelector('a[class="mainbutton"]' +
                                '[href*="/warlist.php?war=armed&do=5&cu="]');
                        link.removeAttribute('class');
                        link.setAttribute('style', 'text-decoration: ' +
                            'line-through; color: #808080;');
                        link.href = '#';
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'Blacklist Highlighting\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            if (/home\.friends\.php/.test(general.loc)) {
                this.blTable = general.doc.querySelectorAll('table' +
                        '[border="0"][cellspacing="0"][cellpadding="3"]' +
                        '[class="wb"][align="center"][width="100%"]');

                if (!this.blTable[1]) {
                    return;
                }

                this.blTable = this.blTable[1];
                var buttonStyle = 'margin-left: 5px; border: solid 1px; ' +
                    'border-radius: 3px; background: #D0EED0; cursor: pointer;',
                    butRemember = general.doc.createElement('input'),
                    butClear = general.doc.createElement('input'),
                    _this = this;

                butRemember.type = 'button';
                butRemember.value = 'Запомнить ЧС';
                butRemember.setAttribute('style', buttonStyle);
                butRemember.addEventListener('click', function () {
                    _this.rememberClick(_this);
                }, false);

                butClear.title = 'Забыть';
                butClear.type = 'button';
                butClear.value = 'X';
                butClear.setAttribute('style', buttonStyle);
                butClear.addEventListener('click', function () {
                    _this.clearClick(_this);
                }, false);

                var target = this.blTable.querySelector('td');
                target.appendChild(butRemember);
                target.appendChild(butClear);
            }

            if (general.getData()) {
                if (/www\.gwars\.ru\/b0\//.test(general.loc)) {
                    general.root.setInterval(this.setHighlighting, 1000);
                } else if (/\/usertransfers\.php/.test(general.loc)) {
                    general.root.setTimeout(this.setHighlighting, 300);
                } else {
                    this.setHighlighting();
                }
            }
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
        script.src = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/cpigwchbl/cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new BlacklistHighlighting().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

