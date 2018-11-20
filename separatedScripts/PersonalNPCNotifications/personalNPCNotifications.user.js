// ==UserScript==
// @name            PersonalNPCNotifications
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Если личный NPC "Ожидает распоряжений", то на главной странице персонажа ссылка на NPC будет "пульсировать".
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.user.js
// @include         http://www.gwars.ru/me.php*
// @grant           none
// @license         MIT
// @version         1.00-201118
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow, $ */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, nomen: true */

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
     * @class PersonalNPCNotifications
     * @constructor
     */
    var PersonalNPCNotifications = function () {
        /**
         * @property isCssSet
         * @type {Boolean}
         */
        this.isCssSet = false;
        /**
         * @property spanContent
         * @type {Element}
         */
        this.spanContent = general.doc.createElement('span');

        /**
         * @method setCss
         */
        this.setCss = function () {
            // css-ботва для ссылки на главную страницу NPC
            var npcLinkStyle = general.doc.createElement('style');
            npcLinkStyle.innerHTML = '@keyframes pulsate {' +
                    '15% { color: #009900; text-shadow: 1 1 ' +
                        'rgba(0,0,0,.3), 0 0 5px #FFFFFF, 0 0 7px #009900; }' +
                '}' +

                '#npcBlink {' +
                    'color: #004400;' +
                    'text-shadow: 0 -1px rgba(0,0,0,.1);' +
                    '-webkit-animation: pulsate 0.7s linear infinite;' +
                    'animation: pulsate 0.7s linear infinite;' +
                '}';

            general.doc.querySelector('head').appendChild(npcLinkStyle);
            this.isCssSet = true;
        };

        /**
         * @method changepostdo
         */
        this.changepostdo = function () {
            var _this = this;
            general.root.postdo = function (url) {
                var url_loaded = url;
                $('#my_main_div').css('opacity', '0.6');

                /*jslint unparam: true */
                /*eslint no-unused-vars: 0 */
                $('#my_main_div').load(url,
                    function (responseTxt, statusTxt, xhr) {
                        if (statusTxt === 'success') {
                            $('#my_main_div').css('opacity', '1');
                            window.history.
                                replaceState({}, null, url_loaded);
                            _this.init();
                        } else {
                            $('#my_main_div').css('opacity', '0.3');
                            window.location.href = url_loaded;
                        }
                    });

                return false;
            };
        };

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.ajax = function (url, onsuccess, onfailure) {
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
                    } else {
                        onfailure();
                    }
                }
            };
        };

        /**
         * @method start
         */
        this.start = function () {
            var npcLink = general.doc.querySelector('a[href*="/me.php?nid="]' +
                '[onclick^="dolink"]');

            if (npcLink) {
                var url = 'http://www.gwars.ru/info.php?id=' +
                        /\?nid=(\d+)/.exec(npcLink.href)[1],
                    _this = this;

                this.ajax(url, function (xhr) {
                    _this.spanContent.innerHTML = xhr.responseText;
                    var showNpcControl = _this.spanContent.
                            querySelector('a[onclick^="show_npc_control"]');

                    if (showNpcControl.innerHTML === 'Ожидает распоряжений') {
                        npcLink.setAttribute('id', 'npcBlink');
                    } else {
                        npcLink.removeAttribute('id');
                    }

                    general.root.setTimeout(function () {
                        _this.start();
                    }, 7000);
                }, function () {
                    general.root.setTimeout(function () {
                        _this.start();
                    }, 1000);
                });
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!this.isCssSet) {
                this.setCss();
            }
            this.changepostdo();
            this.start();
        };
    };

    new PersonalNPCNotifications().init();

}());

