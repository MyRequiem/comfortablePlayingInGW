// ==UserScript==
// @name            HistorySms
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     При просмотре входящего/исходящего сообщения устанавливает ссылку для вывода предыдущей переписки с персонажем.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/HistorySms/historySms.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/HistorySms/historySms.user.js
// @include         http://www.ganjawars.ru/sms-read.php?type=*
// @grant           none
// @license         MIT
// @version         2.02-110915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, plusplus: true, nomen: true
    devel: true
*/

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
     * @class UrlEncode
     * @constructor
     */
    var UrlEncode = function () {
        /**
         * @method init
         * @param   {String}    str
         * @return  {String}
         */
        this.init = function (str) {
            var mass = {1040: 192, 1041: 193, 1042: 194, 1043: 195, 1044: 196,
                    1045: 197, 1046: 198, 1047: 199, 1048: 200, 1049: 201,
                    1050: 202, 1051: 203, 1052: 204, 1053: 205, 1054: 206,
                    1055: 207, 1056: 208, 1057: 209, 1058: 210, 1059: 211,
                    1060: 212, 1061: 213, 1062: 214, 1063: 215, 1064: 216,
                    1065: 217, 1066: 218, 1067: 219, 1068: 220, 1069: 221,
                    1070: 222, 1071: 223, 1072: 224, 1073: 225, 1074: 226,
                    1075: 227, 1076: 228, 1077: 229, 1078: 230, 1079: 231,
                    1080: 232, 1081: 233, 1082: 234, 1083: 235, 1084: 236,
                    1085: 237, 1086: 238, 1087: 239, 1088: 240, 1089: 241,
                    1090: 242, 1091: 243, 1092: 244, 1093: 245, 1094: 246,
                    1095: 247, 1096: 248, 1097: 249, 1098: 250, 1099: 251,
                    1100: 252, 1101: 253, 1102: 254, 1103: 255, 1025: 168,
                    1105: 184, 8470: 185},
                result = '',
                code,
                i;

            for (i = 0; i < str.length; i++) {
                code = str.charCodeAt(i);
                code = mass[code] || code;

                if (code < 16) {
                    result += '%0' + code.toString(16);
                } else {
                    result += '%' + code.toString(16);
                }
            }

            return result;
        };
    };

    /**
     * @class HistorySms
     * @constructor
     */
    var HistorySms = function () {
        /**
         * @property nik
         * @type {String|null}
         */
        this.nik = null;
        /**
         * @property uncodeNik
         * @type {String|null}
         */
        this.uncodeNik = null;

        /**
         * @property spanContent
         * @type {Object}
         */
        this.spanContent = general.doc.createElement('span');
        /**
         * @property sms
         * @type {Array}
         */
        this.sms = [];
        /**
         * @property numberSms
         * @type {int}
         */
        this.numberSms = 3;

        /**
         * @method sortMess
         * @return   {int}
         */
        this.sortMess = function () {
            this.sms.sort(function (a, b) {
                var ret;

                if (a.id < b.id) {
                    ret = 1;
                } else if (a.id > b.id) {
                    ret = -1;
                } else {
                    ret = 0;
                }

                return ret;
            });
        };

        /**
         * @method createDivSms
         * @return   {Object}
         */
        this.createDivSms = function () {
            var target = general.doc.
                    querySelector('div[style*="overflow:auto"]'),
                divSms = general.doc.createElement('div');

            divSms.setAttribute('name', 'historySms');
            divSms.setAttribute('style', 'font-size: 8pt; margin-bottom: 7px;');
            target.insertBefore(divSms, target.firstChild);

            return divSms;
        };

        /**
         * @method showOfSyndLinks
         */
        this.showOfSyndLinks = function () {
            var mass = [],
                i;

            for (i = 0; i < this.sms.length; i++) {
                mass.push(this.sms[i].ofSyndLink);
            }

            this.createDivSms().innerHTML = '<span style="color: #FF0000;">' +
                'Ссылки на сообщения, доступные для официальных синдикатов:' +
                '</span><div style="color: #000000;">' +
                mass.reverse().join('<br>') + '</div><hr>';
            general.$('showOfSyndLinks').style.display = 'none';
        };

        /**
         * @method showSms
         */
        this.showSms = function () {
            var i;

            for (i = 0; i < this.sms.length; i++) {
                this.createDivSms().innerHTML = this.sms[i].mess +
                    (!i ? '<hr>' : '');
            }

            general.$('showOfSyndLinks').style.display = '';
            general.$('counter').innerHTML = '';
            general.$('preloader').style.display = 'none';
            general.$('showHistory').removeAttribute('on');
        };

        /**
         * @method nextAjaxQuery
         * @param    {Boolean}  outbox
         */
        this.nextAjaxQuery = function (outbox) {
            var _this = this;

            general.root.setTimeout(function () {
                _this.showHistory(outbox ? 0 : 1, 0, outbox ? null : 1);
            }, 700);
        };

        /**
         * @method showHistory
         * @param   {int}   id
         * @param   {int}   id1
         * @param   {int}   id2
         */
        this.showHistory = function (id, id1, id2) {
            var counter = general.$('counter'),
                url;

            if (id2 !== null) {
                counter.innerHTML = !id ? 'входящие...' : 'исходящие...';
                url = 'http://www.ganjawars.ru/sms.php?page=' + id +
                    '&page_id1=' + (!id ? id1 : 0) + '&page_id2=' +
                    (id ? id1 : 0) + '&search=' + this.uncodeNik;
            } else {
                if (!id) {
                    this.sortMess();
                }

                counter.innerHTML = (id + 1) + '/' + this.sms.length;
                url = this.sms[id].href;
            }

            var _this = this;
            new AjaxQuery().init(url, function (xml) {
                _this.spanContent.innerHTML = xml.responseText;

                if (id2 !== null) {
                    var linksSms = _this.spanContent.
                            querySelectorAll('td[width="100%"]>' +
                                'a[href*="/sms-read.php?type="]'),
                        outbox = id2 === 1;

                    if (!linksSms.length) {
                        _this.nextAjaxQuery(outbox);
                        return;
                    }

                    var color = '<span style="font-weight: bold; color: #' +
                                    (outbox ? '008000' : 'AC4311') + ';">',
                        allCountSms = !outbox ?
                                _this.numberSms : _this.numberSms * 2,
                        i;

                    for (i = 0; i < linksSms.length; i++) {
                        _this.sms.push({
                            id: +(/&id=(\d+)/.exec(linksSms[i].href)[1]),
                            href: linksSms[i].href,
                            mess: color + (outbox ? 'Я' : _this.nik),
                            ofSyndLink: ''
                        });

                        if ((allCountSms === _this.sms.length) ||
                                // последняя ссылка на странице,
                                // но ссылок меньше 30 => больше страниц нет
                                // (по 30 сообщений на одной странице)
                                (i === linksSms.length - 1 &&
                                    linksSms.length < 30)) {
                            _this.nextAjaxQuery(outbox);

                            return;
                        }
                    }

                    general.root.setTimeout(function () {
                        id1++;
                        _this.showHistory(id, id1, id2);
                    }, 700);
                } else {
                    var time = _this.spanContent.querySelector('td[width=' +
                            '"100%"]>a[href*="/info.php?id="]:first-child').
                                nextSibling.nodeValue;

                    _this.sms[id].mess += time + ':</span><br>' +
                        _this.spanContent.querySelector('div[style*=' +
                                '"overflow:auto"]').innerHTML.
                                    replace(/^(\s|<br>)*|(\s|<br>)*$/g, '');
                    _this.sms[id].ofSyndLink = _this.spanContent.
                        querySelector('div[align="center"]>' +
                                'a[href*="/sms-pub.php?type="]').href;

                    id++;
                    if (!_this.sms[id]) {
                        _this.showSms();
                        return;
                    }

                    general.root.setTimeout(function () {
                        _this.showHistory(id, 0, null);
                    }, 700);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.showHistory(id, id1, id2);
                }, 700);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('td[width="100%"]>' +
                    'a[href*="/info.php?id="]:first-child'),
                _this = this;

            target.parentNode.innerHTML += '<span id="showHistory" ' +
                'style="color: #008000; cursor: pointer; margin-left: 10px;">' +
                'История</span> <input id="countSms" type="text" ' +
                'maxlength="5" style="width: 45px;" value="' + this.numberSms +
                '" title="Количество исходящих сообщений" /> ' +
                '<span id="preloader" style="margin: 0 10px 0 10px; ' +
                'display: none;"><img src="' + general.imgPath +
                'preloader.gif" /></span><span id="counter"></span>' +
                '<span id="showOfSyndLinks" style="cursor: pointer; ' +
                'display: none; text-decoration: underline;">ссылки</span>';

            general.$('showOfSyndLinks').addEventListener('click', function () {
                _this.showOfSyndLinks();
            }, false);

            general.$('countSms').addEventListener('keypress', function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13) {
                    general.$('showHistory').click();
                }
            }, false);

            this.nik = target.querySelector('b').innerHTML;
            this.uncodeNik = new UrlEncode().init(this.nik);

            general.$('showHistory').addEventListener('click', function () {
                var lnk = this;
                if (lnk.getAttribute('on')) {
                    return;
                }

                _this.numberSms = +general.$('countSms').value;
                if (isNaN(_this.numberSms) || _this.numberSms < 1) {
                    alert('Не верно введено количество исходящих сообщений');
                    return;
                }

                lnk.setAttribute('on', '1');
                // удаляем уже выведенные сообщения
                var divHistory = general.doc.
                        querySelectorAll('div[name="historySms"]'),
                    i;

                for (i = 0; i < divHistory.length; i++) {
                    divHistory[i].parentNode.removeChild(divHistory[i]);
                }

                _this.sms = [];
                general.$('preloader').style.display = '';
                general.$('showOfSyndLinks').style.display = 'none';
                _this.showHistory(0, 0, 0);
            }, false);
        };
    };

    new HistorySms().init();

}());

