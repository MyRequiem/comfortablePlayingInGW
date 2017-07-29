// ==UserScript==
// @name            FilterGeneralFighting
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр заявок общих, уличных и графических боев по уровню бойцов, сортировка по критериям: случайные/командные/DM/синдовые. Отображение умения и дальности оружия для каждого бойца. Выделение цветом заявок, подходящих по указанной дальности и времени начала боя.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterGeneralFighting/filterGeneralFighting.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterGeneralFighting/filterGeneralFighting.user.js
// @include         http://www.ganjawars.ru/wargroup.php*
// @grant           none
// @license         MIT
// @version         1.10-130417
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, nomen: true
    continue: true, regexp: true, devel: true
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
        this.STORAGENAME = 'filterGeneralFighting';
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
         * @param   {Array} data
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

            /**
             * localStorage
             * [0]  - минимальный уровень
             * [1]  - максимальный уровень
             * [2]  - командные
             * [3]  - случайные
             * [4]  - DM
             * [5]  - без DM
             * [6]  - без синдовых
             * [7]  - только синдовые
             * [8]  - показывать умения
             * [9]  - показывать дальность
             * [10] - нужная дальность
             * [11] - время до боя (сек)
             */
            stData = ['5', '50', '', '', '', '', '', '', '', '', '', ''];
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
     * @class FilterGeneralFighting
     * @constructor
     */
    var FilterGeneralFighting = function () {
        /**
         * @property table
         * @type {HTMLTableElement|null}
         */
        this.table = null;
        /**
         * @property tableHTML
         * @type {String}
         */
        this.tableHTML = '';

        /**
         * @method getSelectOptions
         * @return  {String}
         */
        this.getSelectOptions = function () {
            var txt = '',
                i;

            for (i = 5; i <= 50; i++) {
                txt += '<option value="' + i + '">' + i + '</option>';
            }

            return txt;
        };

        /**
         * @method saveSettings
         * @param   {int}       ind
         * @param   {String}    id
         */
        this.saveSettings = function (ind, id) {
            var _this = this;
            return function () {
                var stData = general.getData(),
                    obj = general.$(id),
                    val = ind < 2 || ind > 9 ? obj.value :
                                                (obj.checked ? '1' : ''),
                    ids = {
                        2: ['onlyNoCommand', 3],
                        3: ['onlyCommand', 2],
                        4: ['noDm', 5],
                        5: ['Dm', 4],
                        6: ['onlySynd', 7],
                        7: ['hideSynd', 6]
                    };

                var data = ids[ind];
                if (data && val) {
                    stData[data[1]] = '';
                    general.$(data[0]).checked = false;
                }

                stData[ind] = val;
                general.setData(stData);

                _this.changeTable(true);
            };
        };

        /**
         * @method checkRange
         * @param   {int}       range
         * @param   {Array}     strRange
         * @return  {Boolean}
         */
        this.checkRange = function (range, strRange) {
            var r, i;
            for (i = 0; i < strRange.length; i++) {
                r = strRange[i];
                if (r && !isNaN(r) && (+r === range)) {
                    return true;
                }
            }

            return false;
        };

        /**
         * @method changeTable
         * @param   {Boolean}   mode
         */
        this.changeTable = function (mode) {
            if (mode) {
                // возвращает таблицу в исходное состояние
                this.table.innerHTML = this.tableHTML;
            }

            var trs = this.table.querySelectorAll('table[cellpadding="5"]>' +
                    'tbody>tr'),
                stData = general.getData(),
                linksPers,
                ranges,
                title,
                time,
                tmp,
                lvl,
                td,
                k,
                j,
                i;


            for (i = 1; i < trs.length; i++) {
                td = trs[i].querySelectorAll('td');

                if (td.length !== 5) {
                    continue;
                }

                // проверяем установленый уровень
                lvl = /\d+\-(\d+).*vs.*\d+\-\d+/.exec(td[1].innerHTML);
                if (lvl) {
                    lvl = +lvl[1];
                    if (+stData[0] > lvl || +stData[1] < lvl) {
                        trs[i].style.display = 'none';
                        continue;
                    }
                }

                // оставляем только командные бои или
                // только со случайным распределением
                tmp = /class="?(r|b)"?/.test(td[3].innerHTML);
                if ((stData[2] && !tmp) || (stData[3] && tmp)) {
                    trs[i].style.display = 'none';
                    continue;
                }

                // оставляем только DM или только не DM
                tmp = /\[\s?<font color=.*>dm<\/font>\s?\]/.
                        test(td[1].innerHTML);
                if ((stData[4] && !tmp) || (stData[5] && tmp)) {
                    trs[i].style.display = 'none';
                    continue;
                }

                // оставляем только синдовые или прячем все синдовые
                tmp = /#\d+/.test(td[2].innerHTML);
                if ((stData[6] && tmp) || (stData[7] && !tmp)) {
                    trs[i].style.display = 'none';
                    continue;
                }

                // выделяем жирным красным количество бойцов с каждой стороны
                td[3].innerHTML = td[3].innerHTML.
                        replace(/(\(\d+\/\d+\))/g, '<span style="color: ' +
                            '#990000; font-weight: bold;">$1</span>');

                // показываем умения и дальность, подкрашиваем заявки,
                // подходящие по указанной дальности
                ranges = stData[10].split(',');
                if (stData[8] || stData[9] || ranges[0]) {
                    tmp = '';
                    linksPers = td[3].
                        querySelectorAll('a[href*="/info.php?id="]');

                    for (j = 0; j < linksPers.length; j++) {
                        title = /\((\d+.*)?, (\d+)?\)/.
                            exec(linksPers[j].getAttribute('title'));

                        if (!title) {
                            continue;
                        }

                        // показываем умения и/или дальность оружия бойцов
                        if (stData[8] || stData[9]) {
                            // иногда не отображается умелка
                            // либо дальность в title ссылки
                            title[1] = title[1] || '?';
                            title[2] = title[2] || '?';
                            if (stData[8] && stData[9]) {
                                tmp = title[1] + ',' + title[2];
                            } else if (stData[8]) {
                                tmp = title[1];
                            } else {
                                tmp = title[2];
                            }

                            linksPers[j].innerHTML += '<span style="color: ' +
                                '#000000;">(' + tmp + ')</span>';
                        }

                        // закрашиваем заявку, если подходит дальность
                        if (ranges[0] && !td[3].getAttribute('bgcolor') &&
                                this.checkRange(+title[2], ranges)) {
                            for (k = 0; k < 4; k++) {
                                td[k].removeAttribute('class');
                                td[k].setAttribute('bgcolor', '#C1F0E7');
                            }
                        }
                    }
                }

                // выделяем заявку серым цветом если времени
                // осталось больше указанного в настройках
                if (stData[11] && !isNaN(stData[11])) {
                    time = /(\d+):(\d+)/.exec(td[0].innerHTML);
                    if (time) {
                        time = +time[1] * 60 + (+time[2]);
                        if (+stData[11] < time) {
                            for (k = 0; k < 4; k++) {
                                td[k].removeAttribute('class');
                                td[k].setAttribute('bgcolor', '#D9D9D9');
                            }
                        }
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'FilterGeneralFighting:\n\nFireFox 4+\nOpera 11+' +
                    '\nChrome 12+');

                return;
            }

            if (!(/\?war=(armed|gwars|street)/.test(general.loc))) {
                return;
            }

            var updateTimer = general.$('updatetimer2'),
                bodyHTML = general.doc.body.innerHTML;

            // если не попали в заявку обновляем страницу
            if (/Заявка на бой отклонена/.test(bodyHTML)) {
                general.root.location.href = updateTimer.parentNode.href;
                return;
            }

            // если уже в заявке
            if (/#990000"?>Вы заявлены на бой/.test(bodyHTML)) {
                return;
            }

            // устанавливаем интерфейс настроек
            var inputSpan = general.doc.createElement('span');
            inputSpan.innerHTML = 'с:' +
                '<select id="lvlMin">' + this.getSelectOptions() +
                    '</select> ' +
                'до: <select id="lvlMax">' + this.getSelectOptions() +
                    '</select> ' +
                'Командные:<input id="onlyCommand" type="checkbox" /> ' +
                'Случайные:<input id="onlyNoCommand" type="checkbox" /> ' +
                'DM:<input id="dm" type="checkbox" /> ' +
                'Без DM:<input id="noDm" type="checkbox" /> ' +
                'Без синдовых:<input id="hideSynd" type="checkbox" /> ' +
                'Синдовые:<input id="onlySynd" type="checkbox" /> ' +
                'Умения:<input id="showSkills" type="checkbox" /> ' +
                'Дальность:<input id="showRange" type="checkbox" /> ' +
                'Нужная дальность: <input id="limitRange" ' +
                    'style="width: 50px;"> ' +
                'Время: <input id="time" maxlength="3" ' +
                    'style="width: 40px;"><br>';

            var target = general.doc.querySelector('td.txt>' +
                'table[width="100%"]').parentNode;
            target.insertBefore(inputSpan, target.querySelector('br'));

            var stData = general.getData();

            // устанавливаем значения select'ов, чекбоксов, текстовых полей
            // списки выбора минимального и максимального боевого уровеня
            var selMin = general.$('lvlMin');
            selMin.value = stData[0];
            var selMax = general.$('lvlMax');
            selMax.value = stData[1];

            // только командные
            var onlyCommand = general.$('onlyCommand');
            onlyCommand.checked = stData[2];

            // только случайные
            var onlyNoCommand = general.$('onlyNoCommand');
            onlyNoCommand.checked = stData[3];

            // только DM
            var dm = general.$('dm');
            dm.checked = stData[4];

            // без DM
            var noDm = general.$('noDm');
            noDm.checked = stData[5];

            // без синдовых
            var hideSynd = general.$('hideSynd');
            hideSynd.checked = stData[6];

            // только синдовые
            var onlySynd = general.$('onlySynd');
            onlySynd.checked = stData[7];

            // показывать умения бойцов
            var showSkills = general.$('showSkills');
            showSkills.checked = stData[8];

            // показывать дальность оружия бойцов
            var showRange = general.$('showRange');
            showRange.checked = stData[9];

            // нужная дальность
            var limitRange = general.$('limitRange');
            limitRange.value = stData[10];

            // время до боя
            var time = general.$('time');
            time.value = stData[11];

            // обработчики для интерфейса настроек
            selMin.addEventListener('change',
                        this.saveSettings(0, selMin.id), false);
            selMax.addEventListener('change',
                        this.saveSettings(1, selMax.id), false);

            onlyCommand.addEventListener('click',
                        this.saveSettings(2, onlyCommand.id), false);

            onlyNoCommand.addEventListener('click',
                        this.saveSettings(3, onlyNoCommand.id), false);

            dm.addEventListener('click',
                        this.saveSettings(4, dm.id), false);
            noDm.addEventListener('click',
                        this.saveSettings(5, noDm.id), false);

            hideSynd.addEventListener('click',
                        this.saveSettings(6, hideSynd.id), false);

            onlySynd.addEventListener('click',
                        this.saveSettings(7, onlySynd.id), false);

            showSkills.addEventListener('click',
                    this.saveSettings(8, showSkills.id), false);

            showRange.addEventListener('click',
                        this.saveSettings(9, showRange.id), false);

            limitRange.addEventListener('input',
                        this.saveSettings(10, limitRange.id), false);

            time.addEventListener('input',
                        this.saveSettings(11, time.id), false);

            // таблица с заявками
            this.table = general.doc.querySelector('table[border="0"]' +
                '[cellpadding="5"][cellspacing="1"]');

            if (this.table) {
                this.table.parentNode.setAttribute('align', 'center');
                this.tableHTML = this.table.innerHTML;
                this.changeTable(false);
            }
        };
    };

    new FilterGeneralFighting().init();

}());

