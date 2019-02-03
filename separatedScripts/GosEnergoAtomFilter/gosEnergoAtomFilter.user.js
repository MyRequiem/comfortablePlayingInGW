// ==UserScript==
// @name            GosEnergoAtomFilter
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Сортировка объектов по типу, островам и контролирующим синдикатам на странице недвижимости ГосЭнегоАтом [http://www.gwars.ru/info.realty.php?id=2]
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GosEnergoAtomFilter/gosEnergoAtomFilter.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GosEnergoAtomFilter/gosEnergoAtomFilter.user.js
// @include         http://www.gwars.ru/info.realty.php?id=2
// @grant           none
// @license         MIT
// @version         4.02-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    regexp: true, devel: true
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
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'gosEnergoAtomFilter';
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
     * @class GosEnergoAtomFilter
     * @constructor
     */
    var GosEnergoAtomFilter = function () {
        /**
         * @property trs
         * @type {Array}
         */
        this.trs = null;

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

            switch (val2) {
            case '1':
                val2 = 'Электростанция';
                break;

            case '2':
                val2 = 'Урановый рудник';
                break;

            case '3':
                val2 = 'Урановый рудник</a>&nbsp;[2]';
                break;

            case '4':
                val2 = 'Урановый рудник</a>&nbsp;[3]';
                break;

            default:
                val2 = false;
                break;
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
                '<option value="3">Уран [2]</option><option value="4">' +
                'Уран [3]</option></select></td></tr><tr><td>Синдикат:</td>' +
                '<td><select id="selectSynd" style="margin-top: 5px;">' +
                '<option value="all">Все</option></select></td></tr></table>';
            general.doc.body.appendChild(divSort);

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

    var mainObj = general;
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new GosEnergoAtomFilter().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();
}());

