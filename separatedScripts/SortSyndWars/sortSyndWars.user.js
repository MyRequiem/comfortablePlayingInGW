// ==UserScript==
// @name            SortSyndWars
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Сортировка заявок на странице нападений по острову, типу недвиги, номеру синдиката. Вывод общего количества боев и боев по синдикатам.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndWars/sortSyndWars.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SortSyndWars/sortSyndWars.user.js
// @include         http://www.ganjawars.ru/wargroup.php?war=attacks*
// @grant           none
// @license         MIT
// @version         2.20-240417
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true,
    nomen: true, continue: true, devel: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'sortSyndWars';
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

            stData = ['', '', '', ''];
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
     * @class SortSyndWars
     * @constructor
     */
    var SortSyndWars = function () {
        /**
         * @property divCountAll
         * @type {HTMLDivElement|null}
         */
        this.divCountAll = null;
        /**
         * @property trs
         * @type {Array|null}
         */
        this.trs = null;

        /**
         * @method showSyndData
         * @param   {Array}     obj
         */
        this.showSyndData = function (obj) {
            var str = '<table>',
                i;

            for (i = 0; i < obj.length; i++) {
                str += '<tr><td style="text-align: right;">' +
                    '<a target="_blank" href="http://www.ganjawars.ru/' +
                    'syndicate.php?id=' + obj[i].synd + '&page=online">' +
                    '<img src="http://images.ganjawars.ru/img/synds/' +
                    obj[i].synd + '.gif" />#' + obj[i].synd + '</a>';

                if (obj[i].union) {
                    str += ', <a target="_blank" href="http://www.ganjawars.' +
                        'ru/syndicate.php?id=' + obj[i].union +
                        '&page=online"><img src=http://images.ganjawars.ru/' +
                        'img/synds/' + obj[i].union + '.gif />#' +
                        obj[i].union + '</a>';
                }

                str += '</td><td style="color: #0000FF; padding-left: 10px;">' +
                    obj[i].count + '</td></tr>';
            }

            str += '</table>';
            this.divCountAll.innerHTML = str;
        };

        /**
         * @method findObj
         * @param   {Array}     objs
         * @param   {Array}     mass
         * @return  {Boolean}
         */
        this.findObj = function (objs, mass) {
            var i;
            for (i = 0; i < objs.length; i++) {
                if (objs[i].synd === mass[0] || objs[i].union === mass[0]) {
                    objs[i].count++;
                    return true;
                }
            }

            return false;
        };

        /**
         * @method sortSyndWars
         */
        this.sortSyndWars = function () {
            var stData = general.getData(),
                reg1,
                reg2;

            switch (stData[0]) {
            case '1':
                reg1 = />\[Z\]<\/b>/;
                break;
            case '2':
                reg1 = />\[G\]<\/b>/;
                break;
            case '3':
                reg1 = />\[S\]<\/b>/;
                break;
            default:
                break;
            }

            switch (stData[1]) {
            case '1':
                reg2 = /Электростанция/i;
                break;
            case '2':
                reg2 = /Урановый рудник/i;
                break;
            case '3':
                reg2 = /контроль портов/i;
                break;
            case '4':
                reg2 = /ферма|плантация|завод|база|Фабрика|лаборатория|цех/i;
                break;
            default:
                break;
            }

            var count = 0,
                objs = [],
                clss,
                txt,
                num,
                ob,
                a,
                r,
                b,
                j,
                i;

            for (i = 1; i < this.trs.length; i++) {
                // делаем строку видимой
                this.trs[i].style.display = '';

                txt = this.trs[i].cells[1].innerHTML;

                if (reg1 || reg2) {
                    // в боях за контроль портов острова нет
                    if (stData[1] === '3') {
                        reg1 = null;
                    }

                    if ((reg1 && !reg1.test(txt)) ||
                            (reg2 && !reg2.test(txt))) {
                        this.trs[i].style.display = 'none';
                        continue;
                    }
                }

                if (stData[2] && this.trs[i].cells[2].innerHTML.
                        indexOf(stData[2]) === -1) {
                    this.trs[i].style.display = 'none';
                    continue;
                }

                if (stData[3] && !(/\[вступить\]/.
                            test(this.trs[i].lastElementChild.innerHTML))) {
                    this.trs[i].style.display = 'none';
                    continue;
                }

                count++;
                a = this.trs[i].cells[2].
                        querySelectorAll('a[href*="/syndicate.php?id="]');

                r = [];
                b = [];
                for (j = 0; j < a.length; j++) {
                    clss = a[j].getAttribute('class');
                    num = /\d+/.exec(a[j].innerHTML);
                    if (!(/^(r|b)$/.test(clss)) || !num) {
                        continue;
                    }

                    if (clss === 'r') {
                        r[r.length] = num[0];
                    } else {
                        b[b.length] = num[0];
                    }
                }

                if (r.length && !this.findObj(objs, r)) {
                    ob = {synd: r[0], union: 0, count: 1};
                    if (r.length > 1) {
                        ob.union = r[1];
                    }

                    objs[objs.length] = ob;
                }

                if (b.length && !this.findObj(objs, b)) {
                    ob = {synd: b[0], union: 0, count: 1};
                    if (b.length > 1) {
                        ob.union = b[1];
                    }

                    objs[objs.length] = ob;
                }
            }

            general.$('countLines').innerHTML = '[' + count + ']';
            this.showSyndData(objs);
        };

        /**
         * @method setSortSyndWarData
         * @param    {Object}   _this
         */
        this.setSortSyndWarData = function (_this) {
            var stData = general.getData(),
                ind = +(/\d/.exec(_this.id));

            stData[ind] = ind !== 3 ? _this.value : (_this.checked ? '1' : '');
            stData[ind] = stData[ind] === '0' ? '' : stData[ind];
            general.setData(stData);
            this.sortSyndWars();
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'SortSyndWars:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var warTable = general.doc.querySelector('td[class="txt"]>' +
                        'table[border="0"][cellpadding="5"][ cellspacing="1"]');
            // таблица с заявками не найдена
            if (!warTable) {
                return;
            }

            // выравниваем таблицу с заявками по центру
            warTable.parentNode.setAttribute('align', 'center');

            // вставляем контейнер настроек
            var mainPanel = general.doc.createElement('span');
            mainPanel.setAttribute('style', 'margin-right: 20px;');
            mainPanel.innerHTML = 'Остров: ' +
                '<select id="selIsl0" style="border: 1px solid #339933;">' +
                    '<option value="0" >Все</option>' +
                    '<option value="1">[Z]</option>' +
                    '<option value="2">[G]</option>' +
                    '<option value="3">[S]</option>' +
                '</select> ' +
                'Объект: ' +
                '<select id="selRealEstate1" style="border: 1px solid ' +
                        '#339933; margin-left: 3px;">' +
                    '<option value="0">Все</option>' +
                    '<option value="1">Эс</option>' +
                    '<option value="2">Уран</option>' +
                    '<option value="3">Порты</option>' +
                    '<option value="4">Недвига</option>' +
                '</select>&nbsp;&nbsp;' +
                'Синдикат: ' +
                '<input id="syndNumber2" maxlength="5" ' +
                    'style="width: 45px;" />&nbsp;&nbsp;' +
                'Куда я могу зайти: ' +
                '<input id="onlyMe3" type="checkbox" />&nbsp;&nbsp;' +
                'Всего боев: ' +
                '<span id="countLines"></span><br>';
            warTable.parentNode.insertBefore(mainPanel, warTable);

            var selIsl = general.$('selIsl0'),
                selRealEstate = general.$('selRealEstate1'),
                syndNumber = general.$('syndNumber2'),
                onlyMe = general.$('onlyMe3'),
                _this = this;

            selIsl.addEventListener('change', function () {
                _this.setSortSyndWarData(this);
            }, false);
            selRealEstate.addEventListener('change', function () {
                _this.setSortSyndWarData(this);
            }, false);
            syndNumber.addEventListener('input', function () {
                _this.setSortSyndWarData(this);
            }, false);
            onlyMe.addEventListener('click', function () {
                _this.setSortSyndWarData(this);
            }, false);

            this.divCountAll = general.doc.createElement('div');
            warTable.parentNode.appendChild(this.divCountAll);

            this.trs = warTable.querySelectorAll('table[cellpadding="5"]>' +
                    'tbody>tr');

            var stData = general.getData();
            selIsl.value = stData[0] || '0';
            selRealEstate.value = stData[1] || '0';
            syndNumber.value = stData[2];
            onlyMe.checked = stData[3];
            this.sortSyndWars();
        };
    };

    new SortSyndWars().init();

}());

