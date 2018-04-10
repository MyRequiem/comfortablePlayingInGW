// ==UserScript==
// @name            SkillCounters
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Счетчики опыта и умений на главной странице персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SkillCounters/skillCounters.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SkillCounters/skillCounters.user.js
// @include         http://www.ganjawars.ru/me.php*
// @include         http://www.ganjawars.ru/me/*
// @grant           none
// @license         MIT
// @version         2.08-100418
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, plusplus: true,
    devel: true, nomen: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'skillCounters';
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
         * @param   {Array}    data
         */
        setData: function (data) {
            this.st.setItem(this.STORAGENAME, data.join('|'));
        },

        /**
         * @method getData
         * @return  {Array|null}
         */
        getData: function () {
            var stData = this.st.getItem(this.STORAGENAME);
            return stData ? stData.split('|') : [];
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
     * @class SkillCounters
     * @constructor
     */
    var SkillCounters = function () {
        /**
         * @property counters
         * @type {NodeList}
         */
        this.counters = general.doc.querySelectorAll('td[valign="top"]' +
                '[bgcolor="#e9ffe9"]>div>table[border="0"] tr>td+td>nobr');
        /**
         * @property ids
         * @type {Array}
         */
        this.ids = ['cFighting', 'cEconomic', 'cProduction', 'cGuns',
            'cGrenades', 'cAuto', 'cHeavy', 'cShotguns', 'cSnipers'];
        /**
         * @property dataNow
         * @type {Array|null}
         */
        this.dataNow = null;


        /**
         * @method getHtime
         * @param   {int}   time
         * @return  {String}
         */
        this.getHtime = function (time) {
            var date = new Date(time),
                day = date.getDate(),
                str = '';

            str  += day < 10 ? '0' + day : day;
            str += '.';
            var month = date.getMonth() + 1;
            str += month < 10 ? '0' + month : month;
            str += '.';
            var year = /20(\d+)/.exec(date.getFullYear().toString())[1];
            str += year + ' ' + (/(\d+:\d+):\d+/.exec(date.toString())[1]);

            return str;
        };

        /**
         * @method getValue
         * @param   {Element}   obj
         * @param   {int}       fix
         * @return  {String}
         */
        this.getValue = function (obj, fix) {
            return parseFloat(/\((\d+.?\d*)\)/.
                    exec(obj.innerHTML)[1]).toFixed(fix);
        };

        /**
         * @method getDataNow
         * @param   {Boolean}   loadPage
         */
        this.getDataNow = function (loadPage) {
            var i;
            this.dataNow = [];
            for (i = 0; i < this.counters.length; i++) {
                this.dataNow.
                    push(this.getValue(this.counters[i], i < 3 ? 0 : 2));

                if (loadPage) {
                    // noinspection JSUnresolvedVariable
                    this.counters[i].parentNode.parentNode.lastElementChild.
                        innerHTML = '<span id="' + this.ids[i] +
                        '" style="color: #FF0000; font-size: 9px;"></span>';
                }
            }

            var syndExp = general.doc.querySelector('span>b+nobr+nobr');
            if (syndExp && loadPage) {
                syndExp.innerHTML += '<span id="cSyndExp" ' +
                    'style="color: #FF0000; font-size: 9px;"></span> ' +
                    '<span id="syndLeftToLevel" style="font-size: 8px; ' +
                    'color: #696156;"></span>';
            }

            this.dataNow.push(syndExp ? this.getValue(syndExp, 0) : '');
            this.dataNow.push(new Date().getTime());
        };

        /**
         * @method setLeftToLevel
         * @param   {int}   val
         */
        this.setLeftToLevel = function (val) {
            var syndLevels = [5, 15, 37, 76, 143, 200, 280, 500, 750, 1000,
                1250, 1600, 2200, 3000, 4500, 6000, 9000, 15000, 26394,
                34353, 44377, 56931, 72568, 91947, 115853, 145214, 181127,
                224882, 277996, 342247, 419713, 512821, 624395, 757716, 916591,
                1105426, 1329313, 1594124, 1906627, 2274598, 2723523, 3293658,
                4046236, 5077268, 6541333, 8693509, 11964817, 17100771,
                25421016, 40000000];

            var i;
            for (i = 0; i < syndLevels.length; i++) {
                if (val < syndLevels[i]) {
                    general.$('syndLeftToLevel').innerHTML = '[+' +
                        (syndLevels[i] - val) + ']';
                    break;
                }
            }
        };

        /**
         * @method setCounters
         */
        this.setCounters = function () {
            var stData = general.getData(),
                i;

            for (i = 0; i < this.counters.length; i++) {
                general.$(this.ids[i]).innerHTML = '[' +
                    ((parseFloat(this.dataNow[i]) - parseFloat(stData[i])).
                        toFixed(i < 3 ? 0 : 2)) + ']';
            }

            // синдовый уровень
            if (this.dataNow[9]) {
                // основной синдикат есть, а прошлого значения синдового нет
                if (!stData[9]) {
                    stData[9] = this.dataNow[9];
                    general.setData(stData);
                }

                general.$('cSyndExp').innerHTML = '[' +
                    (+this.dataNow[9] - (+stData[9])) + ']';
                this.setLeftToLevel(+this.dataNow[9]);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'SkillCounters:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            this.getDataNow(true);
            var stData = general.getData();

            if (!stData[0]) {
                stData = this.dataNow;
                general.setData(stData);
            }

            // кнопа сброса счетчиков
            var tr = general.doc.createElement('tr');
            tr.innerHTML = '<td></td><td colspan="2" style="font-weight: ' +
                'bold; font-size: 9px;"><span id="resetCounters" ' +
                'style="cursor: pointer; color: #008000; text-decoration: ' +
                'underline;">Сбросить счетчики</span><br>' +
                '<span id="timeLastReset" style="cursor: default; color: ' +
                '#0000FF;">(' + this.getHtime(+stData[10]) + ')</span></td>';
            general.$('cSnipers').parentNode.parentNode.parentNode.
                appendChild(tr);

            var _this = this;
            general.$('resetCounters').addEventListener('click', function () {
                if (confirm('Сбросить счетчики?')) {
                    _this.getDataNow(false);
                    general.setData(_this.dataNow);
                    general.$('timeLastReset').innerHTML = _this.
                        getHtime(_this.dataNow[10]);
                    _this.setCounters();
                }
            }, false);

            this.setCounters();
        };
    };

    new SkillCounters().init();

}());

