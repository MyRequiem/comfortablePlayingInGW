// ==UserScript==
// @name            GbCounter
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Показывает измененние количества Гб на главной странице персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/GbCounter/gbCounter.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/GbCounter/gbCounter.user.js
// @include         http://www.ganjawars.ru/me/*
// @grant           none
// @license         MIT
// @version         2.00-040915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, devel: true, nomen: true */

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
        /**
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'gbCounter';
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
         * @method setData
         * @param   {Array}     data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data.join('|'));
        },

        /**
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STNAME);
            if (stData) {
                return stData.split('|');
            }

            stData = [];
            this.setData(stData);
            return stData;
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
         * @param   {String|int}   num
         * @param   {String}        separator
         * @param   {Boolean}       flagSign
         * @return  {String}
         */
        this.init = function (num, separator, flagSign) {
            var x = +num,
                sign = (x > 0 && flagSign) ? '+' : '',
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
     * @class GbCounter
     * @constructor
     */
    var GbCounter = function () {
        /**
         * @property
         * @type {HTMLElement|null}
         */
        this.spanCountGB = null;
        /**
         * @property countGbNow
         * @type {int}
         */
        this.countGbNow = 0;

        /**
         * @method resetGBCounter
         */
        this.resetGBCounter = function () {
            general.setData([this.countGbNow.toString()]);
            this.setGBCounter();
        };

        /**
         *  @method setGBCounter
         */
        this.setGBCounter = function () {
            var countGbOld = general.getData()[0];
            if (!countGbOld) {
                this.resetGBCounter();
                return;
            }

            var diff = this.countGbNow - (+countGbOld);
            this.spanCountGB.innerHTML = '[' +
                new SetPoints().init(diff, '.', true) + ']';
            this.spanCountGB.style.color = diff >= 0 ?
                    '#FF0000' : '#0000FF';
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'GbCounter\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            var divGB = general.doc.querySelector('td>b>div[id="cdiv"]');
            if (divGB) {
                this.countGbNow = +divGB.innerHTML.replace(/,/g, '');
                this.spanCountGB = general.doc.createElement('span');
                this.spanCountGB.setAttribute('style', 'margin-left: 5px; ' +
                        'font-weight: normal; font-size: 7pt; ' +
                        'cursor: pointer;');
                divGB.appendChild(this.spanCountGB);

                this.setGBCounter();

                var _this = this;
                this.spanCountGB.addEventListener('click', function () {
                    if (confirm('Сбросить счетчик?')) {
                        _this.resetGBCounter();
                    }
                }, false);
            }
        };
    };

    new GbCounter().init();

}());

