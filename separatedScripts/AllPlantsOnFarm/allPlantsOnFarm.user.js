// ==UserScript==
// @name            AllPlantsOnFarm
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Счетчик гб и производственного опыта на ферме. Для каждого растения присутствует изображение, производственный опыт и прибыль (общие и в 1 час), цена, время созревания в минутах и часах.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AllPlantsOnFarm/allPlantsOnFarm.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AllPlantsOnFarm/allPlantsOnFarm.user.js
// @include         https://*gwars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         1.43-130820
// @author          MyRequiem [https://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp:true, nomen: true,
    plusplus: true, devel: true
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

    // ==================== НАСТРОЙКИ ========================
    // 1 - показать, 0 - не показывать
    var showGb = 1,     // счетчик Гб
        showExp = 1;    // счетчик производа
    // ================= КОНЕЦ НАСТРОЕК ======================

    /**
     * localStorage
     * [0] - номер первого недоступного растения
     *          (не используется с версии 1.30-101117)
     * [1] - время сброса счетчика
     * [2] - количество гб
     * [3] - количество производа
     */

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

            stData = ['', '', '', ''];
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
     * @class SetPoints
     * @constructor
     */
    var SetPoints = function () {
        /**
         * @method init
         * @param   {String|int}   num
         * @param   {String}        separator
         * @param   {Boolean}       flagSign
         * @return  {String}
         */
        this.init = function (num, separator, flagSign) {
            var x = +num,
                sign = x > 0 && flagSign ? '+' : '',
                i;

            if (isNaN(x)) {
                return 'NaN';
            }

            x = x.toString().split('').reverse();
            for (i = 2; i < x.length; i += 3) {
                if (x[i] === '-' || !x[i + 1] || x[i + 1] === '-') {
                    break;
                }

                x[i] = separator + x[i];
            }

            return sign + x.reverse().join('');
        };
    };

    /**
     * @class AllPlantsOnFarm
     * @constructor
     */
    var AllPlantsOnFarm = function () {
        /**
         * @property target
         * @type {Object|null}
         */
        this.target = null;
        /**
         * @property plant
         * @type {Object}
         */
        this.plant = {
            'ukrop': {name: 'Укроп', price: 5, time: 12, bonus: 6, exp: 0.007},
            'opyata': {name: 'Странные опята', price: 10, time: 376, bonus: 40,
                exp: 0.204},
            'tulips': {name: 'Тюльпаны', price: 20, time: 67, bonus: 26,
                exp: 0.04},
            'mak': {name: 'Полевой мак', price: 12, time: 27, bonus: 15,
                exp: 0.02},
            'muhomor': {name: 'Мухомор', price: 150, time: 150, bonus: 165,
                exp: 0.098},
            'podsolnuh': {name: 'Подсолнух', price: 50, time: 126, bonus: 62,
                exp: 0.082},
            'kaktus': {name: 'Коричневый кактус', price: 160, time: 376,
                bonus: 197, exp: 0.245},
            'geran': {name: 'Герань', price: 10, time: 57, bonus: 17,
                exp: 0.048},
            'tabak': {name: 'Веселый табак', price: 20, time: 150, bonus: 37,
                exp: 0.114},
            'korica': {name: 'Корица забористая', price: 16, time: 68,
                bonus: 25, exp: 0.057},
            'hren': {name: 'Хрен', price: 210, time: 300, bonus: 244,
                exp: 0.229},
            'baklajan': {name: 'Баклажан', price: 150, time: 226, bonus: 176,
                exp: 0.171},
            'chai': {name: 'Зеленый чай', price: 50, time: 90, bonus: 63,
                exp: 0.087},
            'aloe': {name: 'Алоэ', price: 120, time: 45, bonus: 127,
                exp: 0.044},
            'ogurets': {name: 'Огурцы', price: 350, time: 68, bonus: 360,
                exp: 0.065},
            'klubnika': {name: 'Клубника', price: 100, time: 450, bonus: 159,
                exp: 0.392},
            'malina': {name: 'Малина', price: 190, time: 90, bonus: 203,
                exp: 0.087},
            'shalfei': {name: 'Задумчивый шалфей&nbsp;', price: 800, time: 715,
                bonus: 885, exp: 0.566},
            'mint': {name: 'Мята', price: 50, time: 34, bonus: 56, exp: 0.037},
            'kokos': {name: 'Кокосовая пальма', price: 200, time: 176,
                bonus: 226, exp: 0.171},
            'vinograd': {name: 'Виноград', price: 140, time: 90, bonus: 155,
                exp: 0.098},
            'tabak2': {name: 'Жевательный табак', price: 170, time: 29,
                bonus: 175, exp: 0.031},
            'whitemush': {name: 'Белые грибы', price: 120, time: 126,
                bonus: 138, exp: 0.122},
            'kapusta': {name: 'Капуста', price: 150, time: 79, bonus: 164,
                exp: 0.095},
            'kust': {name: 'Хвойный куст', price: 600, time: 350, bonus: 657,
                exp: 0.381},
            'kabachok': {name: 'Кабачок', price: 140, time: 95, bonus: 155,
                exp: 0.102},
            'kukuruza': {name: 'Кукуруза', price: 170, time: 68, bonus: 182,
                exp: 0.082},
            'jahntak': {name: 'Джантак', price: 130, time: 164, bonus: 157,
                exp: 0.177},
            'kaktusi': {name: 'Кактусы пушистые ', price: 1100, time: 634,
                bonus: 1194, exp: 0.626},
            'perets': {name: 'Красный перец', price: 180, time: 51, bonus: 191,
                exp: 0.073},
            'petrushka': {name: 'Петрушка курчавая ', price: 145, time: 29,
                bonus: 151, exp: 0.041},
            'tomat': {name: 'Говорящий томат', price: 500, time: 276,
                bonus: 554, exp: 0.359},
            'arbuz': {name: 'Арбуз', price: 100, time: 45, bonus: 111,
                exp: 0.071},
            'hmel': {name: 'Душистый хмель', price: 130, time: 23, bonus: 135,
                exp: 0.035},
            'bambuk': {name: 'Ростки Бамбука', price: 10, time: 17, bonus: 14,
                exp: 0.029},
            'tikva': {name: 'Тыква', price: 200, time: 57, bonus: 214,
                exp: 0.095},
            'shishki': {name: 'Еловые шишки', price: 250, time: 45, bonus: 262,
                exp: 0.082},
            'dinya': {name: 'Дыня', price: 120, time: 88, bonus: 141,
                exp: 0.143},
            'podsolnuh2': {name: 'Подсолнух-мутант', price: 200, time: 50,
                bonus: 213, exp: 0.087},
            'poganka': {name: 'Бледная поганка', price: 1500, time: 338,
                bonus: 1604, exp: 0.694}
        };

        /**
         * @method getHourTime
         * @param   {int}       min
         * @param   {Boolean}   mode
         * @return  {String}
         */
        this.getHourTime = function (min, mode) {
            if (min < 60) {
                return '';
            }

            var h = Math.floor(min / 60),
                m = min - h * 60;

            m = m < 10 ? '0' + m : m;
            return mode ? '(' + h + ' ч ' + m + ' мин)' :
                            '[' + h + ':' + m + ']';
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
         * @method setPlantData
         */
        this.setPlantData = function () {
            var cont = general.$('checkBoxContainer'),
                val = general.$('selPlant').value,
                id = 'btn_' + val,
                pl = this.plant[val],
                str = '';

            cont.innerHTML = '';
            // noinspection JSUnresolvedVariable
            if (val !== '0') {
                var i;
                for (i = 3; i < 7; i++) {
                    str += '<img src="https://images.gwars.ru/' +
                        'img/ferma_hd/' + val + i + '.png" ' +
                        'style="width: 50px; height: 50px;" alt="img" />';
                }

                str += '<br><label for="' + id + '">' +
                    '<b style="color: #006600;">' + pl.name + ', ' + pl.price +
                    '$</b></label><br><li>Время созревания: ' +
                    '<b style="color: #990000;">' + pl.time + ' мин</b> ' +
                    this.getHourTime(pl.time, true) + '<li>Премия за урожай: ' +
                    '<b style="color: #990000;">' + pl.bonus + '$</b> ' +
                    '(<span style="color: #0000FF;">' +
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
                str = '',
                val;

            for (val in this.plant) {
                if (this.plant.hasOwnProperty(val)) {
                    str += '<option value="' + val + '">' +
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
         * @method setMainPanel
         */
        this.setMainPanel = function () {
            // основной контейнер
            var div = this.target.querySelector('#allPlantContainer');
            if (!div) {
                div = general.doc.createElement('div');
                div.id = 'allPlantContainer';
                div.setAttribute('style', 'margin-top: 7px');
                if (this.target.nodeName === 'FORM') {
                    this.target.parentNode.lastElementChild.
                            firstElementChild.appendChild(div);
                } else {
                    this.target.appendChild(div);
                }
            }

            div.appendChild(this.createSelectList());

            var chkContainer = general.doc.createElement('div');
            chkContainer.setAttribute('align', 'left');
            chkContainer.id = 'checkBoxContainer';
            div.appendChild(chkContainer);
        };

        /**
         * @method clearCounter
         * @param   {String}    gb
         * @param   {String}    exp
         */
        this.clearCounter = function (gb, exp) {
            var stData = general.getData();

            stData[1] = new Date().getTime();
            stData[2] = gb;
            stData[3] = exp;
            general.setData(stData);
        };

        /**
         * @method setCounter
         */
        this.setCounter = function () {
            var table = general.doc.querySelector('table[cellpadding="3"]' +
                    '[cellspacing="0"][border="0"][align="center"]'),
                prod = /получен опыт (\d+(\.\d+)?) ед/.exec(table.innerHTML);

            // опыт виден (на пустой вскопанной клетке)
            if (prod) {
                var target = table.querySelector('a[name="pf"]').parentNode,
                    gb = target.querySelectorAll('b'),
                    exp = prod[1],
                    stData = general.getData();

                // количесво Гб на ферме с учетом схрона
                // Счет: $85 + урожай на $6.6 в схроне, 1 шт.
                // noinspection RegExpSingleCharAlternation
                gb = +gb[0].innerHTML.replace(/\$|,/g, '') + (gb[1] ?
                        Math.round(parseFloat(gb[1].innerHTML.
                            replace(/\$|,/g, ''))) : 0);

                // время сброса не установлено
                if (!stData[1]) {
                    this.clearCounter(gb.toString(), exp);
                }

                var t = new Date(+stData[1]),
                    day = t.getDate(),
                    time = day < 10 ? '0' + day : day;

                time += '.';
                var month = t.getMonth() + 1;
                time += month < 10 ? '0' + month : month;
                time += '.';
                var year = /20(\d+)/.exec(t.getFullYear().toString())[1];
                time += year + ' ';
                var hours = t.getHours();
                time += hours < 10 ? '0' + hours : hours;
                time += ':';
                var min = t.getMinutes();
                time += min < 10 ? '0' + min : min;

                // noinspection JSRemoveUnnecessaryParentheses
                var setPoint = new SetPoints().init,
                    diffGb = gb - (+stData[2]),
                    diffExp = (+exp - (+stData[3])).toFixed(3).split('.');

                var str = '';
                if (showGb) {
                    str += '<span style="color: #' +
                        (diffGb < 0 ? '0000FF' : 'FF0000') + ';">' +
                        setPoint(diffGb, '\'', true) + '$</span>';
                }

                if (showExp) {
                    str += '<span' +
                        (str ? ' style="margin-left: 5px;"' : '') + '>' +
                        setPoint(diffExp[0], '\'', false) +
                        (diffExp[1] ? ',' + diffExp[1] : '') + '</span>';
                }

                str += '<span style="font-size: 7pt; margin-left: 5px;">' +
                            '<span id="clearFarmCounter" ' +
                                'style="cursor: pointer; color: #008000; ' +
                                'text-decoration: underline;">Сброс</span> ' +
                            '<span style="color: #0000FF;">(' + time + ')' +
                            '</span>' +
                        '</span>';

                var spanCounters = general.doc.createElement('span');
                spanCounters.setAttribute('style', 'font-size: 8pt; ' +
                    'margin-right: 5px;');
                spanCounters.innerHTML = str;
                target.insertBefore(spanCounters, target.firstElementChild);

                var _this = this;
                general.$('clearFarmCounter').
                    addEventListener('click', function () {
                        if (confirm('Сбросить счетчики ?')) {
                            _this.clearCounter(gb.toString(), exp);
                            target.removeChild(spanCounters);
                            _this.setCounter();
                        }
                    }, false);
            }
        };

        /**
         * @method runInit
         */
        this.runInit = function () {
            var _this = this;
            return function () {
                general.root.setTimeout(function () {
                    _this.init();
                }, 700);
            };
        };

        /**
         * @method init
         */
        this.init = function () {
            // noinspection RegExpSingleCharAlternation
            var farmId = /(\?|&)id=(\d+)/.exec(general.loc),
                capcha = general.doc.querySelector('input[type="hidden"]' +
                    '[name="captcha_question"]');

            this.target = general.doc.querySelector('td[width="400"]' +
                    '[valign="top"]');

            // нет капчи, на своей ферме
            if (!capcha && !(farmId && farmId[2] !== general.myID) &&
                    this.target) {

                var canPlant = general.doc.
                        querySelector('input[type="button"][value="Посадить"]');

                // счетчики Гб и производа
                if (canPlant && (showGb || showExp)) {
                    this.setCounter();
                }

                // перевод дохрена минут в чч:мм
                if (!canPlant) {
                    var tbl = general.doc.querySelector('table[width="100%"]' +
                            '[cellpadding="4"][cellspacing="2"][border="0"]');

                    if (tbl) {
                        var tds = tbl.querySelectorAll('td'),
                            span,
                            min,
                            i;

                        for (i = 1; i < tds.length; i++) {
                            min = /(через|осталось) (\d+) мин/.
                                exec(tds[i].innerHTML);
                            min = min && +min[2] > 59 ? +min[2] : null;

                            if (min) {
                                span = general.doc.createElement('span');
                                span.setAttribute('style', 'color: #0000FF; ' +
                                        'font-size: 7pt; margin-left: 2px;');
                                span.innerHTML = this.getHourTime(min, false);
                                tds[i].appendChild(span);
                            }
                        }
                    }

                    this.setMainPanel();
                }

                var a = general.doc.querySelectorAll('*[onclick*="gotourl("],' +
                            '*[onclick*="openurl("],*[onclick*="plantit("]'),
                    l;

                for (l = 0; l < a.length; l++) {
                    a[l].addEventListener('click', this.runInit(), false);
                }
            }
        };
    };

    new AllPlantsOnFarm().init();

}());

