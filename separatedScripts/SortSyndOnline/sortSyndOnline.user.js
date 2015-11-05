// ==UserScript==
// @name            SortSyndOnline
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Сортировка онлайна синдиката и союза по идущим боям, вывод онлайна союзного синдиката.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndOnline/sortSyndOnline.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndOnline/sortSyndOnline.user.js
// @include         http://www.ganjawars.ru/syndicate.php?id=*
// @grant           none
// @license         MIT
// @version         1.12-051115
// @author          MyRequiem, идея: z0man, VSOP_juDGe
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, plusplus: true, nomen: true
*/

(function () {
    'use strict';

    // ==================== НАСТРОЙКИ ==========================
    // 1 - да, 0 - нет
    var showSortBattles = 1,    // сортировать по боям
        showUnionOnline = 1,    // показывать онлайн союза
        sortMainAndUnion = 0;   // сортировать вместе с союзом (установка в 1
                                // автоматически установит все настройки в 1)
    // ================= КОНЕЦ НАСТРОЕК ========================

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
     * @class SortSyndOnline
     * @constructor
     */
    var SortSyndOnline = function () {
        /**
         * @property trs
         * @type {Array|null}
         */
        this.trs = null;

        /**
         * @property prnt
         * @type {Object|null}
         */
        this.prnt = null;

        /**
         * @method createTitle
         * @param    {String}   str
         * @return   {Element}
         */
        this.createTitle = function (str) {
            var tr = general.doc.createElement('tr');
            tr.innerHTML = '<td colspan="5" class="wb" ' +
                'bgcolor="#D0EED0" style="text-align: ' +
                'center;"><span style="font-weight: bold;">' +
                str + '</span></td>';

            return tr;
        };

        /**
         * @method getTrs
         * @param   {Object}    obj
         */
        this.getTrs = function (obj) {
            var tbl = obj.querySelector('center+br+table');
            return tbl ? tbl.querySelectorAll('tr') : [];
        };

        /**
         * @method getUnionOnline
         * @param    {String}   URL
         */
        this.getUnionOnline = function (URL) {
            var url = URL || general.loc + '&page=politics',
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                if (/politics/.test(url)) {
                    var unionLink = spanContent.
                            querySelector('td>br:first-child+b+' +
                                'a[href*="/syndicate.php?id="]');
                    if (unionLink) {
                        general.root.setTimeout(function () {
                            _this.getUnionOnline(unionLink + '&page=online');
                        }, 700);
                    } else if (sortMainAndUnion) {
                        _this.sortBattles();
                    }
                } else {
                    var trs = _this.getTrs(spanContent);
                    if (trs.length) {
                        _this.prnt.appendChild(_this.createTitle('<a target=' +
                            '"_blank" href="' + url + '">Союз</a>'));

                        var i;
                        for (i = 0; i < trs.length; i++) {
                            _this.prnt.appendChild(trs[i]);
                        }
                    }

                    if (sortMainAndUnion) {
                        _this.trs = _this.getTrs(general.doc);
                        _this.sortBattles();
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getUnionOnline(URL);
                }, 700);
            });
        };

        /**
         * @method sortBattles
         */
        this.sortBattles = function () {
            var reg = /\/warlog\.php\?bid=(\d+)/;
            if (reg.test(this.prnt.innerHTML)) {
                var battles = {},
                    bid,
                    i;

                for (i = 1; i < this.trs.length; i++) {
                    bid = reg.exec(this.trs[i].innerHTML);
                    if (bid) {
                        if (!battles[bid[1]]) {
                            battles[bid[1]] = [];
                        }

                        battles[bid[1]].push(this.trs[i].cloneNode(true));
                        this.prnt.removeChild(this.trs[i]);
                    }
                }

                var before = this.prnt.querySelectorAll('tr')[1],
                    countBattles = 1,
                    btl,
                    tr;

                for (btl in battles) {
                    if (battles.hasOwnProperty(btl)) {
                        tr = this.createTitle('Бой ' + countBattles);
                        this.prnt.insertBefore(tr, before);
                        for (i = 0; i < battles[btl].length; i++) {
                            this.prnt.insertBefore(battles[btl][i],
                                tr.nextElementSibling);
                        }

                        countBattles++;
                    }
                }

                this.prnt.insertBefore(this.createTitle('&nbsp;'), before);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page=online$/.test(general.loc)) {
                this.trs = this.getTrs(general.doc);
                if (!this.trs[0]) {
                    return;
                }

                this.prnt = this.trs[0].parentNode;

                if (sortMainAndUnion) {
                    this.getUnionOnline(null);
                    return;
                }

                if (showSortBattles) {
                    this.sortBattles();
                }

                if (showUnionOnline) {
                    this.getUnionOnline(null);
                }

                general.doc.body.appendChild(general.doc.createElement('br'));
            }
        };
    };

    new SortSyndOnline().init();

}());

