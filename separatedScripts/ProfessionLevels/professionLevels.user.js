// ==UserScript==
// @name            ProfessionLevels
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице информации персонажа отображает оставшееся количество очков до следующего уровня професии.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfessionLevels/professionLevels.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ProfessionLevels/professionLevels.user.js
// @include         http://www.gwars.ru/info.php?id=*
// @grant           none
// @license         MIT
// @version         1.00-200520
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458], идея Bodyarm
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
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|)/.exec(this.doc.cookie)[2];
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
        },

        /**
         * @method  $
         * @param   {String}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
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
            td.innerHTML = '+' + (general.root.jsvn ? value : ')');
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
                        if (general.root.jzPZ) {
                            break;
                        }
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
                new ProfessionLevels().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

