// ==UserScript==
// @name            FilterResOnStat
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр ресурсов на странице статистики [http://www.gwars.ru/stats.php]
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterResOnStat/filterResOnStat.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterResOnStat/filterResOnStat.user.js
// @include         http://www.gwars.ru/stats.php
// @grant           none
// @license         MIT
// @version         2.03-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, plusplus: true */

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

        // ================== НАСТРОЙКИ ====================
        //список ресурсов, которые будут отображаться (ЧЕРЕЗ ЗАПЯТУЮ)
    var res = 'Уран,Водоросли,Маковая соломка,Трава,Батареи,Пластик,Сталь,' +
            'Бокситы,Ганджиум,Нефть,Резина';
        // ================ КОНЕЦ НАСТРОЕК =================

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
     * @class FilterResOnStat
     * @constructor
     */
    var FilterResOnStat = function () {
        /**
         * @method delSpaces
         * @param   {String}    str
         * @return  {String}
         */
        this.delSpaces = function (str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '').
                replace(/\s,/g, ',').replace(/,\s/g, ',').
                replace(/&nbsp;/g, '').replace(/&amp;/g, '&');
        };

        /**
         * @method init
         */
        this.init = function () {
            var tbl = general.doc.querySelector('table[border="0"]' +
                    '[class="wb"]');

            if (tbl) {
                var trs = tbl.querySelectorAll('tr'),
                    nameRes,
                    i;

                res = this.delSpaces(res).split(',');
                for (i = 1; i < trs.length; i++) {
                    nameRes = this.delSpaces(/[^(]+/.exec(trs[i].
                                    firstElementChild.innerHTML)[0]);
                    if (res.indexOf(nameRes) === -1) {
                        trs[i].style.display = 'none';
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
        script.src = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/cpigwchbl/cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new FilterResOnStat().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

