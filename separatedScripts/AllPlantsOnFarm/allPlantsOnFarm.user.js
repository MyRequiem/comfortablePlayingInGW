// ==UserScript==
// @name            AllPlantsOnFarm
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На ферме добавляет выпадающий список для выбора и посадки любого растения. Для каждого растения присутствует изображение, производственный опыт и прибыль (общие и в 1 час), цена, время созревания в минутах и часах.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AllPlantsOnFarm/allPlantsOnFarm.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AllPlantsOnFarm/allPlantsOnFarm.user.js
// @include         http://www.ganjawars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         1.00-010915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, regexp: true
    nomen: true, plusplus: true
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
         * @property loc
         * @type {String}
         */
        this.loc = this.root.location.href;
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'allPlantsOnFarm';
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
        },

        /**
         * @method $
         * @param   {string}    id
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
         * @method ajaxQuery
         * @param   {String}        url
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.cons.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
                xmlHttpRequest.abort();
            }, 10000);

            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState !== 4) {
                    return;
                }

                clearTimeout(timeout);
                if (xmlHttpRequest.readyState === 4 &&
                        xmlHttpRequest.status === 200 && onsuccess) {
                    onsuccess(xmlHttpRequest);
                } else {
                    if (xmlHttpRequest.readyState === 4 &&
                            xmlHttpRequest.status !== 200 &&
                                onfailure) {
                        onfailure(xmlHttpRequest);
                    }
                }
            };
        };
    };

    /**
     * @class AllPlantsOnFarm
     * @constructor
     */
    var AllPlantsOnFarm = function () {
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 700;
        /**
         * @property canPlant
         * @type {Boolean}
         */
        this.canPlant = true;
        /**
         * @property target
         * @type {Boolean}
         */
        this.target = false;
        /**
         * @property plant
         * @type {Object}
         */
        this.plant = {
            'ukrop': {name: 'Укроп', price: 5, time: 12, bonus: 6, exp: 0.007,
                id: 0},
            'opyata': {name: 'Странные опята', price: 10, time: 376, bonus: 40,
                exp: 0.204, id: 1},
            'tulips': {name: 'Тюльпаны', price: 20, time: 67, bonus: 26,
                exp: 0.04, id: 2},
            'mak': {name: 'Полевой мак', price: 12, time: 27, bonus: 15,
                exp: 0.02, id: 3},
            'muhomor': {name: 'Мухомор', price: 150, time: 150, bonus: 165,
                exp: 0.098, id: 4},
            'podsolnuh': {name: 'Подсолнух', price: 50, time: 126, bonus: 62,
                exp: 0.082, id: 5},
            'kaktus': {name: 'Коричневый кактус', price: 160, time: 376,
                bonus: 197, exp: 0.245, id: 6},
            'geran': {name: 'Герань', price: 10, time: 57, bonus: 17,
                exp: 0.048, id: 7},
            'tabak': {name: 'Веселый табак', price: 20, time: 150, bonus: 37,
                exp: 0.114, id: 8},
            'korica': {name: 'Корица забористая', price: 16, time: 68,
                bonus: 25, exp: 0.057, id: 9},
            'hren': {name: 'Хрен', price: 210, time: 300, bonus: 244,
                exp: 0.229, id: 10},
            'baklajan': {name: 'Баклажан', price: 150, time: 226, bonus: 176,
                exp: 0.171, id: 11},
            'chai': {name: 'Зеленый чай', price: 50, time: 90, bonus: 63,
                exp: 0.087, id: 12},
            'aloe': {name: 'Алоэ', price: 120, time: 45, bonus: 127,
                exp: 0.044, id: 13},
            'ogurets': {name: 'Огурцы', price: 350, time: 68, bonus: 360,
                exp: 0.065, id: 14},
            'klubnika': {name: 'Клубника', price: 100, time: 450, bonus: 159,
                exp: 0.392, id: 15},
            'malina': {name: 'Малина', price: 190, time: 90, bonus: 203,
                exp: 0.087, id: 16},
            'shalfei': {name: 'Задумчивый шалфей&nbsp;', price: 800, time: 715,
                bonus: 885, exp: 0.566, id: 17},
            'mint': {name: 'Мята', price: 50, time: 34, bonus: 56, exp: 0.037,
                id: 18},
            'kokos': {name: 'Кокосовая пальма', price: 200, time: 176,
                bonus: 226, exp: 0.171, id: 19},
            'vinograd': {name: 'Виноград', price: 140, time: 90, bonus: 155,
                exp: 0.098, id: 20},
            'tabak2': {name: 'Жевательный табак', price: 170, time: 29,
                bonus: 175, exp: 0.031, id: 21},
            'whitemush': {name: 'Белые грибы', price: 120, time: 126,
                bonus: 138, exp: 0.122, id: 22},
            'kapusta': {name: 'Капуста', price: 150, time: 79, bonus: 164,
                exp: 0.095, id: 23},
            'kust': {name: 'Хвойный куст', price: 600, time: 350, bonus: 657,
                exp: 0.381, id: 24},
            'kabachok': {name: 'Кабачок', price: 140, time: 95, bonus: 155,
                exp: 0.102, id: 25},
            'kukuruza': {name: 'Кукуруза', price: 170, time: 68, bonus: 182,
                exp: 0.082, id: 26},
            'jahntak': {name: 'Джантак', price: 130, time: 164, bonus: 157,
                exp: 0.177, id: 27},
            'kaktusi': {name: 'Кактусы пушистые ', price: 1100, time: 634,
                bonus: 1194, exp: 0.626, id: 28},
            'perets': {name: 'Красный перец', price: 180, time: 51, bonus: 191,
                exp: 0.073, id: 29},
            'petrushka': {name: 'Петрушка курчавая ', price: 145, time: 29,
                bonus: 151, exp: 0.041, id: 30},
            'tomat': {name: 'Говорящий томат', price: 500, time: 276,
                bonus: 554, exp: 0.359, id: 31},
            'arbuz': {name: 'Арбуз', price: 100, time: 45, bonus: 111,
                exp: 0.071, id: 32},
            'hmel': {name: 'Душистый хмель', price: 130, time: 23, bonus: 135,
                exp: 0.035, id: 33},
            'bambuk': {name: 'Ростки Бамбука', price: 10, time: 17, bonus: 14,
                exp: 0.029, id: 34},
            'tikva': {name: 'Тыква', price: 200, time: 57, bonus: 214,
                exp: 0.095, id: 35},
            'shishki': {name: 'Еловые шишки', price: 250, time: 45, bonus: 262,
                exp: 0.082, id: 36},
            'dinya': {name: 'Дыня', price: 120, time: 88, bonus: 141,
                exp: 0.143, id: 37},
            'podsolnuh2': {name: 'Подсолнух-мутант', price: 200, time: 50,
                bonus: 213, exp: 0.087, id: 38},
            'poganka': {name: 'Бледная поганка', price: 1500, time: 338,
                bonus: 1604, exp: 0.694, id: 39}
        };

        /**
         * @method getHourTime
         * @param   {int}   min
         * @return  {String}
         */
        this.getHourTime = function (min) {
            if (min < 60) {
                return '';
            }

            var h = Math.floor(min / 60);
            return '(' + h + ' ч ' + (min - h * 60) + ' мин)';
        };
        /**
         * @method calculatePerHour
         * @param   {int}   val1
         * @param   {int}   val2
         * @param   {int}   fix
         * @return  {String}
         */
        this.calculatePerHour = function (val1, val2, fix) {
            return (60 * val2 / val1).toFixed(fix);
        };

        /**
         * @method getCoord
         * @return  {Object}
         */
        this.getCoord = function () {
            return {x: /(\?|&)x=(\d)/.exec(general.loc)[2],
                        y: /(\?|&)y=(\d)/.exec(general.loc)[2]};
        };

        /**
         * @method setPlantData
         */
        this.setPlantData = function () {
            var cont = general.$('checkBoxContainer'),
                val = general.$('selPlant').value,
                id = 'btn_' + val,
                pl = this.plant[val],
                str = '';

            cont.innerHTML = '';
            if (val !== '0') {
                var i;
                for (i = 3; i < 7; i++) {
                    str += '<img src="http://images.ganjawars.ru/' +
                        'img/ferma/' + val + i + '.png" />';
                }

                var stData = general.getData(),
                    disbld = (!stData[0] || this.plant[val].id >= +stData[0]) ?
                                ' disabled' : '',
                    style = !this.canPlant ? ' style="display: none;"' : '',
                    coord = this.getCoord();

                str += ' <a href="/ferma.php?x=' + coord.x + '&y=' + coord.y +
                    '&page_id=' + Math.floor(pl.id / 4) + '"' + style + '>' +
                    '[Перейти]</a><br><input type="radio" name="plant_id" ' +
                    'value="' + val + '" id="' + id + '"' + style + disbld +
                    ' /> <label for="' + id + '"><b style="color: #006600;">' +
                    pl.name + ', ' + pl.price + '$</b></label> ' +
                    '<br><li>Время созревания: <b style="color: #990000;">' +
                    pl.time + ' мин</b> ' + this.getHourTime(pl.time) +
                    '<li>Премия за урожай: <b style="color: #990000;">' +
                    pl.bonus + '$</b> (<span style="color: #0000FF;">' +
                    this.calculatePerHour(pl.time, pl.bonus - pl.price, 2) +
                    '$</span> в час)<li>Производственный опыт: ' +
                    '<b style="color: #990000;">' + pl.exp + '</b> (' +
                    '<span style="color: #0000FF;">' +
                    this.calculatePerHour(pl.time, pl.exp, 3) +
                    '</span> в час)';

                cont.innerHTML = str;
            }
        };

        /**
         * @method createSelectList
         * @return  {HTMLElement}
         */
        this.createSelectList = function () {
            var sel = general.doc.createElement('select'),
                stData = general.getData(),
                block = '',
                str = '',
                val;

            for (val in this.plant) {
                if (this.plant.hasOwnProperty(val)) {
                    // есть возможность сажать и данных в хранилище
                    // нет или это недоступное растение
                    if (this.canPlant &&
                            (!stData[0] || this.plant[val].id >= +stData[0])) {
                        block = ' style="background-color: #FADADA"';
                    }

                    str += '<option value="' + val + '"' + block + '>' +
                        this.plant[val].name + '</option>';
                }
            }

            sel.id = 'selPlant';
            sel.innerHTML = '<option value="0"> </option>' + str;
            var _this = this;
            sel.addEventListener('change', function () {
                _this.setPlantData();
            }, false);

            return sel;
        };

        /**
         * @method checkAvailability
         * @param   {int}   ind
         */
        this.checkAvailability = function (ind) {
            general.$('counter').innerHTML = ind + 1;
            var coord = this.getCoord(),
                url = 'http://www.ganjawars.ru/ferma.php?' +
                    'x=' + coord.x + '&y=' + coord.y + '&page_id=' + ind,
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var disabled = /value=('|")?([^\s'"]+)('|")? ([^>]+) disabled/.
                        exec(xml.responseText);

                if (disabled) {
                    general.setData([_this.plant[disabled[2]].id]);
                    _this.setMainPanel();
                    return;
                }

                ind++;
                if (ind > 9) {
                    // доступны все растения
                    general.setData([Number.MAX_VALUE]);
                    _this.setMainPanel();
                    return;
                }

                general.root.setTimeout(function () {
                    _this.checkAvailability(ind);
                }, _this.tm);
            }, function () {
                general.root.setTimeout(function () {
                    _this.checkAvailability(ind);
                }, _this.tm);
            });
        };

        /**
         * @method setMainPanel
         */
        this.setMainPanel = function () {
            // основной контейнер
            var div = this.target.querySelector('#allPlantContainer');
            if (!div) {
                div = general.doc.createElement('div');
                div.id = 'allPlantContainer';
                this.target.appendChild(div);
            }

            div.innerHTML = this.canPlant ? '' : '<br>';
            div.appendChild(this.createSelectList());

            // кнопа "Что могу посадить?"
            var butCheckPlant = general.doc.createElement('input');
            butCheckPlant.type = 'button';
            butCheckPlant.value = 'Что могу посадить?';
            butCheckPlant.setAttribute('style', this.canPlant ?
                    'margin-left: 5px;' : 'display: none;');
            var _this = this;
            butCheckPlant.addEventListener('click', function () {
                div.querySelector('#preloader').style.display = '';
                general.setData([]);
                _this.checkAvailability(0);
            }, false);
            div.appendChild(butCheckPlant);

            var span = general.doc.createElement('span');
            span.id = 'preloader';
            span.innerHTML = '<img src="' + general.imgPath +
                'preloader.gif" style="margin: 0 5px 0 10px;" />' +
                '(<span id="counter"></span>)';
            span.style.display = 'none';
            div.appendChild(span);

            var chkContainer = general.doc.createElement('div');
            chkContainer.id = 'checkBoxContainer';
            div.appendChild(chkContainer);
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'AllPlantsOnFarm\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');
            }

            var farmId = /(\?|&)id=(\d+)/.exec(general.loc),
                capcha = general.doc.querySelector('input[type="text"]' +
                        '[name="fermacode"]');

            this.target = general.doc.
                    querySelector('form[action="/ferma.php"]') ||
                        general.doc.
                            querySelector('td[width="400"][valign="top"]');

            // нет капчи, не в постройках, на своей ферме
            if (!capcha && !(/section=items/.test(general.loc)) &&
                    !(farmId && farmId[2] !== general.myID) && this.target) {
                this.canPlant = this.target.nodeName === 'FORM';
                this.setMainPanel();
            }
        };
    };

    new AllPlantsOnFarm().init();

}());

