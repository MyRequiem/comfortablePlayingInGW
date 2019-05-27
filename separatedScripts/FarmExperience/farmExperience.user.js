// ==UserScript==
// @name            FarmExperience
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На ферме показывает производственный опыт и прибыль в гб за один час для каждого растения.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FarmExperience/farmExperience.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FarmExperience/farmExperience.user.js
// @include         http://www.gwars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         2.27-260519
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true,
    nomen: true
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
         * @method runInit
         */
        this.runInit = function () {
            var _this = this;
            return function () {
                general.root.setTimeout(function () {
                    _this.init();
                }, 700);
            };
        };

        /**
         * @method init
         */
        this.init = function () {
            var a = general.doc.querySelectorAll('*[onclick*="gotourl("],' +
                        '*[onclick*="openurl("],*[onclick*="plantit("]'),
                l;

            for (l = 0; l < a.length; l++) {
                a[l].addEventListener('click', this.runInit(), false);
            }

            // не на пустрой грядке
            if (!general.doc.querySelector('input[value="Посадить"]')) {
                return;
            }

            var plants = general.doc.querySelectorAll('table[cellspacing="0"]' +
                    '[cellpadding="0"]  td[valign="top"][onclick*="btn_"]'),
                price1,
                price2,
                target,
                time,
                span,
                exp,
                i;

            for (i = 0; i < plants.length; i++) {
                span = general.doc.createElement('span');
                span.setAttribute('style', 'font-size: 9px;');
                price1 = +/\$(\d+)/.exec(plants[i].querySelector('font' +
                    '[color="#006600"]>b:last-child').innerHTML)[1];
                price2 = +/\$(\d+)/.exec(plants[i].querySelector('font' +
                    '[color="#990000"]>b').innerHTML)[1];
                time = +/созревания:\s(\d+)/.exec(plants[i].innerHTML)[1];
                exp = parseFloat(/(\d+\.?\d*) опыта/.
                    exec(plants[i].innerHTML)[1]);
                span.innerHTML = this.calculateFarm(price1, price2, time, exp);
                // noinspection JSUnresolvedVariable
                if (general.root.dnlo) {
                    target = plants[i].querySelector('br');
                    target.parentNode.insertBefore(span, target);
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
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new FarmExperience().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

