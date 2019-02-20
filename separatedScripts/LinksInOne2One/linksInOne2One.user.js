// ==UserScript==
// @name            LinksInOne2One
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице заявок одиночных боев делает ники вызывающих на бой персонажей ссылками на них.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/LinksInOne2One/linksInOne2One.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/LinksInOne2One/linksInOne2One.user.js
// @include         http://www.gwars.ru/warlist.php?war=armed*
// @grant           none
// @license         MIT
// @version         2.05-200219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
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
     * @class LinksInOne2One
     * @constructor
     */
    var LinksInOne2One = function () {
        /**
         * @method init
         */
        this.init = function () {
            var table = general.doc.querySelector('td[class="txt"]>' +
                    'table[border="0"][cellpadding="5"][cellspacing="1"]');

            if (table && general.root.ylrj) {
                var trs = table.querySelectorAll('tr'),
                    last,
                    name,
                    i;

                for (i = 0; i < trs.length; i++) {
                    last = trs[i].lastElementChild;
                    name = /вызван (.*)( \[\d+\])/.exec(last.innerHTML);
                    if (name) {
                        last.innerHTML = 'вызван <a target="_blank" ' +
                            'href="http://www.gwars.ru/search.php?key=' +
                            name[1] + '" style="text-decoration: none; ' +
                            'font-weight: bold;">' + name[1] + '</a>' + name[2];
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
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new LinksInOne2One().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

