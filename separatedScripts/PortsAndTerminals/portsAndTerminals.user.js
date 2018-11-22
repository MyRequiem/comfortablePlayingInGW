// ==UserScript==
// @name            PortsAndTerminals
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Показывает на карте терминалы и порты.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsAndTerminals/portsAndTerminals.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsAndTerminals/portsAndTerminals.user.js
// @include         http://www.gwars.ru/map.php*
// @grant           none
// @license         MIT
// @version         2.15-221118
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true */

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
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
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
     * @class PortsAndTerminals
     * @constructor
     */
    var PortsAndTerminals = function () {
        /**
         * @property sectors
         * @type {Array}
         */
        this.sectors = ['50&sy=47|', '47&sy=49|', '49&sy=49|1', '51&sy=49|1',
            '53&sy=49|1', '48&sy=50|1', '50&sy=50|1', '52&sy=50|2',
            '49&sy=51|1', '53&sy=51|1', '47&sy=52|', '50&sy=52|1',
            '48&sy=53|1', '49&sy=53|', '53&sy=53|', '152&sy=148|',
            '149&sy=149|', '152&sy=149|1', '150&sy=150|1', '151&sy=150|',
            '149&sy=152|', '151&sy=152|2'];
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'PortsAndTerminals/';


        /**
         * @method init
         */
        this.init = function () {
            var cells = general.doc.
                    querySelectorAll('a[href*="/map.php?sx="]>img'),
                coord,
                cls,
                tmp,
                j,
                i;

            for (i = 0; i < cells.length; i++) {
                // noinspection JSUnresolvedVariable
                coord = /\d+&sy=\d+/.exec(cells[i].parentNode.href)[0];
                for (j = 0; j < this.sectors.length; j++) {
                    tmp = this.sectors[j].split('|');
                    if (coord === tmp[0]) {
                        // noinspection JSUnresolvedFunction
                        cls = cells[i].parentNode.parentNode.
                                getAttribute('class');

                        if (!tmp[1]) {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'anchorS.png' : cls === 'wbb' ?
                                        'anchorS2.png' : 'anchor.png');
                        } else if (tmp[1] === '1') {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'coinsS.png' : cls === 'wbb' ?
                                        'coinsS2.png' : 'coins.png');
                        } else {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'bothS.png' : cls === 'wbb' ?
                                        'bothS2.png' : 'both.png');
                        }
                    }
                }
            }
        };
    };

    new PortsAndTerminals().init();

}());

