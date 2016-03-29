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
// @version         1.21-290316
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
         * @param   {Object}    e
         */
        this.moveArrow = function (e) {
            var makeMove = function (reg1, reg2, rev) {
                    var a = general.doc.querySelectorAll('a'),
                        allMoveLinks = [],
                        emptyCell,
                        i;

                    for (i = 0; i < a.length; i++) {
                        emptyCell = a[i].querySelector('img[src*="/t.gif"]');
                        if (emptyCell && (/\?w=\-?\d+&wx=\-?\d+&wy=\-?\d+&/.
                                test(a[i].href))) {
                            allMoveLinks.push(a[i]);
                        }
                    }

                    allMoveLinks.sort(function (a, b) {
                        var x = +(reg1.exec(a.href)[1]),
                            x1 = +(reg2.exec(b.href)[1]),
                            rez;

                        if (x > x1) {
                            rez = rev ? -1 : 1;
                        } else if (x < x1) {
                            rez = rev ? 1 : -1;
                        } else {
                            rez = 0;
                        }

                        return rez;
                    });

                    general.root.location = allMoveLinks[0].href;
                };

            var ev = e || general.root.event,
                keyPressed = /Firefox/i.test(general.root.navigator.userAgent) ?
                        ev.charCode : ev.keyCode;

            switch (keyPressed) {
            // W,w,Ц,ц - вверх
            case 87:
            case 119:
            case 1062:
            case 1094:
                makeMove(/&wy=(\-?\d+)/, /&wy=(\-?\d+)/, false);
                break;
            // S,s,Ы,ы - вниз
            case 83:
            case 115:
            case 1067:
            case 1099:
                makeMove(/&wy=(\-?\d+)/, /&wy=(\-?\d+)/, true);
                break;
            // A,a,Ф,ф - лево
            case 65:
            case 97:
            case 1060:
            case 1092:
                makeMove(/&wx=(\-?\d+)/, /&wx=(\-?\d+)/, false);
                break;
            // D,d,В,в - право
            case 68:
            case 100:
            case 1042:
            case 1074:
                makeMove(/&wx=(\-?\d+)/, /&wx=(\-?\d+)/, true);
                break;
            default:
                return;
            }
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

