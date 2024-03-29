// ==UserScript==
// @name            HousHealth
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выводит сообщение после боя, если персонаж находится не в секторе со своим домом и его здоровье менее 80%.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/HousHealth/housHealth.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/HousHealth/housHealth.user.js
// @include         https://*gwars*/warlog.php?bid=*
// @include         https://*gwars*/b0/*
// @grant           none
// @license         MIT
// @version         2.11-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, nomen: true,
    plusplus: true, devel: true
*/

/*eslint-env browser */
/*eslint indent: ['error', 4], linebreak-style: ['error', 'unix'],
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
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'housHealth';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property domain
         * @type {String}
         */
        this.domain = this.doc.domain;
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
            this.st.setItem(this.STORAGENAME, data.join('|'));
        },

        /**
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STORAGENAME);
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
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method init
         * @param   {String}        url
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.root.console.log('Error create xmlHttpRequest !!!');
                return;
            }

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
    };

    /**
     * @class HousHealth
     * @constructor
     */
    var HousHealth = function () {
        /**
         * @method showSector
         * @param   {String}    url
         * @param   {string}    sector
         */
        this.showSector = function (url, sector) {
            var _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    cssSelector;

                spanContent.innerHTML = xml.responseText;

                if (!sector) {    // ищем сектор перса
                    cssSelector = 'b+a[href*="/map.php?s"]';
                    sector = spanContent.querySelector(cssSelector).innerHTML;
                    general.root.setTimeout(function () {
                        // на недвижимость перса
                        _this.showSector('https://' + general.domain +
                            '/info.realty.php?id=' + general.myID, sector);
                    }, 1000);
                } else {
                    cssSelector = 'table.withborders';
                    var table = spanContent.querySelector(cssSelector);

                    if (table) {
                        var trs = table.querySelectorAll('tr'),
                            td,
                            i;

                        for (i = 1; i < trs.length; i++) {
                            td = trs[i].firstElementChild;
                            if (/Частный дом/.test(td.innerHTML) &&
                                    td.nextElementSibling.innerHTML.
                                        indexOf(sector) !== -1) {
                                return;
                            }
                        }
                    }

                    alert('Вы находитесь не в секторе с домиком !');
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.showSector(url, sector);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/b0/.test(general.loc)) {
                general.setData(['1']);
                return;
            }

            if (general.getData()[0]) {
                general.setData([]);

                // если здоровье менее 80%
                if (general.doc.querySelector('#hpheader>font')) {
                    this.showSector('https://' + general.domain +
                        '/info.php?id=' + general.myID, '');
                }
            }
        };
    };

    new HousHealth().init();

}());

