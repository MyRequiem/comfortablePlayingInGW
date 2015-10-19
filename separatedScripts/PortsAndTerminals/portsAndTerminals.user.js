// ==UserScript==
// @name            PortsAndTerminals
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Показывает на карте терминалы и порты.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsAndTerminals/portsAndTerminals.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsAndTerminals/portsAndTerminals.user.js
// @include         http://www.ganjawars.ru/map.php*
// @grant           none
// @license         MIT
// @version         2.00-061015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, plusplus: true */

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
        this.imgPath = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/imgs/';
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
                mySector,
                coord,
                tmp,
                j,
                i;

            for (i = 0; i < cells.length; i++) {
                coord = /\d+&sy=\d+/.exec(cells[i].parentNode.href)[0];
                for (j = 0; j < this.sectors.length; j++) {
                    tmp = this.sectors[j].split('|');
                    if (coord === tmp[0]) {
                        mySector = cells[i].parentNode.parentNode.
                            getAttribute('class') === 'wbr';

                        if (!tmp[1]) {
                            cells[i].src = this.imgPath + (mySector ?
                                    'anchorS.png' : 'anchor.png');
                        } else if (tmp[1] === '1') {
                            cells[i].src = this.imgPath + (mySector ?
                                    'coinsS.png' : 'coins.png');
                        } else {
                            cells[i].src = this.imgPath + (mySector ?
                                    'bothS.png' : 'both.png');
                        }
                    }
                }
            }
        };
    };

    new PortsAndTerminals().init();

}());
