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
// @version         1.00-180915-dev
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

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
        this.version = '1.00-180915-dev';
        /**
         * @property stString
         * @type {String}
         */
        this.stString = this.version +  // [0] - script version
                    /*
                    [1]  - initScript
                        [0]  - NotGiveCannabisLeaf
                        [1]  - AdditionForNavigationBar
                        [2]  - AdsFilter
                        [3]  - AdvBattleAll
                        [4]  - BlacklistHighlighting
                        [5]  - WorkPostGrenadesBroken
                        [6]  - ResourcesAndBonuses
                        [7]  - CritShotsAndLinksBtlLog
                        [8]  - DeleteSms
                        [9]  - FarmExperience
                        [10] - FarmTimer
                        [11] - ComfortableLinksForFarm
                        [12] - TimeNpc
                        [13] - AllPlantsOnFarm
                        [14] - GwMenu
                        [15] - InventoryPlus
                        [16] - CountBattles
                        [17] - GbCounter
                        [18] - BonusInfo
                        [19] - BuyHightech
                        [20] - NewsAndInvit
                        [21] - DoFilter
                        [22] - FilterResOnStat
                        [23] - FilterWarlist1to1
                        [24] - FixSkills
                        [25] - FuckTheFarm
                        [26] - HistorySms
                        [27] - LinksToHighTech
                        [28] - GameMania
                        [29] - GosEnergoAtomFilter
                        [30] - SortSyndOnline */
                        '@||||||||||||||||||||||||||||||' +
                    /*
                    [2]  - AdditionForNavigationBar
                        [0] - '{"linkName": ["href", "style"], ...}' */
                        '@' +
                    /*
                    [3]  - AdsFilter
                        [0] - остров (нет,Z,G: '', 1, 2)
                        [1] - фильтр по онлайну */
                        '@|' +
                    /*
                    [4]  - AdvBattleAll
                        # настройки
                        [0]  - таймаут обновления данных в бою
                        [1]  - таймаут обновления страницы, когда висим в заявке
                        # основные данные скрипта
                        [2]  - метод сортировки списка врагов ('', 1 - 5)
                        [3]  - случайный ход или запоминать ход ('', 1, 2)
                        [4]  - дублировать противника или нет
                        # последний сделаный ход (если включено "запомнить ход")
                        [5]  - левая
                        [6]  - правая
                        [7]  - куда отходим
                        [8]  - кидаем грену или нет
                        [9]  - подходим или нет
                        [10] - чекбокс <Сказать своей команде>
                        # запоминаем ход в хранилище перед тем как сказать ход
                        [11] - номер в кого стреляем
                        [12] - направление левой руки
                        [13] - направление правой руки
                        [14] - куда отходим
                        [15] - кидаем грену или нет
                        [16] - подходим или нет
                        [17] - список выбора врагов (хэш: имя --> номер) */
                        '@|||||||||||||||||' +
                    /*
                    [5]  - BlacklistHighlighting
                        [0]  - ID персов из ЧС ('id1,id2,...')
                        [1]  - блокировать ссылку принятия боя в одиночках? */
                        '@|' +
                    /*
                    [6]  - WorkPostGrenadesBroken
                        [0]  - звук при получении почты/посылки (проигран или нет)
                        [1]  - звук по окончании работы (проигран или нет)
                        [2]  - отображать время работы
                        [3]  - отображать почту/посылку
                        [4]  - отображать слом
                        [5]  - отображать грену
                        [6]  - звук при получении почты/посылки
                        [7]  - звук "Пора работать" */
                        '@|||||||' +
                    /*
                    [7]  - CritShotsAndLinksBtlLog
                        [0]  - показывать/не показывать критические выстрелы */
                        '@' +
                    /*
                    [8]  - DeleteSms
                        [0]  - отмечать синдовые рассылки
                        [1]  - отмечать рассылки от робота
                        [2]  - НЕ отмечать письма с пометкой "важное" */
                        '@||' +
                    /*
                    [9]  - FarmTimer
                        [0]  - время полива/сбора
                        [1]  - действие (Полить|Собрать)
                        [2]  - время последнего проигрывания звука
                        [3]  - звук проигран?
                        [4]  - номер звука когда пора поливать/собирать
                        [5]  - интервал повторения звука */
                        '@|||||' +
                    /*
                    [10] - TimeNpc
                        [0]  - звук вкл/выкл
                        [1]  - ID NPC, у которого последний раз брали квест
                        [2]  - время
                        [3]  - номер звука */
                        '@|||' +
                    /*
                    [11] - AllPlantsOnFarm
                        [0]  - номер первого недоступного растения
                        [1]  - время сброса счетчика
                        [2]  - количество гб
                        [3]  - количество производа
                        [4]  - показывать счетчик ГБ?
                        [5]  - показывать счетчик производа? */
                        '@|||||' +
                    /*
                    [12] - GwMenu
                        [0] - чекбокс "Показывать всегда" */
                        '@' +
                    /*
                    [13] - GbCounter
                        [0] - количество Гб */
                        '@' +
                    /*
                    [14] - NewsAndInvit
                        [0] - {'newsId': 0|1, ...} */
                        '@' +
                    /*
                    [15] - FilterResOnStat
                        [0] - список отображаемых ресурсов через запятую */
                        '@' +
                    /*
                     [16] - FilterWarlist1to1
                        [0] - название оружия */
                        '@' +
                    /*
                     [17] - GosEnergoAtomFilter
                        [0] - остров ('' - любой, 'Z', 'G')
                        [1] - тип объекта ('' - любой, '1' - эски, '2' - уранки)
                        [2] - синдикат ('', '0' - ничейки, 'xxx' - ID синда) */
                        '@' +
                    /*
                     [18] - SortSyndOnline
                        [0] - сортировать по боям
                        [1] - показывать онлайн союза
                        [2] - сортировать вместе с союзом */
                        '@||';

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
        this.imgPath = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/imgs/';
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
         * @param   {String}    id
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
                link.setAttribute('href', general.imgPath +
                        'NotGiveCannabisLeaf/favicon.ico');
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
         * @method init
         * @param   {String}        url
         * @param   {String}        rmethod
         * @param   {String|null}   param
         * @param   {Boolean}       async
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, rmethod, param, async, onsuccess,
                onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

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
                    if (xmlHttpRequest.readyState === 4) {
                        clearTimeout(timeout);
                        if (xmlHttpRequest.status === 200) {
                            onsuccess(xmlHttpRequest);
                        } else {
                            onfailure();
                        }
                    }
                };
            } else {
                if (xmlHttpRequest.status === 200) {
                    onsuccess(xmlHttpRequest);
                } else {
                    onfailure(xmlHttpRequest);
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
         * @method getGitHubLink
         * @param   {String}    scriptName
         * @return  {String}
         */
        this.getGitHubLink = function (scriptName) {
            var gitHubPage = 'https://github.com/MyRequiem/' +
                'comfortablePlayingInGW/tree/master/separatedScripts/';

            return '<br><a target="_blank" href="' + gitHubPage +
                scriptName[0].toUpperCase() + scriptName.substr(1) +
                '" style="color: #0000FF;">' + scriptName + '.user.js</a>';
        };

        /**
         * @property infoScripts
         * @type {Object}
         */
        this.infoScripts = {
            'Персонаж': [
                ['Gw-Меню', 'Панель с множеством полезных ссылок для игры.' +
                    this.getGitHubLink('gwMenu'), '14'],
                ['Логотип игры', 'На всех страницах заменяет логотип игры ' +
                    '&nbsp;&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122, 0.5);" src="http://images.ganjawars.' +
                    'ru/i/gon.gif" /> &nbsp;&nbsp;на зеленый листик &nbsp;' +
                    '&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122,0.5);" src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" />' +
                    this.getGitHubLink('notGiveCannabisLeaf'), '0'],
                ['Дополнение для панели навигации',
                    'Добавляет возможность установить дополнительные ссылки ' +
                    'в панель навигации.' +
                    this.getGitHubLink('additionForNavigationBar'), '1'],
                ['Подсветка персонажей из ЧС', 'Подсвечивает ссылки на ' +
                    'персонажей, входящих в черный список на всех страницах ' +
                    'игры. Делает неактивной ссылку принятия боя c ' +
                    'персонажем из черного списка в одиночных боях.<br><br>' +
                    '&nbsp;&nbsp;<a target="_blank" href=' +
                    '"http://www.ganjawars.ru/home.friends.php">Запомнить ' +
                    'черный список</a> (скрипт должен быть включен)<br>' +
                    '<input type="checkbox" id="blockBLOne2One" disabled> ' +
                    'блокировать ссылку принятия боя с персонажем из ЧС в ' +
                    'одиночных заявках' +
                    this.getGitHubLink('blacklistHighlighting'), '4'],
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
                    'disabled>' +
                    this.getGitHubLink('workPostGrenadesBroken'), '5'],
                ['Ресурсы и бонусы', 'Создает ссылки "Ресурсы" и "Бонусы" ' +
                    'вверху страницы. При клике выводятся соответствующие ' +
                    'данные.' + this.getGitHubLink('resourcesAndBonuses'), '6'],
                ['Удаление личных сообщений', 'Добавляет сылку "Удалить ' +
                    'отмеченные" вверху страниц входящих и исходящих ' +
                    'сообщений. Отметка синдикатных рассылок и сообщений от ' +
                    'робота.<br><br><input id="syndmail" type="checkbox" ' +
                    'disabled /> отмечать синдовые рассылки<br>' +
                    '<input id="robotmail" type="checkbox" disabled /> ' +
                    'отмечать рассылки от робота<br>' +
                    '<input id="importantmail" type="checkbox" disabled /> ' +
                    'НЕ отмечать письма с пометкой "важное"' +
                    this.getGitHubLink('deleteSms'), '8'],
                ['Таймер для выполнения квестов NPC', 'На главной странице ' +
                    'выводит время, оставшееся до взятия квеста и сcылку на ' +
                    'NPC, у которого в последний раз брали квест. Звуковое ' +
                    'оповещение. Умеет выводить список NPC с информацией ' +
                    'о них для каждого острова.<br>Звук "Пора делать ' +
                    'квест": ' + this.getSelectSound('soundTimerNPC') +
                    ' <input type="button" id="playSoundTimerNPC" value="»" ' +
                    'disabled />' + this.getGitHubLink('timeNpc'), '12'],
                ['Упаковка одинаковых предметов в инвентаре', 'Упаковка ' +
                    'одинаковых предметов в инвентаре.' +
                    this.getGitHubLink('inventoryPlus'), '15'],
                ['Счетчик Гб', 'Показывает измененние количества Гб на ' +
                    'главной странице персонажа.' +
                    this.getGitHubLink('gbCounter'), '17'],
                ['Информация о бонусах', 'На странице информации персонажа ' +
                    'делает названия бонусов кликабельными. При нажатии ' +
                    'выводится описание бонуса.' +
                    this.getGitHubLink('bonusInfo') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=1845550" ' +
                    'style="font-weight: bold;" target="_blank">signed' +
                    '</a></span>', '18'],
                ['Новости и приглашения в синдикаты', 'Выделение и мигание ' +
                    'приглашений в синдикаты, новых и не прочитанных ' +
                    'новостей на главной странице персонажа.' +
                    this.getGitHubLink('newsAndInvit'), '20'],
                ['Исправление умелок вида +-xxx', 'Исправляет умелки вида ' +
                    '+-xxx, полученные при выполнении квестов на странице ' +
                    'информации персонажа и на главной странице.' +
                    this.getGitHubLink('fixSkills'), '24'],
                ['Просмотр истории личных сообщений', 'При просмотре ' +
                    'входящего/исходящего сообщения устанавливает ссылку ' +
                    'для вывода предыдущей переписки с персонажем. Так же ' +
                    '"умеет" выводить ссылки на тексты сообщений, доступные ' +
                    'для официальных синдикатов в хронологическом порядке.' +
                    this.getGitHubLink('historySms'), '26'],
                ['Результативность игры в рулетку, покер, тотализатор',
                    'Анализ результативности игры в рулетку, тотализатор, ' +
                    'покер и заработанных денег в боях на странице ' +
                    'информации персонажа.' +
                    this.getGitHubLink('gameMania'), '28']],

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
                    'настройки игры по умолчанию)' +
                    this.getGitHubLink('advBattleAll'), '3'],
                ['Ссылки в логе боя, критические выстрелы', 'В бою и на ' +
                    'страницax логов боев делает все ники персонажей ' +
                    'ссылками. Показывает критические выстрелы вашего ' +
                    'персонажа и их общее количество (опционально).<br><br>' +
                    '<input type="checkbox" id="showcrits" disabled /> ' +
                    'показывать критические выстрелы' +
                    this.getGitHubLink('critShotsAndLinksBtlLog'), '7'],
                ['Счетчик боев', 'Показывает общее количество боев, побед и ' +
                    'поражений за текущие сутки на страницax протоколов ' +
                    'боев.' + this.getGitHubLink('countBattles'), '16'],
                ['Фильтр по оружию в одиночных заявках', 'Фильтр по оружию в ' +
                    'одиночых заявках. Фильтр по уровням и типу оружия, ' +
                    'встроенный в игре, переносится вверх страницы. Все ' +
                    'настройки находятся на <a target="_blank" ' +
                    'href="http://www.ganjawars.ru/warlist.php?war=armed">' +
                    'странице одиночных заявок</a>' +
                    this.getGitHubLink('filterWarlist1to1'), '23'],
                ['Контроль Уранa и ЭC', 'Сортировка объектов по типу, ' +
                    'островам и контролирующим синдикатам на странице ' +
                    '<a target="_blank" href="http://www.ganjawars.ru/' +
                    'info.realty.php?id=2">ГосЭнегоАтом</a>. Выводит онлайны ' +
                    'и уровни контролирующего синдиката и его союза.' +
                    this.getGitHubLink('gosEnergoAtomFilter'), '29']],

            'Синдикаты': [
                ['Сортировка на странице онлайна синдиката', 'Сортировка ' +
                    'онлайна синдиката и союза по идущим боям, вывод онлайна ' +
                    'союзного синдиката.<br><br><input type="checkbox" ' +
                    'id="showSortBattles" disabled> сортировать по боям<br>' +
                    '<input type="checkbox"  id="showUnionOnline" disabled> ' +
                    'показывать онлайн союза<br><input type="checkbox"  ' +
                    'id="sortMainAndUnion" disabled> сортировать вместе с ' +
                    'союзом' + this.getGitHubLink('sortSyndOnline') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=732670" ' +
                    'style="font-weight: bold;" target="_blank">z0man</a>, ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=198825" ' +
                    'style="font-weight: bold;" target="_blank">VSOP_juDGe' +
                    '</a></span>', '30']],

            'Торговля': [
                ['Фильтр поиска продажи/покупки/аренды', 'Фильтр ' +
                    'онлайн/оффлайн и по островам на страницах поиска ' +
                    'продажи/покупки/аренды предметов.' +
                    this.getGitHubLink('adsFilter'), '2'],
                ['Ссылки в HighTech магазине для подачи объявлений',  'В ' +
                    'HighTech магазине добавляет ссылки "Продать" и "Купить" ' +
                    'для каждого предмета, при нажатии на которые, выводится ' +
                    'форма подачи объявления на ДО для данного предмета.' +
                    this.getGitHubLink('buyHightech'), '19'],
                ['Быстрый поиск на ДО', 'Быстрый поиск предметов на ' +
                    '<a target="_blank" href="http://www.ganjawars.ru' +
                    '/market.php">доске объявлений</a>. Поиск осуществляется ' +
                    'по мере ввода названия предмета.' +
                    this.getGitHubLink('doFilter'), '21'],
                ['Фильтр ресурсов на странице статистики', 'Фильтр ресурсов ' +
                    'на <a target="_blank" href="http://www.ganjawars.ru/' +
                    'stats.php">странице статистики</a><br><br>Введите ' +
                    'названия ресурсов через запятую, которые будут ' +
                    'отображаться на вышеуказанной странице. Например: ' +
                    'Уран,Водоросли,Маковая соломка,Трава,Батареи<br>' +
                    '<input id="filter_res" type="text" style="width: ' +
                    '350px;" disabled />' +
                    this.getGitHubLink('filterResOnStat'), '22'],
                ['Ссылки на High-tech вооружение в государственном магазине',
                    'В государственном магазине рядом со ссылками на типы ' +
                    'вооружения добавляет ссылки на вооружение High-tech' +
                    this.getGitHubLink('linksToHighTech') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=436429" ' +
                    'style="font-weight: bold;" target="_blank">Buger_man' +
                    '</a></span>', '27']],

            'Ферма': [
                ['Производственный опыт и прибыль', 'Отображение ' +
                    'производственного опыта и прибыли в Гб за один час для ' +
                    'каждого растения.' +
                    this.getGitHubLink('farmExperience'), '9'],
                ['Таймер', 'Таймер для фермы. Звуковое оповещение когда ' +
                    'пора полить/собрать.<br><br>' +
                    this.getSelectSound('farmtm_snd') +
                    '<input id="listenFarmtimer_sound" type="button" ' +
                    'value="»" disabled /> - звук когда пора поливать/' +
                    'собирать (0 - без звука)<br>' +
                    '<input id="farmtmSndIntrvl" type="text" maxlength="3" ' +
                    'style="width: 40px;" disabled /> - интервал повторения ' +
                    'звука в секундах (0 - не повторять)' +
                    this.getGitHubLink('farmTimer'), '10'],
                ['Удобные ссылки на ферме', 'Удобные ссылки для полива, ' +
                    'сбора, вскапывания, посадки на ферме.' +
                    this.getGitHubLink('comfortableLinksForFarm'), '11'],
                ['Все растения на одной странице, счетчики', 'На ферме ' +
                    'добавляет выпадающий список для выбора и посадки любого ' +
                    'растения. Для каждого растения присутствует изображение, ' +
                    'производственный опыт и прибыль (общие и в 1 час), ' +
                    'цена, время созревания в минутах и часах. Счетчики ' +
                    'Гб и производственного опыта.<br><br>' +
                    '<input id="showGbFarmCounter" type="checkbox" ' +
                    'disabled /> показывать счетчик Гб<br>' +
                    '<input id="showExpFarmCounter" type="checkbox" ' +
                    'disabled /> показывать счетчик производственног опыта' +
                    this.getGitHubLink('allPlantsOnFarm'), '13'],
                ['Играем без фермы', 'Убирает ссылку на ферму на главной ' +
                    'странице и на странице информации персонажа.' +
                    this.getGitHubLink('fuckTheFarm'), '25']]
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
                'id=117721&tid=88232637&fid=117721&page_id=last';
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
         * @method modifyData
         * @param   {int}       ind
         * @param   {int}       ind1
         * @param   {String}    val
         */
        this.modifyData = function (ind, ind1, val) {
            var tmp = general.getData(ind);
            tmp[ind1] = val;
            general.setData(tmp, ind);
        };

        /**
         * @method init
         */
        this.init = function () {
            var tdStyle = ' style="background-color: #E0FFE0;">',
                str = '<table style="width: 100%; box-shadow: 8px 10px 7px ' +
                    'rgba(122,122,122,0.5);"><tr><td ' + tdStyle +
                    '<table style="width: 100%"><tr><td style="width: 3%;">' +
                    '<img id="imgSaveSettings" title="Сохранить/Восстановить ' +
                    'настройки" src="http://images.ganjawars.ru/i/home/' +
                    'ganjafile.gif" style="cursor: pointer;" /></td>' +
                    '<td style="font-size: 8pt; text-align: center;">' +
                    '<a id="linkNewVerScript" target="_blank" ' +
                    'style="color: #FF0000; visibility: hidden;" ' +
                    'href="https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/_comfortablePlayingInGW.' +
                    'user.js">Доступна новая версия</a> ' +
                    '<span id="refreshVer"></span></td>' +
                    '<td style="font-size: 7pt; width: 35%; text-align: ' +
                    'right;"><a target="_blank" style="opacity: 0.5; ' +
                    'text-decoration: none; font-size: 7pt;" ' +
                    'href="http://www.ganjawars.ru/info.php?id=2095458">' +
                    '<span style="color: #F90332;">developed by</span> ' +
                    '<span style="color: #014305; font-weight: 700;">' +
                    'MyRequiem©</span></a> ' + general.version + '</td>' +
                    '</tr><tr id="trSaveSettings" style="display: none;">' +
                    '<td colspan="3"><br>Сохранить строку настроек ' +
                    '(&lt;Ctrl-A&gt; - выделить всю строку, &lt;Ctrl-C&gt; - ' +
                    'копировать):<br><input id="inpExportSettings" ' +
                    'type="text" style="width: 97%;" /><br><br>' +
                    'Восстановление настроек. Введите ранее сохраненную ' +
                    'строку и нажмите "Восстановить":<br><input ' +
                    'id="inpImportSettings" type="text" style="width: ' +
                    '97%;" /><br><input id="butRestoreSettings" ' +
                    'type="button" value="Восстановить" /><input ' +
                    'id="butClearSettings" type="button" value="Сбросить ' +
                    'настройки" style="margin-left: 10px;" />' +
                    '</td></tr></table></td></tr>',
                groupStyle = ' style="background-color: #D0EED0; text-align: ' +
                    'center; color: #990000;"><b>',
                spanStyle = ' style="cursor: pointer;">',
                hiddenDivStyle = ' style="display: none; padding: 0 10px ' +
                    '0 50px; background-color: #E7E7E7">',
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

            // открытие/закрытие панели сохранения настроек, обработчики
            // текстовых полей, кнопки импорта настроек
            general.$('imgSaveSettings').addEventListener('click', function () {
                var trSaveSettings = general.$('trSaveSettings'),
                    displ = trSaveSettings.style.display;

                if (displ) {
                    general.$('inpExportSettings').value = general.root.
                        localStorage.getItem(general.STORAGENAME);
                }
                trSaveSettings.style.display = displ ? '' : 'none';
            }, false);

            general.$('butRestoreSettings').addEventListener('click',
                function () {
                    var val = general.$('inpImportSettings').value;
                    if (!val) {
                        alert('Введите строку настроек');
                        return;
                    }

                    general.root.localStorage.setItem(general.STORAGENAME, val);
                    general.root.location.reload();
                }, false);

            general.$('butClearSettings').addEventListener('click', function () {
                if (confirm('Вы уверены ???')) {
                    general.root.localStorage.removeItem(general.STORAGENAME);
                    general.root.location.reload();
                }
            }, false);

            // обработчики текстовых полей модуля дополнений для боев
            general.$('refreshBattle').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);
            general.$('refreshAppl').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);

            var _this = this;
            // чекбокс настроек подсветки персонажей из черного списка
            // (блокировать или нет ссылку принятия боя в одиночках)
            var chkBL = general.$('blockBLOne2One');
            chkBL.checked = general.getData(5)[1] === '1';
            chkBL.addEventListener('click', function () {
                _this.modifyData(5, 1, chkBL.checked ? '1' : '');
            }, false);

            // работа, слом, грена, почта/посылка
            // кнопки прослушать звук
            general.$('listenSoundSms').
                addEventListener('click', this.testSound, false);
            general.$('listenSoundWork').
                addEventListener('click', this.testSound, false);

            // установка списка выбора звуков sms и "Пора работать"
            var soundSms = general.$('soundSms');
            soundSms.value = general.getData(6)[6] || '0';
            // обработчики списков выбора звука
            soundSms.addEventListener('change', function () {
                _this.modifyData(6, 6, soundSms.value === '0' ?
                        '' : soundSms.value);
            }, false);
            var soundWork = general.$('soundWork');
            soundWork.value = general.getData(6)[7] || '0';
            soundWork.addEventListener('change', function () {
                _this.modifyData(6, 7, soundWork.value === '0' ?
                        '' : soundWork.value);
            }, false);
            // чекбоксы настроек
            var showWork = general.$('showwork');
            showWork.checked = general.getData(6)[2];
            showWork.addEventListener('click', function () {
                _this.modifyData(6, 2, showWork.checked ? '1' : '');
            }, false);
            var showSms = general.$('showsms');
            showSms.checked = general.getData(6)[3];
            showSms.addEventListener('click', function () {
                _this.modifyData(6, 3, showSms.checked ? '1' : '');
            }, false);
            var showBroken = general.$('showbroken');
            showBroken.checked = general.getData(6)[4];
            showBroken.addEventListener('click', function () {
                _this.modifyData(6, 4, showBroken.checked ? '1' : '');
            }, false);
            var showGren = general.$('showgren');
            showGren.checked = general.getData(6)[5];
            showGren.addEventListener('click', function () {
                _this.modifyData(6, 5, showGren.checked ? '1' : '');
            }, false);

            // ссылки в логе боя, критические выстрелы
            var showCrits = general.$('showcrits');
            showCrits.checked = general.getData(7)[0];
            showCrits.addEventListener('click', function () {
                general.setData(showCrits.checked ? '1' : '', 7);
            }, false);

            // удаление личных сообщений
            var syndMail = general.$('syndmail');
            syndMail.checked = general.getData(8)[0];
            syndMail.addEventListener('click', function () {
                _this.modifyData(8, 0, syndMail.checked ? '1' : '');
            }, false);
            var robotMail = general.$('robotmail');
            robotMail.checked = general.getData(8)[1];
            robotMail.addEventListener('click', function () {
                _this.modifyData(8, 1, robotMail.checked ? '1' : '');
            }, false);
            var importantMail = general.$('importantmail');
            importantMail.checked = general.getData(8)[2];
            importantMail.addEventListener('click', function () {
                _this.modifyData(8, 2, importantMail.checked ? '1' : '');
            }, false);

            // FarmTimer
            general.$('listenFarmtimer_sound').
                addEventListener('click', this.testSound, false);
            var farmTmSound = general.$('farmtm_snd');
            farmTmSound.value = general.getData(9)[4] || '0';
            farmTmSound.addEventListener('change', function () {
                _this.modifyData(9, 4, farmTmSound.value === '0' ?
                        '' : farmTmSound.value);
            }, false);
            var farmTmSoundInterval = general.$('farmtmSndIntrvl');
            farmTmSoundInterval.value = general.getData(9)[5] || '0';
            farmTmSoundInterval.addEventListener('input', function () {
                if (new CheckInputText().init(farmTmSoundInterval, 0)) {
                    _this.modifyData(9, 5, farmTmSoundInterval.value);
                }
            }, false);

            // TimeNpc
            general.$('playSoundTimerNPC').
                addEventListener('click', this.testSound, false);
            var soundTimerNPC = general.$('soundTimerNPC');
            soundTimerNPC.value = general.getData(10)[3] || '0';
            soundTimerNPC.addEventListener('change', function () {
                _this.modifyData(10, 3, soundTimerNPC.value === '0' ?
                        '' : soundTimerNPC.value);
            }, false);

            // AllPlantsOnFarm
            var showGbFarmCounter = general.$('showGbFarmCounter');
            showGbFarmCounter.checked = general.getData(11)[4];
            showGbFarmCounter.addEventListener('click', function () {
                _this.modifyData(11, 4, showGbFarmCounter.checked ?
                        '1' : '');
            }, false);
            var showExpFarmCounter = general.$('showExpFarmCounter');
            showExpFarmCounter.checked = general.getData(11)[5];
            showExpFarmCounter.addEventListener('click', function () {
                _this.modifyData(11, 5, showExpFarmCounter.checked ?
                        '1' : '');
            }, false);

            // FilterResOnStat
            var filtRes = general.$('filter_res');
            filtRes.value = general.getData(15)[0];
            filtRes.addEventListener('input', function () {
                general.setData(filtRes.value, 15);
            }, false);

            // SortSyndOnline
            var showSortBattles = general.$('showSortBattles');
            showSortBattles.checked = general.getData(18)[0];
            showSortBattles.addEventListener('click', function () {
                _this.modifyData(18, 0, showSortBattles.checked ? '1' : '');
            }, false);
            var showUnionOnline = general.$('showUnionOnline');
            showUnionOnline.checked = general.getData(18)[1];
            showUnionOnline.addEventListener('click', function () {
                _this.modifyData(18, 1, showUnionOnline.checked ? '1' : '');
            }, false);
            var sortMainAndUnion = general.$('sortMainAndUnion');
            sortMainAndUnion.addEventListener('click', function () {
                _this.modifyData(18, 2, sortMainAndUnion.checked ? '1' : '');
                if (sortMainAndUnion.checked) {
                    if (!showSortBattles.checked) {
                        showSortBattles.click();
                    }
                    if (!showUnionOnline.checked) {
                        showUnionOnline.click();
                    }
                }
            }, false);
            if (general.getData(18)[2]) {
                sortMainAndUnion.click();
            }
        };
    };

    /**
     * @class SetPoints
     * @constructor
     */
    var SetPoints = function () {
        /**
         * @method init
         * @param   {String|int}    num
         * @param   {String}        separator
         * @param   {Boolean}       flagSign
         * @return  {String}
         */
        this.init = function (num, separator, flagSign) {
            var x = +num,
                sign = (x > 0 && flagSign) ? '+' : '',
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
                enemy,
                tmps,
                i;

            for (i = 0; i < enemyList.length; i++) {
                if (enemyList[i].selected) {
                    tmps = enemyList[i].innerHTML;
                    // ecли пок то будет
                    // 1. Electrode [Major][20] 182 HP - 13!
                    enemy = reg.exec(tmps) || (/^(\d+)\. ([^\s]+)/.exec(tmps));

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
                    ' [' + enemy[2] + ']';
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
            str += enemy[1];
            if (dataSt[13]) {
                str += dataSt[13] === '1' ? ' ле' :
                        dataSt[13] === '2' ? ' ц' : ' пр';
            }
            if (dataSt[12]) {
                str += dataSt[12] === '1' ? ' ле' :
                        dataSt[12] === '2' ? ' ц' : ' пр';
            }

            _this.inpTextChat.value = str + ' [' + enemy[2] + ']';
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
                    general.cons.log('Error XHR to: ' + url);
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
                if (refreshAppl && general.doc.
                        querySelector('center>b>font[color="#990000"]')) {
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
                        general.cons.log('Error XHR to: ' + url);
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
                id = id && id[1].length > 3 ? id[1] : null;
                if (id && stData[0].indexOf(id) !== -1) {
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
                general.root.setTimeout(function () {
                    _this.startWorkPostGrenadesBroken(_this);
                }, 700);
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
         * @param   {String}    data
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

    /**
     * @class CritShotsAndLinksBtlLog
     * @constructor
     */
    var CritShotsAndLinksBtlLog = function () {
        /**
         * @property showCritShots
         * @type {String}
         */
        this.showCritShots = general.getData(7)[0];

        /**
         * @class
         * @constructor
         */
        this.CriticalShots = function () {
            /**
             * @property groin
             * @type {int}
             */
            this.groin = 0;     //пах
            /**
             * @property neck
             * @type {int}
             */
            this.neck = 0;      //шея
            /**
             * @property ear
             * @type {int}
             */
            this.ear = 0;       //ухо
            /**
             * @property temple
             * @type {int}
             */
            this.temple = 0;    //висок

            /**
             * @method getAllCrits
             * @return  {int}
             */
            this.getAllCrits = function () {
                return this.groin + this.neck + this.ear + this.temple;
            };
        };

        /**
         * @method getCrits
         * @param   {NodeList}  b
         * @return  {Object|null}
         */
        this.getCrits = function (b) {
            var criticalShots = new this.CriticalShots(),
                myNik = general.doc.querySelector('a[href$="/info.php?id=' +
                    general.myID + '"]>b'),
                linkStyle,
                nik,
                font,
                str,
                node;

            var i;
            for (i = 0; i < b.length; i++) {
                // если это урон (-XX), 'vs', пок с '['
                if ((/^\-\d+$|vs|\[|,/.test(b[i].innerHTML)) ||
                        (/может взять предметы/.test(b[i].innerHTML))) {
                    continue;
                }

                // делаем ссылки на персов, если ссылка еще не установлена
                if (!b[i].querySelector('a:first-child')) {
                    linkStyle = 'text-decoration: none; font-weight: 700; ' +
                        'font-size: ' + (general.viewMode ? '12px;' : '11px;');

                    // Победа за ...
                    font = b[i].parentNode;
                    if (font.nodeName === 'FONT') {
                        linkStyle += ' color: ' + font.color + ';';
                    }

                    // если это окрашенный ник, то внутри будет <font>
                    font = b[i].querySelector('font:first-child');
                    if (font) {
                        linkStyle += ' color: ' + font.color + ';';
                        nik = font.innerHTML;
                    } else {
                        nik = b[i].innerHTML;
                    }

                    b[i].innerHTML = '<a target="_blank" style="' + linkStyle +
                        '"  href="http://www.ganjawars.ru/search.php?key=' +
                        nik + '">' + nik + '</a>';
                }

                // наш ник не найден или в настройках не установлен checkbox
                // "показывать критические выстрелы" или это не наш ник
                if (!myNik || !this.showCritShots ||
                        b[i].innerHTML.indexOf(myNik.innerHTML) === -1) {
                    continue;
                }

                // проверяем и считаем криты
                if (b[i].previousSibling && b[i].previousSibling.nodeValue &&
                        (/\d+:\d+, #\d+ :/.
                             test(b[i].previousSibling.nodeValue))) {

                    // получаем запись своего хода
                    str = '';
                    node = b[i];
                    while (node.nodeName !== 'BR') {
                        if (node.nextSibling && node.nextSibling.nodeValue) {
                            str += node.nextSibling.nodeValue;
                        }

                        node = node.nextSibling;
                    }

                    // считаем криты
                    if (/в пах/.test(str)) {
                        if (/\d+ в пах/.test(str)) {
                            criticalShots.groin += (+(/(\d+) в пах/.
                                        exec(str)[1]));
                        } else {
                            criticalShots.groin++;
                        }
                    }

                    if (/в шею/.test(str)) {
                        if (/\d+ в шею/.test(str)) {
                            criticalShots.neck += (+(/(\d+) в шею/.
                                        exec(str)[1]));
                        } else {
                            criticalShots.neck++;
                        }
                    }

                    if (/в ухо/.test(str)) {
                        if (/\d+ в ухо/.test(str)) {
                            criticalShots.ear += (+(/(\d+) в ухо/.
                                        exec(str)[1]));
                        } else {
                            criticalShots.ear++;
                        }
                    }

                    if (/в висок/.test(str)) {
                        if (/\d+ в висок/.test(str)) {
                            criticalShots.temple += (+(/(\d+) в висок/.
                                        exec(str)[1]));
                        } else {
                            criticalShots.temple++;
                        }
                    }
                }
            }

            return this.showCritShots ? criticalShots : null;
        };

        /**
         * @method showCrits
         * @param   {Object}    result
         */
        this.showCrits = function (result) {
            if (result && result.getAllCrits()) {
                general.$('count_all_crits').innerHTML = result.getAllCrits();
                general.$('crits_groin').innerHTML = result.groin;
                general.$('crits_neck').innerHTML = result.neck;
                general.$('crits_ear').innerHTML = result.ear;
                general.$('crits_temple').innerHTML = result.temple;
            }
        };

        /**
         * @method change_updatechatlines
         */
        this.change_updatechatlines = function () {
            var _this = this;

            general.root.updatechatlines = function () {
                /** @namespace general.root.frames.bsrc */
                var logDiv = general.root.frames.bsrc.document.
                        querySelector('#log'),
                    battleLog;

                if (logDiv && logDiv.childNodes.length) {
                    battleLog = general.doc.querySelector('#log');
                    battleLog.innerHTML = logDiv.innerHTML +
                        battleLog.innerHTML;
                    logDiv.innerHTML = '';
                    _this.showCrits(_this.getCrits(general.doc.
                            querySelector('#log').querySelectorAll('b')));
                }
            };
        };

        /**
         * @method setDataDiv
         * @param   {Object}    target
         * @param   {Boolean}   mode
         */
        this.setDataDiv = function (target, mode) {
            if (this.showCritShots) {
                var d = general.doc.createElement('div');
                d.innerHTML = '<span style="color: #008000; font-weight: ' +
                    'bold;">Криты:</span> <span id="count_all_crits" ' +
                    'style="color: #FF0000; font-weight: bold;">0</span> ' +
                    '[ <span style="text-decoration: underline;">в пах:' +
                    '</span> <span id="crits_groin" style="color: ' +
                    '#FF0000;">0</span> <span style="text-decoration: ' +
                    'underline;">в шею:</span> <span id="crits_neck" ' +
                    'style="color: #FF0000;">0</span> <span style=' +
                    '"text-decoration: underline;">в ухо:</span> ' +
                    '<span id="crits_ear" style="color: #FF0000;">0</span> ' +
                    '<span style="text-decoration: underline;">в висок:' +
                    '</span> <span id="crits_temple" style="color: ' +
                    '#FF0000;">0</span> ]';
                target.appendChild(d);

                if (!mode) {    // в бою
                    target.appendChild(general.doc.createElement('br'));
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var chat = general.doc.querySelector('form[name="battlechat"]'),
                _this = this,
                log;

            if (!general.viewMode && !general.nojs) {   // в JS-версии боя
                // ждем загрузки данных на странице
                var lPers = general.$('listleft');
                log = general.$('log');
                if (!lPers || (/загружаются данные/i.test(lPers.innerHTML)) ||
                        !log || !chat) {
                    general.root.setTimeout(_this.init, 200);
                    return;
                }

                this.setDataDiv(chat.parentNode, false);
                // изменяем функцию обновления чата на странице
                this.change_updatechatlines();
            } else if (general.nojs) {  // в НЕ JS-версии боя
                this.setDataDiv(chat.parentNode, false);
                log = general.doc.querySelector('td[class="txt"]>' +
                    'div[style="font-size:8pt"]');
                general.root.setTimeout(function () {
                    _this.showCrits(_this.getCrits(log.querySelectorAll('b')));
                }, 2000);
            } else if (general.viewMode) {  // режим наблюдения за боем
                var center = general.doc.querySelector('td[valign="top"]' +
                        '[width="70%"]>center');
                center.appendChild(general.doc.createElement('br'));
                center.appendChild(general.doc.createElement('br'));
                this.setDataDiv(center, true);
                this.showCrits(this.getCrits(general.doc.
                        querySelector('td>span[class="txt"]').
                    querySelectorAll('b')));
            }
        };
    };

    /**
     * @class DeleteSms
     * @constructor
     */
    var DeleteSms = function () {
        /**
         * @method testSubject
         * @param   {HTMLInputElement}  chk
         * @param   {Object}            reg
         * @return  {Boolean}
         */
        this.testSubject = function (chk, reg) {
            return reg.test(chk.parentNode.nextElementSibling.innerHTML);
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('center>nobr>a:last-child' +
                        '[href="/sms.php?page=2"]'),
                del = general.doc.querySelector('input[class="mainbutton"]' +
                    '[type="submit"][value="Удалить отмеченные"]'),
                smsChk = general.doc.
                    querySelectorAll('input[type="checkbox"][name^="kill"]');

            if (!target || !del) {
                return;
            }

            target = target.parentNode;
            // кнопка удаления
            var delButton = general.doc.createElement('span');
            delButton.innerHTML = 'Удалить отмеченные';
            delButton.setAttribute('style', 'cursor: pointer; ' +
                    'text-decoration: underline;');
            delButton.addEventListener('click', function () {
                del.click();
            }, false);

            target.appendChild(general.doc.createTextNode(' | '));
            target.appendChild(delButton);

            // кнопка "Отметить все"
            var markAll = general.doc.createElement('span');
            markAll.setAttribute('style', 'margin-left: 5px; ' +
                    'cursor: pointer; color: #990000');
            markAll.setAttribute('title', 'Отметить все');
            markAll.innerHTML = '[+]';
            target.appendChild(markAll);
            var _this = this;
            markAll.addEventListener('click', function () {
                var but = this,
                    s = ['[+]', '[&minus;]', 'Отметить все',
                            'Снять все отметки'],
                    on = but.innerHTML === s[0];

                but.innerHTML = on ? s[1] : s[0];
                but.title = on ? s[3] : s[2];

                var i;
                for (i = 0; i < smsChk.length; i++) {
                    smsChk[i].checked = !(!on || (general.getData(8)[2] &&
                    _this.testSubject(smsChk[i], /\[важное\]/)));
                }
            }, false);

            // отмечаем нужное
            var stData = general.getData(8),
                i;
            for (i = 0; i < smsChk.length; i++) {
                if ((stData[0] &&
                        this.testSubject(smsChk[i], /<b>#\d+<\/b>/)) ||
                            (stData[1] && smsChk[i].parentNode.parentNode.
                                querySelector('a[href="/info.php?id=1"]'))) {
                    smsChk[i].checked = true;
                }
            }
        };
    };

    /**
     * @class FarmExperience
     * @constructor
     */
    var FarmExperience = function () {
        /**
         * @method calculateFarm
         * @param   {int}       p1
         * @param   {int}       p2
         * @param   {int}       time
         * @param   {Number}    exp
         * @return  {String}
         */
        this.calculateFarm = function (p1, p2, time, exp) {
            var money = ((p2 - p1) / time * 60).toFixed(2),
                experience = (exp / time * 60).toFixed(3);

            return ' <span style="color: #FF0000;">[$' + money + ']</span>' +
                    '<span style="color: #0000FF;">[' + experience + ']</span>';
        };

        /**
         * @method init
         */
        this.init = function () {
            //если в постройках или не на пустрой грядке
            if ((/section=items/.test(general.root.location.href)) ||
                    !(/Грядка пустая/.test(general.doc.body.innerHTML))) {
                return;
            }

            var firsPage = /<font color="?#006600"?>\s?<b>Укроп<\/b>/.
                test(general.doc.body.innerHTML),
                prices1 = general.doc.querySelectorAll('label>font' +
                        '[color="#006600"]>b:last-child'),
                prices2 = general.doc.querySelectorAll('li>font' +
                        '[color="#990000"]>b:first-child'),
                time = general.doc.querySelectorAll('form[action$=' +
                        '"/ferma.php"]>li:nth-child(' +
                            (firsPage ? 'odd' : 'even') + ')'),
                span,
                i;

            for (i = 0; i < prices1.length; i++) {
                span = general.doc.createElement('span');
                span.setAttribute('style', 'font-size: 9px;');
                span.innerHTML = this.calculateFarm(+(/\$(\d+)/.
                            exec(prices1[i].innerHTML)[1]),
                    +(/\$(\d+)/.exec(prices2[i].innerHTML)[1]),
                    +(/созревания:\s(\d+)/.exec(time[i].innerHTML)[1]),
                    parseFloat(/(\d+\.?\d*) опыта/.
                        exec(time[i].nextElementSibling.innerHTML)[1]));

                prices1[i].parentNode.appendChild(span);
            }
        };
    };

    /**
     * @class FarmTimer
     * @constructor
     */
    var FarmTimer = function () {
        /**
         * @property farmLink
         * @type {HTMLLinkElement|null}
         */
        this.farmLink = null;
        /**
         * @property checkInterval
         * @type {int|null}
         */
        this.checkInterval = null;

        /**
         * @method setRedLink
         * @param   {String}    str
         */
        this.setRedLink = function (str) {
            var action = str === '2' ? 'Собрать' : 'Полить';
            this.farmLink.setAttribute('style', 'color: #FF0000; ' +
                    'font-weight: bold; text-decoration: none;');
            this.farmLink.innerHTML = '[' + action + ']';
        };

        /**
         * @method checkState
         */
        this.checkState = function () {
            if (!(/bold/.test(this.farmLink.getAttribute('style')))) {
                if (this.checkInterval) {
                    general.root.clearInterval(this.checkInterval);
                }

                return;
            }

            var stData = general.getData(9);
            if (!stData[0]) {
                this.farmLink.innerHTML = '';
                return;
            }

            var timeNow = new Date().getTime(),
                time = +stData[0];

            if (timeNow <= time) {
                this.farmLink.setAttribute('style', 'color: #0000FF; ' +
                        'text-decoration: none;');
                stData[3] = '';
                general.setData(stData, 9);
                this.showTimer(+((time - timeNow) / 1000).toFixed(0));
            }
        };

        /**
         * @method setReminder
         */
        this.setReminder = function () {
            var stData = general.getData(9);
            if (!stData[0]) {
                this.farmLink.innerHTML = '';
                return;
            }

            this.setRedLink(stData[1]);

            var _this = this;
            this.checkInterval = general.root.setInterval(function () {
                _this.checkState();
            }, 2000);

            if (!stData[4]) {
                return;
            }

            var timeNow = new Date().getTime();
            if (timeNow < +stData[0]) {
                return;
            }

            var soundTime = +stData[2],
                intrvl = stData[5] ? +stData[5] * 1000 : 0,
                random = new GetRandom();

            // пора проигрывать звук
            if (timeNow - soundTime >= intrvl) {
                // в настройках указано не повторять звук
                if (!intrvl) {
                    // если звук еще не был проигран
                    if (!stData[3]) {
                        stData[3] = '1';
                        general.setData(stData, 9);
                        new PlaySound().init(stData[4]);
                    }

                    return;
                }

                stData[2] = timeNow;
                general.setData(stData, 9);
                general.root.setTimeout(function () {
                    _this.setReminder();
                }, intrvl + random.init(1000, 10000));

                new PlaySound().init(stData[4]);
            } else if (intrvl) {
                general.root.setTimeout(function () {
                    _this.setReminder();
                }, intrvl - (timeNow - soundTime) + random.init(1000, 10000));
            }
        };

        /**
         * @method showTimer
         * @param   {int}   sec
         */
        this.showTimer = function (sec) {
            var min,
                s,
                h;

            if (!sec) {
                this.setReminder();
                return;
            }

            s = sec;
            h = Math.floor(s / 3600);
            s = s - h * 3600;
            min = Math.floor(s / 60);
            s = s - min * 60;

            this.farmLink.innerHTML = '[' + (h < 10 ? '0' + h : h) + ':' +
                (min < 10 ? '0' + min : min) + ':' +
                (s < 10 ? '0' + s : s) + ']';

            sec -= 1;
            if (sec > -1) {
                var _this = this;
                general.root.setTimeout(function () {
                    _this.showTimer(sec);
                }, 1000);
            } else {
                general.root.setTimeout(this.setReminder,
                                new GetRandom().init(1000, 3000));
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            /** localStorage:
             * [0] - время полива/сбора
             * [1] - действие (Полить|Собрать)
             * [2] - время последнего проигрывания звука
             * [3] - звук проигран?
             */
            var stData = general.getData(9),
                timeNow = new Date().getTime();

            // на ферме запоминаем данные, выходим
            if (/\/ferma\.php/.test(general.loc)) {
                // не на своей ферме
                if ((/id=\d+/.test(general.loc)) &&
                        (/id=(\d+)/.exec(general.loc)[1]) !== general.myID) {
                    return;
                }

                var actionStr = /Ближайшее действие:.*[собрать|полить].*\(.*\)/.
                        exec(general.doc.querySelector('td[width="400"]' +
                                '[valign="top"]').innerHTML);

                if (!actionStr) {
                    stData[0] = '';
                    general.setData(stData, 9);
                    return;
                }

                var aStr = actionStr[0];
                var action = /собрать/.test(aStr) ? '2' : '1';

                if (/уже пора/.test(aStr)) {
                    general.setData([timeNow, action, timeNow, '1',
                                stData[4], stData[5]], 9);
                    return;
                }

                var timeLeft = +(/через (\d+) мин/.exec(aStr)[1]);
                general.setData([timeNow + timeLeft * 60 * 1000,
                        action, timeNow, '', stData[4], stData[5]], 9);

                return;
            }

            var topPanel = new GetTopPanel().init();
            if (!topPanel || !stData[0]) {
                return;
            }

            this.farmLink = general.doc.createElement('a');
            this.farmLink.setAttribute('style', 'color: #0000FF; ' +
                    'text-decoration: none;');
            this.farmLink.href = 'http://www.ganjawars.ru/ferma.php?id=' +
                general.myID;
            this.farmLink.setAttribute('target', '_blank');
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.farmLink);

            if (timeNow >= +stData[0]) {
                this.setRedLink(stData[1]);
                var _this = this;
                general.root.setTimeout(function () {
                    _this.showTimer(0);
                }, new GetRandom().init(1000, 3000));

                return;
            }

            this.showTimer(+((+stData[0] - timeNow) / 1000).toFixed(0));
        };
    };

    /**
     * @class ComfortableLinksForFarm
     * @constructor
     */
    var ComfortableLinksForFarm = function () {
        /**
         * @method setLink
         * @param   {HTMLLinkElement}   a
         * @param   {String|null}       txt
         */
        this.setLink = function (a, txt) {
            var target = general.doc.
                    querySelector('center>b>font[color="#990000"]').parentNode;

            if (txt && (/\(через \d+/.test(a.parentNode.innerHTML))) {
                return;
            }

            var link = a.cloneNode(true);

            if (!txt) {
                a.setAttribute('style', 'display: none;');
            } else {
                link.innerHTML = txt;
            }

            link.setAttribute('style', 'margin-left: 10px;');
            target.appendChild(link);
        };

        /**
         * @method init
         */
        this.init = function () {
                // ссылка Собрать, Вскопать, Полить
            var a1 = general.doc.querySelector('td[bgcolor="#f0fff0"]>a' +
                    '[href^="/ferma.php?"]'),
                // ссылка ближайшее действие
                a2 = general.doc.querySelector('td[bgcolor="#e0eee0"]>a' +
                        '[href^="/ferma.php?"]'),
                // кнопка посадить
                but = general.doc.querySelector('input[value="Посадить"]'),
                // клетка, на которой находимся
                pos = general.doc.querySelector('img[src$="ru/i/point2.gif"]');

            if (a1) {
                this.setLink(a1, null);
            } else if (a2) {
                this.setLink(a2, 'Далее');
            }

            pos = but && pos ? new GetPos().init(pos.parentNode) : null;
            if (pos) {
                but.setAttribute('style', 'position: absolute; ' +
                        'background: #F4F3F1; border-radius: 7px; ' +
                        'width: 62px; height: 17px; ' +
                        'top: ' + (pos.y + 15) + 'px; left: ' + (pos.x - 9) +
                        'px;');
                but.focus();
            }
        };
    };

    /**
     * @class TimeNpc
     * @constructor
     */
    var TimeNpc = function () {
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'TimeNpc/';
        /**
         * @property npc
         * @type {Object}
         */
        this.npc = {
            g: ['2', '3', '6', '8', '10', '12'],
            z: ['1', '4', '5', '7', '9', '11'],
            p: ['16', '17', '18', '19', '20']
        };
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 700;
        /**
         * @property regStr
         * @type {String}
         */
        this.regStr = 'Спасибо|Замечательно|Как скажешь|Благодарю за|' +
            'Опыт добавлен|Время для ответа вышло';

        /**
         * @method clearNPCData
         */
        this.clearNPCData = function () {
            general.$('dataNPC').innerHTML = '';
        };

        /**
         * @method setCloseButton
         */
        this.setCloseButton = function () {
            general.$('dataNPC').innerHTML += '<tr><td colspan="3" ' +
                'style="text-align: right;"><img id="npsDataClose" ' +
                'style="cursor: pointer; padding-top: 5px;" src="' +
                general.imgPath + 'close.gif" title="Очистить данные NPC" ' +
                'alt="Очистить данные NPC" /></td></tr>';

            general.$('npsDataClose').
                addEventListener('click', this.clearNPCData, false);
            general.$('imgSoundNPC').removeAttribute('checkscan');
        };

        /**
         * @method  scanNPC
         * @param   {int}       ind
         * @param   {Array}     npcs
         */
        this.scanNPC = function (ind, npcs) {
            if (!ind) {
                if (general.$('imgSoundNPC').getAttribute('checkscan')) {
                    return;
                }

                this.clearNPCData();
                general.$('imgSoundNPC').setAttribute('checkscan', 'yes');
            }

            var url = 'http://www.ganjawars.ru/npc.php?id=' + npcs[ind],
                _this = this,
                tr,
                td;

            tr = general.doc.createElement('tr');
            td = general.doc.createElement('td');
            td.setAttribute('style', 'text-align: center;');
            td.setAttribute('colspan', '3');
            td.innerHTML = '<img src="' + general.imgPath + 'preloader.gif" ' +
                'title="Загрузка..." alt="Загрузка..." />';
            tr.appendChild(td);
            general.$('dataNPC').appendChild(tr);

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;
                if (/Вы находитесь в пути/.test(spanContent.innerHTML)) {
                    general.$('dataNPC').lastElementChild.innerHTML = '<td ' +
                        'style="color: #990000">Вы в пути. Данные NPC не ' +
                        'доступны.</td>';
                    _this.setCloseButton();
                    return;
                }

                var syndLink = spanContent.
                        querySelector('td[class="wb"][colspan="3"]' +
                            '[bgcolor="#f0fff0"]').
                                querySelector('a[href*="/syndicate.php?id="]'),
                    nameNPC = spanContent.querySelector('td[class="wb"]' +
                        '[align="left" ][width="100%"]>b').innerHTML;

                general.$('dataNPC').lastElementChild.innerHTML = '<td>' +
                    '<a target="_blank" href="' + syndLink.href +
                    '"><img src="http://images.ganjawars.ru/img/synds/' +
                    (/\?id=(\d+)/.exec(syndLink.href)[1]) + '.gif" />' +
                    '</a></td><td><a target="_blank" href="' + url +
                    '" style="font-size: 8pt;">' + nameNPC + '</a></td>' +
                    '<td style="font-size: 8pt;">' +
                    syndLink.nextSibling.nodeValue.replace(/^\s*/, '') +
                    '</td>';

                ind++;
                if (npcs[ind]) {
                    general.root.setTimeout(function () {
                        _this.scanNPC(ind, npcs);
                    }, _this.tm);
                    return;
                }

                _this.setCloseButton();
            }, function () {
                general.root.setTimeout(function () {
                    if (!ind) {
                        general.$('imgSoundNPC').removeAttribute('checkscan');
                    }
                    _this.scanNPC(ind, npcs);
                }, _this.tm);
            });
        };

        /**
         * @method getTimeNow
         * @return  {int}
         */
        this.getTimeNow = function () {
            return new Date().getTime();
        };

        /**
         * @method goQuest
         */
        this.goQuest = function () {
            var stData = general.getData(10);
            general.$('timerNPC').innerHTML = '<a href="/npc.php?id=' +
                stData[1] + '" style="color: #1C9C03; font-weight: bold;">' +
                'Взять квест</a>';

            if (stData[0]) {
                new PlaySound().init(stData[3]);
            }
        };

        /**
         * @method showTimerNPC
         * @param   {int}   sec
         */
        this.showTimerNPC = function (sec) {
            var min,
                s,
                h;

            s = sec;
            h = Math.floor(s / 3600);
            s = s - h * 3600;
            min = Math.floor(s / 60);
            s = s - min * 60;

            h = h < 10 ? '0' + h : h;
            min = min < 10 ? '0' + min : min;
            s = s < 10 ? '0' + s : s;
            general.$('spanTimer').innerHTML = h + ':' + min + ':' + s;

            sec -= 1;
            var _this = this;
            if (sec > -1) {
                general.root.setTimeout(function () {
                    _this.showTimerNPC(sec);
                }, 1000);
            } else {
                this.goQuest();
            }
        };

        /**
         * @method rememberTime
         * @param   {HTMLElement}  td
         */
        this.rememberTime = function (td) {
            var tableResponseNPC = td.querySelector('table'),
                responseNPC = tableResponseNPC.innerHTML;

            tableResponseNPC.innerHTML = '<tr style="text-align: center;">' +
                '<td><img src="' + general.imgPath + 'preloader.gif" />' +
                '</td></tr>';

            var url = 'http://www.ganjawars.ru/npc.php?id=' +
                    general.getData(10)[1] + '&talk=1',
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var time = /\[подождите (\d+) мин/.exec(xml.responseText);

                if (time) {
                    var stData = general.getData(10);
                    stData[2] = +time[1] * 60 * 1000 + _this.getTimeNow();
                    general.setData(stData, 10);
                }

                tableResponseNPC.innerHTML = responseNPC;
            }, function () {
                tableResponseNPC.innerHTML = responseNPC;
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var stData = general.getData(10);

            if (/www\.ganjawars\.ru\/me\//.test(general.loc)) {
                var mainDiv = general.doc.createElement('div'),
                    target = general.doc.querySelector('td[rowspan="2"]' +
                        '[valign="top"][bgcolor="#e9ffe9"]>' +
                        'a[href$="/home.friends.php"]').previousElementSibling,
                    onoff = stData[0] ? 'On' : 'Off';

                mainDiv.setAttribute('style', 'font-size: 8pt; ' +
                        'padding-left: 16px;');
                target.parentNode.insertBefore(mainDiv, target);
                mainDiv.innerHTML = '<span id="buttonNPC_Z" style="cursor: ' +
                    'pointer;">[Z]</span><span id="buttonNPC_G" style="' +
                    'cursor: pointer;">[G]</span><span id="buttonNPC_P" ' +
                    'style="cursor: pointer;">[P]</span> <img ' +
                    'id="imgSoundNPC" src="' + this.imgPath + 'sound' + onoff +
                    '.png" style="cursor: pointer; vertical-align: middle;" ' +
                    'title="Sound  ' + onoff + '" alt="Sound ' + onoff +
                    '"  /><span id="timerNPC" style="margin-left: 5px;">' +
                    '</span><table id="dataNPC" style="width: 100%"></table>';

                var _this = this;
                general.$('imgSoundNPC').addEventListener('click', function () {
                    var data = general.getData(10),
                        d = data[0],
                        s = d ? 'Sound Off' : 'Sound On',
                        img = this;

                    img.src = _this.imgPath +
                            (d ? 'soundOff.png' : 'soundOn.png');
                    img.setAttribute('title', s);
                    img.setAttribute('alt', s);
                    data[0] = d ? '' : '1';
                    general.setData(data, 10);
                }, false);

                general.$('buttonNPC_Z').addEventListener('click', function () {
                    _this.scanNPC(0, _this.npc.z);
                }, false);
                general.$('buttonNPC_G').addEventListener('click', function () {
                    _this.scanNPC(0, _this.npc.g);
                }, false);
                general.$('buttonNPC_P').addEventListener('click', function () {
                    _this.scanNPC(0, _this.npc.p);
                }, false);

                if (!stData[2]) {   // время не установлено
                    general.$('timerNPC').innerHTML = '<a href="' +
                        (!stData[1] ? '#' : '/npc.php?id=' + stData[1]) +
                        '" style="color: #8C7B02; font-size: 8pt;">' +
                        'Поговорите с NPC</a>';
                } else {
                    if (this.getTimeNow() >= stData[2]) {   // пора делать квест
                        this.goQuest();
                    } else {    // ждем
                        general.$('timerNPC').innerHTML = '<a href="' +
                            '/npc.php?id=' + stData[1] + '" style="color: ' +
                            'red; font-size: 8pt;">NPC</a>: ' +
                            '[<span id="spanTimer"></span>]';
                        var sec = Math.
                                ceil((+stData[2] - this.getTimeNow()) / 1000);
                        this.showTimerNPC(sec);
                    }
                }

                return;
            }

            var talkNPC = general.doc.
                    querySelector('td[class="wb"][valign="top"]'),
                talk = /\?id=(\d+)&talk=1/.exec(general.loc);

            // если id у NPC больше 20, то это не наш NPC
            if (talkNPC && talk && +talk[1] < 21) {

                stData[1] = talk[1];
                // говорим с NPC, но время квеста еще не пришло
                var timer = (/\[подождите (\d+) мин/.exec(talkNPC.innerHTML));
                if (timer) {
                    stData[2] = +timer[1] * 60 * 1000 + this.getTimeNow();
                    general.setData(stData, 10);
                    return;
                }

                // если берем или отказываемся от квеста,
                // то стираем время из хранилища
                if (/Ваш ответ:/.test(talkNPC.innerHTML)) {
                    stData[2] = '';
                    general.setData(stData, 10);
                    return;
                }

                // квест выполнен/провален/отказ...
                // смотрим время до следующего квеста
                if (new RegExp(this.regStr).test(talkNPC.innerHTML)) {
                    this.rememberTime(talkNPC);
                }
            }
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
         * @method getCoord
         * @return  {Object}
         */
        this.getCoord = function () {
            var _x = /(\?|&)x=(\d)/.exec(general.loc),
                _y = /(\?|&)y=(\d)/.exec(general.loc);

            return {x: _x ? _x[2] : '0', y: _y ? _y[2] : '0'};
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

                var stData = general.getData(11),
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
                    pl.time + ' мин</b> ' + this.getHourTime(pl.time, true) +
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
                stData = general.getData(11),
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
                _this = this,
                stData = general.getData(11);

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var disabled = /value=('|")?([^\s'"]+)('|")? ([^>]+) disabled/.
                        exec(xml.responseText);

                if (disabled) {
                    stData[0] = _this.plant[disabled[2]].id;
                    general.setData(stData, 11);
                    _this.setMainPanel();
                    return;
                }

                ind++;
                if (ind > 9) {
                    // доступны все растения
                    stData[0] = Number.MAX_VALUE;
                    general.setData(stData, 11);
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
         * @method clearCounter
         * @param   {String}    gb
         * @param   {String}    exp
         */
        this.clearCounter = function (gb, exp) {
            var stData = general.getData(11);

            stData[1] = new Date().getTime();
            stData[2] = gb;
            stData[3] = exp;
            general.setData(stData, 11);
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
                var gb = /Счет:\s?<b>\$([^<]+)<\/b>/.
                        exec(table.innerHTML)[1].replace(/,/g, ''),
                    exp = prod[1],
                    stData = general.getData(11);

                // время сброса не установлено
                if (!stData[1]) {
                    this.clearCounter(gb, exp);
                }

                // установка счетчиков
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

                var setPoint = new SetPoints().init,
                    diffGb = +gb - (+stData[2]),
                    diffExp = (+exp - (+stData[3])).toFixed(3).split('.');

                var str = '';
                if (stData[4]) {
                    str += '<b>Счет</b>: <span style="margin-right: 10px; ' +
                        'color: #' + (diffGb < 0 ? '0000FF' : 'FF0000') +
                        ';"> ' + setPoint(diffGb, '\'', true) + '$</span>';
                }

                if (stData[5]) {
                    str += '<b>Производ</b>: <span ' +
                        'style="margin-right: 10px; color: #FF0000;"> +' +
                        setPoint(diffExp[0], '\'', false) +
                        (diffExp[1] ? ',' + diffExp[1] : '') + '</span>';
                }

                str += '<span style="font-size: 7pt;">' +
                        '<span id="clearFarmCounter" style="cursor: pointer; ' +
                        'color: #008000; text-decoration: underline;">Сброс' +
                        '</span> <span style="color: #0000FF;">(' + time +
                        ')</span>';

                var divCounters = general.doc.createElement('div');
                divCounters.setAttribute('style', 'font-size: 8pt;');
                divCounters.innerHTML = str;
                table.querySelector('td[bgcolor="#f0fff0"]').
                    appendChild(divCounters);

                // кнопа сброса счетчиков
                var _this = this;
                general.$('clearFarmCounter').
                    addEventListener('click', function () {
                        _this.clearCounter(gb, exp);
                        divCounters.parentNode.removeChild(divCounters);
                        _this.setCounter();
                    }, false);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
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

                // счетчики Гб и производа
                var stData = general.getData(11);
                if (this.canPlant && (stData[4] || stData[5])) {
                    this.setCounter();
                }

                // перевод дохрена минут в чч:мм
                if (!this.canPlant) {
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
                }

                this.setMainPanel();
            }
        };
    };

    /**
     * @class GwMenu
     * @constructor
     */
    var GwMenu = function () {
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'GwMenu/';
        /**
         * @property correctXGwMenu
         * @type {int}
         */
        this.correctXGwMenu = /Opera/i.
                test(general.root.navigator.userAgent) ?  -1 : 0;
        /**
         * @property correctYGwMenu
         * @type {int}
         */
        this.correctYGwMenu = /Firefox/i.
                test(general.root.navigator.userAgent) ? -1 : 0;

        /**
         * @method setCSSGwMenu
         * @param   {Object}    _this
         */
        this.setCSSGwMenu = function (_this) {
            var cssStyle = general.doc.createElement('style');
            cssStyle.innerHTML = '#c1 {color: #F90332;}' +
                '#c2 {color: #014305; font-weight: bold;}' +
                '#c3 {color: #04830C; font-style: italic;}' +
                '#op {font-size: 7pt; opacity: 0.5;}' +
                '.gwm {position: absolute; cursor: default;}' +
                '.gwm table {border-collapse: collapse; background-color: ' +
                    '#DBF5E0; min-width: 100px; ' +
                    // тень для таблиц
                    // сдвиг по горизонтали, вертикали, радиус размытия, цвет
                    'box-shadow: 5px 6px 6px rgba(122,122,122,0.5);}' +
                '.gwm table.main {background-image: url(' + _this.imgPath +
                        'background.gif' + '); width: 210px;}' +
                '.gwm tr {height: 15px;}' +
                '.gwm td {border: 1px #339933 solid; ' +
                    'padding: 0px 5px 0px 5px; white-space: nowrap;}' +
                '.gwm td.center {text-align: center;}' +
                '.gwm td.zag {text-align: center; background: #C4F8D1; ' +
                    'font-weight: bold; font-size: 11px;}' +
                '.gwm td.arrow {width: 20px; min-width: 20px; ' +
                    'text-align: center; background: #C4F8D1;}' +
                '.gwm td.bold {font-size: 8pt; font-weight: bold;}' +
                '.gwm td.bold span.norm {color: #087105;}' +
                '.gwm td.bold span.darkgray {color: #303030;}' +
                '.gwm td.bold span.crimson {color: #990000;}' +
                '.gwm td.bold span.brown {color: #935805;}' +
                '.gwm td.bold span.blue {color: #0000FF;}' +
                '.gwm td.bold span.bluegray {color: #008080;}' +
                '.gwm td.bold span.darkorange {color: #A44B00;}' +
                '.gwm a {text-decoration: none; color: #0000FF; ' +
                    'font-size: 8pt;}';
            general.doc.querySelector('head').appendChild(cssStyle);
        };

        /**
         * @method createGwMenuDiv
         * @param   {String}    id
         * @return  {Object}
         */
        this.createGwMenuDiv = function (id) {
            var div = general.doc.createElement('div');

            if (id) {
                div.setAttribute('id', id);
                if (id === 'gw_menu') {
                    div.style.top = 83;
                    div.style.left = 0;
                    general.doc.body.appendChild(div);
                }
            }

            div.setAttribute('class', 'gwm');
            div.style.display = 'none';
            return div;
        };

        /**
         * @method getLineMenu
         * @param   {String}    name
         * @param   {String}    id
         * @param   {String}    color
         * @param   {String}    colspn
         * @return  {String}
         */
        this.getLineMenu = function (name, id, color, colspn) {
            var link = /\//.test(id),
                _colspn,
                _color,
                blank;

            if (id === 'gw_menu') {
                return name;
            }

            // ссылка
            if (link) {
                blank = /https?:/.test(id) ? ' target="_blank"' : '';
                _color = color ? ' style="color: ' + color + '"' : '';
                _colspn = colspn ? ' colspan="2"' : '';
                return '<td' + _colspn + '><a' + blank + _color + ' href="' +
                    id + '">' + name + '</a></td>';
            }

            // пункты меню
            if (color === 'zag') {
                _colspn = colspn ? ' colspan="2"' : '';
                return '<td class="zag"' + _colspn + '>' + name + '</td>';
            }

            _color = color || 'norm';
            return '<td class="bold"><span class="' + _color + '">' + name +
                '</span></td><td class="arrow" id="' + id + '">&#187;</td>';
        };

        /**
         * @method fOver
         * @param   {Object}    div
         * @param   {Object}    arrow
         * @param   {int}       offsettop
         */
        this.fOver = function (div, arrow, offsettop) {
            var tm = arrow.getAttribute('tm'),
                _offsettop = offsettop || 0;

            if (tm) {
                general.root.clearTimeout(+tm);
                arrow.removeAttribute('tm');
            }

            div.style.left = arrow.parentNode.offsetWidth + this.correctXGwMenu;
            div.style.top = arrow.offsetTop + _offsettop + this.correctYGwMenu;
            arrow.style.background = '#7FF89E';
            div.style.display = '';
        };

        /**
         * @method fOut
         * @param   {Object}    div
         * @param   {Object}    arrow
         */
        this.fOut = function (div, arrow) {
            arrow.setAttribute('tm', general.root.setTimeout(function () {
                div.style.display = 'none';
                arrow.style.background = '#C4F8D1';
                arrow.removeAttribute('tm');
            }, 100).toString());
        };

        /**
         * @method setHandlersGWMenu
         * @param   {Object}    arrow
         * @param   {Object}    div
         * @param   {int}       offset
         */
        this.setHandlersGWMenu = function (arrow, div, offset) {
            var _this = this;

            arrow.addEventListener('mouseover', function () {
                arrow.style.boxShadow = '3px 3px 3px inset';
                _this.fOver(div, arrow, offset);
            }, false);

            arrow.addEventListener('mouseout', function () {
                arrow.style.boxShadow = '';
                _this.fOut(div, arrow);
            }, false);

            div.addEventListener('mouseover', function () {
                arrow.style.boxShadow = '3px 3px 3px inset';
                _this.fOver(div, arrow, offset);
            }, false);

            div.addEventListener('mouseout', function () {
                arrow.style.boxShadow = '';
                _this.fOut(div, arrow);
            }, false);
        };

        /**
         * @method createGWMenuItems
         * @param   {Array}    gwM
         */
        this.createGWMenuItems = function (gwM) {
            var item,
                main,
                tr,
                i,
                j;

            for (i = 0; i < gwM.length; i++) {
                gwM[i].divm = this.createGwMenuDiv(gwM[i].divm);
                gwM[i].divm.appendChild(general.doc.createElement('table'));

                main = gwM[i].divm.id === 'gw_menu';
                if (main) {
                    gwM[i].divm.firstElementChild.setAttribute('class', 'main');
                }

                for (j = 0; j < gwM[i].lines.length; j++) {
                    item = gwM[i].lines[j];
                    tr = general.doc.createElement('tr');
                    tr.innerHTML = this.
                        getLineMenu(item[0], item[1], item[2], item[3]);
                    gwM[i].divm.firstElementChild.appendChild(tr);
                }

                if (!main) {
                    general.$(gwM[i].prnt).appendChild(gwM[i].divm);
                    this.setHandlersGWMenu(general.$(gwM[i].arrow), gwM[i].divm,
                            gwM[i].offsetY);
                }
            }
        };

        /**
         * @method gwMenuInit
         * @param   {Object}    th
         */
        this.gwMenuInit = function (th) {
            var gw_menu = general.$('gw_menu'),
                _this = th,
                gwM;

            if (gw_menu) {
                gw_menu.style.display = gw_menu.style.display === '' ?
                        'none' : '';
                return;
            }

            _this.setCSSGwMenu(_this);

            gwM = [
                {divm: 'gw_menu', lines: [
                    // шапка
                    ['<td class="center"><a target="_blank" id="op" ' +
                        'href="/info.php?id=2095458"><span id="c1">' +
                        'developed by</span> <span id="c2">MyRequiem&#169;' +
                        '</span><br><span id="c3">for GanjaWars fighters' +
                        '</span></a></td><td class="center" id="exit">' +
                        '<img src="' + _this.imgPath + 'hide.gif" ' +
                        'alt="Закрыть" title="Закрыть"></td>', 'gw_menu'],
                    // основные разделы
                    ['Ресурсы', 'resourses', 'brown'],
                    ['Бои', 'battles', 'crimson'],
                    ['ЭС, Уранки', 'real_estate'],
                    ['Скрипты', 'scripts', 'darkorange'],
                    ['Синдикаты', 'syndicates'],
                    ['Острова', 'islands'],
                    ['NPC', 'npc'],
                    ['Доска объявлений', 'doska', 'bluegray'],
                    ['Почта', 'post', 'blue'],
                    ['Форумы', 'forums'],
                    ['Магазины', 'shop', 'brown'],
                    ['Покупка гранат', 'pay_grenades', 'brown'],
                    ['Покупка лута', 'pay_lut', 'brown'],
                    ['Переодевалка', 'changeclothing'],
                    ['Настройки', 'settings', 'darkgray'],
                    // ссылки
                    ['Мои фото', 'http://www.ganjafoto.ru/albums.php?id=' +
                        general.myID, 0, 1],
                    ['Мои файлы', 'http://www.ganjafile.ru/login.php', 0, 1],
                    ['Мои Друзья', '/home.friends.php', 0, 1],
                    ['Мои синдикаты', '/syndicates.php', 0, 1],
                    ['Мои достижения', '/info.ach.php?id=' +
                        general.myID, 0, 1],
                    ['Мои квесты', '/questlog.php?id=' + general.myID, 0, 1],
                    ['Mои навыки', '/home.skills.php', 0, 1],
                    ['Протокол передач', '/usertransfers.php?id=' +
                        general.myID, 0, 1],
                    ['Протокол боев', '/info.warstats.php?id=' +
                        general.myID, 0, 1],
                    ['Моя карма', '/info.vote.php?id=' + general.myID, 0, 1],
                    ['Ферма', '/ferma.php?id=' + general.myID, 0, 1],
                    ['Суперсеты', '/sets.php', 0, 1],
                    ['Сайты', '/sites.php', 0, 1],
                    ['GanjaWiki.ru: Энциклопедия игры',
                        'http://www.ganjawiki.ru/', 0, 1],
                    ['Выход из игры', '/logout.php', 'red', 1],
                    ['<td colspan="2"><input type="checkbox" id="showt" ' +
                        'title="Показывать всегда" />', 'gw_menu']
                ]},
                {divm: 0, lines: [
                    ['Все ресурсы', '/stats.php', '#935805'],
                    ['Батареи', '/statlist.php?r=battery'],
                    ['Водоросли', '/statlist.php?r=seaweed'],
                    ['Нефть', '/statlist.php?r=oil'],
                    ['Уран', '/statlist.php?r=uran'],
                    ['Ганджиум', '/statlist.php?r=ganjium'],
                    ['Маковая соломка', '/statlist.php?r=solomka'],
                    ['Трава', '/statlist.php?r=weed'],
                    ['Бокситы', '/statlist.php?r=bauxite'],
                    ['Алюминий', '/statlist.php?r=aluminium']
                ], prnt: 'gw_menu', arrow: 'resourses', offsetY: -15},
                {divm: 'battles_1', lines: [
                    ['Одиночные', 'battles_1_single'],
                    ['Групповые', 'battles_1_group'],
                    ['Идущие бои', '/war/', 0, 1]
                ], prnt: 'gw_menu', arrow: 'battles', offsetY: -15},
                {divm: 0, lines: [
                    ['Общие', '/warlist.php?war=armed'],
                    ['Стрельба из спецоружия', '/warlist.php?war=rogatki'],
                    ['Дуэли', '/warlist.php?war=duels']
                ], prnt: 'battles_1', arrow: 'battles_1_single'},
                {divm: 0, lines: [
                    ['Общие', '/wargroup.php?war=armed'],
                    ['Графические', '/wargroup.php?war=gwars'],
                    ['Уличные', '/wargroup.php?war=street'],
                    ['Картофелемёты и рогатки', '/wargroup.php?war=rogatki'],
                    ['Дуэли на спецоружии', '/wargroup.php?war=duels'],
                    ['Нападения', '/wargroup.php?war=attacks']
                ], prnt: 'battles_1', arrow: 'battles_1_group', offsetY: -15},
                {divm: 0, lines: [
                    ['ГосЭнергоАтом', '/info.realty.php?id=2'],
                    ['Статистика GanjaWars.Ru от vasena',
                        'http://gw-utils.ru/'],
                    ['GWTools от Bas', 'https://www.gwtools.ru/'],
                    ['Нападения', '/wargroup.php?war=attacks', 'red']
                ], prnt: 'gw_menu', arrow: 'real_estate'},
                {divm: 0, lines: [
                    ['Синдикат "Скрипты для GW"', '/syndicate.php?id=3579'],
                    ['Скрипты на ganjascript.ucoz.com',
                        'http://ganjascript.ucoz.com/'],
                    ['Скрипты на gwscripts.ucoz.net',
                        'http://gwscripts.ucoz.net/'],
                    ['Скрипты на born2kill.clan.su',
                        'http://born2kill.clan.su/load/9'],
                    ['Скрипты от W_or_M',
                        'http://www.ganjafoto.ru/image.php?aid=435039'],
                    ['Скрипты от Bick',
                        'http://www.ganjafoto.ru/image.php?aid=331880'],
                    ['Скрипты от Jimmy Banditto',
                        'http://www.ganjafoto.ru/image.php?aid=334909'],
                    ['Скрипты от VSOP_juDGe',
                        'http://www.ganjafoto.ru/image.php?aid=260018'],
                    ['Скрипты от z0man',
                        'http://www.ganjafoto.ru/image.php?aid=285332'],
                    ['Скрипты от гном убийца',
                        'http://www.ganjafoto.ru/image.php?aid=256649'],
                    ['GW-панель', 'http://gwpanel.org/']
                ], prnt: 'gw_menu', arrow: 'scripts', offsetY: -45},
                {divm: 'syndicates_1', lines: [
                    ['Официальные синдикаты', 'offic_synd'],
                    ['Рейтинг синдикатов', '/srating.php', 0, 1],
                    ['Поиск синдиката',
                        'http://www.cccp-gw.su/listsynd/listsynd_search.php',
                        0, 1]
                ], prnt: 'gw_menu', arrow: 'syndicates', offsetY: -15},
                {divm: 'offic_synd_1', lines: [
                    ['GW - 911', '/syndicate.php?id=911'],
                    ['GW - Bugtesters', '/syndicate.php?id=1949'],
                    ['GW - Суд', '/syndicate.php?id=1318'],
                    ['GW-Технические персонажи', '/syndicate.php?id=445'],
                    ['GW - GanjaWiki', '/syndicate.php?id=6949'],
                    ['GW - Коллегия адвокатов', '/syndicate.php?id=1948'],
                    ['Администраторы игры', '/syndicate.php?id=3'],
                    ['GW - Загс', '/syndicate.php?id=1354'],
                    ['GW - Маркетинговая служба игры',
                        '/syndicate.php?id=2324'],
                    ['GW - Мировой Суд', '/syndicate.php?id=3060'],
                    ['GW - Модераторы GanjaFoto.Ru', '/syndicate.php?id=3516'],
                    ['GW - Модераторы рейтинга сайтов',
                        '/syndicate.php?id=3516'],
                    ['GW - Модераторы форума', '/syndicate.php?id=1262'],
                    ['GW - Модераторы чата', '/syndicate.php?id=274'],
                    ['GW - Полиция', '/syndicate.php?id=1321'],
                    ['GW - Помощники администраторов',
                        '/syndicate.php?id=2076'],
                    ['GW - Почетный легион', '/syndicate.php?id=1320'],
                    ['GW - Редакторы описания игры', '/syndicate.php?id=1323'],
                    ['GW - Следователи', '/syndicate.php?id=2309'],
                    ['GW - Суд - Ветераны', '/syndicate.php?id=1914'],
                    ['GW - Суд // Common', '/syndicate.php?id=1953'],
                    ['GW - Суд по взломам', '/syndicate.php?id=4409'],
                    ['GW - Судебные приставы', '/syndicate.php?id=1920']
                ], prnt: 'syndicates_1', arrow: 'offic_synd', offsetY: -45},
                {divm: 0, lines: [
                    ['Z', '/map.php?sx=150&sy=150'],
                    ['G', '/map.php?sx=50&sy=50'],
                    ['P', '/map.php?sx=123&sy=77'],
                    ['S', '/map.php?sx=100&sy=100']
                ], prnt: 'gw_menu', arrow: 'islands', offsetY: -15},
                {divm: 'npc_1', lines: [
                    ['Z', 'npcz'],
                    ['G', 'npcg'],
                    ['P', 'npcp'],
                    ['NPC-синдикаты', 'npcsynd']
                ], prnt: 'gw_menu', arrow: 'npc', offsetY: -15},
                {divm: 0, lines: [
                    ['Smokie Canablez', '/npc.php?id=1'],
                    ['Kenny Buzz', '/npc.php?id=4'],
                    ['Yoshinori Watanabe', '/npc.php?id=5'],
                    ['Rony James', '/npc.php?id=7'],
                    ['Tommy Morales', '/npc.php?id=9'],
                    ['Tony Brandino', '/npc.php?id=11']
                ], prnt: 'npc_1', arrow: 'npcz', offsetY: -15},
                {divm: 0, lines: [
                    ['Hempy Trown', '/npc.php?id=2'],
                    ['Rusty Reefer', '/npc.php?id=3'],
                    ['Donnie Ray', '/npc.php?id=6'],
                    ['Ricardo Gonzalez', '/npc.php?id=8'],
                    ['Inamoto Kanushi', '/npc.php?id=10'],
                    ['John Moretti', '/npc.php?id=12']
                ], prnt: 'npc_1', arrow: 'npcg', offsetY: -30},
                {divm: 0, lines: [
                    ['Takeshi Yamagata', '/npc.php?id=16'],
                    ['Michael Doyle', '/npc.php?id=17'],
                    ['Alfonso Morales', '/npc.php?id=18'],
                    ['Roy Fatico', '/npc.php?id=19'],
                    ['Giovanni Greco', '/npc.php?id=20']
                ], prnt: 'npc_1', arrow: 'npcp', offsetY: -30},
                {divm: 0, lines: [
                    ['Yakuza', '/syndicate.php?id=5862'],
                    ['Black Guerillaz', '/syndicate.php?id=5865'],
                    ['Colombian Cartel', '/syndicate.php?id=5863'],
                    ['Camorra', '/syndicate.php?id=5866'],
                    ['Rastafaras', '/syndicate.php?id=5867']
                ], prnt: 'npc_1', arrow: 'npcsynd', offsetY: -45},
                {divm: 0, lines: [
                    ['ДО', '/market.php'],
                    ['Разместить объявление', '/market-p.php'],
                    ['Мгновенная продажа', '/market-i.php'],
                    ['Мои объявления', '/market-l.php'],
                    ['Предметы в аренде', '/info.rent.php?id=' + general.myID]
                ], prnt: 'gw_menu', arrow: 'doska', offsetY: -30},
                {divm: 0, lines: [
                    ['Входящие', '/sms.php?page=0'],
                    ['Исходящие', '/sms.php?page=1'],
                    ['Написать новое', '/sms-create.php']
                ], prnt: 'gw_menu', arrow: 'post', offsetY: -15},
                {divm: 'forums_1', lines: [
                    ['Основные форумы', '', 'zag', 1],
                    ['Официальные объявления', '/threads.php?fid=1', 0, 1],
                    ['Вопросы и помощь в игре', '/threads.php?fid=49', 0, 1],
                    ['Общий игровой форум', '/threads.php?fid=27', 0, 1],
                    ['Открытый Клуб', '/threads.php?fid=8', 0, 1],
                    ['Объявления синдикатов', '/threads.php?fid=38', 0, 1],
                    ['Вступлю в синдикат', '/threads.php?fid=56', 0, 1],
                    ['Идеи и предложения', '/threads.php?fid=2', 0, 1],
                    ['Форум для неигровых тем', '/threads.php?fid=22', 0, 1],
                    ['Клуб Нытиков', '/threads.php?fid=55', 0, 1],
                    ['Тотализатор', '/threads.php?fid=5', 0, 1],
                    ['Общение гостей острова', '/threads.php?fid=30', 0, 1],
                    ['Конкурсы', '/threads.php?fid=3', 0, 1],
                    ['Благодарности и поздравления',
                        '/threads.php?fid=4', 0, 1],
                    ['Оффline встречи', '/threads.php?fid=6', 0, 1],
                    ['Креатив', '/threads.php?fid=23', 0, 1],
                    ['Официальные объявления<br>налоговой инспекции',
                        '/threads.php?fid=24', 0, 1],
                    ['Торговые форумы', 'trade_forums', 'brown'],
                    ['Суд', '', 'zag', 1],
                    ['Официальные объявления суда',
                        '/threads.php?fid=11', 0, 1],
                    ['Зал суда', '/threads.php?fid=12', 0, 1],
                    ['Зал бракосочетаний', '/threads.php?fid=29', 0, 1],
                    ['Дворец Бракосочетания', '/threads.php?fid=50', 0, 1],
                    ['Технические вопросы', '', 'zag', 1],
                    ['Техническая поддержка', '/threads.php?fid=17', 0, 1],
                    ['Баги и глюки (общее)', '/threads.php?fid=18', 0, 1],
                    ['Баги и глюки (финансовые вопросы)',
                        '/threads.php?fid=19', 0, 1],
                    ['Проблемы с боями', '/threads.php?fid=20', 0, 1],
                    ['Проблемы с персонажами', '/threads.php?fid=33', 0, 1],
                    ['Автономные районы', '', 'zag', 1],
                    ['Respect Hill', '/threads.php?fid=25', 0, 1]
                ], prnt: 'gw_menu', arrow: 'forums', offsetY: -158},
                {divm: 0, lines: [
                    ['Торговля предметами : Оружие', '/threads.php?fid=7'],
                    ['Торговля предметами : Броня', '/threads.php?fid=36'],
                    ['Торговля предметами : Аксессуары', '/threads.php?fid=37'],
                    ['Торговля предметами : Редкие вещи',
                        '/threads.php?fid=44'],
                    ['Торговля high-tech предметами', '/threads.php?fid=35'],
                    ['Торговля модифицированными предметами',
                        '/threads.php?fid=47'],
                    ['Торговля недвижимостью', '/threads.php?fid=34'],
                    ['Торговля сломанными вещами', '/threads.php?fid=48'],
                    ['Аренда предметов', '/threads.php?fid=46'],
                    ['Аренда недвижимости', '/threads.php?fid=54'],
                    ['Торговля синдикатами', '/threads.php?fid=41'],
                    ['Поиск исполнителей', '/threads.php?fid=42']
                ], prnt: 'forums_1', arrow: 'trade_forums', offsetY: -90},
                {divm: 'shop_1', lines: [
                    ['Гос. магазин', 'shop_gos'],
                    ['HighTech магазин', 'shop_hightech'],
                    ['Магазин аренды', 'shop_rent'],
                    ['Магазин синдиката', 'shop_synd'],
                    ['Магазин лицензий', '/shopl.php', 0, 1]
                ], prnt: 'gw_menu', arrow: 'shop', offsetY: -15},
                {divm: 0, lines: [
                    ['Огнестрельное оружие', '', 'zag'],
                    ['Пистолеты', '/shop.php?shop=shop_pistols'],
                    ['ПП', '/shop.php?shop=shop_ppguns'],
                    ['Автоматы', '/shop.php?shop=shop_auto'],
                    ['Снайперское оружие', '/shop.php?shop=shop_sniper'],
                    ['Пулемёты', '/shop.php?shop=shop_heavy'],
                    ['Дробовики', '/shop.php?shop=shop_shotguns'],
                    ['Гранатометы', '/shop.php?shop=shop_grl'],
                    ['Гранаты', '/shop.php?shop=shop_grenades'],
                    ['Специальное оружие', '/shop.php?shop=shop_misc'],
                    ['Полезные предметы', '', 'zag'],
                    ['Броня', '/shop.php?shop=shop_armour'],
                    ['Шлемы', '/shop.php?shop=shop_helmets'],
                    ['Броня ног', '/shop.php?shop=shop_boots'],
                    ['Маскировка', '/shop.php?shop=shop_masks'],
                    ['Тепловизоры', '/shop.php?shop=shop_wear'],
                    ['Оборудование', '/shop.php?shop=shop_phones'],
                    ['Транспорт', '/shop.php?shop=shop_transport'],
                    ['Цветы', '/shop.php?shop=shop_flowers'],
                    ['Аптека', '/shop.php?shop=shop_drugs'],
                    ['Подарки', '/shop.php?shop=shop_gifts']
                ], prnt: 'shop_1', arrow: 'shop_gos', offsetY: -75},
                {divm: 0, lines: [
                    ['Огнестрельное оружие', '', 'zag'],
                    ['ПП', '/shopc.php?shop=shop_ppguns_c'],
                    ['Автоматы', '/shopc.php?shop=shop_auto_c'],
                    ['Снайперское оружие', '/shopc.php?shop=shop_snipe_c'],
                    ['Пулемёты', '/shopc.php?shop=shop_heavy_c'],
                    ['Дробовики', '/shopc.php?shop=shop_shotguns_c'],
                    ['Гранатометы', '/shopc.php?shop=shop_grl_c'],
                    ['Полезные предметы', '', 'zag'],
                    ['Броня', '/shopc.php?shop=shop_armour_c'],
                    ['Шлемы', '/shopc.php?shop=shop_helmets_c'],
                    ['Броня ног', '/shopc.php?shop=shop_boots_c'],
                    ['Маскировка', '/shopc.php?shop=shop_masks_c'],
                    ['Тепловизоры', '/shopc.php?shop=shop_wear_c'],
                    ['Оборудование', '/shopc.php?shop=shop_misc_c'],
                    ['Аптека', '/shopc.php?shop=shop_drugs_c'],
                    ['Транспорт', '/shopc.php?shop=shop_transport_c']
                ], prnt: 'shop_1', arrow: 'shop_hightech', offsetY: -75},
                {divm: 0, lines: [
                    ['Rent-A-Gun', '', 'zag'],
                    ['Пулеметы', '/rent-a-gun.php?shop=shop_heavy_cr'],
                    ['Автоматы', '/rent-a-gun.php?shop=shop_auto_cr'],
                    ['Снайперское оружие',
                        '/rent-a-gun.php?shop=shop_snipe_cr'],
                    ['Экипировка', '/rent-a-gun.php?shop=shop_armour_cr']
                ], prnt: 'shop_1', arrow: 'shop_rent', offsetY: -30},
                {divm: 0, lines: [
                    ['Гранаты', '/sshop.php?tshop=grenades'],
                    ['Чипсеты', '/sshop.php?tshop=chipsets'],
                    ['Турели', '/sshop.php?tshop=turrels']
                ], prnt: 'shop_1', arrow: 'shop_synd', offsetY: -15},
                {divm: 'pay_grenades_1', lines: [
                    ['Свет', 'ligntgr'],
                    ['Дым', 'smokegr'],
                    ['Электромагнитные', 'em_gr'],
                    ['Боевые', 'fightinggr']
                ], prnt: 'gw_menu', arrow: 'pay_grenades', offsetY: -15},
                {divm: 0, lines: [
                    ['ОР-1Т', '/market.php?buy=1&item_id=lightst'],
                    ['ОР-1', '/market.php?buy=1&item_id=lights'],
                    ['M84', '/market.php?buy=1&item_id=m84'],
                    ['Синдовые', '', 'zag'],
                    ['ОР-1С', '/statlist.php?r=lightss&type=i'],
                    ['ОР-2C', '/statlist.php?r=lightsm&type=i']
                ], prnt: 'pay_grenades_1', arrow: 'ligntgr', offsetY: -15},
                {divm: 0, lines: [
                    ['РГД-2', '/market.php?buy=1&item_id=rgd2'],
                    ['РГД-2М', '/market.php?buy=1&item_id=rgd2m'],
                    ['L83 A1 HG', '/market.php?buy=1&item_id=l83a1'],
                    ['Синдовые', '', 'zag'],
                    ['РГД-2С', '/statlist.php?r=rgd2s&type=i'],
                    ['ДГ-1', '/statlist.php?r=grenade_dg1&type=i']
                ], prnt: 'pay_grenades_1', arrow: 'smokegr', offsetY: -30},
                {divm: 0, lines: [
                    ['EMP-IR', '/market.php?buy=1&item_id=emp_ir'],
                    ['EMP-S', '/market.php?buy=1&item_id=emp_s']
                ], prnt: 'pay_grenades_1', arrow: 'em_gr'},
                {divm: 0, lines: [
                    ['РГД-5', '/market.php?buy=1&item_id=rgd5'],
                    ['Граната F-1', '/market.php?buy=1&item_id=grenade_f1'],
                    ['РКГ-3', '/market.php?buy=1&item_id=rkg3'],
                    ['MDN', '/market.php?buy=1&item_id=mdn'],
                    ['РГО-1', '/market.php?buy=1&item_id=rgo'],
                    ['РГН', '/market.php?buy=1&item_id=rgn'],
                    ['Frag Grenade MK-3', '/market.php?buy=1&item_id=fg3l'],
                    ['M67', '/market.php?buy=1&item_id=m67'],
                    ['M3', '/market.php?buy=1&item_id=m3'],
                    ['HG-78', '/market.php?buy=1&item_id=hg78'],
                    ['HG-84', '/market.php?buy=1&item_id=hg84'],
                    ['Mk-6 Frag Grenade', '/market.php?buy=1&item_id=fg6'],
                    ['M14 Thermite', '/market.php?buy=1&item_id=anm14'],
                    ['M34 Ph', '/market.php?buy=1&item_id=m34ph'],
                    ['Mk-7 Frag Grenade', '/market.php?buy=1&item_id=fg7'],
                    ['Mk-8 Black Dust', '/market.php?buy=1&item_id=fg8bd'],
                    ['Синдовые', '', 'zag'],
                    ['Mk-5 Frag Grenade', '/statlist.php?r=fg5&type=i'],
                    ['Коктейль Молотова', '/statlist.php?r=molotov&type=i'],
                    ['HellsBreath', '/statlist.php?r=hellsbreath&type=i'],
                    ['Напалм', '/statlist.php?r=napalm&type=i'],
                    ['GHTB', '/sshop.php?tshop=grenades'],
                    ['ME-85 Frag Grenade', '/statlist.php?r=me85&type=i']
                ], prnt: 'pay_grenades_1', arrow: 'fightinggr', offsetY: -195},
                {divm: 'pay_lut_1', lines: [
                    ['Оружие и броня', 'weapon_armour_lut'],
                    ['Медикаменты', 'drugs_lut'],
                    ['Предметы', 'items_lut']
                ], prnt: 'gw_menu', arrow: 'pay_lut', offsetY: -15},
                {divm: 0, lines: [
                    ['Ржавая граната RGD-5',
                        '/market.php?buy=1&item_id=old_rgd5'],
                    ['Маскировочный плащ', '/market.php?buy=1&item_id=maskp'],
                    ['Тяжелые ботинки', '/market.php?buy=1&item_id=heavyboots'],
                    ['Шлем 2-го класса', '/market.php?buy=1&item_id=helmet2'],
                    ['Титановый пояс', '/market.php?buy=1&item_id=tbelt'],
                    ['HK-53', '/market.php?buy=1&item_id=hk53'],
                    ['L83 A1 HG', '/market.php?buy=1&item_id=l83a1'],
                    ['M84', '/market.php?buy=1&item_id=m84']
                ], prnt: 'pay_lut_1', arrow: 'weapon_armour_lut', offsetY: -45},
                {divm: 0, lines: [
                    ['Травяной сбор', '/market.php?buy=1&item_id=weedset'],
                    ['Вяленая рыба', '/market.php?buy=1&item_id=perch'],
                    ['Родниковая вода', '/market.php?buy=1&item_id=water'],
                    ['Грибы', '/market.php?buy=1&item_id=mushroom'],
                    ['Медицинский бинт', '/market.php?buy=1&item_id=bandage'],
                    ['Походная аптечка', '/market.php?buy=1&item_id=travelkit'],
                    ['Кофейные зерна', '/market.php?buy=1&item_id=coffee'],
                    ['Стимпак бессмертия',
                        '/market.php?buy=1&item_id=stimpack_iddqd'],
                    ['Стимпак бессмертия XL',
                        '/market.php?buy=1&item_id=stimpack_iddqd_xl'],
                    ['Стимпак брони',
                        '/market.php?buy=1&item_id=stimpack_armour'],
                    ['Стимпак брони XL',
                        '/market.php?buy=1&item_id=stimpack_armour_xl'],
                    ['Стимпак урона', '/market.php?buy=1&item_id=stimpack_dmg'],
                    ['Стимпак урона XL',
                        '/market.php?buy=1&item_id=stimpack_dmg_xl'],
                    ['Стимпак скорости',
                        '/market.php?buy=1&item_id=stimpack_spd']
                ], prnt: 'pay_lut_1', arrow: 'drugs_lut', offsetY: -90},
                {divm: 0, lines: [
                    ['Динамит', '/market.php?buy=1&item_id=dinamit'],
                    ['Книга опыта', '/market.php?buy=1&item_id=expbook'],
                    ['Журнал «Современное оружие»',
                        '/market.php?buy=1&item_id=magazine']
                ], prnt: 'pay_lut_1', arrow: 'items_lut', offsetY: -15},
                {divm: 0, lines: [
                    ['от W_or_M', 'http://gw-dressroom.ru/'],
                    ['от Yeni', 'http://help.yeni.name/gan/']
                ], prnt: 'gw_menu', arrow: 'changeclothing'},
                {divm: 0, lines: [
                    ['Главное', '/info.edit.php?type=main'],
                    ['О себе', '/info.edit.php?type=pinfo'],
                    ['Анкета', '/info.anketa.php'],
                    ['E-mail и пароли', '/info.edit.php?type=security'],
                    ['Секретный ключ', '/info.edit.php?type=pkey'],
                    ['Картинка персонажа', '/info.edit.php?type=avatar'],
                    ['Навигация', '/info.edit.php?type=navy']
                ], prnt: 'gw_menu', arrow: 'settings', offsetY: -45}
            ];

            this.createGWMenuItems(gwM);

            //кнопка закрытия меню
            general.$('exit').
                addEventListener('click', function () {
                    _this.gwMenuInit(_this);
                }, false);

            //чекбокс "Показывать всегда"
            general.$('showt').addEventListener('click', function () {
                var showt = this;
                general.setData(showt.checked ? ['1'] : [], 12);
            }, false);

            _this.gwMenuInit(_this);
        };

        /**
         * @method init
         */
        this.init = function () {
            // ссылка в главном меню игры
            var mainLink = general.doc.querySelector('a[href$="/sites.php"]');
            if (mainLink) {
                mainLink.innerHTML = '<b>GW-Меню</b>';
                mainLink.removeAttribute('href');
                mainLink.setAttribute('style', 'cursor: pointer;');
                var _this = this;
                mainLink.addEventListener('click', function () {
                    _this.gwMenuInit(_this);
                }, false);

                // если есть запись в хранилище "Показывать всегда"
                if (general.getData(12)[0]) {
                    this.gwMenuInit(this);
                    general.$('showt').checked = true;
                }
            }
        };
    };

    /**
     * @class InventoryPlus
     * @constructor
     */
    var InventoryPlus = function () {
        /**
         * @method openCloseItem
         * @param   {String}    id
         */
        this.openCloseItem = function (id) {
            return function () {
                var tb = general.doc.querySelector('#tr_' + id),
                    _this = this;

                if (tb.style.display === '') {
                    tb.style.display = 'none';
                    _this.innerHTML = _this.innerHTML.replace('-', '+');
                } else {
                    tb.style.display = '';
                    _this.innerHTML = _this.innerHTML.replace('+', '-');
                }
            };
        };

        /**
         * @method compareLines
         * @param   {Object}        line
         * @param   {Array}         linesObj
         * @return  {Object|null}
         */
        this.compareLines = function (line, linesObj) {
            var i;

            line.link = line.line_1.querySelector('font[color="#990000"]').
                parentNode.parentNode;
            line.id = /id=(.*)$/.exec(line.link)[1];
            for (i = 0; i < linesObj.length; i++) {
                if (linesObj[i].line.id === line.id) {
                    return linesObj[i];
                }
            }

            return null;
        };

        /**
         * @method startInventoryPlus
         */
        this.startInventoryPlus = function () {
            // ищем таблицу с инвентарем
            var tbody = general.doc.querySelectorAll('table[border="0"]' +
                    '[cellspacing="1"][cellpadding="5"][align="center"]' +
                    '[width="700"]');

            if (tbody[2]) {
                // новое оформление экипировки
                tbody = tbody[2].firstElementChild;
            } else {
                // старое оформление экипировки
                tbody = general.doc.querySelector('table[border="0"]' +
                        '[cellspacing="1"][cellpadding="3"][align="center"]' +
                        '[width="700"]>tbody');
            }

            if (!tbody.firstElementChild) {
                return;
            }

            var node = tbody.firstElementChild.nextElementSibling;
            if (/предметов нет/.test(node.innerHTML)) {
                return;
            }

            var allLines = [], // все узлы <tr> из инвентаря
                next,
                i;

            while (node) {
                i = allLines.length;
                allLines[i] = {'line_1': node.cloneNode(true), 'line_2': 0};
                next = node.nextSibling;
                if (next.nodeType === 1) {
                    allLines[i].line_2 = next.cloneNode(true);
                    node = next.nextElementSibling;
                } else {
                    node = node.nextElementSibling;
                }
            }

            // удаляем все предметы из инвентаря
            var title = tbody.firstElementChild.cloneNode(true);
            tbody.innerHTML = '';
            tbody.appendChild(title);

            // массив "уникальных" вещей (каждая вешь по одной и количество)
            var linesObj = [],
                obj;

            for (i = 0; i < allLines.length; i++) {
                obj = this.compareLines(allLines[i], linesObj);
                if (!obj) {
                    linesObj[linesObj.length] = {line: allLines[i], count: 1};
                } else {
                    obj.count++;
                }
            }

            // вставляем вещи обратно в инвентарь
            var tblTarget,
                trHide,
                divn,
                id,
                td,
                j;

            for (i = 0; i < linesObj.length; i++) {
                tbody.appendChild(linesObj[i].line.line_1);
                if (linesObj[i].line.line_2) {
                    tbody.appendChild(linesObj[i].line.line_2);
                }

                // показываем количество только если оно больше 1
                if (linesObj[i].count !== 1) {
                    id = linesObj[i].line.id;
                    // вставим скрытые вещи
                    trHide = general.doc.createElement('tr');
                    trHide.id = 'tr_' + id;
                    trHide.setAttribute('style', 'display: none');
                    td = general.doc.createElement('td');
                    td.setAttribute('colspan', '2');
                    tblTarget = general.doc.createElement('table');
                    tblTarget.setAttribute('style',
                            'width: 100%; margin-left: 30px;');
                    td.appendChild(tblTarget);
                    trHide.appendChild(td);
                    tbody.appendChild(trHide);

                    for (j = 0; j < allLines.length; j++) {
                        if (allLines[j].id === id &&
                                linesObj[i].line.line_1.innerHTML !==
                                allLines[j].line_1.innerHTML) {
                            allLines[j].line_1.firstElementChild.
                                setAttribute('width', '400px');
                            tblTarget.appendChild(allLines[j].line_1);
                            if (allLines[j].line_2) {
                                tblTarget.appendChild(allLines[j].line_2);
                            }
                        }
                    }

                    //показываем количество и кнопу раскрытия списка
                    divn = general.doc.createElement('div');
                    divn.setAttribute('style', 'color: #606060; ' +
                            'margin-right: 300px; margin-left: 10px; ' +
                            'font-weight: bold; cursor: pointer;');
                    divn.innerHTML = '[' + linesObj[i].count + '+]';
                    divn.addEventListener('click',
                            this.openCloseItem(id), false);
                    linesObj[i].line.link.parentNode.appendChild(divn);
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            // костыль для хрома
            if (/Chrome/i.test(general.root.navigator.appVersion)) {
                var scrpt = general.doc.createElement('script');
                scrpt.innerHTML =  'function postdo_mod(url) {' +
                    'new Ajax.Updater("itemsbody", url, ' +
                    '{asynchronous: true, onComplete: dumb, onSuccess: ' +
                    'function() {location.reload();}, method: "post"}); ' +
                    'return false;}';
                general.doc.body.insertBefore(scrpt,
                        general.doc.body.querySelectorAll('script')[0]);

                // изменим все ссылки на странице, использующие в
                // атрибуте onclick функцию 'postdo' на 'postdo_mod'
                var a = general.doc.
                            querySelectorAll('a[onclick^="return postdo"]'),
                    i;

                for (i = 0; i < a.length; i++) {
                    a[i].setAttribute('onclick', a[i].getAttribute('onclick').
                            replace('postdo', 'postdo_mod'));
                }
            } else {
                general.root.dumb = function () {
                    var _this = this;
                    general.root.setTimeout(_this.startInventoryPlus, 100);
                };
            }

            this.startInventoryPlus();

        };
    };

    /**
     * @class CountBattles
     * @constructor
     */
    var CountBattles = function () {
        /**
         * @property rez
         * @type {Object}
         */
        this.rez = {win: 0, draw: 0, loss: 0, btls: []};
        /**
         * @property divContainer
         * @type {HTMLDivElement|null}
         */
        this.divContainer = null;
        /**
         * @property reg
         * @type {Object|null}
         */
        this.reg = null;
        /**
         * @property persId
         * @type {String}
         */
        this.persId = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 700;

        /**
         * @method getBattles
         * @param   {Object}    obj
         * @return  {Boolean}
         */
        this.getBattles = function (obj) {
            var btlLogs = obj.querySelectorAll('nobr>a[href*=' +
                    '"/warlog.php?bid="]>font[color="green"]'),
                i;

            for (i = 0; i < btlLogs.length; i++) {
                if (this.reg.test(btlLogs[i].innerHTML)) {
                    this.rez.btls.push(btlLogs[i].parentNode.parentNode.
                            nextElementSibling);
                } else {
                    return false;
                }
            }

            return btlLogs.length ? true : false;
        };

        /**
         * @method showRezult
         */
        this.showReault = function () {
            var i, b;

            for (i = 0; i < this.rez.btls.length; i++) {
                b = this.rez.btls[i].querySelector('a>b');
                if (b) {
                    switch (b.parentNode.getAttribute('style')) {
                    case 'color:red':
                        this.rez.win++;
                        break;
                    case 'color:blue':
                        this.rez.loss++;
                        break;
                    default:
                        this.rez.draw++;
                        break;
                    }
                }
            }

            this.divContainer.innerHTML = 'Проведено боев за текущие ' +
                'сутки: <span style="font-weight: bold;">' +
                this.rez.btls.length + ' (<span style="color: #FF0000;">' +
                this.rez.win + '</span>/<span style="color: #0000FF;">' +
                this.rez.loss + '</span>/<span style="color :#008000;">' +
                this.rez.draw + '</span>)</span>';
        };

        /**
         * @method startCountBattles
         * @param   {int}   ind
         */
        this.startCountBattles = function (ind) {
            if (!ind) {
                if (this.getBattles(general.doc)) {
                    this.divContainer.innerHTML = '<span style="margin-left: ' +
                        '100px;">Загрузка <img src="' + general.imgPath +
                        'preloader.gif" alt="Загрузка" ' +
                        'title="Загрузка"></span>';
                    ind++;
                    this.startCountBattles(ind);
                } else {
                    this.showReault();
                }
            } else {
                var url = 'http://www.ganjawars.ru/info.warstats.php?id=' +
                    this.persId + '&page_id=' + ind,
                    _this = this;

                new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                    var span = general.doc.createElement('span');
                    span.innerHTML = xml.responseText;
                    // если перс в это время зашел в заявку/бой, то просто
                    // перезагрузим страницу
                    if (/игрок находится в бою/.test(span.innerHTML)) {
                        general.root.location.reload();
                        return;
                    }

                    if (_this.getBattles(span)) {
                        ind++;
                        general.root.setTimeout(function () {
                            _this.startCountBattles(ind);
                        }, _this.tm);
                    } else {
                        _this.showReault();
                    }
                }, function () {
                    general.root.setTimeout(function () {
                        _this.startCountBattles(ind);
                    }, _this.tm);
                });
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('center+br+br'),
                inBattle = /игрок находится в бою/.
                    test(general.doc.body.innerHTML),
                pageId = /page_id=(\d+)/.exec(general.loc);

            // если перс НЕ в заявке/бою и мы на первой странице протоколов
            if (target && !inBattle && !(pageId && pageId[1] !== '0') &&
                    !(/\(0 всего\)/.test(general.doc.body.innerHTML))) {
                this.divContainer = general.doc.createElement('div');
                this.divContainer.setAttribute('style', 'margin-left: 10px;');
                target.parentNode.insertBefore(this.divContainer, target);

                var date = new Date(),
                    year = /20(\d+)/.exec(' ' + date.getFullYear())[1],
                    month = date.getMonth() + 1,
                    day = date.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                this.reg  = new RegExp(day + '\\.' + month + '\\.' + year);

                this.startCountBattles(0);
            }
        };
    };

    /**
     * @class GbCounter
     * @constructor
     */
    var GbCounter = function () {
        /**
         * @property
         * @type {HTMLElement|null}
         */
        this.spanCountGB = null;
        /**
         * @property countGbNow
         * @type {int}
         */
        this.countGbNow = 0;

        /**
         * @method resetGBCounter
         */
        this.resetGBCounter = function () {
            general.setData([this.countGbNow.toString()], 13);
            this.setGBCounter();
        };

        /**
         *  @method setGBCounter
         */
        this.setGBCounter = function () {
            var countGbOld = general.getData(13)[0];
            if (!countGbOld) {
                this.resetGBCounter();
                return;
            }

            var diff = this.countGbNow - (+countGbOld);
            this.spanCountGB.innerHTML = '[' +
                new SetPoints().init(diff, '.', true) + ']';
            this.spanCountGB.style.color = diff >= 0 ?
                    '#FF0000' : '#0000FF';
        };

        /**
         * @method init
         */
        this.init = function () {
            var divGB = general.doc.querySelector('td>b>div[id="cdiv"]');
            if (divGB) {
                this.countGbNow = +divGB.innerHTML.replace(/,/g, '');
                this.spanCountGB = general.doc.createElement('span');
                this.spanCountGB.setAttribute('style', 'margin-left: 5px; ' +
                        'font-weight: normal; font-size: 7pt; ' +
                        'cursor: pointer;');
                divGB.appendChild(this.spanCountGB);

                this.setGBCounter();

                var _this = this;
                this.spanCountGB.addEventListener('click', function () {
                    if (confirm('Сбросить счетчик?')) {
                        _this.resetGBCounter();
                    }
                }, false);
            }
        };
    };

    /**
     * @class BonusInfo
     * @constructor
     */
    var BonusInfo = function () {
        /**
         * @property target
         * @type {HTMLTableCellElement|null}
         */
        this.target = null;
        /**
         * @property savecontent
         * @type {String}
         */
        this.savecontent = '';
        /**
         * @property bonus
         * @type {Object}
         */
        this.bonus = {
            'адреналин': ['«Адреналин» - бонус, увеличивающий «Выносливость» ' +
                'персонажа в бою пропорционально количеству очков бонуса ' +
                'при менее чем половине оставшихся HP. Дает +20% ' +
                'выносливости за каждую единицу бонуса.'],
            'бонус антикиллера': ['«Бонус антикиллера» - бонус, благодаря ' +
                'которому выздоровление персонажа начнется с N*30% HP, если ' +
                'он был убит Киллером. Максимальное полезное значение - 36. ' +
                'На практике каждая единица бонуса уменьшает количество HP, ' +
                'которые необходимо восстановить после удачного нападения ' +
                'Киллера, на 7,5 % от максимального HP персонажа (не в бою). ' +
                'Рассчитать HP персонажа после нападения можно по формуле:' +
                '<br>X = - Н * (6 - A*0,075), где:<br>X - HP после нападения;' +
                '<br>H - максимальное HP персонажа не в бою;<br>А - ' +
                'количество единиц «бонуса антикиллера».<br><br>Постоянный ' +
                'бонус:<br>&raquo; статус «Санитар леса» дает 8 единиц ' +
                'бонуса антикиллера.'],
            'бонус выздоровления': ['«Бонус выздоровления» - бонус, ' +
                'благодаря которому выздоровление персонажа начнется с ' +
                'N*5 % HP от его максимального количества HP, если он был ' +
                'убит в бою на третьем или последующих ходах. Максимальное ' +
                'полезное значение - 20.'],
            'бонус маклауда': ['«Бонус Маклауда» - бонус, дающий вероятность ' +
                'остаться живым с 1 HP, даже если персонаж был убит. ' +
                'Вероятность срабатывания бонуса уменьшается с каждым ходом. ' +
                'Максимальное полезное значение - 10.<br><br>Постоянный ' +
                'бонус:<br>&raquo; 18 уровень владения 3 различными видами ' +
                'оружия дает Бонус Маклауда: +1<br>&raquo 8-е уровни всех ' +
                'профессий (киллера, наёмника и боевика) дают Бонус ' +
                'Маклауда: +1', 'Бонус Маклауда'],
            'бонус опыта': ['«Бонус опыта» - бонус, увеличивающий получаемый ' +
                'опыт на (N/10), то есть при N=10 опыт удваивается. ' +
                'Действует только при победе и максимальное значение бонуса ' +
                'равно 30.'],
            'бонус прогресса': ['Одна единица «Бонуса прогресса» увеличивает ' +
                'опыт и умения в боях PvP (против живых противников) на ' +
                'N/15, то есть при N=15 удваиваются.'],
            'бонус прочности': ['«Бонус прочности» помогает избежать поломки ' +
                'оружия в боях с вероятностью, пропорциональной количеству ' +
                'единиц бонуса у персонажа. Максимально полезное значение ' +
                'в 10 единиц обозначает 100 % вероятность того, что оружие ' +
                'не будет сломано.'],
            'бонус сапёра': ['«Бонус сапёра» - бонус, обеспечивающий ' +
                'дополнительную защиту персонажа от взрывов гранат и ' +
                'гранатомётов. Максимальное полезное значение - 20.<br><br>' +
                'Постоянный бонус:<br>&raquo; 15-й уровень владения ' +
                'гранатами и гранатомётами и 15-й уровень владения любым ' +
                'другим оружием дает Бонус сапёра: +1<br>&raquo; 17-й ' +
                'уровень владения гранатами и 17-й уровень владения любым ' +
                'другим оружием дает ещё Бонус сапёра: +1'],
            'бонус снайпера': ['«Бонус снайпера» - бонус, увеличивающий ' +
                'вероятность критических попаданий из любого вида оружия. ' +
                'Максимальное полезное значение бонуса снайпера равно ' +
                'боевому уровню персонажа, т.е. чем старше персонаж, тем ' +
                'большую вероятность можно "набрать" бонусами.<br><br>' +
                'Постоянный бонус:<br>&raquo; статус «Вооружен и опасен» ' +
                'дает Бонус снайпера: +2'],
            'бонус удачи': ['«Бонус удачи» - увеличивает вероятность ' +
                'получения модификаторов оружия и брони. При значении ' +
                'бонуса = 100 вероятность увеличивается в два раза, ' +
                'полезный эффект от бонуса не ограничен.'],
            'бонус умений': ['«Бонус умений» - бонус, увеличивающий ' +
                'получаемые умения на (N/10), то есть при N=10 умения ' +
                'удваиваются. Действует только при победе и максимальное ' +
                'значение бонуса равно 30. Не действует на умения, ' +
                'получаемые за бросок гранаты.'],
            'бонус урона': ['Бонус урона — временный бонус, увеличивает ' +
                'урон, наносимый персонажем, на (значение_бонуса)%. ' +
                '10 единиц бонуса урона = 10 % увеличения урона = 1 бонусу ' +
                'жажды крови. Эффект этого бонуса перемножается с бонусом ' +
                'жажды крови, то есть 100 HP чистого урона с 1 бонусом ' +
                'ЖК и 10 бонусами урона = 121 HP урона.'],
            'бонус фермера': ['Бонус фермера — временный бонус, ускоряет ' +
                'созревание растений на ферме, и позволяет получить больше ' +
                'опыта при сборке урожая. Максимально полезное значение = 90.'],
            'бонус ярости': ['«Бонус ярости» - бонус, увеличивающий урон, ' +
                'наносимый персонажем, пропорционально уменьшению здоровья ' +
                'этого персонажа. Формула коэффициента k прироста урона:' +
                '<br>k = N*(1-Здоровье/Здоровье максимальное)/10 где:<br>' +
                'N - количество бонуса ярости'],
            'второй выстрел': ['«Второй выстрел» - влияет на вероятность ' +
                'повторного выстрела в тот же ход, в случае если игрок ' +
                'угадал направление стрельбы. Действие бонуса не ' +
                'распространяется на гранаты и гранатомёты, бонус действует ' +
                'на стрельбу с обеих рук. Максимальное полезное значение ' +
                'этого бонуса - 100.'],
            'второй шаг': ['«Второй шаг» - бонус, увеличивающий вероятность ' +
                'того, что персонаж во время боя сделает два шага вперед, ' +
                'вместо одного. Максимальное полезное значение - 10.'],
            'жажда крови': ['«Жажда крови» увеличивает урон персонажа на ' +
                '10% за каждое очко бонуса. Предельного значения нет. С 18 ' +
                'декабря 2009 года каждый игрок, который в течение 4-х часов ' +
                'не провел ни одного боя, теперь будет получать 1 бонус ' +
                'Жажды крови на 1 час после первого проведенного боя.<br><br>' +
                'Постоянный бонус:<br>&raquo; 10-е уровни всех профессий ' +
                '(киллера, наёмника и боевика) дают Жажда крови: +1'],
            'крепкий орешек': ['«Крепкий орешек» - бонус, дающий ' +
                'дополнительную защиту персонажа от критических попаданий ' +
                '(обратный эффект бонуса снайпера) и обеспечивающий ' +
                'дополнительную защиту от таких попаданий, даже если они ' +
                'произошли. Максимальное полезное значение при снижении ' +
                'вероятности попадания равно уровню персонажа, максимальное ' +
                'полезное значение защиты от попаданий не ограничено.' +
                '<br><br>Постоянный бонус:<br>&raquo; 20-й уровень ' +
                'владения 3 различными видами оружия дает Крепкий орешек: +1'],
            'мужской бонус': ['«Мужской бонус» - бонус, благодаря которому ' +
                'выздоровление персонажа (любого пола) начнется с N*10 % HP ' +
                'от его максимального количества HP, если он был убит ' +
                'персонажем женского пола. Максимальное полезное ' +
                'значение - 10.'],
            'ночная маскировка': ['«Ночная маскировка» - бонус, за каждое ' +
                'очко которого персонаж персонаж получает в бою ' +
                'дополнительные 5 % маскировки в период с 00:00 до 07:00. ' +
                'Данный бонус не следует путать с общим снижением видимости ' +
                'на 20% с 00:00 до 7:00 по серверному времени.'],
            'самолечение': ['«Самолечение» - бонус, дающий выздоровление ' +
                'персонажа по ходу боя. Этот бонус работает до 30-го хода ' +
                'и не работает в уличных боях и графических боях на деньги. ' +
                'За каждую единицу бонуса здоровье восстанавливается на ' +
                '10 HP за 1 ход.'],
            'туз в рукаве': ['«Туз в рукаве» - бонус, позволяющий с ' +
                'некоторой вероятностью дважды воспользоваться гранатой в ' +
                'одном бою. Максимальное полезное значение - 10.<br><br>' +
                'Постоянный бонус:<br>&raquo; каждый нечетный уровень ' +
                'владения гранатами после 20-го навсегда увеличивает ' +
                'бонус Туз в рукаве на одну единицу.'],
            'устойчивость': ['«Устойчивость» - бонус, увеличивающий ' +
                'вероятность того, что персонажа не откинет назад при взрыве ' +
                'гранаты. Максимальное полезное значение - 10.'],
            'устойчивость к алкоголю': ['Устойчивость к алкоголю - бонус, ' +
                'уменьшающий на N/100 получаемое персонажем опьянение при ' +
                'выпивании коктейлей в барах. То есть, при N=50 получаемое ' +
                'опьянение уменьшится в два раза. Максимальное полезное ' +
                'значение - 100.']
        };

        /**
         * @method advSetBonusInfo
         * @param   {String}    name
         */
        this.advSetBonusInfo = function (name) {
            var _this = this;

            return function () {
                _this.target.innerHTML = '<div style="text-align: left; ' +
                    'font-size:8pt;">' + _this.bonus[name][0] + '<div style=' +
                    '"margin-top: 5px;"><a target="_blank" href=' +
                    '"http://www.ganjawiki.ru/index.php/' +
                    (_this.bonus[name][1] || name).replace(/\s/g, '_') +
                    '">страница на www.ganjawiki.ru</a></div>' +
                    '<div style="color: #990000; margin-top: 10px; ' +
                    'margin-bottom: 2px; text-align: center;">' +
                    '<span id="back" style="cursor: pointer;">&lt;&lt; ' +
                    'Назад</span></div></div>';

                general.$('back').addEventListener('click', function () {
                    _this.target.innerHTML = _this.savecontent;
                    _this.setBonusInfo();
                }, false);
            };
        };

        /**
         * @method setBonusInfo
         */
        this.setBonusInfo = function () {
            var trs = this.target.querySelectorAll('tr'),
                bonusName,
                tdName,
                i;

            for (i = 0; i < trs.length; i++) {
                tdName = trs[i].firstElementChild;
                if (tdName && tdName.innerHTML) {
                    bonusName = tdName.innerHTML.
                                    replace(/\s?(\(%\))?:/, '').toLowerCase();
                    if (this.bonus[bonusName]) {
                        tdName.innerHTML = '<span style="cursor: pointer;">' +
                            tdName.innerHTML + '</span>';

                        tdName.firstElementChild.addEventListener('click',
                                this.advSetBonusInfo(bonusName), false);
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var td = general.doc.querySelectorAll('td'),
                i;

            for (i = 0; i < td.length; i++) {
                if (td[i].innerHTML === '<b>Бонусы</b>') {
                    this.target = td[i].parentNode.
                                nextElementSibling.lastElementChild;
                    break;
                }
            }

            if (this.target) {
                this.savecontent = this.target.innerHTML;
                this.setBonusInfo();
            }
        };
    };

    /**
     * @class BuyHightech
     * @constructor
     */
    var BuyHightech = function () {
        /**
         * @method init
         */
        this.init = function () {
            if (/\/shopc\.php/.test(general.loc)) {
                var descrTd = general.doc.querySelectorAll('td[class$=' +
                         '"lightbg"][valign="top"][align="left"]' +
                             '[width="100%"]'),
                    strength,
                    price,
                    id,
                    i;

                for (i = 0; i < descrTd.length; i++) {
                    id = /id=(.+)$/.exec(descrTd[i].parentNode.
                            querySelector('a').href)[1];
                    price = /(\d+) EUN/.exec(descrTd[i].innerHTML)[1];
                    strength = /Прочность:<\/b> (\d+)/i.
                                    exec(descrTd[i].innerHTML)[1];

                    descrTd[i].removeChild(descrTd[i].lastElementChild);
                    descrTd[i].innerHTML += ' <span style="font-weight: ' +
                        'bold; margin-left: 7px;"> Создать объявление: ' +
                        '</span><a target="_blank" style="color: #0000FF;" ' +
                        'href="http://www.ganjawars.ru/market-p.php?' +
                        'stage=2&item_id=' + id + '&action_id=2&p=' + price +
                        '&s=' + strength + '">[Купить]' + '</a> ' +
                        '<a target="_blank" style="color: #990000;" href=' +
                        '"http://www.ganjawars.ru/market-p.php?' +
                        'stage=2&item_id=' + id + '&action_id=1&p=' + price +
                        '&s=' + strength + '">[Продать]</a>';
                }

                return;
            }

            //на странице подачи объявлений
            var param = /&p=(\d+)&s=(\d+)$/.exec(general.loc);
            if (param) {
                general.doc.querySelector('td[colspan="3"][class="wb"]').
                    innerHTML += ' <span style="color: #990000;">' +
                    '[Стоимость в магазине: ' + param[1] + ' EUN]</span>';

                //остров любой
                general.doc.querySelector('select[name="island"]').value = '-1';

                var dur1 = general.doc.
                            querySelector('input[name="durability1"]'),
                    dur2 = general.doc.
                            querySelector('input[name="durability2"]');

                //если продаем, то прочность максимальная,
                //если покупаем, то минимальная
                if (/action_id=1/.test(general.loc)) {
                    dur1.value = param[2];
                    dur2.value = param[2];
                } else {
                    dur1.value = '0';
                    dur2.value = '1';
                }

                // срок размещения 3 дня
                general.doc.
                    querySelector('select[name="date_len"]').value = '3';
            }
        };
    };

    /**
     * @class NewsAndInvit
     * @constructor
     */
    var NewsAndInvit = function () {
        /**
         * @method isForumPage
         * @return   {Boolean}
         */
        this.isForumPage = function () {
            return (/fid=1&tid=\d+/.test(general.loc));
        };

        /**
         * @method blink
         * @param   {Object}    link
         */
        this.blink = function (link) {
            link.style.color = '#FF0000';
            general.root.setInterval(function () {
                link.style.color = link.style.color ? '' : '#FF0000';
            }, 700);
        };

        /**
         * @method getNewsId
         * @param    {String}   link
         * @return   {String}
         */
        this.getNewsId = function (link) {
            return (/&tid=(\d+)/.exec(link))[1];
        };

        /**
         * @method init
         */
        this.init = function () {
            var stData = general.getData(14)[0];
            stData = stData ? JSON.parse(stData) : null;

            var newsId;
            // на форуме новостей
            if (this.isForumPage() && stData) {
                newsId = this.getNewsId(general.loc);
                if (stData[newsId] === '0') {
                    stData[newsId] = '1';
                    general.setData(JSON.stringify(stData), 14);
                }

                return;
            }

            // на главной
            // приглосы
            var invit = general.doc.querySelector('a[href*="/me/?nb=synd"]');
            if (invit) {
                invit.setAttribute('style', 'color: #FF0000; ' +
                        'font-weight: bold;');
            }

            // новости
            var newsLinks = general.doc.querySelectorAll('nobr>' +
                    'a[href*="/messages.php?fid=1&tid="]');

            if (newsLinks.length) {
                var newData = {},
                    i;

                for (i = 0; i < newsLinks.length; i++) {
                    newsId = this.getNewsId(newsLinks[i].href);
                    // storage пустой... записываем все темы как прочитанные
                    if (!stData) {
                        newData[newsId] = '1';
                        continue;
                    }

                    if (!stData[newsId]) {
                        stData[newsId] = '0';
                    }

                    if (stData[newsId] === '0') {
                        this.blink(newsLinks[i]);
                    }

                    newData[newsId] = stData[newsId];
                }

                general.setData(JSON.stringify(newData), 14);
            }
        };
    };

    /**
     * @class DoFilter
     * @constructor
     */
    var DoFilter = function () {
        /**
         * @property selects
         * @type {HTMLSelectElement}
         */
        this.selects = general.doc.querySelectorAll('select[name="item_id"]');

        /**
         * @method setHrefItem
         * @param   {HTMLSelectElement}     sel
         */
        this.setHrefItem = function (sel) {
            var a = sel.nextElementSibling,
                itemId = sel.value;

            if (itemId !== '#') {
                a.href = 'http://www.ganjawars.ru/item.php?item_id=' + itemId;
                a.setAttribute('target', '_blank');
            } else {
                a.href = itemId;
                a.removeAttribute('target');
            }
        };

        /**
         * @method selectChange
         * @param   {HTMLSelectElement}     sel
         */
        this.selectChange = function (sel) {
            var _this = this;

            return function () {
                _this.setHrefItem(sel);
            };
        };

        /**
         * @method findItem
         * @param   {Object}  inp
         */
        this.findItem = function (inp) {
            var i, j;
            for (i = 0; i < this.selects.length; i++) {
                // если текстовое поле пустое(стерто BackSpase'ом),
                // то вернем списки в начальное состояние
                if (!inp.value) {
                    this.selects[i].options[1].selected = true;
                    this.setHrefItem(this.selects[i]);
                    continue;
                }

                // выбираем самый первый пустой option
                this.selects[i].value = '#';
                // прокручиваем весь список и ищем совпадения
                for (j = 0; j < this.selects[i].options.length; j++) {
                    if (this.selects[i].options[j].innerHTML.toLowerCase().
                            indexOf(inp.value.toLowerCase()) !== -1) {
                        this.selects[i].options[j].selected = true;
                    }
                }

                this.setHrefItem(this.selects[i]);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('table+br+center');

            if (!this.selects.length || !this.selects[0].options || !target) {
                return;
            }

            var opt, a, i;
            for (i = 0; i < this.selects.length; i++) {
                //одинаковая длина у всех списков
                this.selects[i].setAttribute('style', 'width: 210px;');

                //добавим пустой елемент в select
                opt = general.doc.createElement('option');
                opt.innerHTML = '&nbsp';
                opt.setAttribute('value', '#');
                this.selects[i].insertBefore(opt,
                        this.selects[i].firstElementChild);
                //выделен первый option (не пустой)
                this.selects[i].options[1].selected = true;

                //добавим ссылки на предметы после селектов
                a = general.doc.createElement('a');
                a.innerHTML = '[?]';
                a.setAttribute('title', 'Страница описания предмета');
                a.setAttribute('style', 'margin-left: 2px; color: #808080; ' +
                        'text-decoration: none;');
                this.selects[i].parentNode.appendChild(a);

                //обработчик 'onchange' при изменении списка выбора
                this.selects[i].addEventListener('change',
                        this.selectChange(this.selects[i]), false);

                //устанавливаем атрибут href ссылки
                this.setHrefItem(this.selects[i]);
            }

            //вставляем текстовое поле ввода
            var divSearch = general.doc.createElement('div');
            divSearch.innerHTML = '<span style="color: #008000; ' +
                'font-weight: bold;">Быстрый поиск:</span> <input ' +
                'id="txtFilter" type="text" size="40" style="margin-bottom: ' +
                '10px;">';
            target.insertBefore(divSearch, target.firstChild);

            var textField = general.doc.querySelector('#txtFilter'),
                _this = this;

            textField.addEventListener('input', function () {
                _this.findItem(textField);
            }, false);
            textField.focus();
        };
    };

    /**
     * @class FilterResOnStat
     * @constructor
     */
    var FilterResOnStat = function () {
        /**
         * @method delSpaces
         * @param   {String}    str
         * @return  {String}
         */
        this.delSpaces = function (str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '').
                replace(/\s,/g, ',').replace(/,\s/g, ',').
                replace(/&nbsp;/g, '').replace(/&amp;/g, '&');
        };

        /**
         * @method init
         */
        this.init = function () {
            var tbl = general.doc.querySelector('table[border="0"]' +
                    '[class="wb"]');

            if (tbl) {
                var res = this.delSpaces(general.getData(15)[0]).split(','),
                    trs = tbl.querySelectorAll('tr'),
                    nameRes,
                    i;

                for (i = 1; i < trs.length; i++) {
                    nameRes = this.delSpaces(/[^\(]+/.exec(trs[i].
                                    firstElementChild.innerHTML)[0]);
                    if (res.indexOf(nameRes) === -1) {
                        trs[i].style.display = 'none';
                    }
                }
            }
        };
    };

    /**
     * @class FilterWarlist1to1
     * @constructor
     */
    var FilterWarlist1to1 = function () {
        /**
         * @property table
         * @type {HTMLTableElement}
         */
        this.table = general.doc.querySelector('table[cellpadding="5"]');

        /**
         * @method sortWeapon
         */
        this.sortWeapon = function () {
            var weapon = general.$('w_name').value.toLowerCase(),
                tr = this.table.querySelectorAll('tr'),
                text,
                i;

            for (i = 0; i < tr.length; i++) {
                if (tr[i].firstElementChild &&
                        (/<b>[^\[]*\[\d+\]/.test(tr[i].innerHTML))) {
                    tr[i].style.display = '';
                    if (weapon) {
                        text = tr[i].firstElementChild.nextElementSibling.
                            innerHTML.toLowerCase();
                        if (text.indexOf(weapon) === -1) {
                            tr[i].style.display = 'none';
                        }
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var filtForm = general.doc.
                    querySelector('form[action="/warlist.php"]');

            if (filtForm && this.table) {
                filtForm = filtForm.cloneNode(false);
                filtForm.setAttribute('style', 'display: inline-block; ' +
                        'margin: 0 10px 0 10px;');

                var hidden1 = general.
                        doc.querySelector('input[name="levelset"]').
                            cloneNode(false),
                    hidden2 = general.doc.
                        querySelector('input[name="war"]').cloneNode(false),
                    s_lmin = general.doc.
                        querySelector('select[name="s_lmin"]').cloneNode(true),
                    s_lmax = general.doc.
                        querySelector('select[name="s_lmax"]').cloneNode(true),
                    s_ltype = general.doc.
                        querySelector('select[name="s_ltype"]').cloneNode(true);

                filtForm.appendChild(hidden1);
                filtForm.appendChild(hidden2);
                filtForm.appendChild(general.doc.createTextNode('от '));
                filtForm.appendChild(s_lmin);
                filtForm.appendChild(general.doc.createTextNode(' до '));
                filtForm.appendChild(s_lmax);
                filtForm.appendChild(general.doc.createTextNode(' тип '));
                filtForm.appendChild(s_ltype);
                var subm = general.doc.createElement('input');
                subm.type = 'submit';
                subm.value = '»';
                filtForm.appendChild(subm);

                var target = general.$('updatetimer').
                                parentNode.firstElementChild;
                target.parentNode.insertBefore(filtForm, target.nextSibling);

                s_lmin.setAttribute('style', 'width: 40px;');
                s_lmax.setAttribute('style', 'width: 40px;');

                var span = general.doc.createElement('span');
                span.innerHTML = 'Название: <input type="text" id="w_name" ' +
                    'style="width: 150px;" value="' + general.getData(16)[0] +
                    '" />';
                target.parentNode.insertBefore(span, filtForm.nextSibling);

                var _this = this;
                general.$('w_name').addEventListener('input', function () {
                    var weapName = this;
                    general.setData(weapName.value, 16);
                    _this.sortWeapon();
                }, false);

                //удаляем нижнюю форму
                this.table.firstElementChild.
                    removeChild(this.table.firstElementChild.lastElementChild);

                this.sortWeapon();
            }
        };
    };

    /**
     * @class FixSkills
     * @constructor
     */
    var FixSkills = function () {
        /**
         * @property skills
         * @type {Array}
         */
        this.skills = [
            ['0', 4], ['1', 8], ['2', 13], ['3', 23], ['4', 36], ['5', 56],
            ['6', 84], ['7', 123], ['8', 176], ['9', 248], ['10', 344],
            ['11', 471], ['12', 637], ['13', 852], ['14', 1128], ['15', 1480],
            ['16', 1926], ['17', 2489], ['18', 3193], ['19', 4070],
            ['20', 5500], ['20/1', 7140], ['20/2', 9270], ['20/3', 12050],
            ['20/4', 15600], ['20/5', 20000], ['20/6', 26300], ['20/7', 34200],
            ['20/8', 45000], ['20/9', 58000]
        ];

        /**
         * @method fixSkills
         * @param   {Array}   nbrs
         */
        this.fixSkills = function (nbrs) {
            var residue,
                font,
                rez,
                x,
                i,
                j;

            for (i = 0; i < nbrs.length; i++) {
                x = /\((\d+.?\d*)\)\s*.*\+\-\d+.?\d*<\/font>/.
                    exec(nbrs[i].innerHTML);

                if (x) {
                    x = parseFloat(x[1]);

                    rez = 0;
                    for (j = 0; j < this.skills.length; j++) {
                        if (x < this.skills[j][1]) {
                            rez = this.skills[j];
                            break;
                        }
                    }

                    if (!rez) {
                        rez = ['20/10'];
                    }

                    font = nbrs[i].querySelectorAll('font');
                    font[0].innerHTML = rez[0];

                    if (rez[1]) {
                        residue = rez[1] - x;
                        //если есть знаки после запятой, то оставляем один
                        residue = residue - Math.floor(residue) ?
                                residue.toFixed(1) : residue.toFixed(0);
                        font[1].innerHTML = '+' + residue;
                    }
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var nobrs;
            if (/\/info\.php\?id=/.test(general.loc)) {
                nobrs = general.doc.querySelector('td[class="txt"]' +
                        '[align="right"][style="font-size:10px"]').
                            parentNode.parentNode.querySelectorAll('nobr');
            } else {
                nobrs = general.doc.querySelector('td[rowspan="2"]' +
                        '[valign="top"][align="center"]>table' +
                        '[cellspacing="0"][cellpadding="0"][border="0"]').
                            querySelectorAll('nobr');
            }

            this.fixSkills(nobrs);
        };
    };

    /**
     * @class FuckTheFarm
     * @constructor
     */
    var FuckTheFarm = function () {
        /**
         * @method init
         */
        this.init = function () {
            var link;

            if (/\/me\//.test(general.loc)) {
                link = general.doc.querySelector('[src$="images.ganjawars.' +
                        'ru/i/home/farm.gif"]').parentNode;
                var lparent = link.parentNode;
                lparent.removeChild(link.previousElementSibling);
                lparent.removeChild(link.nextElementSibling);
                lparent.removeChild(link);
                return;
            }

            link = general.doc.querySelector('a[href*="/info.ach.php?id="]+' +
                    'a[href*="/info.ach.php?id="]').nextSibling;
            while (link.nextSibling) {
                link.parentNode.removeChild(link.nextSibling);
            }
        };
    };

    /**
     * @class HistorySms
     * @constructor
     */
    var HistorySms = function () {
        /**
         * @property nik
         * @type {String|null}
         */
        this.nik = null;
        /**
         * @property uncodeNik
         * @type {String|null}
         */
        this.uncodeNik = null;

        /**
         * @property spanContent
         * @type {Object}
         */
        this.spanContent = general.doc.createElement('span');
        /**
         * @property sms
         * @type {Array}
         */
        this.sms = [];
        /**
         * @property numberSms
         * @type {int}
         */
        this.numberSms = 3;

        /**
         * @method sortMess
         * @return   {int}
         */
        this.sortMess = function () {
            this.sms.sort(function (a, b) {
                var ret;

                if (a.id < b.id) {
                    ret = 1;
                } else if (a.id > b.id) {
                    ret = -1;
                } else {
                    ret = 0;
                }

                return ret;
            });
        };

        /**
         * @method createDivSms
         * @return   {Object}
         */
        this.createDivSms = function () {
            var target = general.doc.
                    querySelector('div[style*="overflow:auto"]'),
                divSms = general.doc.createElement('div');

            divSms.setAttribute('name', 'historySms');
            divSms.setAttribute('style', 'font-size: 8pt; margin-bottom: 7px;');
            target.insertBefore(divSms, target.firstChild);

            return divSms;
        };

        /**
         * @method showOfSyndLinks
         */
        this.showOfSyndLinks = function () {
            var mass = [],
                i;

            for (i = 0; i < this.sms.length; i++) {
                mass.push(this.sms[i].ofSyndLink);
            }

            this.createDivSms().innerHTML = '<span style="color: #FF0000;">' +
                'Ссылки на сообщения, доступные для официальных синдикатов:' +
                '</span><div style="color: #000000;">' +
                mass.reverse().join('<br>') + '</div><hr>';
            general.$('showOfSyndLinks').style.display = 'none';
        };

        /**
         * @method showSms
         */
        this.showSms = function () {
            var i;

            for (i = 0; i < this.sms.length; i++) {
                this.createDivSms().innerHTML = this.sms[i].mess +
                    (!i ? '<hr>' : '');
            }

            general.$('showOfSyndLinks').style.display = '';
            general.$('counter').innerHTML = '';
            general.$('preloader').style.display = 'none';
            general.$('showHistory').removeAttribute('on');
        };

        /**
         * @method nextAjaxQuery
         * @param    {Boolean}  outbox
         */
        this.nextAjaxQuery = function (outbox) {
            var _this = this;

            general.root.setTimeout(function () {
                _this.showHistory(outbox ? 0 : 1, 0, outbox ? null : 1);
            }, 700);
        };

        /**
         * @method showHistory
         * @param   {int}   id
         * @param   {int}   id1
         * @param   {int}   id2
         */
        this.showHistory = function (id, id1, id2) {
            var counter = general.$('counter'),
                url;

            if (id2 !== null) {
                counter.innerHTML = !id ? 'входящие...' : 'исходящие...';
                url = 'http://www.ganjawars.ru/sms.php?page=' + id +
                    '&page_id1=' + (!id ? id1 : 0) + '&page_id2=' +
                    (id ? id1 : 0) + '&search=' + this.uncodeNik;
            } else {
                if (!id) {
                    this.sortMess();
                }

                counter.innerHTML = (id + 1) + '/' + this.sms.length;
                url = this.sms[id].href;
            }

            var _this = this;
            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                _this.spanContent.innerHTML = xml.responseText;

                if (id2 !== null) {
                    var linksSms = _this.spanContent.
                            querySelectorAll('td[width="100%"]>' +
                                'a[href*="/sms-read.php?type="]'),
                        outbox = id2 === 1;

                    if (!linksSms.length) {
                        _this.nextAjaxQuery(outbox);
                        return;
                    }

                    var color = '<span style="font-weight: bold; color: #' +
                                    (outbox ? '008000' : 'AC4311') + ';">',
                        allCountSms = !outbox ?
                                _this.numberSms : _this.numberSms * 2,
                        i;

                    for (i = 0; i < linksSms.length; i++) {
                        _this.sms.push({
                            id: +(/&id=(\d+)/.exec(linksSms[i].href)[1]),
                            href: linksSms[i].href,
                            mess: color + (outbox ? 'Я' : _this.nik),
                            ofSyndLink: ''
                        });

                        if ((allCountSms === _this.sms.length) ||
                                // последняя ссылка на странице,
                                // но ссылок меньше 30 => больше страниц нет
                                // (по 30 сообщений на одной странице)
                                (i === linksSms.length - 1 &&
                                    linksSms.length < 30)) {
                            _this.nextAjaxQuery(outbox);

                            return;
                        }
                    }

                    general.root.setTimeout(function () {
                        id1++;
                        _this.showHistory(id, id1, id2);
                    }, 700);
                } else {
                    var time = _this.spanContent.querySelector('td[width=' +
                            '"100%"]>a[href*="/info.php?id="]:first-child').
                                nextSibling.nodeValue;

                    _this.sms[id].mess += time + ':</span><br>' +
                        _this.spanContent.querySelector('div[style*=' +
                                '"overflow:auto"]').innerHTML.
                                    replace(/^(\s|<br>)*|(\s|<br>)*$/g, '');
                    _this.sms[id].ofSyndLink = _this.spanContent.
                        querySelector('div[align="center"]>' +
                                'a[href*="/sms-pub.php?type="]').href;

                    id++;
                    if (!_this.sms[id]) {
                        _this.showSms();
                        return;
                    }

                    general.root.setTimeout(function () {
                        _this.showHistory(id, 0, null);
                    }, 700);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.showHistory(id, id1, id2);
                }, 700);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('td[width="100%"]>' +
                    'a[href*="/info.php?id="]:first-child'),
                _this = this;

            target.parentNode.innerHTML += '<span id="showHistory" ' +
                'style="color: #008000; cursor: pointer; margin-left: 10px;">' +
                'История</span> <input id="countSms" type="text" ' +
                'maxlength="5" style="width: 45px;" value="' + this.numberSms +
                '" title="Количество исходящих сообщений" /> ' +
                '<span id="preloader" style="margin: 0 10px 0 10px; ' +
                'display: none;"><img src="' + general.imgPath +
                'preloader.gif" /></span><span id="counter"></span>' +
                '<span id="showOfSyndLinks" style="cursor: pointer; ' +
                'display: none; text-decoration: underline;">ссылки</span>';

            general.$('showOfSyndLinks').addEventListener('click', function () {
                _this.showOfSyndLinks();
            }, false);

            general.$('countSms').addEventListener('keypress', function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13) {
                    general.$('showHistory').click();
                }
            }, false);

            this.nik = target.querySelector('b').innerHTML;
            this.uncodeNik = new UrlEncode().init(this.nik);

            general.$('showHistory').addEventListener('click', function () {
                var lnk = this;
                if (lnk.getAttribute('on')) {
                    return;
                }

                _this.numberSms = +general.$('countSms').value;
                if (isNaN(_this.numberSms) || _this.numberSms < 1) {
                    alert('Не верно введено количество исходящих сообщений');
                    return;
                }

                lnk.setAttribute('on', '1');
                // удаляем уже выведенные сообщения
                var divHistory = general.doc.
                        querySelectorAll('div[name="historySms"]'),
                    i;

                for (i = 0; i < divHistory.length; i++) {
                    divHistory[i].parentNode.removeChild(divHistory[i]);
                }

                _this.sms = [];
                general.$('preloader').style.display = '';
                general.$('showOfSyndLinks').style.display = 'none';
                _this.showHistory(0, 0, 0);
            }, false);
        };
    };

    /**
     * @class LinksToHighTech
     * @constructor
     */
    var LinksToHighTech = function () {
        /**
         * @property highTechItems
         * @type {Object}
         */
        this.highTechItems = {
            'htGroup': ['auto', 'heavy', 'sniper', 'ppguns', 'shotguns',
                    'grl', 'armour', 'helmets', 'boots', 'masks', 'wear',
                    'phones', 'drugs', 'transport'],
            'sniper': 'snipe',
            'phones': 'misc'
        };

        /**
         * @method init
         */
        this.init = function () {
            var links = general.doc.
                    querySelector('td[valign="top"][width="200"]').
                        querySelectorAll('a[href*="/shop.php?shop=shop_"]'),
                group,
                i;

            for (i = 0; i < links.length; i++) {
                if (links[i].innerHTML) {
                    group = /\?shop=shop_(.*)$/.exec(links[i].href)[1];
                    if (this.highTechItems.htGroup.indexOf(group) !== -1) {
                        links[i].parentNode.innerHTML = '<a ' +
                            'href="/shopc.php?shop=shop_' +
                            (this.highTechItems[group] || group) +
                            '_c" style="color: #AC4311; margin-right: 5px;">' +
                            '[Ht]</a>' + links[i].parentNode.innerHTML;
                    }
                }
            }
        };
    };

    /**
     * @class GameMania
     * @constructor
     */
    var GameMania = function () {
        /**
         * @property target
         * @type {HTMLTableCellElement}
         */
        this.target = general.doc.querySelector('a[href*="/info.ach.php?id="]' +
                '+br+a[href*="/ferma.php?id="]').parentNode.nextElementSibling;
        /**
         * @property total
         * @type {int}
         */
        this.total = 0;

        /**
         * @method calc
         * @param   {Object}    reg1
         * @param   {Object}    reg2
         * @return  {int}
         */
        this.calc = function (reg1, reg2) {
            var spent = reg1.test(this.target.innerHTML) ?
                        +reg1.exec(this.target.innerHTML)[1].
                            replace(/,/g, '') : 0,
                prize = reg2.test(this.target.innerHTML) ?
                        +reg2.exec(this.target.innerHTML)[1].
                            replace(/,/g, '') : 0,
                rez = prize - spent;

            if (!rez) {
                return 0;
            }

            this.total += rez;
            return rez;
        };

        /**
         * @method getStrGameRez
         * @param   {int}       rez
         * @param   {String}    game
         * @param   {Boolean}   ttl
         * @return  {String}
         */
        this.getStrGameRez = function (rez, game, ttl) {
            return '<tr><td style="' +
                (!ttl ? 'color: #008000' : 'font-weight: bold') + ';">' +
                game + ':</td>' + '<td style="color: #' +
                (rez < 0 ? '0000FF' : 'FF0000') + ';">$' +
                new SetPoints().init(rez, ',') + '</td></tr>';
        };

        /**
         * @method init
         */
        this.init = function () {
            var roul = this.calc(/Потрачено в казино: <b>\$([^<]*)/i,
                    /Выигрыш в казино: <b>\$([^<]*)/i),
                tot = this.calc(/Потрачено в тотализаторе: <b>\$([^<]*)/i,
                    /Выигрыш в тотализаторе: <b>\$([^<]*)/i),
                poker = this.calc(/Потрачено на покер:\s?<b>[^\$]*\$([^<]*)/i,
                    /Получено с покера:\s?<b>[^\$]*\$([^<]*)/i),
                fight = /Выигрыш в боях/i.test(this.target.innerHTML);

            if (roul || tot || poker || fight) {
                if (fight) {
                    this.total += +(/Выигрыш в боях: <b>\$([^<]*)/i.
                            exec(this.target.innerHTML)[1].replace(/,/g, ''));
                }

                var str = '<hr><table>';
                if (roul) {
                    str += this.getStrGameRez(roul, 'Рулетка', false);
                }

                if (tot) {
                    str += this.getStrGameRez(tot, 'Тотализатор', false);
                }

                if (poker) {
                    str += this.getStrGameRez(poker, 'Покер', false);
                }

                str += this.getStrGameRez(this.total, 'Всего', true);

                if (fight) {
                    str += '<tr><td colspan="2" style="font-size: 10px;">' +
                        '(с учетом выигрыша в боях)</td></tr>';
                }

                str += '</table>';

                var div = general.doc.createElement('div');
                div.innerHTML = str;
                this.target.appendChild(div);
            }
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
            mass[1] = /^(\d+)/.exec(obj.querySelector('td[colspan="5"]' +
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
            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
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
            var stData = general.getData(17),
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
            var stData = general.getData(17),
                stInd = sel.id === 'selectIsland' ? 0 :
                            (sel.id === 'selectObject' ? 1 : 2),
                val = sel.value;

            stData[stInd] = stInd !== 2 ? (val === '0' ? '' : val) :
                    (val === 'all' ? '' : val);
            general.setData(stData, 17);
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

            var stData = general.getData(17),
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

    /**
     * @class SortSyndOnline
     * @constructor
     */
    var SortSyndOnline = function () {
        /**
         * @property trs
         * @type {Array|null}
         */
        this.trs = null;

        /**
         * @property prnt
         * @type {Object|null}
         */
        this.prnt = null;

        /**
         * @method createTitle
         * @param    {String}   str
         * @return   {Node}
         */
        this.createTitle = function (str) {
            var tr = general.doc.createElement('tr');
            tr.innerHTML = '<td colspan="5" class="wb" ' +
                'bgcolor="#D0EED0" style="text-align: ' +
                'center;"><span style="font-weight: bold;">' +
                str + '</span></td>';

            return tr;
        };

        /**
         * @method getTrs
         * @param   {Object}    obj
         */
        this.getTrs = function (obj) {
            var tbl = obj.querySelector('center+br+table');
            return tbl ? tbl.querySelectorAll('tr') : [];
        };

        /**
         * @method getUnionOnline
         * @param    {String}   URL
         */
        this.getUnionOnline = function (URL) {
            var url = URL || general.loc + '&page=politics',
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                if (/politics/.test(url)) {
                    var unionLink = spanContent.
                        querySelector('td>br:first-child+b+' +
                            'a[href*="/syndicate.php?id="]');
                    if (unionLink) {
                        general.root.setTimeout(function () {
                            _this.getUnionOnline(unionLink + '&page=online');
                        }, 700);
                    } else if (general.getData(18)[2]) {
                        _this.sortBattles();
                    }
                } else {
                    var trs = _this.getTrs(spanContent);
                    if (trs.length > 1) {
                        _this.prnt.appendChild(_this.createTitle('Союз'));
                        var i;
                        for (i = 0; i < trs.length; i++) {
                            _this.prnt.appendChild(trs[i]);
                        }
                    }

                    if (general.getData(18)[2]) {
                        _this.trs = _this.getTrs(general.doc);
                        _this.sortBattles();
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getUnionOnline(URL);
                }, 700);
            });
        };

        /**
         * @method sortBattles
         */
        this.sortBattles = function () {
            var reg = /\/warlog\.php\?bid=(\d+)/;
            if (reg.test(this.prnt.innerHTML)) {
                var battles = {},
                    bid,
                    i;

                for (i = 1; i < this.trs.length; i++) {
                    bid = reg.exec(this.trs[i].innerHTML);
                    if (bid) {
                        if (!battles[bid[1]]) {
                            battles[bid[1]] = [];
                        }

                        battles[bid[1]].push(this.trs[i].cloneNode(true));
                        this.prnt.removeChild(this.trs[i]);
                    }
                }

                var before = this.prnt.querySelectorAll('tr')[1],
                    countBattles = 1,
                    btl,
                    tr;

                for (btl in battles) {
                    if (battles.hasOwnProperty(btl)) {
                        tr = this.createTitle('Бой ' + countBattles);
                        this.prnt.insertBefore(tr, before);
                        for (i = 0; i < battles[btl].length; i++) {
                            this.prnt.insertBefore(battles[btl][i],
                                tr.nextElementSibling);
                        }

                        countBattles++;
                    }
                }

                this.prnt.insertBefore(this.createTitle('&nbsp;'), before);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page=online$/.test(general.loc)) {
                this.trs = this.getTrs(general.doc);
                if (!this.trs[0]) {
                    return;
                }

                var stData = general.getData(18);
                this.prnt = this.trs[0].parentNode;

                if (stData[2]) {
                    this.getUnionOnline(null);
                    return;
                }

                if (stData[0]) {
                    this.sortBattles();
                }

                if (stData[1]) {
                    this.getUnionOnline(null);
                }

                general.doc.body.appendChild(general.doc.createElement('br'));
            }
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
    // везде на www.ganjawars.ru
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

        if (/\/sms\.php/.test(general.loc)) {
            if (initScript[8]) {
                try {
                    new DeleteSms().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/sms-read\.php\?type=/.test(general.loc)) {
            if (initScript[26]) {
                try {
                    new HistorySms().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/ferma\.php/.test(general.loc)) {
            if (initScript[9]) {
                try {
                    new FarmExperience().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[11]) {
                try {
                    new ComfortableLinksForFarm().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[13]) {
                try {
                    new AllPlantsOnFarm().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (initScript[10]) {
            try {
                new FarmTimer().init();
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

        if (initScript[5]) {
            try {
                new WorkPostGrenadesBroken().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (/\/me\/|\/npc\.php\?id=/.test(general.loc)) {
            if (initScript[12]) {
                try {
                    new TimeNpc().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\/me\//.test(general.loc)) {
                if (initScript[17]) {
                    try {
                        new GbCounter().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }
            }
        }

        if (initScript[14]) {
            try {
                new GwMenu().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (/\/items\.php/.test(general.loc)) {
            if (initScript[15]) {
                try {
                    new InventoryPlus().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/info.warstats\.php\?id=/.test(general.loc)) {
            if (initScript[16]) {
                try {
                    new CountBattles().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/shopc\.php|\/market-p\.php\?stage=2&item_id=/.
                test(general.loc)) {
            if (initScript[19]) {
                try {
                    new BuyHightech().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/shop\.php/.test(general.loc)) {
            if (initScript[27]) {
                try {
                    new LinksToHighTech().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/me\/|\/messages\.php\?fid=1&tid=/.test(general.loc)) {
            if (initScript[20]) {
                try {
                    new NewsAndInvit().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/market(\-p)?.php/.test(general.loc)) {
            if (initScript[21]) {
                try {
                    new DoFilter().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/stats\.php$/.test(general.loc)) {
            if (initScript[22]) {
                try {
                    new FilterResOnStat().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/me\/|\/info\.php\?id=/.test(general.loc)) {
            if (initScript[24]) {
                try {
                    new FixSkills().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[25]) {
                try {
                    new FuckTheFarm().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\/info\.php\?id=/.test(general.loc)) {
                if (initScript[18]) {
                    try {
                        new BonusInfo().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[28]) {
                    try {
                        new GameMania().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }
            }
        }

        if (/\/info\.realty\.php\?id=2$/.test(general.loc)) {
            if (initScript[29]) {
                try {
                    new GosEnergoAtomFilter().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/syndicate\.php\?id=/.test(general.loc)) {
            if (initScript[30]) {
                try {
                    new SortSyndOnline().init();
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

        if (/(\/b0\/|\/warlog\.php)/.test(general.loc)) {
            if (initScript[7]) {
                try {
                    new CritShotsAndLinksBtlLog().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/warlist\.php/.test(general.loc)) {
            if (initScript[23]) {
                try {
                    new FilterWarlist1to1().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }
    }

}());

