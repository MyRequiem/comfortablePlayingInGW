// ==UserScript==
// @name            PersonalNPCNotifications
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Если личный NPC ожидает распоряжений и его здоровье более 79%, то на главной странице персонажа ссылка на NPC начинает "пульсировать". Если NPC находится на Аутленде и его здоровье менее 30%, то фон ссылки становится розовый. Звуковые оповещения. Статус NPC проверяется один раз в 10 секунд, перезагрузки главной страницы персонажа не требуется.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.user.js
// @include         http://www.gwars.ru/me.php*
// @grant           none
// @license         MIT
// @version         1.15-260519
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

    // ======================= НАСТРОЙКИ ===========================
        // звук, когда NPC ожидает распоряжений
    var sound1 = 20,
        // звук, когда NPC находится на Аутленде и его здоровье менее 30%
        sound2 = 18;
    // ==================== КОНЕЦ НАСТРОЕК =========================

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
         * @method playSound
         * @param   {int}   sound
         */
        this.playSound = function (sound) {
            if (sound) {
                var audio = general.$('cpingw_audio');
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
                // audio.src = 'http://127.0.0.1/sounds/' + sound + '.ogg';
                audio.play();
            }
        };

        /**
         * @method setCss
         */
        this.setCss = function () {
            // css-ботва для ссылки на главную страницу NPC
            var npcLinkStyle = general.doc.createElement('style');
            npcLinkStyle.innerHTML = '@-webkit-keyframes npcBlink {' +
                    '100% { color: rgba(34, 34, 34, 0);}' +
                '}' +

                '@keyframes npcBlink {' +
                    '100% { color: rgba(34, 34, 34, 0); }' +
                '}' +

                '#npcBlink {' +
                    '-webkit-animation: npcBlink 1s linear infinite;' +
                    'animation: npcBlink 1s linear infinite;' +
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
                var url_loaded = url,
                    my_main_div = $('#my_main_div');

                // noinspection JSUnresolvedFunction
                my_main_div.css('opacity', '0.6');

                /*jslint unparam: true */
                /*eslint no-unused-vars: 0 */
                // noinspection JSUnusedLocalSymbols
                my_main_div.load(url,
                    function (responseTxt, statusTxt, xhr) {
                        if (statusTxt === 'success') {
                            // noinspection JSUnresolvedFunction
                            $('#my_main_div').css('opacity', '1');
                            window.history.
                                replaceState({}, null, url_loaded);
                            _this.init();
                        } else {
                            // noinspection JSUnresolvedFunction
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

            // noinspection JSUnresolvedVariable
            if (npcLink && general.root.spua) {
                var url = 'http://www.gwars.ru/info.php?id=' +
                        /\?nid=(\d+)/.exec(npcLink.href)[1],
                    _this = this;

                this.ajax(url, function (xhr) {
                    _this.spanContent.innerHTML = xhr.responseText;
                    var link = _this.spanContent.
                            querySelector('a[onclick^="show_npc_control"]'),
                        div = _this.spanContent.
                            querySelector('#namespan').parentNode,
                        health = /\[(\d+) \/ (\d+)\]/.exec(div.innerHTML);

                    // noinspection JSRemoveUnnecessaryParentheses
                    health = Math.floor(+health[1] * 100 / (+health[2]));

                    if (link.innerHTML === 'Ожидает распоряжений' &&
                            health >= 80) {
                        npcLink.setAttribute('id', 'npcBlink');
                        _this.playSound(sound1);
                    } else if (link.innerHTML === 'Путешествует по Аутленду'
                            && health < 30) {
                        npcLink.setAttribute('style', 'background: #FFE3E3');
                        _this.playSound(sound2);
                    } else {
                        npcLink.removeAttribute('id');
                        npcLink.removeAttribute('style');
                    }

                    general.root.setTimeout(function () {
                        _this.start();
                    }, 10000);
                }, function () {
                    general.root.setTimeout(function () {
                        _this.start();
                    }, 3000);
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
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new PersonalNPCNotifications().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

