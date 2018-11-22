// ==UserScript==
// @name            AdvForum
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Звуковые и визуальные оповещения при появлении новых тем или смене верхней темы, новых сообщений в темах, скрытие закрытых тем и прикрепленок, отметка закрытых тем, скрытие ненужных веток форума.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvForum/advForum.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvForum/advForum.user.js
// @include         http://www.gwars.ru/threads.php?fid=*
// @include         http://www.gwars.ru/messages.php?fid=*
// @include         http://www.gwars.ru/forum.php
// @grant           none
// @license         MIT
// @version         2.26-221118
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, plusplus: true,
    continue: true, nomen: true, devel: true
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
        this.STORAGENAME = 'advForum';
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
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

            /** localStorage
             * [0] - отмечать закрытые темы
             * [1] - звук при появлении новой темы
             * [2] - интервал перезагрузки страниц с темами форума (сек)
             * [3] - не показывать закрытые темы
             * [4] - не показывать прикрепленки
             * [5] - ветки, где скрипт работать не будет
             * [6] - список включения/отключения показа форумов
             * [7] - данные веток форума:
             *      {
             *          'fid': {
             *              'tid': {
             *                  d: str  // дата первого просмотра темы
             *                  l: str  // id последнего сообщения
             *                  с: str  // номер последнего сообщения
             *              },
             *              ...
             *          },
             *          ...
             *      }
             * [8] - {'fid': id_последней темы, ...}
             */
            stData = ['1', '', '', '', '', '1,5,7,11,15,24,30,34,35,36,37,' +
                        '41,42,44,46,47,48,54', '1,1,1,1,1,1,1,1,1,1,1,1,1,' +
                        '1,1,1,1,1,1,1,1,1,1,1,1,1', '{}', '{}'];
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
     * @class PlaySound
     * @constructor
     */
    var PlaySound = function () {
        /**
         * @method init
         * @param   {int|String}    sound
         */
        this.init = function (sound) {
            if (sound && sound !== '0') {
                var audio = general.$('cpingw_audio');
                if (!audio) {
                    audio = general.doc.createElement('audio');
                    audio.setAttribute('id', 'cpingw_audio');
                    var divAudio = general.doc.createElement('div');
                    divAudio.setAttribute('style', 'display: none;');
                    divAudio.appendChild(audio);
                    general.doc.body.appendChild(divAudio);
                }

                audio.volume = 0.3;
                audio.src = 'https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/sounds/' + sound + '.ogg';
                // noinspection JSIgnoredPromiseFromCall
                audio.play();
            }
        };
    };

    /**
     * @class GetSelectSound
     * @constructor
     */
    var GetSelectSound = function () {
        /**
         * @method init
         * @param   {String}    id
         * @return  {String}
         */
        this.init = function (id) {
            var sounds = [
                    'Без звука', 'Перезарядка', 'Выстрел дробовика',
                    'Открытие двери', 'Взрыв бочки', 'Выстрел BFG',
                    'Радио-зуммер', 'Подтверждение цели', 'Ion Cannon Ready!',
                    'Select target!', 'Звук тревоги', 'I`m alive!',
                    'Орки смеются', 'Unholy Armor', 'We`ve been attacked!',
                    'Кот мяукает', 'Кот мяукает #2', 'Take cover!', 'Stupid!',
                    'Hello!', 'hehehehe!', 'Chimes', 'Ding', 'Ошибка',
                    'Отказ оборудования', 'А, вот эти ребята', 'Не-не-не-не!',
                    'нет, Девид Блейн, нет!',
                    'Я делаю особую магию&nbsp;&nbsp;', 'Prepare for battle!',
                    'Pick up your weapons'
                ],
                str = '<select id="' + id + '">',
                i;

            for (i = 0; i < sounds.length; i++) {
                str += '<option value="' + i + '">' + sounds[i] + '</option>';
            }

            return str + '</select> ' +
                '<input type="button" id="l' + id + '" ' +
                'value="»">';
        };
    };

    /**
     * @class AdvForum
     * @constructor
     */
    var AdvForum = function () {
        /**
         * @property lifeTime
         * @type {int}
         */
        this.lifeTime = 3 * 24 * 60 * 60 * 1000;
        /**
         * @property parseLoc
         * @type {Array|null}
         */
        this.parseLoc = /\?fid=(\d+)(&tid=(\d+))?/.exec(general.loc);

        /**
         * @method getForumTable
         * @return  {HTMLElement}
         */
        this.getForumTable = function () {
            return general.doc.querySelector('center+br+center+table');
        };

        /**
         * @method processingThemesList
         */
        this.processingThemesList = function () {
            var table = this.getForumTable(),
                tableContent = table.innerHTML,
                fid = this.toHex(this.parseLoc[1]);

            // настройки
            this.setSettins(table, fid);

            var stData = general.getData(),
                json = JSON.parse(stData[7]),
                json1 = JSON.parse(stData[8]),
                trs = table.querySelectorAll('tr'),
                lastTheme = true,
                themeDataStorage,
                themeLink,
                imgClosed,
                imgEyes,
                tid,
                i;

            for (i = 1; i < trs.length; i++) {
                trs[i].style.display = '';
                themeLink = trs[i].querySelector('td>a');

                // прикрепленки пропускаем или скрываем, не отслеживаем
                if (themeLink.firstElementChild) {
                    if (stData[4]) {
                        trs[i].style.display = 'none';
                    }

                    continue;
                }

                tid = this.toHex(+(/&tid=(\d+)/.exec(themeLink.href)[1]));
                // верхняя тема на первой странице
                if (/\?fid=\d+(&page_id=0)?$/.test(general.loc) && lastTheme) {
                    lastTheme = false;
                    // id первой темы в хранилище не равен id первой
                    // темы на странице - играем звук, запоминаем тему
                    if (json1[fid] !== tid) {
                        // если не первый раз заходим в данную ветку
                        if (json1[fid]) {
                            new PlaySound().init(stData[1]);
                        }

                        json1[fid] = tid;
                        stData[8] = JSON.stringify(json1);
                        general.setData(stData);
                    }
                }

                // закрытые темы
                if (/тема закрыта/.test(trs[i].
                        querySelector('td:last-child').innerHTML)) {
                    // скрытие закрытой темы
                    if (stData[3]) {
                        trs[i].style.display = 'none';
                        continue;
                    }

                    // отметка скрытой темы
                    if (stData[0]) {
                        imgClosed = general.doc.createElement('img');
                        imgClosed.setAttribute('style', 'height: 10px; ' +
                                'width: 10px; margin-right: 3px;');
                        imgClosed.title = 'Тема закрыта';
                        imgClosed.src = general.imgPath + 'AdvForum/closed.png';
                        themeLink.parentNode.insertBefore(imgClosed, themeLink);
                    }
                }

                // есть отслеживаемые темы в текущей ветке форума
                if (json[fid]) {
                    themeDataStorage = json[fid][tid];

                    // текущая тема отслеживается
                    if (themeDataStorage) {
                        imgEyes = general.doc.createElement('img');
                        imgEyes.setAttribute('style', 'margin-right: ' +
                            '3px; height: 12px; width: 12px; cursor: ' +
                            'pointer;');
                        imgEyes.setAttribute('title',
                                'Отменить отслеживание темы');
                        themeLink.parentNode.
                            insertBefore(imgEyes, themeLink);
                        imgEyes.src = general.imgPath + 'AdvForum/';
                        imgEyes.addEventListener('click',
                            this.cleanStorage(fid, tid, tableContent), false);

                        // появилось новое сообщение
                        if (themeDataStorage.c !== (/\d+/.exec(trs[i].
                                querySelectorAll('td')[2].innerHTML)[0])) {
                            imgEyes.src += 'eyesPlus.png';
                        } else {
                            imgEyes.src += 'eyes.png';
                        }
                    }
                }
            }

            var tm = +stData[2];
            if (tm) {
                general.root.setTimeout(function () {
                    general.root.location.reload();
                }, tm * 1000);
            }
        };

        /**
         * @method cleanStorage
         * @param   {String}    f
         * @param   {String}    t
         * @param   {String}    tableHTML
         * @return  {Function}
         */
        this.cleanStorage = function (f, t, tableHTML) {
            var _this = this;

            return function () {
                var stData = general.getData(),
                    json = JSON.parse(stData[7]),
                    tmp = {},
                    fid,
                    tid;

                for (fid in json) {
                    if (json.hasOwnProperty(fid)) {
                        // удаляется ветка форума
                        if (f && !t && fid === f && general.root.
                                confirm('Удалить все данные ветки?')) {
                            continue;
                        }

                        for (tid in json[fid]) {
                            if (json[fid].hasOwnProperty(tid)) {
                                // удаляется тема форума
                                if (f && t && fid === f && t === tid &&
                                        general.root.
                                            confirm('Не отслеживать тему?')) {
                                    continue;
                                }

                                if (_this.toDec(json[fid][tid].d) +
                                        _this.lifeTime > new Date().getTime()) {

                                    if (!tmp[fid]) {
                                        tmp[fid] = {};
                                    }

                                    tmp[fid][tid] = json[fid][tid];
                                }
                            }
                        }
                    }
                }

                stData[7] = JSON.stringify(tmp);
                general.setData(stData);

                if (tableHTML) {
                    _this.getForumTable().innerHTML = tableHTML;
                    _this.processingThemesList();
                }
            };
        };

        /**
         * @method toDec
         * @param   {String} hex
         * @return  {int}
         */
        this.toDec = function (hex) {
            return parseInt(hex, 16);
        };

        /**
         * @method toHex
         * @param   {int}       dec
         * @return  {String}
         */
        this.toHex = function (dec) {
            return Number(dec).toString(16);
        };

        /**
         * @method showHideForum
         */
        this.showHideForum = function () {
            return function () {
                var stData = general.getData(),
                    f = stData[6].split(','),
                    _this = this,
                    ind = /\d+/.exec(_this.id)[0];

                f[ind] = _this.checked ? '1' : '';
                stData[6] = f.join(',');
                general.setData(stData);
            };
        };

        /**
         * @method setSettins
         * @param   {HTMLElement}   table
         * @param   {String}        fid
         */
        this.setSettins = function (table, fid) {
            // кнопка настройки
            var tableContent = table.innerHTML,
                imgSettins = general.doc.createElement('img');

            imgSettins.src = 'http://images.gwars.ru/i/home/properties.gif';
            imgSettins.setAttribute('style', 'cursor: pointer; ' +
                    'margin-left: 10px;');
            imgSettins.setAttribute('title', 'Настройки');

            // кнопка сброса всех данных ветки
            var imgReset = general.doc.createElement('img');
            imgReset.src = 'http://images.gwars.ru/i/home/questlog.gif';
            imgReset.setAttribute('style', 'cursor: pointer; ' +
                    'margin-left: 10px;');
            imgReset.setAttribute('title', 'Сбросить все данные ветки');
            imgReset.addEventListener('click',
                        this.cleanStorage(fid, '', tableContent), false);

            var td = table.querySelector('td');
            td.appendChild(imgSettins);
            td.appendChild(imgReset);

            var _this = this;
            imgSettins.addEventListener('click', function () {
                var themes = [
                        ['Официальные объявления', '1'],
                        ['Вопросы и помощь в игре', '49'],
                        ['Общий Форум', '27'],
                        ['Идеи и предложения', '2'],
                        ['Форум для неигровых тем', '22'],
                        ['Клуб Нытиков', '55'],
                        ['Объявления синдикатов', '38'],
                        ['Вступлю в синдикат', '56'],
                        ['Общение гостей острова', '30'],
                        ['Конкурсы', '3'],
                        ['Благодарности и поздравления', '4'],
                        ['Offline встречи', '6'],
                        ['Креатив', '23'],
                        ['Официальные объявления налоговой инспекции', '24'],
                        ['Официальные объявления суда', '11'],
                        ['Зал суда', '12'],
                        ['Зал бракосочетаний', '29'],
                        ['Дворец Бракосочетания', '50'],
                        ['Техническая поддержка', '17'],
                        ['Баги и глюки (общее)', '18'],
                        ['Баги и глюки (финансовые вопросы)', '19'],
                        ['Проблемы с боями', '20'],
                        ['Проблемы с персонажами', '33'],
                        ['Respect Hill', '25']
                    ],
                    stData = general.getData(),
                    f = stData[6].split(','),
                    str = '',
                    i;

                for (i = 0; i < themes.length; i++) {
                    str += '<tr><td><a target="_blank" ' +
                        'href="http://www.gwars.ru/threads.php?fid=' +
                        themes[i][1] + '">' + themes[i][0] + '</a></td>' +
                        '<td><input id="showForum_' + i + '" ' +
                        'type="checkbox"' + (f[i] ? ' checked' : '') +
                        ' /></td></tr>';
                }

                table.innerHTML = '<tr><td><table><tr><td>Отмечать закрытые ' +
                    'темы</td><td><input id="markClosed" type="checkbox" />' +
                    '</td></tr><tr><td>Не показывать закрытые темы</td>' +
                    '<td><input id="showClosed" type="checkbox" /></td></tr>' +
                    '<tr><td>Не показывать прикрепленки</td><td>' +
                    '<input id="showAttached" type="checkbox" /></td></tr>' +
                    '<tr><td>Интервал перезагрузки страниц с темами форума ' +
                    '(> 4)</td><td><input id="reloadInterval" ' +
                    'maxlength="3" style="width: 40px;" /> сек (0 или пустое ' +
                    'поле - без перезагрузки)</td></tr><tr><td>Звук при ' +
                    'появлении новой темы</td><td>' +
                    new GetSelectSound().init('sound') +
                    '</td></tr><tr><td>Номера исключенных веток форума<br>' +
                    '(параметр fid=xxx в ссылке на форум)</td><td>' +
                    '<input id="exclusion" style="width: ' +
                    '400px;" /></td></tr><tr><td colspan="2" ' +
                    'style="padding-top: 10px;"><span id="return" ' +
                    'style="cursor: pointer; color: #990000; font-weight: ' +
                    'bold;"><< Назад</span></td></tr><tr><td colspan="2" ' +
                    'style="font-weight: bold; padding-top: 10px;">' +
                    'Показывать ветки форума на <a target="_blank" ' +
                    'href="http://www.gwars.ru/forum.php">этой странице' +
                    '</a>:</td></tr>' + str + '</table></td></tr>';

                // чекбокс "Отмечать закрытые"
                var markClosed = general.$('markClosed');
                markClosed.checked = stData[0];
                markClosed.addEventListener('click', function () {
                    var data = general.getData();
                    data[0] = markClosed.checked ? '1' : '';
                    general.setData(data);
                }, false);

                // чекбокс "Не показывать закрытые темы"
                var showClosed = general.$('showClosed');
                showClosed.checked = stData[3];
                showClosed.addEventListener('click', function () {
                    var data = general.getData();
                    data[3] = showClosed.checked ? '1' : '';
                    general.setData(data);
                }, false);

                // чекбокс "Не показывать прикрепленки"
                var showAttached = general.$('showAttached');
                showAttached.checked = stData[4];
                showAttached.addEventListener('click', function () {
                    var data = general.getData();
                    data[4] = showAttached.checked ? '1' : '';
                    general.setData(data);
                }, false);

                // текстовое поле "Интервал перезагрузки страниц"
                var reloadInterval = general.$('reloadInterval');
                reloadInterval.value = stData[2] || '0';
                reloadInterval.addEventListener('input', function () {
                    var data = general.getData(),
                        val = +reloadInterval.value;

                    data[2] = val && val > 4 ? val.toString() : '';
                    general.setData(data);
                }, false);

                // выбор и прослушивание звука
                var selSound = general.$('sound'),
                    lSound = general.$('lsound');

                selSound.disabled = false;
                lSound.disabled = false;
                lSound.addEventListener('click', function () {
                    new PlaySound().init(selSound.value);
                }, false);

                selSound.value = stData[1] || '0';
                selSound.addEventListener('change', function () {
                    var data = general.getData(),
                        val = selSound.value;

                    data[1] = val === '0' ? '' : val;
                    general.setData(data);
                }, false);

                // поле с номерами форумов-исключений
                var exclusion = general.$('exclusion');
                exclusion.value = stData[5];
                exclusion.addEventListener('input', function () {
                    var data = general.getData();
                    data[5] = exclusion.value.replace(/\s+/g, '');
                    general.setData(data);
                }, false);

                // кнопка "Назад"
                general.$('return').addEventListener('click', function () {
                    table.innerHTML = tableContent;
                    _this.processingThemesList();
                }, false);

                // обработчики чекбоксов скрытия/показа форумов
                var chks = table.querySelectorAll('input[id^="showForum_"]');
                for (i = 0; i < chks.length; i++) {
                    chks[i].
                        addEventListener('click', _this.showHideForum(), false);
                }
            }, false);
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'AdvForum:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var stData = general.getData(),
                i;

            // на странице списка форумов
            if (/\/forum\.php$/.test(general.loc)) {
                var allBranches = general.doc.querySelectorAll('tr>' +
                        'td[valign="top"][onclick*="/threads.php?fid="]'),
                    f = stData[6].split(','),
                    j = 0;

                for (i = 0; i < allBranches.length; i++) {
                    if (!(/Форум синдиката #\d+/.
                            test(allBranches[i].innerHTML))) {

                        // noinspection JSUnresolvedVariable
                        allBranches[i].parentNode.style.display = f[j] ?
                                                            '' : 'none';
                        j++;
                    }
                }

                return;
            }

            var fid = this.parseLoc[1];
            // исключенные форумы
            if (new RegExp('(^|,)' + fid + '(,|$)').test(stData[5])) {
                return;
            }

            fid = this.toHex(fid);
            // на странице сообщений в теме
            if (/\/messages\.php\?/.test(general.loc)) {
                var json = JSON.parse(stData[7]),
                    tid = this.toHex(this.parseLoc[3]);

                // нет ветки форума в хранилище
                if (!json[fid]) {
                    json[fid] = {};
                }

                // нет темы в хранилище
                if (!json[fid][tid]) {
                    json[fid][tid] = {
                        d: this.toHex(new Date().getTime()),
                        l: '0', // id последнего сообщения на странице
                        c: ''   // номер последнего сообщения
                    };
                }

                // просматриваем сообщения на странице
                var allMess = general.doc.querySelectorAll('td[id^="cella_"]'),
                    lastSavedId,
                    currMessId;

                for (i = 0; i < allMess.length; i++) {
                    lastSavedId = this.toDec(json[fid][tid].l);
                    currMessId = +(/\d+/.exec(allMess[i].id)[0]);
                    // или сообщение новое или еще не заходили в тему
                    if (lastSavedId < currMessId) {
                        // если это сообщение не наше и уже заходили
                        // в тему, устанавливаем метку "New"
                        if (/\?id=(\d+)/.exec(allMess[i].querySelector('b>a').
                                href)[1] !== general.myID && lastSavedId) {

                            allMess[i].innerHTML = '<span style="color: ' +
                                '#339900; font-weight: bold; float: right;">' +
                                '[New]</span>' + allMess[i].innerHTML;
                        }

                        // если сообщение последнее на странице
                        // запоминаем его данные в хранилище
                        if (!allMess[i + 1]) {
                            json[fid][tid].l = this.toHex(currMessId);
                            json[fid][tid].c = allMess[i].nextElementSibling.
                                querySelector('a').innerHTML;
                            stData[7] = JSON.stringify(json);
                            general.setData(stData);
                        }
                    }
                }

                return;
            }

            // на странице списка тем ветки форума
            if (/\/threads\.php\?/.test(general.loc)) {
                var spanClean = general.doc.createElement('span');
                general.doc.body.appendChild(spanClean);
                spanClean.addEventListener('click',
                            this.cleanStorage('', '', ''), false);
                // удаляем старые темы из хранилища
                spanClean.click();

                this.processingThemesList();
            }
        };
    };

    new AdvForum().init();

}());

