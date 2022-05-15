// ==UserScript==
// @name            GameMania
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Анализ результативности игры в рулетку, тотализатор, покер и заработанных денег в боях на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GameMania/gameMania.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GameMania/gameMania.user.js
// @include         https://*gwars*/info.php?id=*
// @grant           none
// @license         MIT
// @version         2.42-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true */

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
     * @class SetPoints
     * @constructor
     */
    var SetPoints = function () {
        /**
         * @method init
         * @param   {String|int}    num
         * @param   {String}        separator
         * @param   {Boolean}       flagSign
         * @return  {String}
         */
        this.init = function (num, separator, flagSign) {
            var x = +num,
                sign = x > 0 && flagSign ? '+' : '',
                i;

            if (isNaN(x)) {
                return 'NaN';
            }

            x = x.toString().split('').reverse();
            for (i = 2; i < x.length; i += 3) {
                if (x[i] === '-' || !x[i + 1] || x[i + 1] === '-') {
                    break;
                }

                x[i] = separator + x[i];
            }

            return sign + x.reverse().join('');
        };
    };

    /**
     * @class GameMania
     * @constructor
     */
    var GameMania = function () {
        /**
         * @property target
         * @type {HTMLTableCellElement}
         */
        this.target = general.doc.querySelector('td[class="greenbrightbg"]' +
            '[valign="top"][align="left"]');
        /**
         * @property total
         * @type {int}
         */
        this.total = 0;

        /**
         * @method calc
         * @param   {Object}    reg1
         * @param   {Object}    reg2
         * @return  {int}
         */
        this.calc = function (reg1, reg2) {
            var spent = reg1.test(this.target.innerHTML) ?
                        +reg1.exec(this.target.innerHTML)[1].
                            replace(/,/g, '') : 0,
                prize = reg2.test(this.target.innerHTML) ?
                        +reg2.exec(this.target.innerHTML)[1].
                            replace(/,/g, '') : 0,
                rez = prize - spent;

            if (!rez) {
                return 0;
            }

            this.total += rez;
            return rez;
        };

        /**
         * @method getStrGameRez
         * @param   {int}       rez
         * @param   {String}    game
         * @param   {Boolean}   ttl
         * @return  {String}
         */
        this.getStrGameRez = function (rez, game, ttl) {
            return '<tr><td style="' +
                (!ttl ? 'color: #008000' : 'font-weight: bold') + ';">' +
                game + ':</td>' + '<td style="color: ' +
                (rez < 0 ? '#0000FF' : '#FF0000') + ';">$' +
                new SetPoints().init(rez, ',', false) + '</td></tr>';
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!this.target ||
                    !/Отработано часов/.test(this.target.innerHTML)) {
                return;
            }

            var roul = this.calc(/Потрачено в казино: <b>\$([^<]*)/i,
                    /Выигрыш в казино: <b>\$([^<]*)/i),
                tot = this.calc(/Потрачено в тотализаторе: <b>\$([^<]*)/i,
                    /Выигрыш в тотализаторе: <b>\$([^<]*)/i),
                fight = /Выигрыш в боях/i.test(this.target.innerHTML);

            if (roul || tot || fight) {
                if (fight) {
                    this.total += +/Выигрыш в боях: <b>\$([^<]*)/i.
                            exec(this.target.innerHTML)[1].replace(/,/g, '');
                }

                var str = '<hr><table>';
                if (roul) {
                    str += this.getStrGameRez(roul, 'Рулетка', false);
                }

                if (tot) {
                    str += this.getStrGameRez(tot, 'Тотализатор', false);
                }

                str += this.getStrGameRez(this.total, 'Всего', true);

                if (fight) {
                    str += '<tr><td colspan="2" style="font-size: 10px;">' +
                        '(с учетом выигрыша в боях)</td></tr>';
                }

                str += '</table>';

                var div = general.doc.createElement('div');
                div.innerHTML = str;
                this.target.appendChild(div);
            }
        };
    };

    new GameMania().init();

}());

