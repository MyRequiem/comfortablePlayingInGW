// ==UserScript==
// @name            CalculateSyndLvl
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Расчет ожидаемого уровня синдиката.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CalculateSyndLvl/calculateSyndLvl.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CalculateSyndLvl/calculateSyndLvl.user.js
// @include         http://www.gwars.ru/syndicate.php?id=*
// @grant           none
// @license         MIT
// @version         1.13-170918
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true */

/*eslint-env browser */
/*eslint no-useless-escape: 'warn', linebreak-style: ['error', 'unix'],
    quotes: ['error', 'single'], semi: ['error', 'always'],
    eqeqeq: 'error', curly: 'error'
*/

/*jscs:disable requireMultipleVarDecl, requireVarDeclFirst */
/*jscs:disable disallowKeywords, disallowDanglingUnderscores */
/*jscs:disable validateIndentation */


// Уровень синдиката обновляется 3 раза в месяц: 6, 17 и 28.
//
// Расчет уровня:
// Итоговый_опыт = 5/3 * Боевой_опыт + (2.4 * Экономический_опыт)
//
// Таблица рейтинга синдикатов:
//  http://www.gwars.ru/srating.php
//  EXP/опыт = экономический/боевой
//
//  Расчетный уровень  Итоговый опыт
//  ------------------  -------------
//          0           0        - 50000
//          1           50000    - 150000
//          2           150000   - 250000
//          3           250000   - 350000
//          4           350000   - 450000
//          5           450000   - 550000
//          6           550000   - 650000
//          7           650000   - 750000
//          8           750000   - 850000
//          9           850000   - 950000
//          10          950000   - 1350000
//          11          1350000  - 1750000
//          12          1750000  - 2150000
//          13          2150000  - 2550000
//          14          2550000  - 2950000
//          15          2950000  - 3350000
//          16          3350000  - 3750000
//          17          3750000  - 4150000
//          18          4150000  - 4550000
//          19          4550000  - 4950000
//          20          4950000  - 6550000
//          21          6550000  - 8150000
//          22          8150000  - 9750000
//          23          9750000  - 11350000
//          24          11350000 - 12950000
//          25          12950000 - 14550000
//          26          14550000 - 16150000
//          27          16150000 - 17750000
//          28          17750000 - 19350000
//          29          19350000 - 20950000
//
// Если выполняется условие:
//      OLD- NEW > 2 (OLD - уровень за прошлый период, NEW - расчётный уровень),
// то вычисляется добавка за понижение уровня:
//      D = (OLD - NEW)/2 (округление вверх)
// Итоговый уровень = расчётный уровень + D

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
     * @class CalculateSyndLvl
     * @constructor
     */
    var CalculateSyndLvl = function () {
        /**
         * @property syndID
         * @type {String}
         */
        this.syndID = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property spanContent
         * @type {Element}
         */
        this.spanContent = general.doc.createElement('span');
        /**
         * @property lvls
         * @type {Array}
         */
        this.lvls = [50000, 150000, 250000, 350000, 450000, 550000, 650000,
            750000, 850000, 950000, 1350000, 1750000, 2150000, 2550000, 2950000,
            3350000, 3750000, 4150000, 4550000, 4950000, 6550000, 8150000,
            9750000, 11350000, 12950000, 14550000, 16150000, 17750000, 19350000,
            20950000];
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1500;

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.ajax = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
                xmlHttpRequest.abort();
            }, 10000);

            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState === 4) {
                    clearTimeout(timeout);
                    if (xmlHttpRequest.status === 200) {
                        onsuccess(xmlHttpRequest);
                    } else {
                        onfailure();
                    }
                }
            };
        };

        /**
         * @method preScan
         * @param   {Boolean}   mode
         */
        this.preScan = function (mode) {
            general.$('calcSyndLvl').style.color = mode ? '#AAAAAA' : '#004400';
            general.$('preloader').style.display = mode ? '' : 'none';
        };

        /**
         * @method scan
         * @param   {int}   ind
         */
        this.scan = function (ind) {
            var url = 'http://www.gwars.ru/srating.php?rid=0&page_id=' +
                    ind,
                pageCounter = general.$('pageCounter'),
                _this = this;

            pageCounter.innerHTML = '(' + (ind + 1) + ')';

            this.ajax(url, function (xml) {
                _this.spanContent.innerHTML = xml.responseText;
                var tbl = _this.spanContent.querySelector('table' +
                    '[class="bordersupdown"][width="600"]');

                // нет таблицы или таблица пустая, выходим
                if (!tbl || !tbl.
                        querySelector('td>a[href*="/syndicate.php?id="]')) {
                    pageCounter.innerHTML = 'синдикат в <a target="_blank" ' +
                        'href="http://www.gwars.ru/srating.php?rid=0&' +
                        'page_id=0">рейтинге</a> не найден';
                    _this.preScan(false);
                    return;
                }

                var synd = tbl.querySelector('td>' +
                        'a[href*="/syndicate.php?id=' + _this.syndID + '"]');
                if (synd) {
                    var tds = synd.parentNode.parentNode.querySelectorAll('td'),
                        currLvl = +tds[3].querySelector('font').innerHTML,
                        current = tds[4].innerHTML.replace(/k/g, '000').
                            replace(/,/g, '').split(' / '),
                        eExp = +/\d+/.exec(current[0])[0],
                        bExp = +/\d+/.exec(current[1])[0],
                        experience = 5 / 3 * bExp + (2.4 * eExp),
                        syndLvl,
                        i;

                    for (i = 0; i < _this.lvls.length; i++) {
                        if (experience < _this.lvls[i]) {
                            syndLvl = i;
                            break;
                        }
                    }

                        // разница текущего и рассчитанного уровня
                    var diff = currLvl - syndLvl,
                        // добавка за понижение уровня
                        add = 0;

                    if (diff > 2) {
                        add = Math.ceil(diff / 2);
                        syndLvl += add;
                    }

                    pageCounter.innerHTML = '<a target="_blank" ' +
                        'style="color: #990000; font-weight: bold;" ' +
                        'href="' + url + '">' + syndLvl + '</a>' +
                        (add ? '(<span style="color: #FF0000;">+' +
                            add + '</span>)' : '') +
                        ' (<a target="_blank" href="http://www.ganjawiki.ru/' +
                        'Боевой_синдикат#.D0.A3.D0.A1">' +
                        Math.round(experience) + '</a>)' +
                        '<span style="margin-left: 5px; color: #555555;">' +
                        tds[5].innerHTML.replace(/\s+/g, '') + ' >>> ' +
                        tds[4].innerHTML.replace(/\s+/g, '') + '</span>';
                    _this.preScan(false);
                } else {
                    general.root.setTimeout(function () {
                        _this.scan(ind + 1);
                    }, _this.tm);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.scan(ind);
                }, _this.tm);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('td[class="greengreenbg"]' +
                    '[colspan="3"]');

            if (!target) {
                return;
            }

            var span = general.doc.createElement('span');
            span.innerHTML = '<span id="calcSyndLvl" ' +
                'style="margin-left: 10px; cursor: pointer; color: #004400; ' +
                'text-decoration: underline;">Уровень</span>' +
                '<img id="preloader" src="' + general.imgPath +
                'preloader.gif" style="margin-left: 10px; display: none;" />' +
                '<span id="pageCounter" style="margin-left: 10px;"></span>';
            target.insertBefore(span, target.querySelector('br'));

            var _this = this;
            general.$('calcSyndLvl').addEventListener('click', function () {
                if (general.$('preloader').style.display) {
                    _this.preScan(true);
                    _this.scan(0);
                }
            }, false);
        };
    };

    new CalculateSyndLvl().init();

}());

