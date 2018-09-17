// ==UserScript==
// @name            ScanPers
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выдает сообщение и/или звуковой сигнал при появлении (или выходе) в онлайне определенного персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanPers/scanPers.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanPers/scanPers.user.js
// @include         http://www.gwars.ru/*
// @exclude         http://www.gwars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         2.34-170918
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, nomen: true,
plusplus: true, devel: true */

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
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie)[2];
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

            stData = ['', '', '', '', '', '', '', '', ''];
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
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
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

            return general.doc.
                querySelector('td.txt[align="left"] nobr:first-child');
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
                audio.src = '/sounds/' + sound + '.ogg';
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
                '</select> <input type="button" id="l' + id + '" ' +
                'value="»" disabled>';
        };
    };

    /**
     * @class ScanPers
     * @constructor
     */
    var ScanPers = function () {
        /**
         * @method showSettings
         */
        this.showSettings = function () {
            var settings = general.$('settingsWin'),
                pos = new GetPos().init(this);

            settings.style.top = String(pos.y + 28);
            settings.style.left = String(pos.x - 120);
            settings.style.visibility = settings.style.visibility === 'hidden' ?
                    'visible' : 'hidden';
        };

        /**
         * @method listenSound
         */
        this.listenSound = function () {
            var _this = this;
            new PlaySound().init(_this.previousElementSibling.value);
        };

        /**
         * @method changeSelect
         */
        this.changeSelect = function () {
            var _this = this,
                ind = _this.id === 'scan_sel1' ? 4 : 5,
                stData = general.getData();

            stData[ind] = _this.value !== '0' ? _this.value : '';
            general.setData(stData);
        };

        /**
         * @method showHideLink
         */
        this.showHideLink = function () {
            var stData = general.getData(),
                persId = stData[6],
                tdLink = general.$('td_link'),
                butReset = general.$('scan_reset'),
                butCheckNow = general.$('scan_checknow'),
                butSave = general.$('scan_save');

            if (persId) {
                tdLink.innerHTML = '<a target="_blank" style="color: ' +
                    '#008000;" href="http://www.gwars.ru/info.php?id=' +
                    persId + '">' + stData[0] + '</a>';
                tdLink.style.display = '';
                butReset.disabled = false;
                butCheckNow.disabled = false;
                butSave.disabled = true;
            } else {
                tdLink.style.display = 'none';
                butReset.disabled = true;
                butCheckNow.disabled = true;
                butSave.disabled = false;
            }
        };

        /**
         * @method showHidePreloader
         */
        this.showHidePreloader = function () {
            var preloader = general.$('img_load');
            preloader.style.display = preloader.style.display === 'none' ?
                    '' : 'none';
        };

        /**
         * @method saveData
         */
        this.saveData = function () {
            var persNik = general.$('scan_nik').value;
            if (!persNik) {
                alert('Введите ник персонажа');
                return;
            }

            var syndId = general.$('scan_synd_id').value;
            if (!syndId || isNaN(syndId) || +syndId < 0) {
                alert('Не верно введен номер синдиката');
                return;
            }

            this.showHidePreloader();
            var url = 'http://www.gwars.ru/search.php?key=' +
                    new UrlEncode().init(persNik),
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                if (/Персонаж с таким именем не найден/.
                        test(spanContent.innerHTML)) {
                    _this.showHidePreloader();
                    alert('Персонаж с именем ' + persNik + ' не найден');
                    return;
                }

                // новое и старое оформление страницы персонажа
                var cssSelector1 = 'table+br+table[width="730"]',
                    cssSelector2 = 'table+br+table[width="600"]' +
                        '[cellpadding="1"][align="center"]',
                    cssSelector3 = 'a[href*="/syndicate.php?id=' +
                        syndId + '"]',
                    target = spanContent.querySelector(cssSelector1) ||
                        spanContent.querySelector(cssSelector2);
                if (!target.querySelector(cssSelector3)) {
                    _this.showHidePreloader();
                    alert('Персонаж ' + persNik + ' не состоит в синдикате #' +
                        syndId + ',\nили его список синдикатов скрыт. Если ' +
                        'список скрыт, то введите номер основного синдиката.');
                    return;
                }

                var stData = general.getData(),
                    cssSelector = 'a[href*="/usertransfers.php?id="]';

                stData[0] = persNik;
                stData[1] = syndId;
                stData[6] = /\?id=(\d+)/.
                    exec(target.querySelector(cssSelector).href)[1];
                stData[7] = '';

                var interval = general.$('scan_interval').value;
                interval = interval && !isNaN(interval) && +interval > 19 ?
                        interval : '60';
                stData[8] = interval;
                general.$('scan_interval').value = interval;
                general.setData(stData);

                general.$('scan_save').disabled = true;
                _this.showHideLink();
                _this.showHidePreloader();

                general.root.setTimeout(function () {
                    _this.scan(false);
                }, 1000);
            }, function () {
                general.root.setTimeout(function () {
                    _this.saveData();
                }, 1000);
            });
        };

        /**
         * @method scan
         * @param   {Boolean}   now
         */
        this.scan = function (now) {
            var stData = general.getData();
            if (!stData[0]) {
                return;
            }

            var url = 'http://www.gwars.ru/syndicate.php?id=' + stData[1] +
                    '&page=online',
                persNik = stData[0],
                persId = stData[6],
                _this = this;

            this.showHidePreloader();

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var cssSelector1 = 'center+br+table',
                    cssSelector2 = 'a[href*="/info.php?id=' + persId + '"]',
                    online = spanContent.querySelector(cssSelector1).
                        querySelector(cssSelector2);

                _this.showHidePreloader();
                if (now) { //нажали кнопу "Узнать сейчас"
                    var str = online ? ' в игре' : ' не в игре';
                    alert('Персонаж ' + persNik + str);
                    return;
                }

                var playSound = new PlaySound().init;

                // в игре
                if (online && !stData[7]) {
                    stData[7] = '1';
                    general.setData(stData);
                    playSound(stData[4]);

                    if (stData[3]) {
                        alert('Персонаж ' + persNik + ' в игре');
                    }
                }

                // вышел
                if (!online && stData[7]) {
                    stData[7] = '';
                    general.setData(stData);
                    playSound(stData[5]);

                    if (stData[3]) {
                        alert('Персонаж ' + persNik + ' вышел из игры');
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.scan(now);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'ScanPers:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            /* localStorage:
                [0] - ник перса
                [1] - id синда
                [2] - чекбокс звук
                [3] - чекбокс сообщение
                [4] - id звука при входе
                [5] - id звука при выходе
                [6] - id перса
                [7] - звук(сообщение) проигран или нет
                [8] - интервал сканирования (сек, не менее 20)
            */
            var stData = general.getData();

            var topPanel = new GetTopPanel().init();
            if (!topPanel) {
                return;
            }

            var settingsBut = general.doc.createElement('span');
            settingsBut.setAttribute('style', 'cursor: pointer;');
            settingsBut.innerHTML = 'ScanPers';
            // noinspection JSCheckFunctionSignatures
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(settingsBut);
            settingsBut.addEventListener('click', this.showSettings, false);

            var settingsWin = general.doc.createElement('div'),
                brd = 'border: solid 1px #339933;';

            settingsWin.setAttribute('id', 'settingsWin');
            settingsWin.setAttribute('style', 'visibility: hidden; ' +
                    'position: absolute; padding: 5px; ' + brd +
                    ' background: #D7F4D8;');

            var getSelectSound = new GetSelectSound().init;
            settingsWin.innerHTML = '<table><tr><td>Ник персонажа:</td><td>' +
                '<input id="scan_nik" value="" style="' + brd +
                '"></td><tr><td>Номер синдиката:</td><td><input ' +
                'id="scan_synd_id" size="5" maxlength="6" ' +
                'value="" style="' + brd + '"> <span style="font-size: 11px;' +
                '">(без #)</span></td><tr><td>Интервал сканирования:</td><td>' +
                '<input id="scan_interval" size="4" ' +
                'maxlength="3" value="' + (stData[8] || '60') + '" style="' +
                brd + '" /> сек (не менее 20)</td></tr><tr><td colspan="2" ' +
                'style="padding-top: 10px;"><input id="scan_chksound" type=' +
                '"checkbox" style="margin: 0;"><label for="scan_chksound"> ' +
                'Проигрывать звук при:</label></td><tr><td colspan="2">входе ' +
                '&nbsp;&nbsp;&nbsp;' + getSelectSound('scan_sel1') +
                '<br>выходе ' + getSelectSound('scan_sel2') + '</td><tr>' +
                '<td colspan="2" style="padding-top: 10px;"><input ' +
                'id="scan_chkallert" type="checkbox" style="margin: 0;">' +
                '<label for="scan_chkallert"> Выдавать сообщение' +
                '</label><img id="img_load" style="margin-left: 30px; ' +
                'display: none;" src="' + general.imgPath + 'preloader.gif">' +
                '</td><tr><td colspan="2" style="padding-top: 10px; ' +
                'text-align: center;"><input type="button" id="scan_save" ' +
                'value="Принять"> <input type="button" id="scan_reset" ' +
                'value="Сброс"> <input type="button" id="scan_checknow" ' +
                'value="Узнать сейчас"></td><tr><td id="td_link" colspan="2" ' +
                'style="padding-top: 10px; text-align: center; display: ' +
                'none;"></td></table>';
            general.doc.body.appendChild(settingsWin);

            // ник перса и синд
            var inpPersNik = general.$('scan_nik'),
                inpSyndId = general.$('scan_synd_id');

            if (stData[0]) {
                inpPersNik.value = stData[0];
                inpSyndId.value = stData[1];
            }

            // чекбокс звук
            var chkSound = general.$('scan_chksound'),
                sel1 = general.$('scan_sel1'),
                sel2 = general.$('scan_sel2'),
                listen1 = general.$('lscan_sel1'),
                listen2 = general.$('lscan_sel2');

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

            if (stData[2]) {
                chkSound.click();
            }

            // списки выбора звуков
            sel1.value = stData[4] || '0';
            sel2.value = stData[5] || '0';
            sel1.addEventListener('change', this.changeSelect, false);
            sel2.addEventListener('change', this.changeSelect, false);

            // кнопки проигрывания звука
            listen1.addEventListener('click', this.listenSound, false);
            listen2.addEventListener('click', this.listenSound, false);

            //чекбокс сообщение
            var chkAllert = general.$('scan_chkallert');
            chkAllert.addEventListener('click', function () {
                var data = general.getData(),
                    _this = this;

                data[3] = _this.checked ? '1' : '';
                general.setData(data);
            }, false);

            chkAllert.checked = stData[3];

            // кнопка сброса
            var _this = this;
            general.$('scan_reset').addEventListener('click', function () {
                if (confirm('Сбросить данные?')) {
                    var data = general.getData();
                    data[0] = '';
                    data[1] = '';
                    data[6] = '';
                    data[7] = '';
                    data[8] = '';
                    general.setData(data);
                    inpPersNik.value = '';
                    inpSyndId.value = '';
                    _this.showHideLink();
                }
            }, false);

            // кнопка сохранения данных
            general.$('scan_save').addEventListener('click', function () {
                _this.saveData();
            }, false);

            // кнопка "Узнать сейчас"
            general.$('scan_checknow').addEventListener('click', function () {
                _this.scan(true);
            }, false);

            this.showHideLink();
            if (stData[8]) {
                general.root.setInterval(function () {
                    _this.scan(false);
                }, +stData[8] * 1000);
            }
        };
    };

    new ScanPers().init();

}());

