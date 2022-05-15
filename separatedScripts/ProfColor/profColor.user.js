// ==UserScript==
// @name            ProfColor
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     При наличии у персонажа лицензии киллера, боевика или наемника название профессии на его странице информации окрашивается в красный цвет.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfColor/profColor.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfColor/profColor.user.js
// @include         https://*gwars*/info.php?id=*
// @grant           none
// @license         MIT
// @version         1.07-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true */

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

    /**
     * @class ProfColor
     * @constructor
     */
    var ProfColor = function () {
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
     * @lends ProfColor.prototype
     */
    ProfColor.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method init
         */
        init: function () {
            var activeProfs = this.doc.
                    querySelectorAll('tr>td>font[color="#006600"]'),
                i;

            for (i = 0; i < activeProfs.length; i++) {
                activeProfs[i].setAttribute('color', '#FF0000');
            }
        }
    };

    new ProfColor().init();

}());

