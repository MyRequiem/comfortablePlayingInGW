// ==UserScript==
// @name            ProfessionLevels
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице информации персонажа отображает оставшееся количество очков до следующего уровня професии.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfessionLevels/professionLevels.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfessionLevels/professionLevels.user.js
// @include         https://*gwars*/info.php?id=*
// @grant           none
// @license         MIT
// @version         1.02-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458], идея Bodyarm
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true */

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
         * @method  getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        }
    };

    var general = new General();

    /**
     * @class ProfessionLevels
     * @constructor
     */
    var ProfessionLevels = function () {
        /**
         * @property profLevels
         * @type {Array}
         */
        this.profLevels = [51, 109, 184, 284, 422, 609, 856, 1176, 1581, 2085];

        /**
         * @method  setCounter
         * @param   {Object}    target
         * @param   {int}       value
         */
        this.setCounter = function (target, value) {
            var td = general.doc.createElement('td');
            td.setAttribute('style', 'padding-left: 5px; font-size: 10px; ' +
                'color: #809980;');
            td.innerHTML = '+' + value;
            target.appendChild(td);
        };

        /**
         * @method  init
         */
        this.init = function () {
            var killer = general.doc.querySelector('table[border="0"] ' +
                    'td[style*="font-size:10px"]');

            if (!killer) {
                return;
            }

            var profsTrs = killer.parentNode.parentNode.querySelectorAll('tr'),
                currentVal,
                i,
                j;

            for (i = 0; i < 3; i++) {
                currentVal = /\((\d+(\.\d+)?)\)/.exec(profsTrs[i].innerHTML)[1];
                currentVal = Math.floor(currentVal);
                for (j = 0; j < this.profLevels.length; j++) {
                    if (currentVal < this.profLevels[j]) {
                        this.setCounter(profsTrs[i],
                            this.profLevels[j] - currentVal);
                        break;
                    }
                }
            }

            var tr = general.doc.createElement('tr');
            tr.innerHTML = '<td colspan="3"><a target="_blank" ' +
                'style=" font-size: 10px;" href="http://www.ganjawiki.ru/' +
                'Очки_опыта#Таблица_опыта_профессий">Таблица опыта ' +
                'профессий</a></td>';
            profsTrs[0].parentNode.appendChild(tr);
        };
    };

    new ProfessionLevels().init();

}());

