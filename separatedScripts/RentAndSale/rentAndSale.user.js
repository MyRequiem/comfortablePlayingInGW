// ==UserScript==
// @name            RentAndSale
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     При передаче предмета в аренду форма передачи выделяется голубым цветом. Если предмет продается или передается в постоянное пользование, то красным. Так же если указана нулевая цена, выводится сообщение с подтверждением продолжения операции.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/RentAndSale/rentAndSale.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/RentAndSale/rentAndSale.user.js
// @include         http://www.gwars.ru/home.senditem.php*
// @grant           none
// @license         MIT
// @version         2.05-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
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
     * @class RentAndSale
     * @constructor
     */
    var RentAndSale = function () {
        /**
         * @method changeColor
         */
        this.changeColor = function () {
            var td = general.doc.querySelector('input[name="sendtype"]').
                        parentNode,
                _this = this,
                color = _this.id === 'donotsend' ? '#E0EEE0' :
                            _this.id === 'send1' ? '#FB8F8F' : '#95CCF6';

            td.style.background = color;
            td.previousElementSibling.style.background = color;
        };

        /**
         * @method init
         */
        this.init = function () {
            var radio = general.doc.querySelectorAll('input[name="sendtype"]');

            if (radio.length) {
                var scrpt = general.doc.createElement('script');
                scrpt.innerHTML = 'function checkPrice(){if(document.' +
                        'getElementById("for_money_id").value=="0"){' +
                        'if(!confirm("Указана цена 0 Гб !!! Продолжить?"))' +
                        'return false;}return true;}';
                general.doc.querySelector('head').appendChild(scrpt);

                general.doc.querySelector('form[action="/home.senditem.php"]').
                    setAttribute('onsubmit', 'return checkPrice();');

                var i;
                for (i = 0; i < radio.length; i++) {
                    radio[i].addEventListener('click', this.changeColor, false);
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
            'cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new RentAndSale().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

