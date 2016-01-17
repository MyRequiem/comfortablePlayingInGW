// ==UserScript==
// @name            GosEnergoAtomFilter
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Сортировка объектов по типу, островам и контролирующим синдикатам на странице недвижимости ГосЭнегоАтом (http://www.ganjawars.ru/info.realty.php?id=2). Выводит онлайны и уровни контролирующего синдиката и его союза.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GosEnergoAtomFilter/gosEnergoAtomFilter.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GosEnergoAtomFilter/gosEnergoAtomFilter.user.js
// @include         http://www.ganjawars.ru/info.realty.php?id=2
// @grant           none
// @license         MIT
// @version         3.01-170116
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, nomen: true
    plusplus: true, regexp: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'gosEnergoAtomFilter';
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

            stData = ['', '', ''];
            this.setData(stData);
            return stData;
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
     * @class GetPos
     * @constructor
     */
    var GetPos = function () {
        /**
         * @method init
         * @param   {HTMLElement}   obj
         * @return  {Object}
         */
        this.init = function (obj) {
            var _obj = obj,
                x = 0,
                y = 0;

            while (_obj) {
                x += _obj.offsetLeft;
                y += _obj.offsetTop;
                _obj = _obj.offsetParent;
            }

            return {x: x, y: y};
        };
    };

    /**
     * @class GosEnergoAtomFilter
     * @constructor
     */
    var GosEnergoAtomFilter = function () {
        /**
         * @property divRezult
         * @type {HTMLDivElement}
         */
        this.divRezult = general.doc.createElement('div');
        /**
         * @property trs
         * @type {Array}
         */
        this.trs = null;
        /**
         * @property strRez
         * @type {String}
         */
        this.strRez = '';

        /**
         * @method parseSyndPage
         * @param   {Object}    obj
         * @return  {Array}
         */
        this.parseSyndPage = function (obj) {
            var nameAndLvl = obj.querySelector('td[class="wb"][align="left"]' +
                        '[width="100%"]'),
                mass = [];

            mass[0] = nameAndLvl.firstElementChild.innerHTML;
            mass[1] = /^(\d+)/.exec(obj.querySelector('td[colspan="6"]' +
                        '[class="wb"][bgcolor="#d0eed0"]' +
                        '[align="center"]>b').innerHTML)[1];
            mass[2] = /(\d+) LVL/.exec(nameAndLvl.innerHTML)[1];

            return mass;
        };

        /**
         * @method saveSyndData
         * @param   {Object}    span
         * @param   {String}    url
         */
        this.saveSyndData = function (span, url) {
            var syndData = this.parseSyndPage(span);
            this.strRez += '<table><tr><td style="color: #FF0000;">(' +
                syndData[1] + ')</td><td><a target="_blank" href="' + url +
                '" style="color: #0000FF;">' + syndData[0] + '</a></td>' +
                '<td style="color: #008000;">[' + syndData[2] +
                ']</td></tr></table>';
        };

        /**
         * @method showRezult
         */
        this.showRezult = function () {
            var imgclose = general.doc.createElement('img');

            imgclose.src = general.imgPath + 'close.gif';
            imgclose.setAttribute('style', 'cursor: pointer; ' +
                    'margin: 0px 0px 3px 3px');
            this.divRezult.innerHTML = this.strRez;
            this.divRezult.appendChild(imgclose);

            var _this = this;
            imgclose.addEventListener('click', function () {
                _this.divRezult.style.visibility = 'hidden';
            }, false);
        };

        /**
         * @method getOnline
         * @param   {String|null}   url
         * @param   {Object}        img
         */
        this.getOnline = function (url, img) {
            if (!url) {
                var pos = new GetPos().init(img.parentNode.nextElementSibling);
                this.divRezult.style.left = pos.x + 20;
                this.divRezult.style.top = pos.y;
                this.divRezult.innerHTML = '<img style="margin: 3px 3px ' +
                    '3px 3px" src="' + general.imgPath + 'preloader.gif" />';
                this.divRezult.style.visibility = 'visible';

                this.strRez = '';
                url = img.parentNode.querySelector('a').href + '&page=online';
            }

            var _this = this;
            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    linkUnion;

                spanContent.innerHTML = xml.responseText;

                if (/online$/.test(url)) {
                    _this.saveSyndData(spanContent, url);
                    url = url.replace(/online/g, 'politics');
                    general.root.setTimeout(function () {
                        _this.getOnline(url, img);
                    }, 700);
                } else if (/politics/.test(url)) {
                    linkUnion = spanContent.querySelector('td[class="wb"]' +
                        '[style="padding:10px;"]>' +
                        'a[href*="/syndicate.php?id="]');
                    if (linkUnion) {
                        general.root.setTimeout(function () {
                            _this.getOnline(linkUnion + '&page=online&union=1',
                                    img);
                        }, 700);
                        return;
                    }

                    _this.showRezult();
                } else {
                    _this.saveSyndData(spanContent, url);
                    _this.showRezult();
                }
            }, function () {
                _this.getOnline(url, img);
            });
        };

        /**
         * @method preGetOnline
         * @param   {HTMLImageElement}  img
         * @return  {Function}
         */
        this.preGetOnline = function (img) {
            var _this = this;
            return function () {
                _this.getOnline(null, img);
            };
        };

        /**
         * @method setImgGetData
         */
        this.setImgGetData = function () {
            var first, img, i;
            for (i = 1; i < this.trs.length; i++) {
                first = this.trs[i].firstElementChild;
                if (/\/img\/synds\/\d+.gif/.test(first.innerHTML)) {
                    img = general.doc.createElement('img');
                    img.src = 'http://images.ganjawars.ru/i/home/wlog.gif';
                    img.setAttribute('style', 'cursor: pointer; ' +
                            'margin-left: 3px');
                    first.appendChild(img);
                    img.addEventListener('click',
                            this.preGetOnline(img), false);
                }
            }
        };

        /**
         * @method sortGosEnergoAtomBySynd
         */
        this.sortGosEnergoAtomBySynd = function () {
            var prnt = this.trs[0].parentNode,
                objs = {},
                syndID,
                i;

            for (i = 1; i < this.trs.length; i++) {
                syndID = /\/syndicate\.php\?id=(\d+)/.
                    exec(this.trs[i].innerHTML);
                syndID = syndID ? syndID[1] : 0;
                if (!objs[syndID]) {
                    objs[syndID] = [];
                }

                objs[syndID].push(this.trs[i].cloneNode(true));
                prnt.removeChild(this.trs[i]);
            }

            var synd, opt;
            for (synd in objs) {
                if (objs.hasOwnProperty(synd)) {
                    for (i = 0; i < objs[synd].length; i++) {
                        prnt.appendChild(objs[synd][i]);
                    }

                    opt = general.doc.createElement('option');
                    opt.value = synd;
                    opt.innerHTML = +synd ? '#' + synd : 'Ничейки';
                    general.$('selectSynd').appendChild(opt);
                }
            }

            this.getTrsTable();
            this.setImgGetData();
        };

        /**
         * @method resetGosEnergoAtom
         */
        this.resetGosEnergoAtom = function () {
            var i;

            for (i = 1; i < this.trs.length; i++) {
                this.trs[i].style.display = '';
            }
        };

        /**
         * @method sortGosEnergoAtom
         */
        this.sortGosEnergoAtom = function () {
            var stData = general.getData(),
                val1 = stData[0],
                val2 = stData[1],
                val3 = stData[2],
                i;

            this.resetGosEnergoAtom();
            if (!val1 && !val2 && !val3) {
                return;
            }

            if (val2) {
                val2 = val2 === '1' ? 'Электростанция' : 'Урановый рудник';
            }

            for (i = 1; i < this.trs.length; i++) {
                if (val1 && this.trs[i].innerHTML.
                        indexOf('[' + val1 + ']') === -1) {
                    this.trs[i].style.display = 'none';
                }

                if (val2 && this.trs[i].innerHTML.indexOf(val2) === -1) {
                    this.trs[i].style.display = 'none';
                }

                if (val3) {
                    if ((val3 === '0' &&
                        (/\/syndicate\.php\?id=\d+/.
                            test(this.trs[i].innerHTML))) ||
                                (+val3 && this.trs[i].innerHTML.
                                    indexOf('/img/synds/' + val3 +
                                        '.gif') === -1)) {
                        this.trs[i].style.display = 'none';
                    }
                }
            }
        };

        /**
         * @method selectChangeHandler
         * @param    {Object}   sel
         */
        this.selectChangeHandler = function (sel) {
            var stData = general.getData(),
                stInd = sel.id === 'selectIsland' ? 0 :
                            (sel.id === 'selectObject' ? 1 : 2),
                val = sel.value;

            stData[stInd] = stInd !== 2 ? (val === '0' ? '' : val) :
                    (val === 'all' ? '' : val);
            general.setData(stData);
            this.sortGosEnergoAtom();
        };

        /**
         * @method getTrsTable
         * @return  {Array}
         */
        this.getTrsTable = function () {
            this.trs = general.doc.querySelector('table[border="0"]' +
                    '[cellpadding="3"][cellspacing="0"][class="wb"]' +
                    '[bgcolor="#ffffff"][align="center"]').
                        querySelectorAll('tr');
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'GosEnergoAtomFilter:\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            var divSort = general.doc.createElement('div');
            divSort.setAttribute('style', 'position: absolute; top: 100px; ' +
                    'left: 20px;');
            divSort.innerHTML = '<table><tr><td>Остров:</td>' +
                '<td><select id="selectIsland"><option value="0">Все</option>' +
                '<option value="Z">[Z]</option><option value="G">[G]</option>' +
                '<option value="S">[S]</option></select></td></tr>' +
                '<tr><td>Объект:</td><td><select id="selectObject" ' +
                'style="margin-top: 5px;"><option value="0">Все</option>' +
                '<option value="1">ЭС</option><option value="2">Уран</option>' +
                '</select></td></tr><tr><td>Синдикат:</td><td>' +
                '<select id="selectSynd" style="margin-top: 5px;">' +
                '<option value="all">Все</option></select></td></tr></table>';
            general.doc.body.appendChild(divSort);

            this.divRezult.setAttribute('style', 'position: absolute; ' +
                    'visibility: hidden; border: solid 1px #339933; ' +
                    'border-radius: 5px; background-color: #D0EED0; ' +
                    'top:0; left:0;');
            general.doc.body.appendChild(this.divRezult);

            var stData = general.getData(),
                _this = this;

            var isl = general.$('selectIsland');
            isl.addEventListener('change', function () {
                _this.selectChangeHandler(this);
            }, false);

            var obj = general.$('selectObject');
            obj.addEventListener('change', function () {
                _this.selectChangeHandler(this);
            }, false);

            var synd = general.$('selectSynd');
            synd.addEventListener('change', function () {
                _this.selectChangeHandler(this);
            }, false);

            this.getTrsTable();
            this.sortGosEnergoAtomBySynd();

            isl.value = stData[0] || '0';
            obj.value = stData[1] || '0';
            synd.value = stData[2] || 'all';
            this.sortGosEnergoAtom();
        };
    };

    new GosEnergoAtomFilter().init();

}());

