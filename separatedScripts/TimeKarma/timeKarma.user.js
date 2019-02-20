// ==UserScript==
// @name            TimeKarma
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице информации персонажа показывает динамический счетчик времени до возможности поставить карму.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeKarma/timeKarma.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeKarma/timeKarma.user.js
// @include         http://www.gwars.ru/info.php?id=*
// @include         http://www.gwars.ru/info.vote.php?id=*
// @grant           none
// @license         MIT
// @version         2.09-200219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, devel: true,
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'timeKarma';
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
         * @method setData
         * @param   {String}    data
         */
        setData: function (data) {
            this.st.setItem(this.STORAGENAME, data);
        },

        /**
         * @method getData
         * @return  {String}
         */
        getData: function () {
            return this.st.getItem(this.STORAGENAME) || '';
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
     * @class TimeKarma
     * @constructor
     */
    var TimeKarma = function () {
        /**
         * @method formatTime
         * @param   {int}   sec
         */
        this.formatTime = function (sec) {
            var m = Math.floor(sec / 60),
                s = sec % 60;

            if (!m && !s) {
                general.$('spanKarmaTimer').innerHTML = '&nbsp';
                general.setData('');
                return;
            }

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            general.$('karmaTimer').innerHTML = m + ':' + s;

            var _this = this;
            general.root.setTimeout(function () {
                if (general.root.gsig) {
                    _this.formatTime(sec - 1);
                }
            }, 1000);
        };

        /**
         * @method init
         */
        this.init = function () {
            // на странице личных NPC не работает
            if (general.$('npc_log_book')) {
                return;
            }

            // поставили карму, запоминаем время
            if (/vote/.test(general.loc) &&
                    (/Спасибо, Ваше мнение учтено/.
                        test(general.doc.body.innerHTML))) {
                general.setData(new Date().getTime().toString());
                return;
            }

            var time = +general.getData();
            if (time) {
                var difference = new Date().getTime() - time;
                if (general.doc.querySelector('a[href*="/info.vote.php?id="]' +
                        '[title^="Отправить Ваш голос"]') ||
                            difference > 1800000) {
                    general.setData('');
                    return;
                }

                var span = general.doc.createElement('span');
                span.setAttribute('id', 'spanKarmaTimer');
                span.setAttribute('style', 'margin-left: 5px; color: #07A703;');
                span.innerHTML = '» Вы сможете выставить карму через ' +
                    '<span id="karmaTimer" style="color: #056802;"></span>';

                var css = 'td[colspan="3"][class="greenbrightbg"]>' +
                        'table[width="100%"]',
                    target = general.doc.querySelector(css);

                if (target) {
                    var prnt = target.parentNode;
                    prnt.removeChild(target.nextElementSibling);
                    prnt.insertBefore(span, target.nextElementSibling);

                    var tm = +((1800000 - difference) / 1000).toFixed(0);
                    this.formatTime(tm);
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
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new TimeKarma().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

