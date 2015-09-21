// ==UserScript==
// @name            MoveArrowOnAut
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Перемещение на ауте с помощью клавиатуры. W,w,Ц,ц - вверх, S,s,Ы,ы - вниз, A,a,Ф,ф - лево, D,d,В,в - право.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/MoveArrowOnAut/moveArrowOnAut.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/MoveArrowOnAut/moveArrowOnAut.user.js
// @include         http://quest.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         1.00-210915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, plusplus: true, nomen: true
*/

(function () {
    'use strict';

    /**
     * @class General
     * @constructor */
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
     * @class MoveArrowOnAut
     * @constructor
     */
    var MoveArrowOnAut = function () {
        /**
         * @method moveArrow
         * @param    {Object}   e
         */
        this.moveArrow = function (e) {
            var ev = e || general.root.event,
                _this = this,
                move = _this.href;

            switch (ev.keyCode) {
            // W,w,Ц,ц - вверх
            case 87:
            case 119:
            case 1062:
            case 1094:
                move = move.replace('wy=0', 'wy=-1');
                break;
            // S,s,Ы,ы - вниз
            case 83:
            case 115:
            case 1067:
            case 1099:
                move = move.replace('wy=0', 'wy=1');
                break;
            // A,a,Ф,ф - лево
            case 65:
            case 97:
            case 1060:
            case 1092:
                move = move.replace('wx=0', 'wx=-1');
                break;
            // D,d,В,в - право
            case 68:
            case 100:
            case 1042:
            case 1074:
                move = move.replace('wx=0', 'wx=1');
                break;
            default:
                return;
            }

            general.root.location = move;
        };

        /**
         * @method init
         */
        this.init = function () {
            var a = general.doc.querySelector('a[href*="&wx=0&wy=0&"]');
            a.addEventListener('keypress', this.moveArrow, false);
            a.focus();
        };
    };

    new MoveArrowOnAut().init();

}());

