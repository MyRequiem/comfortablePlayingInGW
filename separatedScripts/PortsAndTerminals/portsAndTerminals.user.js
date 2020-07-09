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
// @version         2.20-090720
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true,
    nomen: true
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
     * @class GetPos
     * @constructor
     */
    var GetPos = function () {
        /**
         * @method init
         * @param   {Object}   obj
         * @return  {Object}
         */
        this.init = function (obj) {
            var _obj = obj,
                x = 0,
                y = 0;

            while (_obj) {
                x += _obj.offsetLeft;
                y += _obj.offsetTop;
                _obj = _obj.offsetParent;
            }

            return {x: x, y: y};
        };
    };

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
         * @method  createDiv
         * @param   {Object}   pos
         * @param   {String}   img
         * @param   {int}      shiftX
         */
        this.createDiv = function (pos, img, shiftX) {
            var div = general.doc.createElement('div');
            div.setAttribute('style', 'position: absolute; z-index: 999;');
            div.style.left = pos.x + shiftX;
            div.style.top = pos.y + 3;
            div.innerHTML = '<img src="' + this.imgPath + img +
                '" alt="img" />';
            general.doc.body.appendChild(div);
        };

        /**
         * @method init
         */
        this.init = function () {
            var cells = general.doc.
                    querySelectorAll('a[href*="/map.php?sx="]>img'),
                getPos = new GetPos().init,
                coord,
                tmp,
                j,
                i;

            for (i = 0; i < cells.length; i++) {
                // noinspection JSUnresolvedVariable
                coord = /\d+&sy=\d+/.exec(cells[i].parentNode.href)[0];
                for (j = 0; j < this.sectors.length; j++) {
                    tmp = this.sectors[j].split('|');
                    // noinspection JSUnresolvedVariable
                    if (coord === tmp[0] && general.root.fue0) {
                        if (!tmp[1]) {
                            // порт
                            this.createDiv(getPos(cells[i]), 'anchor.png', 3);
                        } else if (tmp[1] === '1') {
                            // терминал
                            this.createDiv(getPos(cells[i]), 'coins.png', 3);
                        } else {
                            // порт + терминал
                            this.createDiv(getPos(cells[i]), 'anchor.png', 3);
                            this.createDiv(getPos(cells[i]), 'coins.png', 22);
                        }
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
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new PortsAndTerminals().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

