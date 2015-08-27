// ==UserScript==
// @name            AdsFilter
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр онлайн/оффлайн и по островам на страницах поиска продажи/покупки/аренды.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdsFilter/adsFilter.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdsFilter/adsFilter.user.js
// @include         http://www.ganjawars.ru/market.php?stage=2&item_id=*
// @include         http://www.ganjawars.ru/market.php?buy=*
// @grant           none
// @license         MIT
// @version         2.0-050815
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    plusplus: true, nomen: true, browser: true, passfail: true, vars: true
    devel: true
*/

(function () {
    'use strict';

    /**
     * @class AdsFilter
     * @constructor
     */
    var AdsFilter = function () {
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
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'adsFilter';
        /**
         * @property stl
         * @type {String}
         */
        this.stl = 'cursor: pointer; margin-right: 3px; ';
        /**
         * @property styleNormal
         * @type {String}
         */
        this.styleNormal = this.stl + 'color: #808080';
        /**
         * @property styleBold
         * @type {String}
         */
        this.styleBold =  this.stl + 'color: #990000; font-weight: bold;';
        /**
         * @property spanContainer
         * @type {HTMLElement|null}
         */
        this.spanContainer = null;
    };

    /**
     * @lends AdsFilter.prototype
     */
    AdsFilter.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STNAME);
            return stData ? this.st.getItem(this.STNAME).split('|') : false;
        },

        /**
         * @method setData
         * @param   {Array}     data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data.join('|'));
        },

        /**
         * @method $
         * @param   {string}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
        },

        /**
         * @method setButton
         * @param   {String}        id
         * @param   {String}        value
         */
        setButton: function (id, value) {
            var button = this.doc.createElement('span');
            button.setAttribute('style', 'cursor: pointer; ' +
                    'color: #808080; margin-right: 3px;');
            button.id = id;
            button.innerHTML = value;
            this.spanContainer.appendChild(button);
        },

        /**
         * @method setFilter
         * @param   {NodeList}  trs
         * @param   {String}    type
         * @param   {String}    island
         */
        setFilter: function (trs, type, island) {
            var dataSt = this.getData(),
                i;

            switch (type) {
            case 'reset':
                if (!island) {
                    this.setData(['', '']);
                    this.$('islZ').
                        setAttribute('style', this.styleNormal);
                    this.$('islG').
                        setAttribute('style', this.styleNormal);
                    this.$('online').
                        setAttribute('style', this.styleNormal);
                }

                for (i = 3; i < trs.length; i++) {
                    trs[i].style.display = '';
                }

                break;

            case 'island':
                this.setFilter(trs, 'reset', 'flag');
                dataSt[0] = island === 'Z' ? '1' : '2';
                this.setData(dataSt);
                this.$('isl' + island).
                    setAttribute('style', this.styleBold);
                this.$('isl' + (island === 'G' ? 'Z' : 'G')).
                    setAttribute('style', this.styleNormal);

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('td:nth-child(4)').
                                innerHTML.indexOf(island) === -1) {
                        trs[i].style.display = 'none';
                    }
                }

                if (dataSt[1]) {
                    this.setFilter(trs, 'online', 'flag');
                }

                break;

            case 'online':
                if (!island) {
                    dataSt[1] = '1';
                    this.setData(dataSt);
                    this.$('online').
                        setAttribute('style', this.styleBold);
                }

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('a[style*="#999999"]')) {
                        trs[i].style.display = 'none';
                    }
                }

                break;

            default:
                break;
            }
        },

        /**
         * @method init
         */
        init: function () {
            if (!this.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'AdditionForNavigationBar\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            var table = this.doc.querySelector('table.wb' +
                    '[align="center"]');
            if (!table) {
                return;
            }

            var li = table.querySelector('li');
            if (!li) {
                return;
            }

            if (!this.getData()) {
                this.setData(['', '']);
            }

            this.spanContainer = this.doc.createElement('span');
            this.spanContainer.setAttribute('style', 'margin-left: 10px;');
            this.setButton('islZ', '[Z]');
            this.setButton('islG', '[G]');
            this.setButton('online', '[Online]');
            this.setButton('resetFilter', '[Сброс]');
            li.insertBefore(this.spanContainer, li.lastElementChild);
            if (this.spanContainer.previousElementSibling.
                    nodeName === 'BR') {
                li.removeChild(this.spanContainer.previousElementSibling);
            }

            var trs = table.querySelectorAll('tr'),
                _this = this;

            this.$('resetFilter').addEventListener('click', function () {
                _this.setFilter(trs, 'reset', null);
            }, false);

            this.$('islZ').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'Z');
            }, false);

            this.$('islG').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'G');
            }, false);

            this.$('online').addEventListener('click', function () {
                _this.setFilter(trs, 'online', null);
            }, false);


            var dataSt = this.getData();
            if (dataSt[0] === '1') {
                this.$('islZ').click();
            } else if (dataSt[0] === '2') {
                this.$('islG').click();
            }

            if (dataSt[1]) {
                this.$('online').click();
            }
        }
    };

    new AdsFilter().init();

}());

