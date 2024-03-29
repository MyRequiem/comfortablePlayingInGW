// ==UserScript==
// @name            DelAndAddBlackSms
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Красит кнопку "Удалить и забанить" при просмотре личных сообщений в розовый цвет. При нажатии требует подтверждения операции.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DelAndAddBlackSms/delAndAddBlackSms.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DelAndAddBlackSms/delAndAddBlackSms.user.js
// @include         https://*gwars*/sms-read.php?type=1&id=*
// @grant           none
// @license         MIT
// @version         1.10-130522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
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

            if (del) {
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

    new DelAndAddBlackSms().init();

}());

