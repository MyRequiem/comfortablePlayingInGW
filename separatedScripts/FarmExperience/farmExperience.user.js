// ==UserScript==
// @name            FarmExperience
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На ферме показывает производственный опыт и прибыль в гб за один час для каждого растения.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FarmExperience/farmExperience.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FarmExperience/farmExperience.user.js
// @include         http://www.ganjawars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         2.11-121216
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true */

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
     * @class FarmExperience
     * @constructor
     */
    var FarmExperience = function () {
        /**
         * @method calculateFarm
         * @param   {int}       p1
         * @param   {int}       p2
         * @param   {int}       time
         * @param   {Number}    exp
         * @return  {string}
         */
        this.calculateFarm = function (p1, p2, time, exp) {
            var money = ((p2 - p1) / time * 60).toFixed(2),
                experience = (exp / time * 60).toFixed(3);

            return ' <span style="color: #FF0000;">[$' + money + ']</span>' +
                    '<span style="color: #0000FF;">[' + experience + ']</span>';
        };

        /**
         * @method init
         */
        this.init = function () {
            //если в постройках или не на пустрой грядке
            if ((/section=items/.test(general.root.location.href)) ||
                    !(/Грядка пустая/.test(general.doc.body.innerHTML))) {
                return;
            }

            var prices1 = general.doc.querySelectorAll('label>font' +
                        '[color="#006600"]>b:last-child'),
                prices2 = general.doc.querySelectorAll('li>font' +
                        '[color="#990000"]>b:first-child'),
                time = general.doc.querySelectorAll('form[action$=' +
                        '"/ferma.php"]>li:nth-child(odd)'),
                span,
                i;

            for (i = 0; i < prices1.length; i++) {
                span = general.doc.createElement('span');
                span.setAttribute('style', 'font-size: 9px;');
                span.innerHTML = this.calculateFarm(+(/\$(\d+)/.
                            exec(prices1[i].innerHTML)[1]),
                    +(/\$(\d+)/.exec(prices2[i].innerHTML)[1]),
                    +(/созревания:\s(\d+)/.exec(time[i].innerHTML)[1]),
                    parseFloat(/(\d+\.?\d*) опыта/.
                        exec(time[i].nextElementSibling.innerHTML)[1]));

                prices1[i].parentNode.appendChild(span);
            }
        };
    };

    new FarmExperience().init();

}());

