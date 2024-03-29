// ==UserScript==
// @name            SortSyndOnline
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Сортировка онлайна синдиката и союза по идущим боям. Выделение синдикатных боев.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndOnline/sortSyndOnline.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndOnline/sortSyndOnline.user.js
// @include         https://*gwars*/syndicate.php?id=*
// @grant           none
// @license         MIT
// @version         2.07-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
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
         * @property loc
         * @type {String}
         */
        this.loc = this.root.location.href;
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
     * @class SortSyndOnline
     * @constructor
     */
    var SortSyndOnline = function () {
        /**
         * @property mainTable
         * @type {Object|null}
         */
        this.mainTable = general.doc.querySelector('table[width="600"]' +
            '[align="center"][cellspacing="0"][cellpadding="0"]');

        /**
         * @method sortBattles
         */
        this.sortBattles = function () {
            var trs = this.mainTable.querySelectorAll('tr'),
                reg = /\/warlog\.php\?bid=(\d+)/,
                battles = {},
                bid,
                i;

            for (i = 1; i < trs.length; i++) {
                bid = reg.exec(trs[i].innerHTML);
                // alert(trs[i].innerHTML);
                if (/<b>(\s?|&nbsp;)?\d+(\s?|&nbsp;)?<\/b>$/.
                        test(trs[i].firstElementChild.innerHTML) &&
                            bid) {
                    if (!battles[bid[1]]) {
                        battles[bid[1]] = [];
                    }

                    battles[bid[1]].push(trs[i].cloneNode(true));
                    trs[i].parentNode.removeChild(trs[i]);
                }
            }

            var target = this.mainTable.querySelector('tr'),
                tr = general.doc.createElement('tr');

            tr.innerHTML = '<td><table class="bordersupdown" width="100%" ' +
                'cellspacing="1" cellpadding="4" align="center" ' +
                'style="margin-bottom: 15px;"><tbody></tbody></table></td>';
            target.parentNode.insertBefore(tr, target);
            target = tr.querySelector('tbody');

            // ссылки на идущие синдикатные бои (таблица внизу страницы)
            var syndBattles = general.doc.
                    querySelectorAll('td[class="greengreenbg"][valign="top"]>' +
                        'a[href*="/warlog.php?bid="]'),
                countBattles = 1,
                color,
                btl;

            for (btl in battles) {
                if (battles.hasOwnProperty(btl)) {
                    color = '';
                    for (i = 0; i < syndBattles.length; i++) {
                        // если бой синдикатный, выделяем зеленым цветом
                        if (btl === reg.exec(syndBattles[i].href)[1]) {
                            color = ' style="color: #00AA00;"';
                            break;
                        }
                    }

                    tr = general.doc.createElement('tr');
                    tr.innerHTML = '<td colspan="8" class="greenbg" ' +
                        'style="text-align: center; font-weight: bold;">' +
                        '<span' + color + '>Бой: ' + countBattles +
                        '</span></td>';
                    target.appendChild(tr);

                    for (i = 0; i < battles[btl].length; i++) {
                        target.appendChild(battles[btl][i]);
                    }

                    countBattles++;
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page=online$/.test(general.loc) && this.mainTable &&
                    this.mainTable.
                        querySelector('td>a[href*="/warlog.php?bid="]>' +
                            'img[src*="/i/icons/"]')) {
                this.sortBattles();
            }
        };
    };

    new SortSyndOnline().init();

}());

