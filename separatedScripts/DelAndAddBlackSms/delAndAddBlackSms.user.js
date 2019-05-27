// ==UserScript==
// @name            DelAndAddBlackSms
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Красит кнопку "Удалить и забанить" при просмотре личных сообщений в розовый цвет. При нажатии требует подтверждения операции.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DelAndAddBlackSms/delAndAddBlackSms.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DelAndAddBlackSms/delAndAddBlackSms.user.js
// @include         http://www.gwars.ru/sms-read.php?type=1&id=*
// @grant           none
// @license         MIT
// @version         1.08-260519
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true */

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
     * @class DelAndAddBlackSms
     * @constructor
     */
    var DelAndAddBlackSms = function () {
        /**
         * @method init
         */
        this.init = function () {
            var del = general.doc.querySelector('td>a[class="mainbutton"]' +
                    '[href*="&do_black=1&addblack="]');

            // noinspection JSUnresolvedVariable
            if (del && general.root.y7ci) {
                del.setAttribute('style', 'background: #FDD8D8;');

                del.addEventListener('click', function (e) {
                    if (!general.
                            root.confirm('Удалить и забанить. Уверены ???')) {

                        var ev = e || general.root.event;
                        ev.preventDefault();
                    }
                }, false);
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
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new DelAndAddBlackSms().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

