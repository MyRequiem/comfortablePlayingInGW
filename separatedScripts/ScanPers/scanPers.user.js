// ==UserScript==
// @name            ScanPers
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выдает сообщение и/или звуковой сигнал при появлении (или выходе) в онлайне определенного персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanPers/scanPers.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanPers/scanPers.user.js
// @include         http://www.gwars.ru/*
// @exclude         http://www.gwars.ru/ferma.php*
// @exclude         http://www.gwars.ru/b0/*
// @grant           none
// @license         MIT
// @version         3.00-121018
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true,
    nomen: true, devel: true
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
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'scanPers';
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/imgs/';
        /**
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie)[2];
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

            /* localStorage:
                [0] - id персонажа
                [1] - id синда персонажа
                [2] - чекбокс звук
                [3] - чекбокс сообщение
                [4] - id звука при входе
                [5] - id звука при выходе
                [6] - звук(сообщение) проигран или нет
                [7] - ник персонажа
                [8] - timestamp последнего сканирования
                [9] - null (для совместимости с ранними версиями)
            */
            stData = ['', '', '', '', '', '', '', '', '', ''];
            this.setData(stData);
            return stData;
        },

        /**
         * @method getTopPanel
         * @return  {HTMLElement|null}
         */
        getTopPanel: function () {
            // ищем верхнюю панель "MyRequiem [603/603] ... 21:01, 3095 онлайн"
            var topPanel;

            if (this.DESIGN_VERSION === 'v2') {  // новый дизайн
                topPanel = this.doc.querySelector('td.gw-header-col2 ' +
                        'td[width="50%"][valign="middle"]');
                if (topPanel) {
                    topPanel.setAttribute('style', 'width: 70%;');
                }
            } else {
                topPanel = this.doc.
                    querySelector('td.txt[align="left"] nobr:first-child');
                if (topPanel) {
                    topPanel.parentNode.setAttribute('style', 'width: 70%;');
                }
            }

            return topPanel;
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
     * @class ScanPers
     * @constructor
     */
    var ScanPers = function () {
        /**
         * @property interval
         * @type {int}
         */
        this.interval = 7;
        /**
         * @property spanContent
         * @type {Element|null}
         */
        this.spanContent = general.doc.createElement('span');

        /**
         * @method getPos
         * @param   {HTMLElement}   obj
         * @return  {Object}
         */
        this.getPos = function (obj) {
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

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.ajax = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
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

        /**
         * @method getSelectSound
         * @param   {String}    id
         * @return  {String}
         */
        this.getSelectSound = function (id) {
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
                str = '<select id="' + id + '" disabled>',
                i;

            for (i = 0; i < sounds.length; i++) {
                str += '<option value="' + i + '">' + sounds[i] + '</option>';
            }

            return str + '</select> ' +
                '<input type="button" id="l' + id + '" ' +
                'value="»" disabled>';
        };

        /**
         * @method showSettings
         */
        this.showSettings = function () {
            var _this = this;
            return function () {
                var settings = general.$('spSettings'),
                    vis = settings.style.visibility,
                    pos = _this.getPos(this);

                settings.style.top = (pos.y + 25).toString();
                settings.style.left = (pos.x - 80).toString();
                settings.style.visibility = vis === 'hidden' ?
                        'visible' : 'hidden';
            };
        };

        /**
         * @method playSound
         * @param   {String}    sound
         */
        this.playSound = function (sound) {
            if (sound && sound !== '0') {
                var audio = general.$('spAudio');
                if (!audio) {
                    audio = general.doc.createElement('audio');
                    audio.setAttribute('id', 'spAudio');
                    var divAudio = general.doc.createElement('div');
                    divAudio.setAttribute('style', 'display: none;');
                    divAudio.appendChild(audio);
                    general.doc.body.appendChild(divAudio);
                }

                audio.volume = 0.3;
                audio.src = '/sounds/' + sound + '.ogg';
                audio.play();
            }
        };

        /**
         * @method changeSelect
         * @param   {int}   ind
         */
        this.changeSelect = function (ind) {
            return function () {
                var stData = general.getData();
                stData[ind] = this.value !== '0' ? this.value : '';
                general.setData(stData);
            };
        };

        /**
         * @method listenSound
         */
        this.listenSound = function () {
            var _this = this;
            return function () {
                _this.playSound(this.previousElementSibling.value);
            };
        };

        /**
         * @method showHideLink
         */
        this.showHideLink = function () {
            var stData = general.getData(),
                persID = stData[0],
                tdLink = general.$('spPersLink'),
                butReset = general.$('spReset'),
                butSave = general.$('spSave');

            if (persID) {
                tdLink.innerHTML = '<a target="_blank" ' +
                    'style="color: #008000;" ' +
                    'href="http://www.gwars.ru/info.php?id=' + persID + '">' +
                    stData[7] + '</a>';
                tdLink.style.display = '';
                butReset.disabled = false;
                butSave.disabled = true;
            } else {
                tdLink.style.display = 'none';
                butReset.disabled = true;
                butSave.disabled = false;
            }
        };

        /**
         * @method scan
         */
        this.scan = function () {
            var stData = general.getData(),
                url = 'http://www.gwars.ru/syndicate.php?id=' + stData[1] +
                    '&page=online',
                _this = this;

            this.ajax(url, function (xml) {
                _this.spanContent.innerHTML = xml.responseText;
                var pers = _this.getPers(stData[0]);

                // в игре
                if (pers && !stData[6]) {
                    stData[6] = '1';
                    general.setData(stData);
                    _this.playSound(stData[4]);

                    if (stData[3]) {
                        alert('Персонаж ' + stData[7] + ' в игре');
                    }
                }

                // вышел
                if (!pers && stData[6]) {
                    stData[6] = '';
                    general.setData(stData);
                    _this.playSound(stData[5]);

                    if (stData[3]) {
                        alert('Персонаж ' + stData[7] + ' вышел из игры');
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.scan();
                }, 1000);
            });
        };

        /**
         * @method start
         */
        this.start = function () {
            var _this = this;
            general.root.setInterval(function () {
                var stData = general.getData(),
                    lastQuery = +stData[8],
                    now = new Date().getTime();
                if (stData[0] && now - lastQuery > _this.interval * 1000) {
                    stData[8] = now;
                    general.setData(stData);
                    _this.scan();
                }
            }, Math.round(this.interval * 1000 + 3000 * Math.random()));
        };

        /**
         * @method getPers
         * @param   {String}    id
         * @return  {Element|null}
         */
        this.getPers = function (id) {
            var css1 = 'center+br+table[align="center"]',
                css2 = 'center+br+script+table[align="center"]',
                table = this.spanContent.querySelector(css1) ||
                            this.spanContent.querySelector(css2);

            css1 = 'a[href$="/info.php?id=' + id + '"]>b';
            return table ? table.querySelector(css1) : null;
        };

        /**
         * @method saveData
         */
        this.saveData = function () {
            var reg = /^\d+$/,
                persID = general.$('spID').value,
                syndID = general.$('spSyndID').value,
                str;

            if (!reg.test(persID)) {
                str = 'персонажа';
            } else if (!reg.test(syndID)) {
                str = 'синдиката';
            }

            if (str) {
                alert('Не верно введен ID ' + str);
                return;
            }

            var preloader = general.$('spPreloader'),
                url = 'http://www.gwars.ru/syndicate.php?id=' + syndID +
                    '&page=members',
                _this = this;

            preloader.style.visibility = 'visible';
            this.ajax(url, function (xml) {
                _this.spanContent.innerHTML = xml.responseText;
                var pers = _this.getPers(persID);

                if (!pers) {
                    alert('Персонаж с ID ' + persID + ' в синдикате #' +
                        syndID + ' не найден');
                    preloader.style.visibility = 'hidden';
                    return;
                }

                var stData = general.getData();
                stData[0] = persID;
                stData[1] = syndID;
                stData[7] = pers.innerHTML;
                stData[8] = '';
                general.setData(stData);

                _this.showHideLink();
                preloader.style.visibility = 'hidden';

                _this.start();
            }, function () {
                general.root.setTimeout(function () {
                    _this.saveData();
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var topPanel = general.getTopPanel();
            if (!topPanel) {
                return;
            }

            var stData = general.getData();
            // совместимость с прошлыми версиями
            if (stData.length !== 10) {
                general.st.removeItem(general.STORAGENAME);
                stData = general.getData();
            }

            // кнопка настроек
            var scanPersBut = general.doc.createElement('span');
            scanPersBut.setAttribute('style', 'cursor: pointer;');
            scanPersBut.innerHTML = 'ScanPers';
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(scanPersBut);
            scanPersBut.addEventListener('click', this.showSettings(), false);

            // окно настроек
            var scanPersSettings = general.doc.createElement('div');
            scanPersSettings.setAttribute('id', 'spSettings');
            scanPersSettings.setAttribute('style', 'visibility: hidden; ' +
                'position: absolute; padding: 3px; border: solid 1px #339933;' +
                ' background: #D7F4D8; border-radius: 4px;');

            scanPersSettings.innerHTML = '<table>' +
                '<tr>' +
                    '<td>ID персонажа:</td>' +
                    '<td><input id="spID" value="" size="10" maxlength="7" ' +
                    'style="border: solid 1px #339933;"></td></tr>' +
                '<tr>' +
                    '<td>ID синдиката:</td>' +
                    '<td><input id="spSyndID" size="10" maxlength="5" ' +
                        'value="" style="border: solid 1px #339933;">' +
                    '</td></tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<input id="spChkSound" type="checkbox">' +
                        '<label for="spChkSound"> Проигрывать звук при:' +
                        '</label></td></tr>' +
                '<tr>' +
                    '<td colspan="2">входе&nbsp;&nbsp;&nbsp;&nbsp;' +
                        this.getSelectSound('spSound1') + '<br>' +
                    'выходе ' + this.getSelectSound('spSound2') + '</td></tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<input id="spChkAllert" type="checkbox">' +
                        '<label for="spChkAllert"> Выдавать сообщение' +
                        '</label></td></tr>' +
                '<tr>' +
                    '<td colspan="2" style="text-align: center;">' +
                        '<input type="button" id="spSave" value="Сохранить">' +
                        '<img id="spPreloader" src="' + general.imgPath +
                        'preloader.gif" style="margin-left: 10px; ' +
                        'visibility: hidden;">' +
                        '<input type="button" id="spReset" value="Сброс" ' +
                        'style="margin-left: 20px;"></td></tr>' +
                '<tr>' +
                    '<td id="spPersLink" colspan="2" style="text-align: ' +
                        'center; display: none;"></td></tr>' +
                '</table>';
            general.doc.body.appendChild(scanPersSettings);

            // ID перса и синда
            var inpPersID = general.$('spID'),
                inpSyndID = general.$('spSyndID');

            if (stData[0]) {
                inpPersID.value = stData[0];
                inpSyndID.value = stData[1];
            }

            // звук
            var chkSound = general.$('spChkSound'),
                sel1 = general.$('spSound1'),
                sel2 = general.$('spSound2'),
                listen1 = general.$('lspSound1'),
                listen2 = general.$('lspSound2');

            if (stData[2]) {
                sel1.disabled = false;
                sel2.disabled = false;
                listen1.disabled = false;
                listen2.disabled = false;
            }

            chkSound.checked = !!stData[2];
            chkSound.addEventListener('click', function () {
                var data = general.getData(),
                    _this = this;

                sel1.disabled = !_this.checked;
                sel2.disabled = !_this.checked;
                listen1.disabled = !_this.checked;
                listen2.disabled = !_this.checked;
                data[2] = _this.checked ? '1' : '';
                general.setData(data);
            }, false);

            sel1.value = stData[4] || '0';
            sel2.value = stData[5] || '0';
            sel1.addEventListener('change', this.changeSelect(4), false);
            sel2.addEventListener('change', this.changeSelect(5), false);

            // кнопки проигрывания звука
            listen1.addEventListener('click', this.listenSound(listen1), false);
            listen2.addEventListener('click', this.listenSound(listen2), false);

            // чекбокс "Выдавать сообщение"
            var chkAllert = general.$('spChkAllert');
            chkAllert.checked = !!stData[3];
            chkAllert.addEventListener('click', function () {
                var data = general.getData(),
                    _this = this;
                data[3] = _this.checked ? '1' : '';
                general.setData(data);
            });

            // кнопка сброса
            var _this = this;
            general.$('spReset').addEventListener('click', function () {
                if (confirm('Сбросить данные?')) {
                    var data = general.getData();
                    data[0] = '';
                    data[1] = '';
                    data[6] = '';
                    data[7] = '';
                    data[8] = '';
                    general.setData(data);
                    inpPersID.value = '';
                    inpSyndID.value = '';
                    _this.showHideLink();
                }
            }, false);

            // кнопка сохранения данных
            var spSave = general.$('spSave');
            spSave.addEventListener('click', function () {
                _this.saveData();
            }, false);

            // нажатие <Enter> в полях ввода
            inpPersID.addEventListener('keypress', function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13 || ev.keyCode === 10) {
                    spSave.click();
                }
            }, false);

            inpSyndID.addEventListener('keypress', function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13 || ev.keyCode === 10) {
                    spSave.click();
                }
            }, false);

            this.showHideLink();
            this.start();
        };
    };

    new ScanPers().init();

}());

