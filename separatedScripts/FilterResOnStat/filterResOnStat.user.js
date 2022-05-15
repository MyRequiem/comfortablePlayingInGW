// ==UserScript==
// @name            FilterResOnStat
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр ресурсов на странице статистики [https://www.gwars.io/stats.php]
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterResOnStat/filterResOnStat.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterResOnStat/filterResOnStat.user.js
// @include         https://*gwars*/stats.php
// @grant           none
// @license         MIT
// @version         2.08-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
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

    new FilterResOnStat().init();

}());

