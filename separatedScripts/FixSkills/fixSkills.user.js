// ==UserScript==
// @name            FixSkills
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Исправляет умелки вида +-xxx, полученные при выполнении квестов.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FixSkills/fixSkills.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FixSkills/fixSkills.user.js
// @include         https://*gwars*/info.php?id=*
// @include         https://*gwars*/me.php*
// @include         https://*gwars*/me/*
// @grant           none
// @license         MIT
// @version         2.14-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
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
     * @class FixSkills
     * @constructor
     */
    var FixSkills = function () {
        /**
         * @property skills
         * @type {Array}
         */
        this.skills = [
            ['0', 4], ['1', 8], ['2', 13], ['3', 23], ['4', 36], ['5', 56],
            ['6', 84], ['7', 123], ['8', 176], ['9', 248], ['10', 344],
            ['11', 471], ['12', 637], ['13', 852], ['14', 1128], ['15', 1480],
            ['16', 1926], ['17', 2489], ['18', 3193], ['19', 4070],
            ['20', 5500], ['20/1', 7140], ['20/2', 9270], ['20/3', 12050],
            ['20/4', 15600], ['20/5', 20000], ['20/6', 26300], ['20/7', 34200],
            ['20/8', 45000], ['20/9', 58000]
        ];

        /**
         * @method fixSkills
         * @param   {NodeList}  nbrs
         */
        this.fixSkills = function (nbrs) {
            var residue,
                font,
                rez,
                x,
                i,
                j;

            for (i = 0; i < nbrs.length; i++) {
                x = /\([^>]+>(\d+.?\d*)<\/span>\s?\)\s*.*\+-\d+.?\d*<\/font>/.
                    exec(nbrs[i].innerHTML);

                if (x) {
                    x = parseFloat(x[1]);

                    rez = 0;
                    for (j = 0; j < this.skills.length; j++) {
                        if (x < this.skills[j][1]) {
                            rez = this.skills[j];
                            break;
                        }
                    }

                    if (!rez) {
                        rez = ['20/10'];
                    }

                    font = nbrs[i].querySelectorAll('font');
                    font[0].innerHTML = rez[0];

                    if (rez[1]) {
                        residue = rez[1] - x;
                        //если есть знаки после запятой, то оставляем один
                        residue = residue - Math.floor(residue) ?
                                residue.toFixed(1) : residue.toFixed(0);
                        font[1].innerHTML = '+' + residue;
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var nobrs, css;
            if (/\/info\.php\?id=/.test(general.loc)) {
                css = 'td[class="greenbrightbg"][align="right"]' +
                    '[valign="top"]>table:not([align="center"])';
                nobrs = general.doc.querySelector(css).querySelectorAll('nobr');
            } else {
                css = 'td[valign="top"][align="center"]>' +
                    'table[cellspacing="0"][cellpadding="0"][border="0"]';
                nobrs = general.doc.querySelector(css).querySelectorAll('nobr');
            }

            this.fixSkills(nobrs);
        };
    };

    new FixSkills().init();

}());

