// ==UserScript==
// @name            ComfortablePlayingInGW
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Веселые плюшки для ganjawars.ru
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.user.js
// @include         http://www.ganjawars.ru/*
// @include         http://quest.ganjawars.ru/*
// @include         http://localhost/GW/*
// @grant           none
// @license         MIT
// @version         1.00-250815-dev
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true , ActiveXObject: true */

/*jslint
    browser: true, todo: true, passfail: true, devel: true, regexp: true
    plusplus: true, continue: true, vars: true, nomen: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property cons
         * @type {Object}
         */
        this.cons = this.root.console;
        /**
         * @property version
         * @type {String}
         */
        this.version = '1.00-250815-dev';
        /**
         * @property stString
         * @type {String}
         */
        this.stString = this.version + '@||||||@@|@|||||||||||||||||@|@|||||||';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie);
        /**
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie);
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = (this.myID ? this.myID[2] : '') +
                '_comfortablePlayingInGW';
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
        /**
         * @property viewMode
         * @type {Boolean}
         */
        this.viewMode = /\/warlog\.php/.test(this.loc);
        /**
         * @property nojs
         * @type {Boolean}
         */
        this.nojs = /\/b0\/b\.php/.test(this.loc);
        /**
         * @property mainDomain
         * @type {Boolean}
         */
        this.mainDomain = /\/\/www.ganjawars.ru\//.test(this.loc);
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
         * @method setNewStorage
         */
        setNewStorage: function () {
            var oldSt = this.st.getItem(this.STORAGENAME);
            if (!oldSt) {
                this.st.setItem(this.STORAGENAME, this.stString);
                return;
            }

            // если были старые данные, переносим их в новую storage-строку
            var newSt = this.stString.split('@');
            oldSt = oldSt.split('@');
            var nSt, oSt, i, j;
            for (i = 1; i < oldSt.length; i++) {
                nSt = newSt[i].split('|');
                if (nSt.length === 1) {
                    newSt[i] = oldSt[i];
                    continue;
                }

                oSt = oldSt[i].split('|');
                for (j = 0; j < oSt.length; j++) {
                    nSt[j] = oSt[j];
                }

                newSt[i] = nSt.join('|');
            }

            this.st.setItem(this.STORAGENAME, newSt.join('@'));
        },

        /**
         * @method getData
         * @param   {int}   ind
         * @return  {Array}
         */
        getData: function (ind) {
            return this.st.getItem(this.STORAGENAME).
                split('@')[ind].split('|');
        },

        /**
         * @method setData
         * @param   {String|Array}  data
         * @param   {int}           ind
         */
        setData: function (data, ind) {
            var dt = this.st.getItem(this.STORAGENAME).split('@');
            dt[ind] = typeof data !== 'string' ? data.join('|') : data;
            this.st.setItem(this.STORAGENAME, dt.join('@'));
        },

        /**
         * @method getInitScript
         * @return  {Array}
         */
        getInitScript: function () {
            if (this.mainDomain) {
                return this.getData(1);
            }

            return [];
        },

        /**
         * @method $
         * @param   {string}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
        },

        /**
         * @method checkMainData
         * @return  {Boolean}
         */
        checkMainData: function () {
            if (!this.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'Comfortable Playing In GW\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return false;
            }

            if (this.mainDomain) {
                if (!this.myID || !this.DESIGN_VERSION) {
                    this.cons.log('!this.myID || !this.DESIGN_VERSION');
                    return false;
                }

                if (!this.st.getItem(this.STORAGENAME) ||
                        this.getData(0)[0] !== this.version) {
                    this.setNewStorage();
                }

                this.myID = this.myID[2];
                this.DESIGN_VERSION = this.DESIGN_VERSION[2];
            }

            return true;
        }
    };

    var general, initScript;

    /**
     * @class NotGiveCannabisLeaf
     * @constructor
     */
    var NotGiveCannabisLeaf = function () {
        /**
         * @method  changeFavicon
         */
        this.changeFavicon = function () {
            var head = general.doc.querySelector('head');

            if (head) {
                var linkTags = head.querySelectorAll('link[rel*="icon"]'),
                    i;

                for (i = 0; i < linkTags.length; i++) {
                    head.removeChild(linkTags[i]);
                }

                var link = general.doc.createElement('link');
                link.setAttribute('type', 'image/x-icon');
                link.setAttribute('rel', 'shortcut icon');
                link.setAttribute('href',
                        /** TODO исправить images_for_scripts
                         * на imagesForScripts
                         */
                        'http://gwscripts.ucoz.net/images_for_scripts/' +
                        'notgivecannabisleaf/favicon.ico');
                head.appendChild(link);
            }
        };

        /**
         * @method  changeIcons
         */
        this.changeIcons = function () {
            var imgPath = general.imgPath + 'NotGiveCannabisLeaf/',
                imgOn = imgPath + 'on.gif',
                imgOff = imgPath + 'off.gif',
                imgs = general.doc.querySelectorAll('img'),
                src,
                i;

            for (i = 0; i < imgs.length; i++) {
                src = imgs[i].getAttribute('src');
                if (/\/i\/gon\.gif|\/info\.online\.php\?id=/.test(src)) {
                    imgs[i].setAttribute('src', imgOn);
                } else if (/\/i\/goff\.gif/.test(src)) {
                    imgs[i].setAttribute('src', imgOff);
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            this.changeFavicon();
            if (!(/\/news\.php\?set=1/.test(general.loc))) {
                this.changeIcons();
            }
        };
    };

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
            if (!sound || sound === '0') {
                return;
            }

            var fl = general.$('_flashcontent');
            if (!fl) {
                fl = general.doc.createElement('div');
                fl.id = '_flashcontent';
                general.doc.body.appendChild(fl);
            }

            fl.innerHTML = '<embed ' +
                'flashvars="soundPath=http://www.ganjawars.ru/sounds/' + sound +
                '.mp3" allowscriptaccess="always" quality="high" height="1" ' +
                'width="1" src="http://images.ganjawars.ru/i/play.swf" ' +
                'type="application/x-shockwave-flash" pluginspage=' +
                '"http://www.macromedia.com/go/getflashplayer" />';
        };
    };

    /**
     * @class GetRandom
     * @constructor
     */
    var GetRandom = function () {
        /**
         * @method init
         * @param   {int}   a
         * @param   {int}   b
         * @return  {int}
         */
        this.init = function (a, b) {
            return Math.round(a + (b - a) * Math.random());
        };
    };

    /**
     * @class GetTopPanel
     * @constructor
     */
    var GetTopPanel = function () {
        /**
         * @method init
         * @return  {HTMLElement|null}
         */
        this.init = function () {
            // ищем верхнюю панель "Новости | Об игре | Форум"
            if (general.DESIGN_VERSION === 'v2') {  // новый дизайн
                return general.doc.querySelector('td.gw-header-col2 ' +
                        'div:first-child nobr:first-child');
            }

            return general.doc.querySelector('td.txt nobr:first-child');
        };
    };

    /**
     * @class SetSettingsButton
     * @constructor
     */
    var SetSettingsButton = function () {
        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();

            if (topPanel) {
                var settingsButton = general.doc.createElement('a');
                var target = topPanel.parentNode.nextElementSibling;
                settingsButton.innerHTML = '<img src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" whidth="15" height="15" ' +
                    'title="Настройки" alt="Настройки" />';
                settingsButton.setAttribute('href',
                        'http://www.ganjawars.ru/news.php?set=1');
                target.insertBefore(settingsButton, target.firstChild);
            }
        };
    };

    /**
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method createRequestObject
         * @return  {Object|null}
         */
        this.createRequestObject = function () {
            try {
                return new XMLHttpRequest();
            } catch (e) {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e1) {
                    try {
                        return new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e2) {
                        return null;
                    }
                }
            }
        };

        /**
         * @method ajaxQuery
         * @param   {String}        url
         * @param   {String}        rmethod
         * @param   {String|null}   param
         * @param   {Boolean}       async
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, rmethod, param, async, onsuccess,
                onfailure) {
            var xmlHttpRequest = this.createRequestObject();

            if (!xmlHttpRequest) {
                general.cons.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open(rmethod, url, async);

            if (rmethod === 'POST') {
                xmlHttpRequest.setRequestHeader('Content-Type',
                    'application/x-www-form-urlencoded');
            }

            xmlHttpRequest.send(param);

            if (async) {
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
            } else {
                if (xmlHttpRequest.status === 200 && onsuccess) {
                    onsuccess(xmlHttpRequest);
                } else {
                    if (xmlHttpRequest.status !== 200 && onfailure) {
                        onfailure(xmlHttpRequest);
                    }
                }
            }
        };
    };

    /**
     * @class CheckInputText
     * @constructor
     */
    var CheckInputText = function () {
        /**
         * @method init
         * @param   {Object}    inp
         * @param   {int}       limit
         * @return  {Boolean}
         */
        this.init = function (inp, limit) {
            var _inp = inp,
                val = _inp.value,
                lim = limit || 0;

            return !(!val || isNaN(+val) || +val < lim);
        };
    };

    /**
     * @class ShowMainSettings
     * @constructor
     */
    var ShowMainSettings = function () {
        /**
         * @method getSelectSound
         * @param   {String}    id
         * @return  {String}
         */
        this.getSelectSound = function (id) {
            return '<select id="' + id + '" disabled>' +
                '<option value="0">Без звука</option>' +
                '<option value="1">Перезарядка</option>' +
                '<option value="2">Выстрел дробовика</option>' +
                '<option value="3">Открытие двери</option>' +
                '<option value="4">Взрыв бочки</option>' +
                '<option value="5">Выстрел BFG</option>' +
                '<option value="6">Радио-зуммер</option>' +
                '<option value="7">Подтверждение цели</option>' +
                '<option value="8">Ion Cannon Ready!</option>' +
                '<option value="9">Select target!</option>' +
                '<option value="10">Звук тревоги</option>' +
                '<option value="11">I`m alive!</option>' +
                '<option value="12">Орки смеются</option>' +
                '<option value="13">Unholy Armor</option>' +
                '<option value="14">We`ve been attacked!</option>' +
                '<option value="15">Кот мяукает</option>' +
                '<option value="16">Кот мяукает #2</option>' +
                '<option value="17">Take cover!</option>' +
                '<option value="18">Stupid!</option>' +
                '<option value="19">Hello!</option>' +
                '<option value="20">hehehehe!</option>' +
                '<option value="21">Chimes</option>' +
                '<option value="22">Ding</option>' +
                '<option value="23">Ошибка</option>' +
                '<option value="24">Отказ оборудования</option>' +
                '<option value="25">А, вот эти ребята</option>' +
                '<option value="26">Не-не-не-не!</option>' +
                '<option value="27">нет, Девид Блейн, нет!</option>' +
                '<option value="28">Я делаю особую магию</option>' +
                '<option value="29">Prepare for battle!</option>' +
                '<option value="30">Pick up your weapons</option>' +
                '</select>';
        };

        /**
         * @property infoScripts
         * @type {Object}
         */
        this.infoScripts = {
            'Персонаж': [
                ['Логотип игры', 'На всех страницах заменяет логотип игры ' +
                    '&nbsp;&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122, 0.5);" src="http://images.ganjawars.' +
                    'ru/i/gon.gif" /> &nbsp;&nbsp;на зеленый листик &nbsp;' +
                    '&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122,0.5);" src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" />', '0'],
                ['Дополнение для панели навигации',
                    'Добавляет возможность установить дополнительные ссылки ' +
                    'в панель навигации.', '1'],
                ['Подсветка персонажей из ЧС', 'Подсвечивает ссылки на ' +
                    'персонажей, входящих в черный список на всех страницах ' +
                    'игры. Делает неактивной ссылку принятия боя c ' +
                    'персонажем из черного списка в одиночных боях.<br><br>' +
                    '&nbsp;&nbsp;<a target="_blank" href=' +
                    '"http://www.ganjawars.ru/home.friends.php">Запомнить ' +
                    'черный список</a> (скрипт должен быть включен)<br>' +
                    '<input type="checkbox" id="blockBLOne2One" disabled> ' +
                    'блокировать ссылку принятия боя с персонажем из ЧС в ' +
                    'одиночных заявках', '4'],
                ['Работа, письмо, посылка, граната, слом', 'Окончание ' +
                    'работы, осталось времени работать, почта, посылка, ' +
                    'присутствие гранаты на поясе, проверка сломанных вещей. ' +
                    'На все события оповещения звуковые и визуальные.<br><b>' +
                    'P.S.</b> Гранатомет в руках расценивается как ' +
                    'присутствие гранаты.<br><br><input type="checkbox" ' +
                    'id="showwork" disabled /> отображать время работы<br>' +
                    '<input type="checkbox" id="showsms" disabled /> ' +
                    'отображать получение почты/посылки<br><input ' +
                    'type="checkbox" id="showbroken" disabled /> отображать ' +
                    'наличие сломанных предметов<br><input type="checkbox" ' +
                    'id="showgren" disabled /> отображать отсутствие гранаты ' +
                    'на поясе<br>Звук при получении почты: ' +
                    this.getSelectSound('soundSms') + ' <input type="button" ' +
                    'id="listenSoundSms" value="»" disabled><br>Звук ' +
                    '"Пора работать": &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '&nbsp;&nbsp;&nbsp;' + this.getSelectSound('soundWork') +
                    ' <input type="button" id="listenSoundWork" value="»" ' +
                    'disabled>', '5'],
                ['Ресурсы и бонусы', 'Создает ссылки "Ресурсы" и "Бонусы" ' +
                    'вверху страницы. При клике выводятся соответствующие ' +
                    'данные.', '6']],

            'Бои': [
                ['Дополнение для боев', 'Генератор ходов(только подсветка ' +
                    'хода), нумерация противников, расширенная информация в ' +
                    'списке выбора противника, сортировка списка, ДЦ, ' +
                    'продвинутое расположение бойцов на поле боя как в бою, ' +
                    'так и в режиме наблюдения за боем, полный лог боя в НЕ ' +
                    'JS-версии, кнопка "Сказать ход", быстрая вставка ника в ' +
                    'поле чата. Информация вверху страницы боя о набитом HP, ' +
                    'вашем здоровье и т.д. При щелчке на картинке противника ' +
                    'происходит его выбор в качестве цели. Кнопка "Обновить" ' +
                    'на поле боя. В JS-версии боя подсвечивает зеленым ' +
                    'цветом тех персонажей, которые уже сделали ход. В обоих ' +
                    'версиях выводит количество персонажей, сделавших ход.' +
                    '<br><br><span style="color: #FF0000">Не ставьте ' +
                    'значения менее 3 секунд.</span><br>Таймаут обновления ' +
                    'данных в бою: <input id="refreshBattle" type="text" ' +
                    'maxlength="3" style="width: 30px;" value="' +
                    (general.getData(4)[0] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)<br>Таймаут обновления ' +
                    'заявки при входе в нее: <input id="refreshAppl" type="' +
                    'text" maxlength="3" style="width: 30px;" value="' +
                    (general.getData(4)[1] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)', '3']],

            'Доска объявлений': [
                ['Фильтр поиска аренды/продажи', 'Фильтр онлайн/оффлайн и по ' +
                    'островам на странице поиска аренды/продажи предметов.',
                    '2']],

            'Ферма': []
        };

        /**
         * @method showHideScriptInfo
         */
        this.showHideScriptInfo = function () {
            var _this = this,
                info = _this.parentNode.lastElementChild;

            if (info.style.display) {
                info.style.display = '';
                _this.innerHTML = '[&minus;]';
            } else {
                info.style.display = 'none';
                _this.innerHTML = '[+]';
            }
        };

        /**
         * @method onOffScript
         */
        this.onOffScript = function () {
            var _this = this,
                ind = /chk(\d+)/.exec(_this.id)[1],
                hiddenDiv = _this.nextElementSibling,
                inp = hiddenDiv.querySelectorAll('input'),
                sel = hiddenDiv.querySelectorAll('select'),
                i;

            initScript[ind] = _this.checked ? '1' : '';
            general.setData(initScript, 1);

            // выкл/вкл элементы управления настройками
            for (i = 0; i < inp.length; i++) {
                inp[i].disabled = !_this.checked;
            }

            for (i = 0; i < sel.length; i++) {
                sel[i].disabled = !_this.checked;
            }
        };

        /**
         * @method checkScriptUpdate
         */
        this.checkScriptUpdate = function () {
            var url = 'http://www.ganjawars.ru/object-messages.php?' +
                'id=117721&tid=88232514&fid=117721&page_id=last';
            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var v = /version: ([^<]+)<\/td>/.exec(xml.responseText);
                if (v) {
                    if (v[1] !== general.version) {
                        general.$('linkNewVerScript').style.
                            visibility = 'visible';
                        general.$('refreshVer').innerHTML = '(' + v[1] + ')';
                    }
                }
            }, null);
        };

        /**
         * @method setSettingsForAdvBattleAll
         */
        this.setSettingsForAdvBattleAll = function () {
            var _this = this,
                ind = _this.id === 'refreshBattle' ? 0 : 1,
                data = general.getData(4);

            data[ind] = new CheckInputText().init(_this, 3) ?
                    _this.value : '';
            general.setData(data, 4);
        };

        /**
         * @method testSound
         */
        this.testSound = function () {
            var _this = this;
            new PlaySound().init(_this.previousElementSibling.value);
        };

        /**
         * @method init
         */
        this.init = function () {
            var str = '<div style="margin-bottom: 10px;"><a id="' +
                    'linkNewVerScript" target="_blank" style="color: ' +
                    '#008000; visibility: hidden;" href="https://raw.' +
                    'githubusercontent.com/MyRequiem/comfortablePlayingInGW/' +
                    'master/_comfortablePlayingInGW.user.js">Доступна новая ' +
                    'версия</a> <span id="refreshVer"></span></div><table ' +
                    'style="width: 100%; box-shadow: 8px 10px 7px ' +
                    'rgba(122,122,122,0.5);">',
                groupStyle = ' style="background-color: #D0EED0; text-align: ' +
                    'center; color: #990000;"><b>',
                spanStyle = ' style="cursor: pointer;">',
                tdStyle = ' style="background-color: #E0FFE0;">',
                hiddenDivStyle = ' style="display: none; padding-left: 50px; ' +
                    'background-color: #E7E7E7">',
                prop,
                i;

            // формирование таблицы настроек
            for (prop in this.infoScripts) {
                if (this.infoScripts.hasOwnProperty(prop)) {
                    str += '<tr><td' + groupStyle + prop + '</b></td></tr>';

                    for (i = 0; i < this.infoScripts[prop].length; i++) {
                        str += '<tr><td' + tdStyle + '<span' + spanStyle +
                            '[+]</span> ' + '<input id="chk' +
                            this.infoScripts[prop][i][2] +
                            '" type="checkbox" /> ' +
                            this.infoScripts[prop][i][0] + '<div' +
                            hiddenDivStyle + this.infoScripts[prop][i][1] +
                            '</div></td></tr>';
                    }
                }
            }

            str += '</table>';
            var settingsContainer = general.doc.querySelector('tr>td.txt' +
                    '[valign="top"]');
            settingsContainer.innerHTML = '<div></div>';
            settingsContainer = settingsContainer.firstElementChild;
            settingsContainer.setAttribute('style', 'margin: 10px 0 20px 0');
            settingsContainer.innerHTML = str;

            // проверка обновлений
            this.checkScriptUpdate();

            // обрабочики открытия/закрытия скрытых контейнеров описания
            // скрипта, обработчики чекбоксов и установка значений чекбоксов
            var spans = settingsContainer.
                    querySelectorAll('span[style="cursor: pointer;"]'),
                chkid,
                chk;

            for (i = 0; i < spans.length; i++) {
                spans[i].addEventListener('click',
                        this.showHideScriptInfo, false);
                chk = spans[i].nextElementSibling;
                chk.addEventListener('click', this.onOffScript, false);
                chkid = +(/chk(\d+)/.exec(chk.getAttribute('id')))[1];
                if (initScript[chkid]) {
                    chk.click();
                }
            }

            // обработчики текстовых полей модуля дополнений для боев
            general.$('refreshBattle').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);
            general.$('refreshAppl').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);

            // чекбокс настроек подсветки персонажей из черного списка
            // (блокировать или нет ссылку принятия боя в одиночках)
            var chkBL = general.$('blockBLOne2One');
            chkBL.checked = general.getData(5)[1] === '1';
            chkBL.addEventListener('click', function () {
                var stData = general.getData(5);
                stData[1] = general.$('blockBLOne2One').checked ? '1' : '';
                general.setData(stData, 5);
            }, false);

            // работа, слом, грена, почта/посылка
            // кнопки прослушать звук
            general.$('listenSoundSms').
                addEventListener('click', this.testSound, false);
            general.$('listenSoundWork').
                addEventListener('click', this.testSound, false);
            // установка списка выбора звуков sms и "Пора работать"
            general.$('soundSms').value = general.getData(6)[6] || '0';
            general.$('soundWork').value = general.getData(6)[7] || '0';
            // обработчики списков выбора звука
            general.$('soundSms').addEventListener('change', function () {
                var tmp = general.getData(6),
                    _this = this;

                tmp[6] = _this.value === '0' ? '' : _this.value;
                general.setData(tmp, 6);
            }, false);
            general.$('soundWork').addEventListener('change', function () {
                var tmp = general.getData(6),
                    _this = this;

                tmp[7] = _this.value === '0' ? '' : _this.value;
                general.setData(tmp, 6);
            }, false);
            // чекбоксы настроек
            general.$('showwork').checked = general.getData(6)[2];
            general.$('showwork').addEventListener('click', function () {
                var tmp = general.getData(6),
                    _this = this;

                tmp[2] = _this.checked ? '1' : '';
                general.setData(tmp, 6);
            }, false);
            general.$('showsms').checked = general.getData(6)[3];
            general.$('showsms').addEventListener('click', function () {
                var tmp = general.getData(6),
                    _this = this;

                tmp[3] = _this.checked ? '1' : '';
                general.setData(tmp, 6);
            }, false);
            general.$('showbroken').checked = general.getData(6)[4];
            general.$('showbroken').addEventListener('click', function () {
                var tmp = general.getData(6),
                    _this = this;

                    tmp[4] = _this.checked ? '1' : '';
                general.setData(tmp, 6);
            }, false);
            general.$('showgren').checked = general.getData(6)[5];
            general.$('showgren').addEventListener('click', function () {
                var tmp = general.getData(6),
                    _this = this;

                tmp[5] = _this.checked ? '1' : '';
                general.setData(tmp, 6);
            }, false);
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
     * @class AdditionForNavigationBar
     * @constructor
     */
    var AdditionForNavigationBar = function () {
        /**
         * @property navigPanel
         * @type {HTMLElement|null}
         */
        this.navigPanel = null;
        /**
         * @property divMain
         * @type {HTMLDivElement|null}
         */
        this.divMain = null;

        /**
         * @method addLink
         * @param   {HTMLElement}   link
         */
        this.addLink = function (link) {
            // добавление в панель
            var target = this.navigPanel.
                    lastElementChild.previousSibling;
            this.navigPanel.insertBefore(general.doc.createTextNode(' | '),
                    target);
            this.navigPanel.insertBefore(link, target);

            // добавление ссылки и кнопы ее удаления в основной div
            var divLink = general.doc.createElement('div');

            var linkClone = link.cloneNode(true);
            linkClone.style.fontSize = '9pt';
            divLink.appendChild(linkClone);

            var delLinkButton = general.doc.createElement('span');
            delLinkButton.setAttribute('style', 'margin-left: 2px; ' +
                    'cursor: pointer; font-size: 7pt;');
            delLinkButton.innerHTML = '[x]';
            divLink.appendChild(delLinkButton);

            this.divMain.insertBefore(divLink,
                    this.divMain.lastElementChild);

            // обработчик кнопы удаления ссылки
            var _this = this;
            delLinkButton.addEventListener('click', function () {
                var thisLink = this,
                    linkName = thisLink.previousElementSibling.innerHTML,
                    allPanelLinks = _this.navigPanel.querySelectorAll('a'),
                    i;

                // удаляем ссылку из панели
                for (i = 0; i < allPanelLinks.length; i++) {
                    if (allPanelLinks[i].innerHTML === linkName) {
                        _this.navigPanel.removeChild(allPanelLinks[i].
                            previousSibling);
                        _this.navigPanel.removeChild(allPanelLinks[i]);
                        break;
                    }
                }

                // удаляем ссылку из div'а
                _this.divMain.removeChild(thisLink.parentNode);

                // удаляем запись из хранилища
                var dataSt = JSON.parse(general.getData(2)[0]),
                    temp = {},
                    name;

                for (name in dataSt) {
                    if (dataSt.hasOwnProperty(name)) {
                        if (name === linkName) {
                            continue;
                        }

                        temp[name] = dataSt[name];
                    }
                }

                general.setData(JSON.stringify(temp), 2);
            }, false);
        };

        /**
         * @method createLink
         * @param   {String}    name
         * @param   {Array}     attr    href, style
         * @return  {HTMLElement}
         */
        this.createLink = function (name, attr) {
            var link = general.doc.createElement('a');
            link.setAttribute('style', 'color: #669966; text-decoration: ' +
                    'none; font-size: 7pt;' + attr[1]);
            link.innerHTML = name;
            link.href = attr[0];
            return link;
        };

        /**
         * @method clearFields
         */
        this.clearFields = function () {
            general.$('lname').value = '';
            general.$('lhref').value = '';
            general.$('lstyle').value = '';
        };

        /**
         * @method init
         */
        this.init = function () {
            this.navigPanel = general.DESIGN_VERSION === 'v2' ?
                    general.doc.querySelector('div[style="position: ' +
                        'relative; left: 0; top: 0; width:100%; ' +
                        'font-size:7pt;color:#669966;"] ' +
                        'center:first-child') :
                    general.doc.querySelector('td[style="font-size:7pt;' +
                        'color:#669966;"]');

            if (!this.navigPanel) {
                return;
            }

            var dataSt = general.getData(2)[0];
            if (!dataSt) {
                dataSt = '{}';
                general.setData(dataSt, 2);
            }

            dataSt = JSON.parse(dataSt);

            // добавляем в панель кнопу для создания ссылки
            var addLinkButton = general.doc.createElement('span');
            addLinkButton.setAttribute('style', 'cursor: pointer;');
            addLinkButton.innerHTML = '+';
            this.navigPanel.appendChild(general.doc.createTextNode(' | '));
            this.navigPanel.appendChild(addLinkButton);

            var _this = this;
            // обработчик открытия/закрытия div'а
            addLinkButton.addEventListener('click', function () {
                _this.divMain.style.display = _this.divMain.style.display ?
                        '' : 'none';
                _this.clearFields();
            }, false);

            // div для добавления ссылок
            var divAddLink = general.doc.createElement('div');
            divAddLink.setAttribute('style', 'margin-top: 5px;');
            divAddLink.innerHTML = 'Название:<br><input id="lname" ' +
                'type="text" maxlength="20" style="width: 237px;" /><br>' +
                'Ссылка:<br><input id="lhref" style="width: 237px;" ' +
                'value="http://"/><br>Стиль, например: "color: blue;"<br>' +
                '<input id="lstyle" type="text" style="width: 237px;" />' +
                '<br><span id="set_link" style="cursor: pointer; color: ' +
                '#0000FF;">Добавить</span><span id="hide_nav_div" ' +
                'style="cursor: pointer; margin-left: 20px; color: ' +
                '#FF0000;">Закрыть</span>';
            this.divMain = general.doc.createElement('div');
            this.divMain.appendChild(divAddLink);

            var pos = new GetPos().init(addLinkButton);
            this.divMain.setAttribute('style', 'position: absolute; ' +
                'display: none; border: 1px #339933 solid; background: ' +
                '#F0FFF0; width: 240px; font-size: 8pt; padding: 3px; ' +
                'left: ' + (pos.x - 260) + '; top: ' + (pos.y + 12) + ';');
            general.doc.body.appendChild(this.divMain);

            // добавляем ссылки из хранилища в панель и в div
            var linkName, lnk;
            for (linkName in dataSt) {
                if (dataSt.hasOwnProperty(linkName)) {
                    lnk = this.createLink(linkName, dataSt[linkName]);
                    this.addLink(lnk);
                }
            }

            // кнопа закрытия div'а
            general.$('hide_nav_div').addEventListener('click',
                function () {
                    _this.clearFields();
                    _this.divMain.style.display = 'none';
                }, false);

            // обработчик кнопы добавления ссылки
            general.$('set_link').addEventListener('click', function () {
                var name = general.$('lname').value,
                    href = general.$('lhref').value,
                    style = general.$('lstyle').value;

                if (!name || !href) {
                    alert('Не верно введены данные');
                    return;
                }

                var allPanelLinks = _this.navigPanel.querySelectorAll('a'),
                    i;

                for (i = 0; i < allPanelLinks.length; i++) {
                    if (allPanelLinks[i].innerHTML === name) {
                        alert('Ссылка с таким названием уже существует');
                        return;
                    }
                }

                // создаем ссылку и втыкаем ее в панель и в div
                var newLink = _this.createLink(name, [href, style]);
                _this.addLink(newLink);

                // добавляем данные в хранилище
                var dtSt = JSON.parse(general.getData(2)[0]);
                dtSt[name] = [href, style];
                general.setData(JSON.stringify(dtSt), 2);

                _this.clearFields();
            }, false);
        };
    };

    /**
     * @class AdsFilter
     * @constructor
     */
    var AdsFilter = function () {
        /**
         * @property spanContainer
         * @type {HTMLElement|null}
         */
        this.spanContainer = null;
        /**
         * @property stl
         * @type {String}
         */
        this.stl = 'cursor: pointer; margin-right: 3px; ';
        /**
         * @property styleNormal
         * @type {String}
         */
        this.styleNormal = this.stl + 'color: #808080';
        /**
         * @property styleBold
         * @type {String}
         */
        this.styleBold =  this.stl + 'color: #990000; font-weight: bold;';

        /**
         * @method setButton
         * @param   {String}        id
         * @param   {String}        value
         */
        this.setButton = function (id, value) {
            var button = general.doc.createElement('span');
            button.setAttribute('style', this.styleNormal);
            button.id = id;
            button.innerHTML = value;
            this.spanContainer.appendChild(button);
        };

        /**
         * @method setFilter
         * @param   {NodeList}  trs
         * @param   {String}    type
         * @param   {String}    island
         */
        this.setFilter = function (trs, type, island) {
            var dataSt = general.getData(3),
                i;

            switch (type) {
            case 'reset':
                if (!island) {
                    general.setData('|', 3);
                    general.$('islZ').setAttribute('style', this.styleNormal);
                    general.$('islG').setAttribute('style', this.styleNormal);
                    general.$('online').setAttribute('style', this.styleNormal);
                }

                for (i = 3; i < trs.length; i++) {
                    trs[i].style.display = '';
                }

                break;

            case 'island':
                this.setFilter(trs, 'reset', 'flag');
                dataSt[0] = island === 'Z' ? '1' : '2';
                general.setData(dataSt, 3);
                general.$('isl' + island).setAttribute('style', this.styleBold);
                general.$('isl' + (island === 'G' ? 'Z' : 'G')).
                    setAttribute('style', this.styleNormal);

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('td:nth-child(4)').
                                innerHTML.indexOf(island) === -1) {
                        trs[i].style.display = 'none';
                    }
                }

                if (dataSt[1]) {
                    this.setFilter(trs, 'online', 'flag');
                }

                break;

            case 'online':
                if (!island) {
                    dataSt[1] = '1';
                    general.setData(dataSt, 3);
                    general.$('online').setAttribute('style', this.styleBold);
                }

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('a[style*="#999999"]')) {
                        trs[i].style.display = 'none';
                    }
                }

                break;

            default:
                break;
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var table = general.doc.querySelector('table.wb[align="center"]');
            if (!table) {
                return;
            }

            var li = table.querySelector('li');
            if (!li) {
                return;
            }

            this.spanContainer = general.doc.createElement('span');
            this.spanContainer.setAttribute('style', 'margin-left: 10px;');
            this.setButton('islz', '[Z]');
            this.setButton('islg', '[G]');
            this.setButton('online', '[Online]');
            this.setButton('resetFilter', '[Сброс]');
            li.insertBefore(this.spanContainer, li.lastElementChild);
            if (this.spanContainer.previousElementSibling.nodeName === 'BR') {
                li.removeChild(this.spanContainer.previousElementSibling);
            }

            var trs = table.querySelectorAll('tr'),
                _this = this;

            general.$('resetFilter').addEventListener('click', function () {
                _this.setFilter(trs, 'reset', null);
            }, false);

            general.$('islZ').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'Z');
            }, false);

            general.$('islG').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'G');
            }, false);

            general.$('online').addEventListener('click', function () {
                _this.setFilter(trs, 'online', null);
            }, false);

            var dataSt = general.getData(3);
            if (dataSt[0] === '1') {
                general.$('islZ').click();
            } else if (dataSt[0] === '2') {
                general.$('islG').click();
            }

            if (dataSt[1]) {
                general.$('online').click();
            }
        };
    };

    /**
     * @class AdvBattleAll
     * @constructor
     */
    var AdvBattleAll = function () {
        /**
         * @property inpTextChat
         * @type {HTMLInputElement|null}
         */
        this.inpTextChat = null;
        /**
         * @property myInfoTopPanel
         * @type {HTMLTableCellElement|null}
         */
        this.myInfoTopPanel = null;
        /**
         * @property tooltip
         * @type {HTMLDivElement|null}
         */
        this.tooltip = null;
        /**
         * @property intervalUpdateInpTextChat
         * @type {int|null}
         */
        this.intervalUpdateInpTextChat = null;
        /**
         * @property sayMoveButton
         * @type {HTMLInputElement|null}
         */
        this.sayMoveButton = null;
        /**
         * @property enemies
         * @type {Object|null}
         */
        this.enemies = null;
        /**
         * @property leftRightCommands
         * @type {Array}
         */
        this.leftRightCommands = [];
        /**
         * @property allFighters
         * @type {Object}
         */
        // объекты всех бойцов на поле
        // {"name": {"hp": x, ...}, "name": {...}, ... }
        this.allFighters = {};
        /**
         * @property leftPers
         * @type {Array|null}
         */
        this.leftPers = null;
        /**
         * @property rightPers
         * @type {Array|null}
         */
        this.rightPers = null;
        /**
         * @property myPers
         * @type {Object|null}
         */
        this.myPers = null;
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'AdvBattleAll/';
        /**
         * @property tmRefreshBattle
         * @type {int}
         */
        this.tmRefreshBattle = 0;
        /**
         * @property tmHighlightPers
         * @type {int}
         */
        this.tmHighlightPers = 0;
        /**
         * @property graphTable
         * @type {HTMLTableElement|null}
         */
        this.graphTable = null;

        /**
         * @metod getRandom1to3
         * @return  {int}
         */
        this.getRandom1to3 = function () {
            return (Math.round((Math.random() * 1000)) % 3) + 1;
        };

        /**
         * @method clearSavedStrokeAfterSay
         */
        this.clearSavedStrokeAfterSay = function () {
            var dataSt = general.getData(4);
            dataSt[11] = '';
            dataSt[12] = '';
            dataSt[13] = '';
            dataSt[14] = '';
            dataSt[15] = '';
            dataSt[16] = '';
            general.setData(dataSt, 4);
        };
        /**
         * @metod sayMove
         * @param   {Object}    _this
         */
        this.sayMove = function (_this) {
            // куда отходим
            var def = general.doc.querySelector('input[type="radio"]' +
                    '[name="defence"]:checked'),
                dataSt = general.getData(4);

            dataSt[14] = def ? (/\d/.exec(def.id)[0]) : _this.getRandom1to3();

            // подходим или нет
            dataSt[16] = general.doc.querySelector('input[type="checkbox"]' +
                    '[name="walk"]:checked') ? '1' : '';

            // номер противника
            var enemyList = general.$('euids').querySelectorAll('option'),
                reg = /^(\d+)\. .*\[\d+ \/ \d+\] ([^:]+):/,
                enemy = '',
                i;

            for (i = 0; i < enemyList.length; i++) {
                if (enemyList[i].selected) {
                    enemy = reg.exec(enemyList[i].innerHTML);
                    break;
                }
            }
            dataSt[11] = enemy[1];

            // кнопка отправки сообщения в чат
            var writeOnChatButton = general.doc.querySelector('input' +
                    '[type="submit"][value="Написать"]'),
                str = '~';

            // граната
            if (general.doc.querySelector('input[type="checkbox"]' +
                    '[name="use_grenade"]:checked')) {
                str += general.doc.querySelector('label[for="bagaboom"]').
                    innerHTML.replace(/: бросить/, '');
                dataSt[15] = '1';
                general.setData(dataSt, 4);
                _this.inpTextChat.value = str + ' в ' + enemy[1] +
                    ' [' + enemy[2] + ' ]';
                writeOnChatButton.click();
                return;
            }

            var leftAttack = general.doc.querySelector('input[type="radio"]' +
                '[name^="left_attack"]:checked'),
                rightAttack = general.doc.querySelector('input[type="radio"]' +
                    '[name^="right_attack"]:checked');

            if (!leftAttack && !rightAttack) {
                alert('Не выбрано направление стрельбы');
                return;
            }

            dataSt[12] = leftAttack ? (/\d/.exec(leftAttack.id)[0]) : '';
            dataSt[13] = rightAttack ? (/\d/.exec(rightAttack.id)[0]) : '';

            general.setData(dataSt, 4);
            str += enemy[1] + ' [' + enemy[2] + '] ';
            if (dataSt[13]) {
                str += dataSt[13] === '1' ? 'ле' :
                        dataSt[13] === '2' ? 'ц' : 'пр';
            }
            if (dataSt[12]) {
                str += dataSt[12] === '1' ? ' ле' :
                        dataSt[12] === '2' ? ' ц' : ' пр';
            }

            _this.inpTextChat.value = str;
            writeOnChatButton.click();
        };

        /**
         * @method clearMarkStroke
         */
        this.clearMarkStroke = function () {
            var labels = this.getBattleField().querySelectorAll('label' +
                    '[style^="background-color"]'),
                i;

            for (i = 0; i < labels.length; i++) {
                labels[i].removeAttribute('style');
            }
        };

        /**
         * @method getLeftRightCommands
         */
        this.getLeftRightCommands = function () {
            if (this.leftRightCommands.length) {
                return;
            }

            if (general.nojs || general.viewMode) {
                var str = general.nojs ? '[class="txt"]' : '[width="15%"]';
                this.leftRightCommands.push(general.doc.
                        querySelector('tr>td[valign="top"]' + str +
                            ':first-child'));
                this.leftRightCommands.push(general.doc.
                        querySelector('tr>td[valign="top"]' + str +
                            ':last-child'));
                return;
            }

            // в JS версии боя ищем DIV'ы с бойцами явно,
            // т.к.они меняются местами по ID
            this.leftRightCommands.push(general.doc.querySelector('#listleft,' +
                        '#listright'));
            this.leftRightCommands[1] =
                this.leftRightCommands[0].id === 'listleft' ?
                        general.doc.querySelector('#listright') :
                            general.doc.querySelector('#listleft');
        };

        /**
         * @method getBattleField
         * @return  {HTMLElement}
         */
        this.getBattleField = function () {
            if (general.nojs) {
                return general.doc.querySelector('tr>td[valign="top"]' +
                    '[class="txt"]>div[align="center"]');
            }

            return general.$('bf');
        };

        /**
         * @method getPers
         * @param   {HTMLElement}   obj
         * @return  {NodeList}
         */
        this.getPers = function (obj) {
            var pers = obj.querySelectorAll('a[href*="/info.php?id="]');
            // поки
            if (!pers.length) {
                pers = [];
                var divs = obj.querySelectorAll('div'),
                    i;
                for (i = 0; i < divs.length; i++) {
                    pers.push(divs[i].querySelector('b'));
                }
            }

            return pers;
        };

        /**
         * @method getDataFighters
         * @param   {HTMLLinkElement}   persLink
         */
        this.getDataFighters = function (persLink) {
            var prnt = persLink.parentNode,
                objPers = {};

            objPers.lvl = persLink.nextSibling.textContent;
            var allText = prnt.textContent;
            objPers.hp = /HP: \d+\/\d+/.test(allText) ?
                    (/HP: (\d+)\/(\d+)/.exec(allText)) : '';
            objPers.dist = /расстояние: \d+/.test(allText) ?
                    (/расстояние: (\d+)/.exec(allText)[1]) : '';
            objPers.visib = /видимость: \d+%/.test(allText) ?
                    (/видимость: (\d+%)/.exec(allText)[1]) : '';
            objPers.power = /мощность: \d+/.test(allText) ?
                    (/мощность: (\d+)/.exec(allText)[1]) : '';

            // оружие (для заполнения списка выбора врагов)
            objPers.weapon = '';
            // оружие и амуниция
            objPers.allWeapon = '';
            var allAmmunition = prnt.querySelectorAll('a[href*=' +
                    '"/item.php?item_id="]'),
                i;

            // у поков ссылок на амуницию нет
            if (allAmmunition.length) {
                objPers.weapon = allAmmunition[0].innerHTML;
                for (i = 0; i < allAmmunition.length; i++) {
                    objPers.allWeapon += '<li>' + allAmmunition[i].innerHTML;
                }
            }

            var name = persLink.textContent.replace(/&amp;/, '&');
            this.allFighters[name] = objPers;

            // в бою и если это мой перс, то запоминаем его
            if (!general.viewMode && persLink.href &&
                    persLink.href.indexOf('?id=' + general.myID) !== -1) {
                this.myPers = objPers;
                this.myPers.name = name;
                this.myPers.damage = /урон: (\d+) \((\d+)\)/.exec(allText);
            }
        };

        /**
         * @method setNameInChat
         */
        this.setNameInChat = function (persName) {
            var _this = this;
            return function () {
                _this.inpTextChat.value += persName + ': ';
                _this.inpTextChat.focus();
            };
        };

        /**
         * @method setEnvelope
         */
        this.setEnvelope = function () {
            var mass = [this.leftPers, this.rightPers],
                number,
                before,
                name,
                span,
                env,
                j,
                i;

            for (i = 0; i < 2; i++) {
                for (j = 0; j < mass[i].length; j++) {
                    name = mass[i][j].textContent;
                    this.getDataFighters(mass[i][j]);
                    // конвертики и номера покам не нужны
                    if (mass[i][j].nodeName === 'B') {
                        continue;
                    }

                    number = '';
                    // в режиме наблюдения номера бойцов не нужны
                    if (this.enemies && !general.viewMode) {
                        number = this.enemies[name] ?
                                ' <span style="font-weight: bold;">' +
                                    this.enemies[name] + '.</span> ' : '';
                    }

                    env = ' <img src="' + this.imgPath + 'envelope.gif" ' +
                        'style="width: 15px; cursor: pointer;"> ';

                    span = general.doc.createElement('span');
                    span.innerHTML = !i ? number + env : env + number;
                    before = !i ? mass[i][j].nextElementSibling : mass[i][j];
                    mass[i][j].parentNode.insertBefore(span, before);
                    span.querySelector('img').addEventListener('click',
                            this.setNameInChat(name), false);
                }
            }
        };

        /**
         * @method setMyInfo
         * @param   {int}   count   количество персонажей сделавших ход
         */
        this.setMyInfo = function (count) {
            // если здоровье меньше максимального, то меняем цвет
            var color = this.myPers.hp[1] === this.myPers.hp[2] ?
                        '#008000' : '#B84906',
                str = '<span style="font-weight: bold; font-style: italic; ' +
                    'color: #0000FF;">HP:</span> <span style="color: ' +
                    color + ';">' + this.myPers.hp[1] + '</span>/' +
                    '<span style="color: #008000; font-weight: bold;">' +
                    this.myPers.hp[2] + '</span><span style="margin-left: ' +
                    '20px;">урон: ' + this.myPers.damage[1] +
                    '(<span style="font-weight: bold; color: #FF0000;">' +
                    this.myPers.damage[2] + '</span>)</span><span ' +
                    'style="margin-left: 20px;">видимость: <span ' +
                    'style="font-weight: bold;">' + this.myPers.visib +
                    '</span></span><span style="margin-left: 20px; ' +
                    'font-weight: bold;"><span style="color: #FF0000;">' +
                    this.leftPers.length + '</span> / <span style="color: ' +
                    '#0000FF;">' + this.rightPers.length + '</span></span>';

            if (count) {
                str += '<span style="margin-left: 20px;">Сделали ход: ' +
                    count + '/' +
                    (this.leftPers.length + this.rightPers.length) + '</span>';
            }

            this.myInfoTopPanel.innerHTML = str;
        };

        /**
         * @method sortEnemyList
         */
        this.sortEnemyList = function () {
            var _this = this;
            // если кнопка уже нажата (выделена жирным)
            if (/bold/.test(_this.getAttribute('style'))) {
                return;
            }

            var id = +(/\d/.exec(_this.id)[0]),
                i;
            // выделяем жирным на что нажали, остальные обычным шрифтом
            _this.setAttribute('style', 'font-weight: bold;');
            for (i = 0; i < 6; i++) {
                if (i !== id) {
                    general.$('s' + i).setAttribute('style',
                            'cursor: pointer;');
                }
            }

            // записываем данные в хранилище
            var dataSt = general.getData(4);
            dataSt[2] = id.toString();
            general.setData(dataSt, 4);

            // сортируем список по возрастающей
            var reg = /(\d+)\. \[(\d+)\][^\d]*(\d+)!? \((\d+)%\) \[(\d+) \/ (\d+)\]/,
                select = general.$('euids'),
                countOpt = select.options.length,
                buff,
                opts,
                rez1,
                rez2,
                j;

            for (i = 0; i < countOpt - 1; i++) {
                for (j = 0; j < countOpt - 1; j++) {
                    opts = select.options;
                    rez1 = reg.exec(opts[j].innerHTML);
                    rez2 = reg.exec(opts[j + 1].innerHTML);
                    if (rez1 && rez2) {
                        rez1 = +rez1[id + 1];
                        rez2 = +rez2[id + 1];
                        if (rez1 > rez2) {
                            buff = select.removeChild(opts[j + 1]);
                            select.insertBefore(buff, opts[j]);
                        }
                    }
                }
            }

            // выбираем первого противника в списке
            select.options[0].selected = true;
        };

        /**
         * @method setSortListEnemy
         */
        this.setSortListEnemy = function () {
            var walk = general.$('walk'),
                target = general.$('euids').parentNode.parentNode.parentNode,
                tr;

            // если есть чекбокс "Подойти ближе"
            if (walk) {
                walk.parentNode.insertBefore(general.doc.createElement('br'),
                        walk);
            } else {
                tr = general.doc.createElement('tr');
                tr.innerHTML = '<td colspan="2" style="padding-bottom:5px;">' +
                    '<br></td>';
                target.parentNode.insertBefore(tr, target);
            }

            var spanSortButtons = general.doc.createElement('span');
            spanSortButtons.setAttribute('style', 'font-size: 8pt; ' +
                    'margin-left: 20px;');
            spanSortButtons.innerHTML = '<span id="s0">[номер]</span> ' +
                '<span id="s1">[лвл]</span> <span id="s2">[дальность]</span> ' +
                '<span id="s3">[видимость]</span> <span id="s4">[HP ост.]' +
                '</span> <span id="s5">[HP всего]</span>';

            target = walk ? walk.parentNode : tr.firstElementChild;
            target.appendChild(spanSortButtons);

            var button, i;
            for (i = 0; i < 6; i++) {
                button = general.$('s' + i);
                button.addEventListener('click', this.sortEnemyList, false);
            }

            general.$('s' + (general.getData(4)[2] || '0')).click();
        };

        /**
         * @method setMarkStroke
         * @param   {HTMLElement}   elem
         */
        this.setMarkStroke = function (elem) {
            if (elem) {
                elem.setAttribute('style', 'background-color: #C3C3C3;');
            }
        };

        /*
         * @method setWalk
         * @param   {int}   ind
         */
        this.setWalk = function (ind) {
            var dataSt = general.getData(4),
                walk = general.$('walk');

            if (walk) {
                if (!walk.checked && dataSt[ind]) {
                    this.setMarkStroke(walk.nextElementSibling);
                }

                if (walk.checked && !dataSt[ind]) {
                    walk.click();
                }
            }
        };

        /**
         * @method setStroke
         */
        this.setStroke = function () {
            var dataSt = general.getData(4),
                bf = this.getBattleField();

            // очищаем все установленные ходы
            this.clearMarkStroke();

            // если в хранилище есть запись в кого стреляли
            // (сказали ход), то устанавливаем именно его
            if (dataSt[11]) {
                var options = general.$('euids').querySelectorAll('option'),
                    i;

                for (i = 0; i < options.length; i++) {
                    if (new RegExp('^' + dataSt[11] + '\\.').
                            test(options[i].innerHTML)) {
                        options[i].selected = true;
                        break;
                    }
                }

                // если грена
                if (dataSt[15]) {
                    this.setMarkStroke(bf.querySelector('label' +
                            '[for="bagaboom"]'));
                } else {
                    // правая рука
                    this.setMarkStroke(bf.querySelector('label' +
                            '[for="right_attack' + dataSt[13] + '"]'));
                    // левая рука
                    this.setMarkStroke(bf.querySelector('label' +
                            '[for="left_attack' + dataSt[12] + '"]'));
                }

                // куда отходим
                this.setMarkStroke(bf.querySelector('label' +
                        '[for="defence' + dataSt[14] + '"]'));
                // подходим или нет
                this.setWalk(16);

                this.clearSavedStrokeAfterSay();
                return;
            }

            // устанавливаем последний сохраненный ход
            if (dataSt[3] === '2') {
                this.setMarkStroke(bf.querySelector('label' +
                        '[for="left_attack' + dataSt[5] + '"]'));

                // если нет гранаты, то отмечаем правую руку
                if (!dataSt[8] || !general.$('bagaboom')) {
                    this.setMarkStroke(bf.querySelector('label' +
                            '[for="right_attack' + dataSt[6] + '"]'));
                }

                this.setMarkStroke(bf.querySelector('label' +
                        '[for="defence' + dataSt[7] + '"]'));

                if (dataSt[8]) {
                    this.setMarkStroke(bf.
                            querySelector('label[for="bagaboom"]'));
                }

                // подходим или нет
                this.setWalk(9);
            } else {    // случайный ход
                // куда уходим
                this.setMarkStroke(bf.querySelector('label' +
                        '[for="defence' + this.getRandom1to3() + '"]'));
                // правая, левая
                var x = this.getRandom1to3(),
                    y = this.getRandom1to3();
                // если две руки и отмечен чебокс "не дублировать цель"
                if (!general.$('span_two_hand').style.display &&
                        general.$('repeat_two_hand').checked && x === y) {
                    while (x === y) {
                        x = this.getRandom1to3();
                    }
                }

                this.setMarkStroke(bf.querySelector('label' +
                        '[for="right_attack' + x + '"]'));
                this.setMarkStroke(bf.querySelector('label' +
                        '[for="left_attack' + y + '"]'));
            }
        };

        /**
         * @method setHandlerSubmit
         */
        this.setHandlerSubmit = function () {
            var s = general.doc.createElement('script');
            s.innerHTML = "function fight_mod() {" +
                    "var dataStAll = localStorage.getItem('" +
                            general.STORAGENAME + "').split('@')," +
                        "dataSt = dataStAll[4].split('|')," +
                    "elem;" +

                    "dataSt[5] = '';" +
                    "dataSt[6] = '';" +
                    "dataSt[7] = '';" +
                    "dataSt[8] = '';" +
                    "dataSt[9] = '';" +

                    // левая рука
                    "if (elem = document.querySelector('input[type=\"radio\"]" +
                            "[id^=\"left_attack\"]:checked')) {" +
                        "dataSt[5] = /left_attack(\\d)/.exec(elem.id)[1];" +
                    "}" +

                    // правая рука
                    "if (elem = document.querySelector('input[type=\"radio\"]" +
                            "[id^=\"right_attack\"]:checked')) {" +
                        "dataSt[6] = /right_attack(\\d)/.exec(elem.id)[1];" +
                    "}" +

                    // куда отходим
                    "if (elem = document.querySelector('input[type=\"radio\"]" +
                            "[id^=\"defence\"]:checked')) {" +
                        "dataSt[7] = /defence(\\d)/.exec(elem.id)[1];" +
                    "}" +

                    // граната
                    "if (elem = document." +
                            "querySelector('#bagaboom:checked')) {" +
                        "dataSt[8] = '1';" +
                    "}" +

                    // подходим или нет
                    "if (elem = document.querySelector('#walk:checked')) {" +
                        "dataSt[9] = '1';" +
                    "}" +

                    "dataStAll[4] = dataSt.join('|');" +
                    "localStorage.setItem('" + general.STORAGENAME +
                        "', dataStAll.join('@'));" +
                    "fight();" +
                "}";
            general.doc.body.appendChild(s);
        };

        /**
         * @method setGenerator
         */
        this.setGenerator = function () {
            var divGenerator = general.doc.createElement('div'),
                bf = this.getBattleField(),
                coord = new GetPos().init(bf);

            divGenerator.setAttribute('style', 'position: absolute; top: ' +
                    coord.y + 'px; left: ' + coord.x + 'px; ' +
                    'margin: 5px 0 0 5px;');

            // если две руки, то "не дублировать цель" делаем видимым
            var vis = (general.$('left_attack1') &&
                    general.$('right_attack1')) ? '' : 'none';

            divGenerator.innerHTML = '<input type="checkbox" ' +
                'id="rand_stroke"> <span id="set_rand_stroke" ' +
                'style="text-decoration: underline; cursor: pointer; ' +
                'vertical-align: top;">случайный ход</span><br>' +
                '<input type="checkbox" id="save_stroke">  <label ' +
                'for="save_stroke" style="vertical-align: top;">запомнить ход' +
                '</label><br><span id="span_two_hand" style="display: ' + vis +
                ';"><input type="checkbox" id="repeat_two_hand"> <label ' +
                'for="repeat_two_hand" style="vertical-align: top;">не ' +
                'дублировать цель</label></span>';
            bf.appendChild(divGenerator);

            var chkRandomStroke = general.$('rand_stroke'),
                chkRememberStroke = general.$('save_stroke'),
                chkNoDuplicateTarget = general.$('repeat_two_hand'),
                linkSetRandomStroke = general.$('set_rand_stroke'),
                goButton = general.doc.querySelector('a[href^=' +
                        '"javascript:void(fight"]');

            var _this = this;
            chkRandomStroke.addEventListener('click', function () {
                var dataSt = general.getData(4),
                    thischk = this;

                if (thischk.checked) {
                    chkRememberStroke.checked = false;
                    goButton.setAttribute('href',
                            ['javascript', ':', 'void(fight())'].join(''));
                    dataSt[3] = '1';
                    general.setData(dataSt, 4);
                    _this.setStroke();
                } else {
                    dataSt[3] = '';
                    general.setData(dataSt, 4);
                    _this.clearMarkStroke();
                }

            }, false);

            chkRememberStroke.addEventListener('click', function () {
                var dataSt = general.getData(4),
                    thischk = this;

                if (thischk.checked) {
                    chkRandomStroke.checked = false;
                    goButton.setAttribute('href',
                            ['javascript', ':', 'void(fight_mod())'].join(''));
                    dataSt[3] = '2';
                    general.setData(dataSt, 4);
                    _this.setStroke();
                } else {
                    goButton.setAttribute('href',
                            ['javascript', ':', 'void(fight())'].join(''));
                    dataSt[3] = '';
                    general.setData(dataSt, 4);
                    _this.clearMarkStroke();
                }
            }, false);

            chkNoDuplicateTarget.addEventListener('click', function () {
                var dataSt = general.getData(4),
                    thischk = this;

                dataSt[4] = thischk.checked ? '1' : '';
                general.setData(dataSt, 4);
            }, false);

            linkSetRandomStroke.addEventListener('click', function () {
                if (!chkRandomStroke.checked) {
                    chkRandomStroke.click();
                } else {
                    _this.setStroke();
                }
            }, false);

            // установим свой обработчик нажатия кнопки "Сделать ход"
            // fight_mod(); (если флажок "запомнить ход" установлен, то
            // будет запоминаться  последний ход)
            this.setHandlerSubmit();

            var dataSt = general.getData(4);
            if (dataSt[4]) {
                chkNoDuplicateTarget.click();
            }

            // если сказали ход, то будет запись в хранилище
            if (dataSt[11]) {
                this.setStroke();
                chkRandomStroke.checked = dataSt[3] === '1';
                chkRememberStroke.checked = dataSt[3] === '2';
            } else if (dataSt[3] === '1') {
                chkRandomStroke.click();
            } else if (dataSt[3] === '2') {
                chkRememberStroke.click();
            }
        };

        /**
         * @method changeSelectEnemies
         */
        this.changeSelectEnemies = function () {
            var select = general.$('euids'),
                span = general.$('spanCheckRange'),
                i;

            for (i = 0; i < select.options.length; i++) {
                if (select.options[i].selected) {
                    span.setAttribute('style', /!/.
                        test(select.options[i].innerHTML) ?
                                'color: #FF0000;' : '');
                    break;
                }
            }
        };

        /**
         * @method clickImageFighters
         * @param   {Object}   opt
         * @param   {Object}    _this
         */
        this.clickImageFighters = function (opt, _this) {
            return function () {
                opt.selected = true;
                _this.changeSelectEnemies();
            };
        };

        /**
         * @method showTooltip
         * @param   {String}    ttl
         * @param   {Object}    _this
         */
        this.showTooltip = function (ttl, _this) {
            return function () {
                var bf = _this.getBattleField(),
                    getPos = new GetPos(),
                    obj;

                // относительно чего будем выравнивать тултип
                if (general.viewMode) {
                    obj = {
                        x: _this.leftRightCommands[0].
                            nextElementSibling.lastElementChild,
                        y: 14
                    };
                } else if (general.nojs &&
                        (/Ждём ход противника/.test(bf.innerHTML))) {
                    obj = {x: bf, y: 0};
                } else {
                    obj = {x: _this.inpTextChat, y: 20};
                }

                _this.tooltip.innerHTML = ttl;
                _this.tooltip.style.top = getPos.init(obj.x).y - obj.y;
                _this.tooltip.style.left = getPos.init(this).x - 50;
                _this.tooltip.style.display = '';
            };
        };

        /**
         * @method hideTooltip
         * @param   {Object}    _this
         */
        this.hideTooltip = function (_this) {
            return function () {
                _this.tooltip.style.display = 'none';
            };
        };

        /**
         * @method setTooltipsFighters
         * @param   {HTMLTableElement}  table
         */
        this.setTooltipsFighters = function (table) {
            var selectEnemy = general.$('euids'),
                _this = this;
            // помещаем "Противник:" (слева от селекта) в span
            // если не достаем до выбранного противника,
            // то эта надпись будет красной
            if (selectEnemy) {
                selectEnemy.parentNode.removeChild(selectEnemy.previousSibling);
                var spanCheckRange = general.doc.createElement('span');
                spanCheckRange.setAttribute('id', 'spanCheckRange');
                spanCheckRange.innerHTML = 'Противник: ';
                selectEnemy.parentNode.insertBefore(spanCheckRange, selectEnemy);
                selectEnemy.addEventListener('change', function () {
                    _this.changeSelectEnemies();
                }, false);
                this.changeSelectEnemies();
            }

            var options = selectEnemy ?
                    selectEnemy.querySelectorAll('option') : false,
                img = table.querySelectorAll('img'),
                txtOptions,
                ttlName,
                visib,
                pers,
                name,
                ttl,
                i,
                j;

            for (i = 0; i < img.length; i++) {
                ttl = img[i].getAttribute('title');
                if (!ttl || !(/(.*) \[\d+/.test(ttl))) {
                    continue;
                }

                ttlName = /(.*) \[\d+/.exec(ttl)[1].replace(/&amp;/, '&');
                // если есть список выбора врага (ход не сделан)
                if (options) {
                    // opt = false;
                    for (j = 0; j < options.length; j++) {
                        txtOptions = options[j].innerHTML.replace(/&amp;/, '&');
                        if (txtOptions.indexOf(ttlName) !== -1) {
                            // кликаем по картинке, выбираем цель
                            img[i].setAttribute('style', 'cursor: pointer;');
                            img[i].addEventListener('click',
                                    this.clickImageFighters(options[j], this),
                                        false);
                            break;
                        }
                    }
                }

                for (name in this.allFighters) {
                    if (this.allFighters.hasOwnProperty(name) &&
                            name === ttlName) {
                        pers = this.allFighters[name];
                        ttl = '<span style="font-weight: bold;">' +
                            (general.viewMode ? '' : this.enemies[name] ?
                                    this.enemies[name] + '. ' : '') +
                            '<span style="color: #0000FF;">' + pers.lvl +
                            '</span>' + name + ' [' + pers.hp[1] + '/' +
                            pers.hp[2] + ']</span><div style="color: ' +
                            '#b85006; margin-left: 15px;">Видимость: ' +
                            pers.visib + '<br><span style="color: #000000;">' +
                            'Мощность: ' + pers.power + '</span></div><div>' +
                            pers.allWeapon + '</div>';

                        // прозрачность перса в зависимости от его видимости
                        visib = +(/\d+/.exec(pers.visib)[0]);
                        visib = (visib / 100).toFixed(1);
                        if (visib < 0.3) {
                            visib = 0.3;
                        }

                        img[i].style.opacity = visib.toString();
                        break;
                    }
                }

                // показываем тултип
                img[i].addEventListener('mouseover',
                    this.showTooltip(ttl, this), false);
                // скрываем тултип
                img[i].addEventListener('mouseout',
                        this.hideTooltip(this), false);

                // удаляем оригинальный title
                img[i].removeAttribute('title');
            }
        };

        /**
         * @method isEven
         * @param   {int}   x
         */
        this.isEven = function (x) {
            return x % 2 === 0;
        };

        /**
         * @method changeLocationFighters
         */
        this.changeLocationFighters = function () {
            var table;
            if (!general.viewMode) {
                var bf = this.getBattleField();
                // если ход сделан, то вставляем сохраненную таблицу в JS-версии
                if (/Ждём ход противника/i.test(bf.innerHTML)) {
                    if (this.graphTable && !general.nojs) {
                        var target = bf.querySelector('a').parentNode;
                        target.appendChild(general.doc.createElement('br'));
                        target.appendChild(general.doc.createElement('br'));
                        target.appendChild(this.graphTable);
                        target.appendChild(general.doc.createElement('br'));
                        this.setTooltipsFighters(this.graphTable);
                        return;
                    }

                    if (general.nojs) {
                        table = bf.previousElementSibling.
                                    previousElementSibling;
                    }
                } else {    // ход не сделан
                    if (general.nojs) {
                        table = bf.querySelector('table').
                            nextElementSibling.nextElementSibling;
                    } else {
                        table = bf.querySelector('div>table:last-child');
                    }
                }
            } else {
                table = this.leftRightCommands[0].nextElementSibling.
                    lastElementChild.previousElementSibling;
            }

            table.setAttribute('style', 'border-collapse: collapse;');
            table.setAttribute('background', this.imgPath + 'battleField.gif');

            // вставим пустую строку после таблицы
            // (в НЕ JS-версии уже есть)
            if (!general.viewMode && !general.nojs) {   // JS-версия
                table.parentNode.appendChild(general.doc.createElement('br'));
            } else if (general.viewMode) {
                table.parentNode.insertBefore(general.doc.createElement('br'),
                    table.nextElementSibling);
            }

            var reg = /\/(left|right)_.*\.gif/,
                td = table.querySelectorAll('td'),
                leftDC = -1,
                rightDC = -1,
                divBattleField,
                diffCommand,
                trNumbers,
                tdNumber,
                cloneTd,
                myInd,
                even,
                divL,
                divR,
                flag,
                img,
                DC,
                i,
                j;

            for (i = 0; i < td.length; i++) {
                td[i].setAttribute('style', 'border: 1px dotted #FFFFFF; ' +
                        'vertical-align: center;');
                // если в "TD" нет картинки перса
                if (!td[i].querySelector('img').getAttribute('title')) {
                    continue;
                }

                cloneTd = td[i].cloneNode(true);
                td[i].innerHTML = '';
                img = cloneTd.querySelectorAll('img');

                // узнаем есть ли в ячейке бойцы из разных команд
                diffCommand = false;
                for (j = 0; j < img.length - 1; j++) {
                    // берем из атрибута srs 'left' или 'right'
                    if (reg.exec(img[j].src)[1] !==
                            reg.exec(img[j + 1].src)[1]) {
                        diffCommand = true;
                        break;
                    }
                }

                flag = false;
                for (j = 0; j < img.length; j++) {
                    // ячейка где находится мой перс
                    if (!general.viewMode && img[j].getAttribute('title').
                            indexOf(this.myPers.name) !== -1) {
                        myInd = -1 * i;
                    }

                    // крайний левый и крайний правый персонаж от центра
                    if (reg.exec(img[j].src)[1] === 'left') {
                        leftDC = i;
                    } else if (rightDC === -1) {
                        rightDC = i;
                    }

                    divBattleField = general.doc.createElement('div');
                    divBattleField.setAttribute('style', 'padding: 2px;');

                    if (!diffCommand) {
                        td[i].appendChild(divBattleField);
                        td[i].lastElementChild.appendChild(img[j].
                            cloneNode(true));
                    } else {
                        if (!flag) {
                            divL = general.doc.createElement('div');
                            divL.setAttribute('style',
                                    'display: inline-block;');
                            td[i].appendChild(divL);
                            divR = general.doc.createElement('div');
                            divR.setAttribute('style',
                                    'display: inline-block;');
                            td[i].appendChild(divR);
                            flag = true;
                        }

                        divBattleField.appendChild(img[j].cloneNode(true));
                        if (reg.exec(img[j].src)[1] === 'left') {
                            td[i].firstElementChild.appendChild(divBattleField);
                        } else {
                            td[i].lastElementChild.appendChild(divBattleField);
                        }
                    }
                }
            }

            DC = Math.abs(leftDC - rightDC);
            even = this.isEven(DC);
            DC = even ? (leftDC + DC / 2) : (leftDC + Math.floor(DC / 2));

            // если нет изображения моего перса на поле боя (бывает такой глюк)
            // будем отсчитывать от динамического центра
            if (isNaN(myInd)) {
                myInd = -1 * DC;
            }

            // расставляем дальность и ДЦ
            trNumbers = general.doc.createElement('tr');
            table.firstElementChild.insertBefore(trNumbers,
                    table.firstElementChild.firstElementChild);

            for (i = 0; i < td.length; i++) {
                tdNumber = general.doc.createElement('td');
                trNumbers.appendChild(tdNumber);

                tdNumber.innerHTML = Math.abs(myInd);
                // если индекс нулевой (там где я стою) то цвет синий
                if (myInd) {
                    tdNumber.setAttribute('style',
                        'text-align: center; font-size: 7pt; border: 1px ' +
                        'dotted #FFFFFF;');
                } else {
                    tdNumber.setAttribute('style', 'text-align: center; ' +
                        'font-size: 8pt; color :#0000FF; font-weight: bold; ' +
                        'border: 1px dotted #FFFFFF;');
                }

                myInd++;

                if (i !== DC) {
                    continue;
                }

                tdNumber.setAttribute('style', 'text-align: center; ' +
                    'font-size: 8pt; color: #FF0000; font-weight: bold; ' +
                    'border: 1px dotted #FFFFFF;');

                if (!even) {
                    DC++;
                    even = true;
                }
            }

            if (!general.viewMode && !general.nojs) {
                this.graphTable = table.cloneNode(true);
            }

            this.setTooltipsFighters(table);
        };

        /**
         * @method setCountStroke
         * @param   {object}    obj
         */
        this.setCountStroke = function (obj) {
                // персы, которые сделали ход (зеленые)
            var greenPersLinks = obj.
                    querySelectorAll('a[href*="/info.php?id="]' +
                            '[style*="#008800"]');

            // нет персонажей, сделавших ход
            if (!greenPersLinks.length) {
                return;
            }

            // JS-версия
            var persLinkInBattle, i;
            if (!general.nojs) {
                for (i = 0; i < greenPersLinks.length; i++) {
                    persLinkInBattle = general.doc.
                        querySelector('a[href="' + greenPersLinks[i].href +
                                '"]');
                    if (persLinkInBattle) {
                        persLinkInBattle.style.color = '#008800';
                    }
                }
            }

            this.setMyInfo(greenPersLinks.length);
        };

        /**
         * @method setColorFighters
         * @param   {Object}    _this
         */
        this.setColorFighters = function (_this) {
            return function () {
                // ход не сделан, ничего не делаем
                if (!(/Ждём ход противника/i.
                        test(_this.getBattleField().innerHTML))) {
                    return;
                }

                if (general.nojs) {
                    _this.setCountStroke(general.doc);
                    return;
                }

                var url = general.loc.replace('btl.php', 'b.php'),
                    ajax = new AjaxQuery();

                ajax.init(url, function (xhr) {
                    var span = general.doc.createElement('span');
                    span.innerHTML = xhr.responseText;
                    _this.setCountStroke(span);
                }, function () {
                    general.root.console.log('Error XHR to: ' + url);
                });
            };
        };

        /**
         * @method start
         */
        this.start = function () {
            // сразу скрываем тултип (на всякий случай, если остался)
            this.tooltip.style.display = 'none';

            var selectEnemies = general.$('euids'),
                dataSt = general.getData(4),
                options,
                i;

            // в бою
            if (!general.viewMode) {
                // очищаем индикаторы ходов
                this.clearMarkStroke();

                // если есть список выбора врага (ход не сделан)
                if (selectEnemies) {
                    var tmp;
                    // обнуляем хэш из выпадающего списка врагов (имя --> номер)
                    this.enemies = {};
                    options = selectEnemies.querySelectorAll('option');
                    for (i = 0; i < options.length; i++) {
                        tmp = /^(\d+)\. (.+)\[\d+\]/.exec(options[i].innerHTML);
                        if (tmp) {
                            this.enemies[tmp[2].replace(/&amp;/, '&')] = tmp[1];
                        }
                    }

                    if (general.nojs) {
                        dataSt[17] = JSON.stringify(this.enemies);
                        general.setData(dataSt, 4);
                    }
                // НЕ JS-версия, ход сделан
                } else if (general.nojs) {
                    this.enemies = dataSt[17] ? JSON.parse(dataSt[17]) : null;
                    // нет записи в хранилище
                    if (!this.enemies) {
                        return;
                    }
                } else if (!this.enemies) {
                    return;
                }

            } else {    // в режиме наблюдения за боем
                dataSt[17] = '';    // удаляем данные из списка врагов
                general.setData(dataSt, 4);
            }

            this.getLeftRightCommands();

            // ссылки на персов слева и справа
            this.leftPers = this.getPers(this.leftRightCommands[0]);
            this.rightPers = this.getPers(this.leftRightCommands[1]);

            // расстановка конвертиков, номера бойца и сбор дополнительной
            // информации (если они еще не были установлены)
            if (this.leftPers[0].nextElementSibling.nodeName !== 'SPAN') {
                this.allFighters = {};
                this.setEnvelope();
            }

            // в бою
            if (!general.viewMode) {
                // в бою установим свои данные вверху
                this.setMyInfo(0);

                // расширяем данные в списке выбора
                var enemyName, tmpObj;
                if (selectEnemies) {
                    for (i = 0; i < options.length; i++) {
                        enemyName = /^\d+\. ([^\[]+)\[/.
                            exec(options[i].innerHTML);

                        if (!enemyName) {
                            continue;
                        }

                        enemyName = enemyName[1].replace(/&amp;/, '&');
                        tmpObj = this.allFighters[enemyName];

                        if (!tmpObj) {
                            continue;
                        }

                        options[i].innerHTML = this.enemies[enemyName] + '. ' +
                            tmpObj.lvl + ' - ' + tmpObj.dist +
                            // если до цели не достаем, ставим '!'
                            (/#ffe0e0/.test(options[i].getAttribute('style')) ?
                                    '!' : '') +
                            ' (' + tmpObj.visib + ') [' + tmpObj.hp[1] +
                            ' / ' + tmpObj.hp[2] +  '] ' + enemyName +
                            ': ' + tmpObj.weapon + ' &nbsp;';
                    }

                    // сортируем список выбора
                    this.setSortListEnemy();

                    // установка генератора ходов
                    this.setGenerator();

                    // показываем кнопку "Сказать ход"
                    this.sayMoveButton.style.display = '';
                } else {    //уже сходили
                    // прячем кнопку "Сказать ход"
                    this.sayMoveButton.style.display = 'none';
                    // обновляем данные в бою
                    var refreshBattle = general.getData(4)[0];
                    if (refreshBattle && !this.tmRefreshBattle) {
                        this.tmRefreshBattle = general.root.
                            setInterval(function () {
                                var updLink = general.doc.
                                        querySelector('a[href*="' +
                                            (general.nojs ? 'b.php?bid=' :
                                                    'updatedata()') + '"]');

                                if (updLink) {
                                    updLink.click();
                                }
                            }, (+refreshBattle) * 1000);
                    }
                }
            }

            // изменяем расположение бойцов, ставим тултипы...
            this.changeLocationFighters();

            // в JS-версии боя подсвечиваем персонажей, которые уже
            // сделали ход. В ОБОИХ весиях боя устанавливаем вверху
            // количество персонажей, сделавших ход
            if (!general.viewMode && !this.tmHighlightPers) {
                this.setColorFighters(this);
                this.tmHighlightPers = general.root.
                    setInterval(this.setColorFighters(this), 3000);
            }
        };

        /**
         * @method setChatInterface
         */
        this.setChatInterface = function () {
            var sayOnlyMyCommand = general.doc.createElement('input');
            sayOnlyMyCommand.type = 'checkbox';
            sayOnlyMyCommand.setAttribute('style', 'margin-right: 10px;');
            sayOnlyMyCommand.setAttribute('title', 'Сказать своей команде');
            this.inpTextChat.parentNode.insertBefore(sayOnlyMyCommand,
                    this.inpTextChat);

            var _this = this;
            sayOnlyMyCommand.addEventListener('click', function () {
                var dataSt = general.getData(4),
                    chatMessage = _this.inpTextChat.value,
                    thisChk = this;

                if (thisChk.checked) {
                    dataSt[10] = '1';
                    if (!(/^(~|\*|@)/.test(chatMessage))) {
                        _this.inpTextChat.value = '~' + chatMessage;
                    }

                    // костыль после отправки сообщения в чат в JS-версии
                    if (!general.nojs) {
                        _this.intervalUpdateInpTextChat = general.root.
                            setInterval(function () {
                                if (!_this.inpTextChat.value) {
                                    _this.inpTextChat.value = '~';
                                }
                            }, 1000);
                    }
                } else {
                    dataSt[10] = '';
                    _this.inpTextChat.value = _this.inpTextChat.value.
                        replace(/^(~|\*|@)+/, '');

                    if (_this.intervalUpdateInpTextChat) {
                        general.root.clearInterval(_this.
                            intervalUpdateInpTextChat);
                    }
                }

                general.setData(dataSt, 4);
                _this.inpTextChat.focus();
            }, false);

            if (general.getData(4)[10]) {
                sayOnlyMyCommand.click();
            }

            // если отмечен чекбокс, символ '~' стереть будет нельзя
            this.inpTextChat.addEventListener('input', function () {
                var thisInp = this;
                if (sayOnlyMyCommand.checked && !thisInp.value) {
                    thisInp.value = '~';
                }
            }, false);

            // кнопа "Сказать ход"
            this.sayMoveButton = general.doc.createElement('input');
            this.sayMoveButton.type = 'button';
            this.sayMoveButton.value = 'Сказать ход';
            this.sayMoveButton.setAttribute('style', 'display: none; ' +
                    'background-color: #D0EED0; margin-right: 10px;');
            this.sayMoveButton.addEventListener('click', function () {
                _this.sayMove(_this);
            }, false);
            sayOnlyMyCommand.parentNode.insertBefore(this.sayMoveButton,
                    sayOnlyMyCommand);

            // добавляем кнопку "Обновить"
            var buttonUpdate = general.doc.createElement('input');
            buttonUpdate.type = 'button';
            buttonUpdate.value = 'Обновить';
            buttonUpdate.setAttribute('style', 'background-color: #D0EED0;');

            if (!general.nojs) {
                buttonUpdate.setAttribute('onclick',
                        ['javascript', ':', 'void(updatedata())'].join(''));
            } else {
                buttonUpdate.addEventListener('click', function () {
                    general.root.location.reload();
                }, false);
            }

            this.inpTextChat.parentNode.appendChild(buttonUpdate);
        };

        /**
         * @method changeMakebf
         */
        this.changeMakebf = function () {
            var _this = this;
            general.root.makebf = function () {
                /** @namespace general.root.waitforturn */
                /** @namespace general.root.bf1 */
                /** @namespace general.root.bf2 */
                /** @namespace general.root.bf3 */
                /** @namespace general.root.bfndl */
                general.$('bf').innerHTML = !general.root.waitforturn ?
                        general.root.bf1 :
                        (general.root.bf2 + general.root.bf3);
                general.$('bfndl').innerHTML = general.root.bfndl;
                _this.start();
            };
        };

        /**
         * @method tryStart
         */
        this.tryStart = function () {
            if (general.viewMode || general.nojs) {
                if (general.nojs) {
                    this.setChatInterface();
                }

                this.start();
                return;
            }

            this.inpTextChat = general.doc.querySelector('input[name="oldm"]');
            // основное поле боя
            var bf = this.getBattleField();

            if (this.inpTextChat && bf &&
                    !(/Загружаются данные/.test(bf.innerHTML))) {
                this.changeMakebf();
                this.setChatInterface();
                this.start();
            } else {
                // в JS версии боя ждем загрузки фрейма с данными
                general.root.setTimeout(this.tryStart, 100);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (general.root.self !== general.root.top) {
                return;
            }

            // обновление страницы, когда висим в заявке
            if (/(\/wargroup|\/warlist)\.php/.test(general.loc)) {
                var refreshAppl = general.getData(4)[1];
                if (general.doc.querySelector('b>font[color="#990000"]') &&
                        refreshAppl) {
                    general.root.setTimeout(function () {
                        general.doc.querySelector('a[href*="&r="]').click();
                    }, (+refreshAppl) * 1000);
                }

                return;
            }

            if (general.viewMode) {
                this.inpTextChat = general.doc.
                    querySelector('input[name="msg"]');
                // бой закончился
                if (!this.inpTextChat) {
                    return;
                }
            } else if (general.nojs) {
                this.inpTextChat = general.doc.
                    querySelector('input[name="newmessage"]');
            }

            // в бою
            if (!general.viewMode) {
                // ячейка для вывода информации своего перса
                var tdTop = general.doc.querySelector('td[class="txt"]' +
                        '[width="50%"][align="right"]');
                tdTop.setAttribute('width', '30%');
                tdTop.previousElementSibling.setAttribute('width', '30%');
                this.myInfoTopPanel = general.doc.createElement('td');
                this.myInfoTopPanel.setAttribute('width', '40%');
                this.myInfoTopPanel.setAttribute('style',
                        'text-align: center;');
                tdTop.parentNode.insertBefore(this.myInfoTopPanel, tdTop);
            }

            // tooltip с информацией о бойцах при наведении на них мыши
            this.tooltip = general.doc.createElement('div');
            this.tooltip.setAttribute('id', 'div_tooltip');
            this.tooltip.setAttribute('style', 'display: none; position: ' +
                'absolute; font-size: 8pt; background-color: #F5FFF5; ' +
                'padding: 3px; border: 1px solid #339933; border-radius: 7px;');
            general.doc.body.appendChild(this.tooltip);
            // на всякий случай, если останется виден
            this.tooltip.addEventListener('click', function () {
                var _this = this;
                _this.style.display = 'none';
            }, false);

            this.tryStart();

            // в НЕ JS-версии боя делаем полный лог
            if (general.nojs) {
                var linkFullLog = general.doc.
                        querySelector('br+a[href*="/warlog.php?bid="]');

                if (linkFullLog) {
                    var url = 'http://www.ganjawars.ru/b0/btk.php?bid=' +
                        (/\?bid=(\d+)/.exec(linkFullLog.href)[1]) +
                        '&turn=-1&lines=-1';

                    // удаляем все что после таблицы с логом
                    var parnt = linkFullLog.parentNode;
                    while (parnt.lastChild.nodeName !== 'TABLE') {
                        parnt.removeChild(parnt.lastChild);
                    }

                    var ajax = new AjaxQuery();
                    ajax.init(url, 'GET', null, true,  function (xhr) {
                        var span = general.doc.createElement('span');
                        span.innerHTML = xhr.responseText;
                        general.doc.querySelector('tr>td>div[style=' +
                            '"font-size:8pt"]').innerHTML =
                            span.querySelector('#log').innerHTML;
                    }, function () {
                        general.root.console.log('Error XHR to: ' + url);
                    });
                }
            }
        };
    };

    /**
     * @class BlacklistHighlighting
     * @constructor
     */
    var BlacklistHighlighting = function () {
        /**
         * @property blTable
         * @type {HTMLTableElement|null}
         */
        this.blTable = null;

        /**
         * @method rememberClick
         * @param   {Object}    _this
         */
        this.rememberClick = function (_this) {
            var a = _this.blTable.querySelectorAll('a[href*="/info.php?id="]'),
                stData = general.getData(5),
                mass,
                i;

            //в ЧС никого нет
            if (!a.length) {
                stData[0] = '';
                general.setData(stData, 5);
                alert('Ваш ЧС пуст. Сначала нужно добавить персонажей.');
                return;
            }

            mass = [];
            for (i = 0; i < a.length; i++) {
                mass.push(/info\.php\?id=(\d+)/.exec(a[i].href)[1]);
            }

            stData[0] = mass.join(',');
            general.setData(stData, 5);
            _this.setHighlighting();
        };

        /**
         * @method clearClick
         * @param   {Object}    _this
         */
        this.clearClick = function (_this) {
            var stData = general.getData(5);

            if (stData[0]) {
                stData[0] = '';
                general.setData(stData, 5);
                _this.setHighlighting();
            } else {
                alert('В памяти скрипта нет ЧС');
            }
        };

        /**
         * @method setHighlighting
         */
        this.setHighlighting = function () {
            var a = general.doc.querySelectorAll('a[href*="/info.php?id="]'),
                stData = general.getData(5),
                link,
                id,
                i;

            for (i = 0; i < a.length; i++) {
                a[i].style.background = '';
                id = /\?id=(\d+)$/.exec(a[i].href);
                if (id && stData[0].indexOf(id[1]) !== -1) {
                    a[i].style.background = '#B6B5B5';
                    // блокировка ссылки принятия боя в одиночных заявках
                    if (stData[1] && (/Подтверждаете бой с/.
                            test(a[i].parentNode.innerHTML))) {
                        link = a[i].parentNode.parentNode.parentNode.
                            nextElementSibling.querySelector('a');
                        link.setAttribute('style', 'text-decoration: ' +
                            'line-through; color: #808080;');
                        link.href = '#';
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/home\.friends\.php/.test(general.loc)) {
                this.blTable = general.doc.querySelectorAll('table' +
                        '[border="0"][cellspacing="0"][cellpadding="3"]' +
                        '[class="wb"][align="center"][width="100%"]');

                if (!this.blTable[1]) {
                    return;
                }

                this.blTable = this.blTable[1];
                var buttonStyle = 'margin-left: 5px; border: solid 1px; ' +
                    'border-radius: 3px; background: #D0EED0; cursor: pointer;',
                    butRemember = general.doc.createElement('input'),
                    butClear = general.doc.createElement('input'),
                    _this = this;

                butRemember.type = 'button';
                butRemember.value = 'Запомнить ЧС';
                butRemember.setAttribute('style', buttonStyle);
                butRemember.addEventListener('click', function () {
                    _this.rememberClick(_this);
                }, false);

                butClear.title = 'Забыть';
                butClear.type = 'button';
                butClear.value = 'X';
                butClear.setAttribute('style', buttonStyle);
                butClear.addEventListener('click', function () {
                    _this.clearClick(_this);
                }, false);

                var target = this.blTable.querySelector('td');
                target.appendChild(butRemember);
                target.appendChild(butClear);
            }

            if (general.getData(5)[0]) {
                if (/www\.ganjawars\.ru\/b0\//.test(general.loc)) {
                    general.root.setInterval(this.setHighlighting, 1000);
                } else if (/\/usertransfers\.php/.test(general.loc)) {
                    general.root.setTimeout(this.setHighlighting, 300);
                } else {
                    this.setHighlighting();
                }
            }
        };
    };

    /**
     * @class AutLinksOnChat
     * @constructor
     */
    var AutLinksOnChat = function () {
        /**
         * @method init
         */
        this.init = function () {
            var chat = general.doc.querySelector('td[class="wb"]' +
                    '[valign="top"][style="font-size:8pt"]');

            if (chat) {
                var fonts = chat.querySelectorAll('font'),
                    name,
                    i;

                for (i = 0; i < fonts.length; i++) {
                    if (!fonts[i].firstElementChild) {
                        name = fonts[i].innerHTML;
                        fonts[i].innerHTML = '<a target="_blank" ' +
                            'style="font-size: 8pt; text-decoration: none; ' +
                            'color: #990000;" href="http://www.ganjawars.ru' +
                            '/search.php?key=' + name + '">' + name + '</a>';
                    }
                }
            }
        };
    };

    /**
     * @class AutRefreshLink
     * @constructor
     */
    var AutRefreshLink = function () {
        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('td>a[href*="?itemslist="]'),
                refresh = general.doc.querySelector('div>a[href*="/walk"]');

            if (target && refresh) {
                refresh = refresh.cloneNode(true);
                refresh.setAttribute('style', 'margin-left: 5px;');
                target.parentNode.
                    insertBefore(refresh, target.nextElementSibling);
            }

        };
    };

    /**
     * @class WorkPostGrenadesBroken
     * @constructor
     */
    var WorkPostGrenadesBroken = function () {
        /**
         * @property wpgbContainer
         * @type {HTMLElement}
         */
        this.wpgbContainer = general.doc.createElement('span');
        /**
         * @property redFactory
         * @type {String}
         */
        this.redFactory = general.imgPath + 'WorkPostGrenadesBroken/' +
                'redFactory.gif';
        /**
         * @property blueFactory
         * @type {String}
         */
        this.blueFactory = general.imgPath + 'WorkPostGrenadesBroken/' +
                'blueFactory.gif';
        /**
         * @property grenades
         * @type {Array}
         */
        this.grenades = [
            // гос
            'rgd5', 'grenade_f1', 'rgd2', 'lightst', 'lights', 'rkg3', 'mdn',
            'rgd2m', 'rgo', 'm84', 'rgn', 'emp_ir', 'fg3l', 'l83a1', 'emp_s',
            'm67', 'm3', 'hg78', 'hg84', 'fg6', 'anm14', 'm34ph', 'fg7',
            'fg8bd',
            //синдовые
            'lightss', 'lightsm', 'rgd2s', 'grenade_dg1', 'fg5', 'molotov',
            'hellsbreath', 'napalm', 'ghtb', 'me85',
            //ржавка
            'old_rgd5',
            //гранатометы
            /* гос */
            'rpg', 'ptrk', 'glauncher', 'grg', 'paw20', 'rpgu', 'grom2',
            'ags30', 'gm94', 'gl06', 'gmg', 'balkan', 'rg6', 'im202',
            /* арт */
            'milkor', 'mk47'
        ];

        /**
         * @method addContent
         * @param   {Array}     sms
         * @param   {Boolean}   gren
         * @param   {Boolean}   broken
         * @return  {String}
         */
        this.addContent = function (sms, gren, broken) {
            var host = ' [<a href="http://www.ganjawars.ru/',
                stData = general.getData(6),
                str = '';

            if (sms[0] && stData[3]) {    // письмо
                str += host + 'sms.php"><img src="http://www.ganjawars.ru/i/' +
                    'sms.gif" title="' + sms[0].getAttribute('title') +
                    '" alt="Вам письмо"></a>]';
            }

            if (sms[1] && stData[3]) {    // посылка
                str += host + 'items.php"><img src="http://www.ganjawars.ru/' +
                    'i/woodbox.gif" title="Пришла посылка!" ' +
                    'alt="посылка"></a>]';
            }

            if (!gren && stData[5]) { // граната
                str += host + 'items.php"><span style="color: #FF0000; ' +
                    'font-weight: bold;">Грена</span></a>]';
            }

            if (broken && stData[4]) { // слом
                str += host + 'workshop.php"><span style="color: #FF0000; ' +
                    'font-weight: bold;">Слом</span></a>]';
            }

            return str;
        };

        /**
         * @method startWorkPostGrenadesBroken
         * @param   {Object}    _this
         */
        this.startWorkPostGrenadesBroken = function (_this) {
            var ajaxQuery = new AjaxQuery(),
                url = 'http://www.ganjawars.ru/me/';

            _this = _this || this;
            ajaxQuery.init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;
                _this.wpgbContainer.innerHTML = '';
                // персонаж в пути
                if (/Вы находитесь в пути/.test(spanContent.innerHTML)) {
                    _this.wpgbContainer.innerHTML = '<span style="color: ' +
                            '#0000FF;">[в пути]</span>';
                    return;
                }

                // персонаж в бою
                if (/Идёт бой/.test(spanContent.
                        querySelector('title').innerHTML)) {
                    _this.wpgbContainer.innerHTML = '<span style="color: ' +
                        '#0000FF;">[бой]</span>';
                    return;
                }

                // проверка на новое письмо и/или посылку
                var testSms = [
                    spanContent.querySelector('a>img[src$="/i/sms.gif"]'),
                    spanContent.querySelector('a>img[src$="/i/woodbox.gif"]')
                ];

                var stData = general.getData(6),
                    playSound = new PlaySound();

                if ((testSms[0] || testSms[1]) && !stData[0]) {
                    stData[0] = '1';
                    playSound.init(stData[6]);
                    general.setData(stData, 6);
                } else if (!testSms[0] && !testSms[1] && stData[0]) {
                    stData[0] = '';
                    general.setData(stData, 6);
                }

                // ищем ссылку на объект где работаем/работали
                var linkObj = spanContent.
                        querySelector('td[align="center"][style="font-size:' +
                            '8pt"][bgcolor="#e9ffe9"]');

                // видимо что-то случилось
                if (!linkObj) {
                    return;
                }

                var content = linkObj.innerHTML;
                linkObj = linkObj.querySelector('a[href^="/object.php?id="]');
                if (!linkObj) {
                    return;
                }

                // поиск ссылок на экипировку
                var items = spanContent.
                        querySelector('td[valign="bottom"][bgcolor="#e9ffe9"]');
                items = items ? items.querySelectorAll('a') : false;

                // время до окончания работы
                var time;
                if (/[Вы сможете устроиться на|осталось][^\d]*\d+ минут/i.
                        test(content)) {
                    time = +(/(\d+) минут/i.exec(content)[1]);
                    time = !time ? 1 : time;
                } else if (/Последний раз вы работали/i.test(content)) {
                    time = 0;
                } else if (/Вы работаете на/i.test(content)) {
                    time = 1;
                }

                // проверка на наличие грены
                var testGrenades = false;
                if (items && items.length) {
                    var itemId, i;
                    for (i = 0; i < items.length; i++) {
                        itemId = /\/item\.php\?item_id=(.*)$/.
                            exec(items[i].href);
                        if (itemId &&
                                _this.grenades.indexOf(itemId[1]) !== -1) {
                            testGrenades = true;
                            break;
                        }
                    }
                }

                var ttl = '" title="Объект #' +
                    (/object\.php\?id=(\d+)/.exec(linkObj.href)[1]) +
                    '" alt="GW объект" /></a>]';

                if (time) {
                    if (stData[2]) {
                        _this.wpgbContainer.innerHTML = '[<span style=' +
                            '"color: #0000FF">' + time + '</span> мин ' +
                            '<a href="' + linkObj.href + '"><img src="' +
                            _this.blueFactory + ttl;
                    }

                    stData[1] = '';
                    general.setData(stData, 6);
                } else {
                    if (stData[2]) {
                        _this.wpgbContainer.innerHTML = '[<a href="' +
                            linkObj.href + '"><img src="' + _this.redFactory +
                            ttl;
                    }

                    if (!stData[1]) {
                        stData[1] = '1';
                        playSound.init(stData[7]);
                        general.setData(stData, 6);
                    }
                }

                var testBroken = spanContent.querySelector('a[href=' +
                    '"/workshop.php"][style$="#990000;"]') || false;
                _this.wpgbContainer.innerHTML += _this.addContent(testSms,
                    testGrenades, testBroken);

            }, function () {
                general.cons.log('Error XHR to "http://www.ganjawars.ru/me/"');
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();

            if (!topPanel) {
                return;
            }

            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.wpgbContainer);

            this.startWorkPostGrenadesBroken(null);
            var _this = this;
            general.root.setInterval(function () {
                _this.startWorkPostGrenadesBroken(_this);
            }, new GetRandom().init(30, 60) * 1000);
        };
    };

    /**
     * @class ResourcesAndBonuses
     * @constructor
     */
    var ResourcesAndBonuses = function () {
        /**
         * @property divResult
         * @type {HTMLElement}
         */
        this.divResult = general.doc.createElement('div');

        /**
         * @method fillData
         * @param   {string}    data
         */
        this.fillData = function (data) {
            this.divResult.innerHTML = data + '<div style="margin-top: 5px;">' +
                '<img id="divres_close" src="' + general.imgPath + 'close.gif' +
                '" /></div>';

            var _this = this;
            this.divResult.querySelector('#divres_close').
                addEventListener('click', function () {
                    _this.divResult.style.visibility = 'hidden';
                }, false);
        };

        /**
         * @method showData
         * @param   {Object}    _this
         */
        this.showData = function (_this) {
            var pos = new GetPos().init(_this);

            this.divResult.style.left = pos.x;
            this.divResult.style.top = pos.y + 25;
            this.divResult.style.visibility = 'visible';
            this.divResult.innerHTML = '<img src="' + general.imgPath +
                'preloader.gif' + '">';

            var url = 'http://www.ganjawars.ru/info.php?id=' + general.myID,
                idElem = _this.id,
                ths = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;
                var tables = spanContent.querySelectorAll('td[class="wb"]' +
                        '[bgcolor="#f0fff0"][align="center"][valign="top"]'),
                    data;

                if (!tables.length) {   // новый стиль оформления страницы инфы
                    tables = spanContent.querySelectorAll('td[class=' +
                            '"greenbrightbg"][align="center"][valign="top"]');
                }

                data = idElem === 'res' ?
                        tables[0].innerHTML : tables[2].innerHTML;

                if (/Ресурсов в наличии нет/i.test(data)) {
                    data = '<span style="color: #0000FF;">Ресурсов в наличии ' +
                        'нет</span>';
                }

                ths.fillData(data);
            }, function () {
                ths.fillData('<span style="color: #FF0000;">' +
                    'Ошибка ответа сервера...</span>');
            });
        };

        /**
         * @method createButton
         * @param   {String}    value
         * @param   {String}    id
         * @return  {HTMLElement}
         */
        this.createButton = function (value, id) {
            var span = general.doc.createElement('span'),
                _this = this;

            span.innerHTML = value;
            span.id = id;
            span.setAttribute('style', 'cursor: pointer;');
            span.addEventListener('click', function () {
                var ths = this;
                _this.showData(ths);
            }, false);
            return span;
        };

        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();

            if (!topPanel) {
                return;
            }

            this.divResult.setAttribute('style', 'visibility: hidden; ' +
                    'position: absolute; padding: 3px; background-color: ' +
                    '#E7FFE7; border: solid 1px #339933; border-radius:5px; ' +
                    'top:0; left:0; box-shadow: 5px 6px 6px ' +
                    'rgba(122,122,122,0.5);');
            general.doc.body.appendChild(this.divResult);

            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.createButton('Ресурсы', 'res'));
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.createButton('Бонусы', 'bonus'));
        };
    };

    general = new General();
    if (!general.checkMainData()) {
        return;
    }

    // аут + прибрежка
    if (/\/quest\.ganjawars\.ru/.test(general.loc)) {
        try {
            new AutRefreshLink().init();
        } catch (e) {
            general.cons.log(e);
        }

        try {
            new AutLinksOnChat().init();
        } catch (e) {
            general.cons.log(e);
        }

        return;
    }

    initScript = general.getInitScript();
    // везде
    if (initScript[0]) {
        try {
            new NotGiveCannabisLeaf().init();
        } catch (e) {
            general.cons.log(e);
        }
    }

    // перс не залогинен
    if (general.doc.querySelector('a[href*="/regform.php"]')) {
        return;
    }

    if (initScript[4]) {
        try {
            new BlacklistHighlighting().init();
        } catch (e) {
            general.cons.log(e);
        }
    }

    // везде кроме боев
    if (!(/\/b0\//.test(general.loc))) {
        try {
            new SetSettingsButton().init();
        } catch (e) {
            general.cons.log(e);
        }

        if (/\/news\.php\?set=1/.test(general.loc)) {
            try {
                new ShowMainSettings().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (initScript[1]) {
            try {
                new AdditionForNavigationBar().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (initScript[5]) {
            try {
                new WorkPostGrenadesBroken().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (initScript[6]) {
            try {
                new ResourcesAndBonuses().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (/\/market(-p)?\.php/.test(general.loc)) {
            if (initScript[2] &&
                    (/\?(stage=2\&item_id=|buy=)/.test(general.loc))) {
                try {
                    new AdsFilter().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }
    }

    // бои
    if (/(\/b0\/|\/wargroup\.php|\/warlist\.php|\/warlog\.php)/.
            test(general.loc)) {
        if (initScript[3]) {
            try {
                new AdvBattleAll().init();
            } catch (e) {
                general.cons.log(e);
            }
        }
    }

}());

