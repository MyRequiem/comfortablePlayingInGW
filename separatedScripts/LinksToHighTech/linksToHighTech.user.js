// ==UserScript==
// @name            LinksToHighTech
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В государственном магазине рядом со ссылками на типы вооружения добавляет ссылки на вооружение High-tech
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/LinksToHighTech/linksToHighTech.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/LinksToHighTech/linksToHighTech.user.js
// @include         http://www.gwars.ru/shop.php*
// @grant           none
// @license         MIT
// @version         1.26-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458] идея Buger_man
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
     * @class LinksToHighTech
     * @constructor
     */
    var LinksToHighTech = function () {
        /**
         * @property highTechItems
         * @type {Object}
         */
        this.highTechItems = {
            'htGroup': ['auto', 'heavy', 'sniper', 'ppguns', 'shotguns',
                'grl', 'armour', 'helmets', 'boots', 'masks', 'wear',
                'belts', 'rightpocket', 'leftpocket', 'epockets', 'drugs',
                'transport'],
            'sniper': 'snipe'
        };


        /**
         * @method init
         */
        this.init = function () {
            var links = general.doc.
                    querySelector('td[valign="top"][width="200"]').
                        querySelectorAll('a[href*="/shop.php?shop=shop_"]'),
                group,
                i;

            for (i = 0; i < links.length; i++) {
                if (links[i].innerHTML) {
                    group = /\?shop=shop_(.*)$/.exec(links[i].href)[1];
                    if (this.highTechItems.htGroup.indexOf(group) !== -1) {
                        // noinspection JSUnresolvedVariable
                        links[i].parentNode.innerHTML = '<a ' +
                            'href="/shopc.php?shop=shop_' +
                            (this.highTechItems[group] || group) +
                            '_c" style="color: #AC4311; margin-right: 5px;">' +
                            '[Ht]</a>' + links[i].parentNode.innerHTML;
                    }
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
                new LinksToHighTech().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

