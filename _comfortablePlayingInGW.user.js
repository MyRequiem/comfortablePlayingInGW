// ==UserScript==
// @name            ComfortablePlayingInGW
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Веселые плюшки для ganjawars.ru
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.user.js
// @include         http://www.ganjawars.ru/*
// @include         https://www.ganjawars.ru/*
// @include         *ganjafoto.ru*
// @include         *photos.ganjawars.ru*
// @include         *ganjafile.ru*
// @grant           none
// @license         MIT
// @version         1.95-230418
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==


//     ______                ____           __        __    __
//    / ____/___  ____ ___  / __/___  _____/ /_____ _/ /_  / /__
//   / /   / __ \/ __ `__ \/ /_/ __ \/ ___/ __/ __ `/ __ \/ / _ \
//  / /___/ /_/ / / / / / / __/ /_/ / /  / /_/ /_/ / /_/ / /  __/
//  \____/\____/_/ /_/ /_/_/  \____/_/   \__/\__,_/_.___/_/\___/
//
//      ____  __            _                ____         _______       __
//     / __ \/ /___ ___  __(_)___  ____ _   /  _/___     / ____/ |     / /
//    / /_/ / / __ `/ / / / / __ \/ __ `/   / // __ \   / / __ | | /| / /
//   / ____/ / /_/ / /_/ / / / / / /_/ /  _/ // / / /  / /_/ / | |/ |/ /
//  /_/   /_/\__,_/\__, /_/_/ /_/\__, /  /___/_/ /_/   \____/  |__/|__/
//                /____/        /____/

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, plusplus: true,
    continue: true, devel: true, nomen: true
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
         * @property cons
         * @type {Object}
         */
        this.cons = this.root.console;
        /**
         * @property version
         * @type {String}
         */
        this.version = '1.95-230418';
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
                        [23] - FilterWarlistOne2One
                        [24] - FixSkills
                        [25] - FuckTheFarm
                        [26] - HistorySms
                        [27] - LinksToHighTech
                        [28] - GameMania
                        [29] - GosEnergoAtomFilter
                        [30] - SortSyndOnline
                        [31] - HousHealth
                        [32] - SortSyndWars (удален)
                        [33] - LinksInOne2One
                        [34] - One2OneCallerInfo
                        [35] - MinBetAtRoulette (удален)
                        [36] - PortTimer
                        [37] - PortsAndTerminals
                        [38] - RangeWeapon
                        [39] - RentAndSale
                        [40] - ScanKarma
                        [41] - ScanPers
                        [42] - ShowInitMessOnForum
                        [43] - SearchUser
                        [44] - SkillCounters
                        [45] - SyndPtsAnalyser
                        [46] - SyndAnalyser
                        [47] - ShowMyAchievements
                        [48] - SyndPersInfo (удален)
                        [49] - SyndOnlineOnMainPage
                        [50] - TimeKarma
                        [51] - ImgPokemonsOnBattle
                        [52] - SoundSyndBattle
                        [53] - AdvForum
                        [54] - DelAndAddBlackSms
                        [55] - FilterGeneralFighting (удален)
                        [56] - Regeneration
                        [57] - ProfColor
                        [58] - CurrentQuestOnInfo
                        [59] - CommonBattleFilter */
                        '@||||||||||||||||||||||||||||||||||||||||' +
                        '|||||||||||||||||||' +
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
                        [17] - список выбора врагов (хэш: имя --> номер)
                        [18] - чекбокс "Говорить только левую руку (для БЩ)"
                        [19] - общий навык
                        [20] - навык специалиста
                        [21] - звук при начале боя
                        [22] - звук при начале хода */
                        '@||||||||||||||||||||||' +
                    /*
                    [5]  - BlacklistHighlighting
                        [0]  - ID персов из ЧС ('id1,id2,...')
                        [1]  - блокировать ссылку принятия боя в одиночках? */
                        '@|' +
                    /*
                    [6]  - WorkPostGrenadesBroken
                        [0]  - звук при получении почты/посылки (проигран, нет)
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
                                (не используется с версии 1.82)
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
                     [16] - FilterWarlistOne2One
                        [0] - название оружия */
                        '@' +
                    /*
                     [17] - GosEnergoAtomFilter
                        [0] - остров ('' - любой, 'Z', 'G')
                        [1] - тип объекта ('' - любой, '1' - эски, '2' - уранки,
                                '3' - уранки [2], '4' - уранки [3])
                        [2] - синдикат ('', '0' - ничейки, 'xxx' - ID синда) */
                        '@' +
                    /*
                     [18] - SortSyndOnline (настройки удалены с версии 1.84)
                        [0] - сортировать по боям
                        [1] - показывать онлайн союза
                        [2] - сортировать вместе с союзом */
                        '@||' +
                    /*
                     [19] - HousHealth
                        [0] - вышел из боя */
                        '@' +
                    /*
                     [20] - CommonBattleFilter
                        [0] - максимальный уровень
                        [1] - чекбокс "без именных"
                        [2] - чекбокс "по  мощности" */
                        '@0|1|1' +
                    /*
                     [21] - One2OneCallerInfo
                        [0] - звук при вызове */
                        '@' +
                    /*
                     [22] - PortTimer
                        [0] - '{
                            date: "",
                            syndid: "",
                            time: [],
                            current: ""}' */
                        '@' +
                    /*
                     [23] - ScanKarma
                        [0] - текущая карма 'xx/xx' */
                        '@' +
                    /*
                     [24] - ScanPers
                        [0] - ник перса
                        [1] - id синда
                        [2] - чекбокс звук
                        [3] - чекбокс сообщение
                        [4] - id звука при входе
                        [5] - id звука при выходе
                        [6] - id перса
                        [7] - звук(сообщение) проигран или нет
                        [8] - интервал сканирования (сек, не менее 20) */
                        '@||||||||' +
                    /*
                     [25] - SkillCounters
                        [0] - боевой
                        [1] - эконом
                        [2] - производ
                        [3] - пистолеты
                        [4] - гранаты
                        [5] - автоматы
                        [6] - пулеметы
                        [7] - дробовики
                        [8] - снайперки
                        [9] - синдикатный уровень
                        [10] - время последнего сброса */
                        '@||||||||||' +
                    /*
                     [26] - ShowMyAchievements
                        [0] - номера ачивок '1,14,35...' */
                        '@' +
                    /*
                     [27] - TimeKarma
                        [0] - время, когда выставили карму */
                        '@' +
                    /*
                     [28] - SoundSyndBattle
                        [0] - время до боя, когда будет проигран второй звук
                        [1] - звук №1
                        [2] - звук №2
                        [3] - флаги проигрывани звука ('', '1', '2') */
                        '@|||' +
                    /*
                     [29] - AdvForum
                        [0] - отмечать закрытые темы
                        [1] - звук при появлении новой темы
                        [2] - интервал перезагрузки страниц с темами форума
                        [3] - не показывать закрытые темы
                        [4] - не показывать прикрепленки
                        [5] - ветки, где скрипт работать не будет
                        [6] - список включения/отключения показа форумов
                        [7] - данные веток форума:
                          {
                              'fid': {
                                  'tid': {
                                      d: str  // дата первого просмотра темы
                                      l: str  // id последнего сообщения
                                      с: str  // номер последнего сообщения
                                  },
                                  ...
                              },
                              ...
                          }
                        [8] - {'fid': id_последней темы, ...} */
                        '@1|||||1,5,7,11,15,24,30,34,35,36,37,41,42,44,46,47,' +
                        '48,54|1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,' +
                        '1,1,1|{}|{}' +
                    /*
                     [30] - FilterGeneralFighting (удален)
                        [0]  - минимальный уровень
                        [1]  - максимальный уровень
                        [2]  - командные
                        [3]  - случайные
                        [4]  - DM
                        [5]  - без DM
                        [6]  - без синдовых
                        [7]  - только синдовые
                        [8]  - показывать умения
                        [9]  - показывать дальность
                        [10] - нужная дальность
                        [11] - время до боя (сек) */
                        '@5|50||||||||||' +
                    /*
                    [31] - Regeneration
                        [0] - номер звука при 80%
                        [1] - номер звука при 100%
                        [2] - текущее состояние:
                                '' : пустое
                                '1': получили 80%
                                '2': получили 100%
                                '3': получили 80%, но еще не получили 100%
                                '4': финиш
                    */
                        '@||';

        /**
         * @property myID
         * @type {RegExpExecArray}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie);
        /**
         * @property DESIGN_VERSION
         * @type {RegExpExecArray}
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
     * @class GetStrDate
     * @constructor
     */
    var GetStrDate = function () {
        /**
         * @method init
         * @param   {int|String}    time
         * @return  {String}
         */
        this.init = function (time) {
            var date = time === 'now' ? new Date() : new Date(time),
                month = date.getMonth() + 1,
                day = date.getDate();

            return (day < 10 ? '0' + day : day) +  '.' +
                        (month < 10 ? '0' + month : month) + '.' +
                            (/20(\d+)/.exec(date.getFullYear().toString())[1]);
        };
    };

    /**
     * @class GetTimestamp
     * @constructor
     */
    var GetTimestamp = function () {
        /**
         * @method init
         * @param   {String}    val
         * @return  {int}
         */
        this.init = function (val) {
            var date = /(\d\d)\.(\d\d)\.(\d\d)/.exec(val);

            if (!date) {
                return 0;
            }

            var d = +date[1],
                m = +date[2],
                y = +date[3];

            if (!d || d > 31 || !m || m > 12 || !y || y < 9 || y > 20) {
                return 0;
            }

            return new Date(2000 + y, m - 1, d).getTime();
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

            return general.doc.
                querySelector('td.txt[align="left"] nobr:first-child');
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
                // noinspection JSUnresolvedVariable
                var settingsButton = general.doc.createElement('a'),
                    target = topPanel.parentNode.nextElementSibling;

                target = target.firstElementChild || target;
                settingsButton.innerHTML = '<img src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" width="15" height="15" ' +
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
         * @param   {Function|null} onfailure
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
                xmlHttpRequest.setRequestHeader('Content-length',
                    param.length.toString());
                xmlHttpRequest.setRequestHeader('Connection', 'close');
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
                        } else if (onfailure) {
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
     * @class ShowMainSettings
     * @constructor
     */
    var ShowMainSettings = function () {
        /**
         * @property getSelectSound
         * @type {Function}
         */
        this.getSelectSound = new GetSelectSound().init;

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
                ['Таймер выздоровления', 'Таймер выздоровления персонажа ' +
                    'на главной странице.<br>' +
                    this.getSelectSound('sound80HP') +
                    ' звук при достижении 80% HP<br>' +
                    this.getSelectSound('sound100HP') +
                    ' звук при достижении 100% HP' +
                    this.getGitHubLink('regeneration') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=73295" ' +
                    'style="font-weight: bold;" target="_blank">W_or_M' +
                    '</a></span>', '56'],
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
                    this.getSelectSound('soundSms') + '<br>Звук ' +
                    '"Пора работать": &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '&nbsp;&nbsp;&nbsp;' + this.getSelectSound('soundWork') +
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
                ['Подтверждение нажатия "Удалить и забанить"', 'Красит ' +
                    'кнопку "Удалить и забанить" при просмотре личных ' +
                    'сообщений в розовый цвет. При нажатии требует ' +
                    'подтверждения операции.' +
                    this.getGitHubLink('delAndAddBlackSms'), '54'],
                ['Таймер для выполнения квестов NPC', 'На главной странице ' +
                    'выводит время, оставшееся до взятия квеста и сcылку на ' +
                    'NPC, у которого в последний раз брали квест. Звуковое ' +
                    'оповещение. Умеет выводить список NPC с информацией ' +
                    'о них для каждого острова.<br>Звук "Пора делать ' +
                    'квест": ' + this.getSelectSound('soundTimerNPC') +
                    this.getGitHubLink('timeNpc'), '12'],
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
                    this.getGitHubLink('gameMania'), '28'],
                ['Порты и терминалы', 'Показывает на карте местонахождение ' +
                    'терминалов и портов.' +
                    this.getGitHubLink('portsAndTerminals'), '37'],
                ['Дальность оружия', 'Добавляет дальность оружия на странице ' +
                    'информации любого персонажа.' +
                    this.getGitHubLink('rangeWeapon'), '38'],
                ['Изменение Вашей кармы', 'При изменении Вашей кармы выводит ' +
                    'сообщение на странице информации персонажа.' +
                    this.getGitHubLink('scanKarma'), '40'],
                ['Извещения о входе персонажа в игру', 'Выдает сообщение ' +
                    'и/или звуковой сигнал при появлении (или выходе) в ' +
                    'онлайне определенного персонажа.' +
                    this.getGitHubLink('scanPers'), '41'],
                ['Поиск персонажа', 'Добавляет форму поиска персонажа.' +
                    this.getGitHubLink('searchUser'), '43'],
                ['Счетчики опыта и умений', 'Счетчики опыта и умений на ' +
                    'главной странице персонажа.' +
                    this.getGitHubLink('skillCounters'), '44'],
                ['Быстрый просмотр Ваших достижений', 'Добавляет ссылку ' +
                    '"Достижения" в верхней части страниц игры при нажатии ' +
                    'на которую выводятся Ваши ачивки, но только те, ' +
                    'которые были отмечены на <a target="_blank" ' +
                    'href="http://www.ganjawars.ru/info.ach.php?id=' +
                    general.myID + '">странице достижений</a>.' +
                    this.getGitHubLink('showMyAchievements') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=134292" ' +
                    'style="font-weight: bold;" target="_blank">Горыныч' +
                    '</a></span>', '47'],
                ['Время до возможности выставить карму', 'На странице ' +
                    'информации персонажа показывает динамический счетчик ' +
                    'времени до возможности поставить карму.' +
                    this.getGitHubLink('timeKarma'), '50'],
                ['Подсветка профессий', 'При наличии у персонажа лицензии ' +
                    'киллера, боевика или наемника название профессии на его ' +
                    'странице информации окрашивается в красный цвет.' +
                    this.getGitHubLink('profColor'), '57'],
                ['Текущий мини-квест на странице информации персонажа',
                    'Вывод текущего ужедневного мини-квеста на странице ' +
                    'информации персонажа.' +
                    this.getGitHubLink('currentQuestOnInfo') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=54662" ' +
                    'style="font-weight: bold;" target="_blank">kaa</a>' +
                    '</span>', '58']],

            'Бои': [
                ['Дополнение для боев', 'Генератор ходов, ' +
                    'расширенная информация в списке выбора противника, ' +
                    'сортировка списка, ДЦ, продвинутое расположение бойцов ' +
                    'на поле боя как в бою, так и в режиме наблюдения за ' +
                    'боем, полный лог боя в НЕ JS-версии, кнопка ' +
                    '"Сказать ход", быстрая вставка ника в поле чата. ' +
                    'Информация вверху страницы боя о набитом HP, ' +
                    'вашем здоровье и т.д. При щелчке на картинке противника ' +
                    'происходит его выбор в качестве цели. Кнопка "Обновить" ' +
                    'на поле боя. В JS-версии боя подсвечивает зеленым ' +
                    'цветом тех персонажей, которые уже сделали ход. В обоих ' +
                    'версиях выводит количество персонажей, сделавших ход.' +
                    '<br><br><span style="color: #FF0000;">Не ставьте ' +
                    'значения менее 3 секунд.</span><br>Таймаут обновления ' +
                    'данных в бою:<span style="margin-left: 54px;"> ' +
                    '</span><input id="refreshBattle" maxlength="3" ' +
                    'style="width: 30px;" value="' +
                    (general.getData(4)[0] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)<br>Таймаут обновления ' +
                    'заявки при входе в нее: <input id="refreshAppl" ' +
                    'maxlength="3" style="width: 30px;" value="' +
                    (general.getData(4)[1] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)<br>' +
                    'Звук при начале боя:&nbsp;&nbsp;&nbsp;&nbsp;' +
                    this.getSelectSound('advBattleSound1') + '<br>' +
                    'Звук при начале хода:&nbsp;&nbsp;' +
                    this.getSelectSound('advBattleSound2') +
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
                ['Счетчик времени до начала синдикатного боя', 'Динамический ' +
                    'счетчик времени до начала синдикатного боя, звуковое ' +
                    'оповещение.<br><br><input id="timeSyndSoundLimit" ' +
                    'value="' + (general.getData(28)[0] || '90') +
                    '" maxlength="3" style="width: 35px;" /> - время до боя ' +
                    '(сек), когда будет проигран второй звук ' +
                    '<span style="color: #FF0000;">(не менее 15)</span><br>' +
                    this.getSelectSound('syndSoundBattle1') + ' - звук, если ' +
                    'осталось более <span name="sptssl"></span> сек<br>' +
                    this.getSelectSound('syndSoundBattle2') + ' - звук, если ' +
                    'осталось менее <span name="sptssl"></span> сек' +
                    this.getGitHubLink('soundSyndBattle'), '52'],
                ['Фильтр общих боев', 'Фильтр общих боев по уровню бойцов.' +
                    this.getGitHubLink('commonBattleFilter'), 59],
                ['Фильтр по оружию в одиночных заявках', 'Фильтр по оружию в ' +
                    'одиночых заявках. Фильтр по уровням и типу оружия, ' +
                    'встроенный в игре, переносится вверх страницы. Все ' +
                    'настройки находятся на <a target="_blank" ' +
                    'href="http://www.ganjawars.ru/warlist.php?war=armed">' +
                    'странице одиночных заявок</a>' +
                    this.getGitHubLink('filterWarlistOne2One'), '23'],
                ['Ссылки на странице одиночных заявок', 'На странице ' +
                    'заявок одиночных боев делает ники вызывающих на бой ' +
                    'персонажей ссылками на них.' +
                    this.getGitHubLink('linksInOne2One'), '33'],
                ['Информация о вызывающем Вас на бой персонаже в одиночных ' +
                    'боях', 'Выводит информацию о  вызывающем Вас на бой ' +
                    'персонаже в одиночных боях (HP, дальность оружия, ' +
                    'умения, ссылки-изображения на экипировку, бонусы). ' +
                    'Звуковое оповещение при вызове.<br><br>Звук при вызове: ' +
                    this.getSelectSound('soundOne2One') +
                    this.getGitHubLink('one2OneCallerInfo'), '34'],
                ['Контроль Уранa и ЭC', 'Сортировка объектов по типу, ' +
                    'островам и контролирующим синдикатам на странице ' +
                    '<a target="_blank" href="http://www.ganjawars.ru/' +
                    'info.realty.php?id=2">ГосЭнегоАтом</a>' +
                    this.getGitHubLink('gosEnergoAtomFilter'), '29'],
                ['Проверка сектора после боя', 'Выводит сообщение после боя, ' +
                    'если персонаж находится не в секторе со своим домом и ' +
                    'его здоровье менее 80%.' +
                    this.getGitHubLink('housHealth'), '31'],
                ['Изображения покемонов', 'В боях с покемонами и в режиме ' +
                    'наблюдения за боем (Ejection Point, Overlord Point, ' +
                    'прибрежная зона) показывает изображения для каждого ' +
                    'пока.' + this.getGitHubLink('imgPokemonsOnBattle') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=436429" ' +
                    'style="font-weight: bold;" target="_blank">Buger_man</a>' +
                    '</span>', '51'],
                ['Таймер для боев за порты', 'Вывод точного/оставшегося ' +
                    'времени до боя за порт в верхней части страницы.' +
                    this.getGitHubLink('portTimer') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=205482" ' +
                    'style="font-weight: bold;" target="_blank">Enemy333</a>' +
                    '</span>', '36']],

            'Синдикаты': [
                ['Сортировка на странице онлайна синдиката', 'Сортировка ' +
                    'онлайна синдиката и союза по идущим боям. Выделение ' +
                    'синдикатных боев.' +
                    this.getGitHubLink('sortSyndOnline'), '30'],
                ['Анализ активности синдиката', 'Анализ активности ' +
                    'синдиката. Рейтинг нападающих, баланс Гб и PTS ' +
                    'контролируемой недвижимости, кто и сколько взял/положил ' +
                    'Гб на счет синдиката, изменения состава.' +
                    this.getGitHubLink('syndAnalyser'), '46'],
                ['Анализ расхода PTS', 'Анализ расхода PTS синдиката. ' +
                    'Сортировка данных по купленным гранатам, чипам, ' +
                    'выданным званиям и знакам, общему количеству PTS.' +
                    this.getGitHubLink('syndPtsAnalyser'), '45'],
                ['Онлайн основного синдиката и союза на главной странице',
                    'На главной странице персонажа добавляет ссылки на его ' +
                    'основной синдикат и союз (если есть), при нажатии на ' +
                    'которые выводится онлайн синдиката со ссылками отправки ' +
                    'сообщения каждому бойцу. Если персонаж в бою, то ссылка ' +
                    'красного цвета. Так же добавляются конвертики для ' +
                    'отправки сообщений в разделах "Мои друзья" и "Гости".' +
                    this.getGitHubLink('syndOnlineOnMainPage'), '49']],

            'Форум': [
                ['Отображение сообщения, на которое отвечают', 'В ответе на ' +
                    'сообщение показывает то сообщение, на которое ' +
                    'отвечают.' + this.getGitHubLink('showInitMessOnForum'),
                    '42'],
                ['Отметки сообщений на форуме и другое.', 'Звуковые и ' +
                    'визуальные оповещения при появлении новых тем или смене ' +
                    'верхней темы, новых сообщений в темах, скрытие закрытых ' +
                    'тем и прикрепленок, отметка закрытых тем, скрытие ' +
                    'ненужных веток форума.' +
                    this.getGitHubLink('advForum'), '53']],

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
                ['Фильтр ресурсов на странице экономической статистики',
                    'Фильтр ресурсов на <a target="_blank" ' +
                    'href="http://www.ganjawars.ru/stats.php">странице ' +
                    'экономической статистики</a><br><br>Введите ' +
                    'названия ресурсов через запятую, которые будут ' +
                    'отображаться на вышеуказанной странице. Например: ' +
                    'Уран,Водоросли,Маковая соломка,Трава,Батареи<br>' +
                    '<input id="filter_res" style="width: 350px;" disabled />' +
                    this.getGitHubLink('filterResOnStat'), '22'],
                ['Ссылки на High-tech вооружение в государственном магазине',
                    'В государственном магазине рядом со ссылками на типы ' +
                    'вооружения добавляет ссылки на вооружение High-tech' +
                    this.getGitHubLink('linksToHighTech') +
                    '<span style="margin-left: 15px;">идея: ' +
                    '<a href="http://www.ganjawars.ru/info.php?id=436429" ' +
                    'style="font-weight: bold;" target="_blank">Buger_man' +
                    '</a></span>', '27'],
                ['Форма аренды и продажи', 'При передаче предмета в аренду ' +
                    'форма передачи выделяется голубым цветом. Если предмет ' +
                    'продается или передается в постоянное пользование, то ' +
                    'красным. Если указана нулевая цена, выводится сообщение ' +
                    'с подтверждением продолжения операции.' +
                    this.getGitHubLink('rentAndSale'), '39']],

            'Ферма': [
                ['Производственный опыт и прибыль', 'Отображение ' +
                    'производственного опыта и прибыли в Гб за один час для ' +
                    'каждого растения.' +
                    this.getGitHubLink('farmExperience'), '9'],
                ['Таймер', 'Таймер для фермы. Звуковое оповещение когда ' +
                    'пора полить/собрать.<br><br>' +
                    this.getSelectSound('farmTmSound') + ' - звук когда пора ' +
                    'поливать/собирать (0 - без звука)<br>' +
                    '<input id="farmtmSndIntrvl" maxlength="3" ' +
                    'style="width: 40px;" disabled /> - интервал повторения ' +
                    'звука в секундах (0 - не повторять)' +
                    this.getGitHubLink('farmTimer'), '10'],
                ['Удобные ссылки на ферме', 'Удобные ссылки для полива, ' +
                    'сбора, вскапывания, посадки на ферме.' +
                    this.getGitHubLink('comfortableLinksForFarm'), '11'],
                ['Все растения на одной странице, счетчики', 'Счетчик гб и ' +
                    'производственного опыта на ферме. Для каждого растения ' +
                    'присутствует изображение, производственный опыт и ' +
                    'прибыль (общие и в 1 час), цена, время созревания в ' +
                    'минутах и часах.<br><br>' +
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
            var url = 'http://www.ganjawars.ru/info.php?id=2095458';
            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var ver = /cpingw:(\d+\.\d+\-\d+)/.exec(xml.responseText);
                if (ver && ver[1] !== general.version) {
                    general.$('linkNewVerScript').style.
                        visibility = 'visible';
                    general.$('refreshVer').innerHTML = '(' + ver[1] + ')';
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
                gwImgUrl = 'http://images.ganjawars.ru/i/home/',
                str = '<table style="width: 100%; box-shadow: 8px 10px 7px ' +
                    'rgba(122,122,122,0.5);"><tr><td ' + tdStyle +
                    '<table style="width: 100%;"><tr><td style="width: 23%;">' +
                    '<span style="color: #8C5B07; font-weight: bold;">' +
                    'Настройки:</span><img id="imgSaveSettings" ' +
                    'style="margin-left: 5px; cursor: pointer;" ' +
                    'src="' + gwImgUrl + 'ganjafile.gif" title="Сохранить" ' +
                    'alt="Сохранить" /><img id="imgRestoreSettings" ' +
                    'style="cursor: pointer; margin-left: 5px;" ' +
                    'src="' + gwImgUrl + 'cashlog.gif" title="Восстановить" ' +
                    'alt="Восстановить" /><img id="imgResetSettings" ' +
                    'style="cursor: pointer; margin-left: 5px;" ' +
                    'src="' + gwImgUrl + 'questlog.gif" title="Сбросить" ' +
                    'alt="Сбросить"  /></td>' +
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
                    'MyRequiem©</span></a> ' + general.version +
                    '<a target="_blank" title="История изменений" ' +
                    'href="https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/ChangeLog.txt" ' +
                    'style="text-decoration: none; margin: 0 5px 0 3px;">' +
                    '<img src="' + gwImgUrl + 'wlog.gif" border="0" ' +
                    'width="12" height="10" tile="Лог" alt="Лог" /></a></td>' +
                    '</tr><tr id="trRestoreSettings" style="display: none;">' +
                    '<td colspan="3"><span style="color: #C00000;">' +
                    'Восстановление настроек. Вставьте ранее сохраненную ' +
                    'строку настроек и нажмите "Восстановить"</span>:' +
                    '<br><input id="inpRestoreSettings" ' +
                    'style="width: 97%;" /><br>' +
                    '<input id="butRestoreSettings" type="button" ' +
                    'value="Восстановить" /></td></tr>' +
                    '<tr id="trSaveSettings" style="display: none;">' +
                    '<td colspan="3"><span style="color: #C00000;">' +
                    'Выделите &lt;Ctrl+A&gt; и сохраните &lt;Ctrl+C&gt; ' +
                    'содержимое поля для последующего восстановления ' +
                    'настроек</span>:<textarea id="textAreaSaveSettings" ' +
                    'cols="90" rows="7" readonly="true" style="resize: none; ' +
                    'width: 100%;"></textarea></td></tr></table></td></tr>',
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

            general.$('imgRestoreSettings').addEventListener('click',
                function () {
                    var trRestoreSettings = general.$('trRestoreSettings'),
                        trSaveSettings = general.$('trSaveSettings');

                    if (!trSaveSettings.style.display) {
                        trSaveSettings.style.display = 'none';
                    }

                    trRestoreSettings.style.display = trRestoreSettings.
                        style.display ? '' : 'none';
                }, false);

            general.$('imgSaveSettings').addEventListener('click', function () {
                var trSaveSettings = general.$('trSaveSettings'),
                    trRestoreSettings = general.$('trRestoreSettings');

                if (trSaveSettings.style.display) {
                    trRestoreSettings.style.display = 'none';
                    trSaveSettings.style.display = '';
                    general.$('textAreaSaveSettings').value = general.st.
                        getItem(general.STORAGENAME);
                } else {
                    trSaveSettings.style.display = 'none';
                }
            }, false);

            var butRestoreSettings = general.$('butRestoreSettings'),
                inpRestoreSettings = general.$('inpRestoreSettings');

            butRestoreSettings.addEventListener('click', function () {
                var val = inpRestoreSettings.value;
                if (!val) {
                    alert('Введите строку настроек');
                    return;
                }

                general.st.setItem(general.STORAGENAME, val);
                general.root.location.reload();
            }, false);

            inpRestoreSettings.addEventListener('keypress', function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13 || ev.keyCode === 10) {
                    butRestoreSettings.click();
                }
            }, false);

            general.$('imgResetSettings').addEventListener('click',
                function () {
                    if (confirm('Сброс настроек !!!\nВы уверены ???')) {
                        general.st.removeItem(general.STORAGENAME);
                        general.root.location.reload();
                    }
                }, false);

            // AdvBattleAll
            // обработчики текстовых полей модуля дополнений для боев
            general.$('refreshBattle').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);
            general.$('refreshAppl').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);

            var checkInputText = new CheckInputText().init,
                _this = this;

            // выбор звука начала боя и начала хода
            var advBattleSound1 = general.$('advBattleSound1'),
                advBattleSound2 = general.$('advBattleSound2');
            advBattleSound1.value = general.getData(4)[21] || '0';
            advBattleSound1.addEventListener('change', function () {
                _this.modifyData(4, 21, advBattleSound1.value === '0' ?
                        '' : advBattleSound1.value);
            }, false);
            advBattleSound2.value = general.getData(4)[22] || '0';
            advBattleSound2.addEventListener('change', function () {
                _this.modifyData(4, 22, advBattleSound2.value === '0' ?
                        '' : advBattleSound2.value);
            }, false);
            general.$('ladvBattleSound1').
                addEventListener('click', this.testSound, false);
            general.$('ladvBattleSound2').
                addEventListener('click', this.testSound, false);

            // чекбокс настроек подсветки персонажей из черного списка
            // (блокировать или нет ссылку принятия боя в одиночках)
            var chkBL = general.$('blockBLOne2One');
            chkBL.checked = general.getData(5)[1] === '1';
            chkBL.addEventListener('click', function () {
                _this.modifyData(5, 1, chkBL.checked ? '1' : '');
            }, false);

            // работа, слом, грена, почта/посылка
            // кнопки прослушать звук
            general.$('lsoundSms').
                addEventListener('click', this.testSound, false);
            general.$('lsoundWork').
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
            general.$('lfarmTmSound').
                addEventListener('click', this.testSound, false);
            var farmTmSound = general.$('farmTmSound');
            farmTmSound.value = general.getData(9)[4] || '0';
            farmTmSound.addEventListener('change', function () {
                _this.modifyData(9, 4, farmTmSound.value === '0' ?
                        '' : farmTmSound.value);
            }, false);
            var farmTmSoundInterval = general.$('farmtmSndIntrvl');
            farmTmSoundInterval.value = general.getData(9)[5] || '0';
            farmTmSoundInterval.addEventListener('input', function () {
                _this.modifyData(9, 5, checkInputText(farmTmSoundInterval, 0) ?
                        farmTmSoundInterval.value : '60');
            }, false);

            // TimeNpc
            general.$('lsoundTimerNPC').
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

            // One2OneCallerInfo
            general.$('lsoundOne2One').
                addEventListener('click', this.testSound, false);
            var soundOne2One = general.$('soundOne2One');
            soundOne2One.value = general.getData(21)[0] || '0';
            soundOne2One.addEventListener('change', function () {
                _this.modifyData(21, 0, soundOne2One.value === '0' ?
                        '' : soundOne2One.value);
            }, false);

            // SoundSyndBattle
            if (!general.getData(28)[0]) {
                this.modifyData(28, 0, '90');
            }
            var timeSyndSoundLimit = general.$('timeSyndSoundLimit'),
                sptssl = general.doc.querySelectorAll('span[name="sptssl"]');
            sptssl[0].innerHTML = general.getData(28)[0];
            sptssl[1].innerHTML = general.getData(28)[0];
            timeSyndSoundLimit.addEventListener('input', function () {
                _this.modifyData(28, 0, checkInputText(timeSyndSoundLimit, 15) ?
                        timeSyndSoundLimit.value : '90');
                sptssl[0].innerHTML = general.getData(28)[0];
                sptssl[1].innerHTML = general.getData(28)[0];
            }, false);

            var syndSoundBattle1 = general.$('syndSoundBattle1'),
                syndSoundBattle2 = general.$('syndSoundBattle2');
            syndSoundBattle1.value = general.getData(28)[1] || '0';
            syndSoundBattle1.addEventListener('change', function () {
                _this.modifyData(28, 1, syndSoundBattle1.value === '0' ?
                        '' : syndSoundBattle1.value);
            }, false);
            syndSoundBattle2.value = general.getData(28)[2] || '0';
            syndSoundBattle2.addEventListener('change', function () {
                _this.modifyData(28, 2, syndSoundBattle2.value === '0' ?
                        '' : syndSoundBattle2.value);
            }, false);
            general.$('lsyndSoundBattle1').
                addEventListener('click', this.testSound, false);
            general.$('lsyndSoundBattle2').
                addEventListener('click', this.testSound, false);

            // Regeneration
            var sound80HP = general.$('sound80HP'),
                sound100HP = general.$('sound100HP');
            sound80HP.value = general.getData(31)[0] || '0';
            sound80HP.addEventListener('change', function () {
                _this.modifyData(31, 0, sound80HP.value === '0' ?
                        '' : sound80HP.value);
            }, false);
            sound100HP.value = general.getData(31)[1] || '0';
            sound100HP.addEventListener('change', function () {
                _this.modifyData(31, 1, sound100HP.value === '0' ?
                        '' : sound100HP.value);
            }, false);
            general.$('lsound80HP').
                addEventListener('click', this.testSound, false);
            general.$('lsound100HP').
                addEventListener('click', this.testSound, false);
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
         * @param   {Object}   obj
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
         * @param   {Node}  link
         */
        this.addLink = function (link) {
            // добавление в панель
            var target = this.navigPanel.
                    lastElementChild.previousSibling;
            // noinspection JSCheckFunctionSignatures
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
                'maxlength="20" style="width: 237px;" /><br>' +
                'Ссылка:<br><input id="lhref" style="width: 237px;" ' +
                'value="http://"/><br>Стиль, например: "color: blue;"<br>' +
                '<input id="lstyle" style="width: 237px;" />' +
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
                    general.$('islZ').
                        setAttribute('style', this.styleNormal);
                    general.$('islG').
                        setAttribute('style', this.styleNormal);
                    general.$('online').
                        setAttribute('style', this.styleNormal);
                }

                for (i = 3; i < trs.length; i++) {
                    trs[i].style.display = '';
                }

                break;

            case 'island':
                this.setFilter(trs, 'reset', 'flag');
                dataSt[0] = island === 'Z' ? '1' : '2';
                general.setData(dataSt, 3);
                general.$('isl' + island).
                    setAttribute('style', this.styleBold);
                general.$('isl' + (island === 'G' ? 'Z' : 'G')).
                    setAttribute('style', this.styleNormal);

                var tdIsl;
                for (i = 3; i < trs.length; i++) {
                    tdIsl = trs[i].querySelector('td:nth-child(4)');
                    if (tdIsl && tdIsl.innerHTML.indexOf(island) === -1) {
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
                    general.$('online').
                        setAttribute('style', this.styleBold);
                }

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('a[style*="#999999"]') ||
                            trs[i].querySelector('a[style*=' +
                                '"rgb(153, 153, 153)"]')) {
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
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property intervalUpdateInpTextChat
         * @type {int}
         */
        this.intervalUpdateInpTextChat = 0;
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
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property tmRefreshBattle
         * @type {int}
         */
        this.tmRefreshBattle = 0;
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property tmHighlightPers
         * @type {int}
         */
        this.tmHighlightPers = 0;
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property graphTable
         * @type {HTMLTableElement|null}
         */
        this.graphTable = null;
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property checkSound
         * @type {Boolean}
         */
        this.checkSound = true;

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
            dataSt[19] = '';
            dataSt[20] = '';
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

            // общий навык
            var generalSkill = '';
            if (general.doc.querySelector('input[type="checkbox"]' +
                    '[name="apm_activate"]:checked')) {
                dataSt[19] = general.doc.querySelector('label[for="apmid"]').
                    innerHTML;
                generalSkill = ' + ' + dataSt[19];
            }

            // навык специалиста
            var specialSkill = '';
            if (general.doc.querySelector('input[type="checkbox"]' +
                    '[name="aps_activate"]:checked')) {
                dataSt[20] = general.doc.querySelector('label[for="apsid"]').
                    innerHTML;
                specialSkill = ' + ' + dataSt[20];
            }

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
                    ' [' + enemy[2] + ']' + generalSkill + specialSkill;
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
            // правая рука (если не установлен чекбокс
            // "Говорить только левую руку (для БЩ)")
            if (dataSt[13] && !dataSt[18]) {
                str += dataSt[13] === '1' ? ' ле' :
                        dataSt[13] === '2' ? ' ц' : ' пр';
            }

            // левая рука
            if (dataSt[12]) {
                str += dataSt[12] === '1' ? ' ле' :
                        dataSt[12] === '2' ? ' ц' : ' пр';
            }

            _this.inpTextChat.value = str + ' [' + enemy[2] + ']' +
                generalSkill + specialSkill;
            writeOnChatButton.click();
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
                before,
                span,
                j,
                i;

            for (i = 0; i < 2; i++) {
                for (j = 0; j < mass[i].length; j++) {
                    this.getDataFighters(mass[i][j]);

                    // конвертики покам не нужны
                    if (mass[i][j].nodeName === 'B') {
                        continue;
                    }

                    span = general.doc.createElement('span');
                    span.innerHTML = ' <img src="' + general.imgPath +
                        'AdvBattleAll/envelope.gif" style="width: 15px; ' +
                        'cursor: pointer; margin-right: 5px;">';
                    before = !i ? mass[i][j].nextElementSibling :
                            mass[i][j].previousElementSibling;
                    mass[i][j].parentNode.insertBefore(span, before);
                    span.querySelector('img').addEventListener('click',
                        this.setNameInChat(mass[i][j].textContent), false);
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
            var regstr = '(\\d+)\\. \\[(\\d+)\\][^\\d]*(\\d+)!? ' +
                    '\\((\\d+)%\\) \\[(\\d+) \\/ (\\d+)\\]',
                reg = new RegExp(regstr),
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
                // noinspection JSCheckFunctionSignatures
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
         * @method clickElem
         * @param   {HTMLElement}   elem
         */
        this.clickElem = function (elem) {
            var _elem = elem;
            if (_elem) {
                _elem.click();
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
                if ((!walk.checked && dataSt[ind]) ||
                        (walk.checked && !dataSt[ind])) {
                    walk.click();
                }
            }
        };

        /**
         * @method setStroke
         */
        this.setStroke = function () {
            var dataSt = general.getData(4);

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
                    this.clickElem(general.$('bagaboom'));
                } else {
                    // правая рука
                    this.clickElem(general.$('right_attack' + dataSt[13]));
                    // левая рука
                    this.clickElem(general.$('left_attack' + dataSt[12]));
                }

                // куда отходим
                this.clickElem(general.$('defence' + dataSt[14]));
                // подходим или нет
                this.setWalk(16);

                // общий навык
                if (dataSt[19]) {
                    this.clickElem(general.$('apmid'));
                }

                // навык специалиста
                if (dataSt[20]) {
                    this.clickElem(general.$('apsid'));
                }

                this.clearSavedStrokeAfterSay();
                return;
            }

            // устанавливаем последний сохраненный ход
            if (dataSt[3] === '2') {
                this.clickElem(general.$('left_attack' + dataSt[5]));
                // если нет гранаты, то отмечаем правую руку
                if (!dataSt[8] || !general.$('bagaboom')) {
                    this.clickElem(general.$('right_attack' + dataSt[6]));
                }

                this.clickElem(general.$('defence' + dataSt[7]));

                if (dataSt[8]) {
                    this.clickElem(general.$('bagaboom'));
                }

                // подходим или нет
                this.setWalk(9);
            } else {    // случайный ход
                // куда уходим
                this.clickElem(general.$('defence' + this.getRandom1to3()));
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

                this.clickElem(general.$('right_attack' + x));
                this.clickElem(general.$('left_attack' + y));
            }
        };

        /**
         * @method setHandlerSubmit
         */
        this.setHandlerSubmit = function () {
            var s = general.doc.createElement('script');
            s.innerHTML = 'function fight_mod() {' +
                    'var dataStAll = localStorage.getItem(\'' +
                            general.STORAGENAME + '\').split(\'@\'),' +
                        'dataSt = dataStAll[4].split(\'|\'),' +
                    'elem;' +

                    'dataSt[5] = \'\';' +
                    'dataSt[6] = \'\';' +
                    'dataSt[7] = \'\';' +
                    'dataSt[8] = \'\';' +
                    'dataSt[9] = \'\';' +

                    // левая рука
                    'if (elem = document.' +
                            'querySelector(\'input[type=\"radio\"]' +
                                '[id^=\"left_attack\"]:checked\')) {' +
                        'dataSt[5] = /left_attack(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // правая рука
                    'if (elem = document.' +
                            'querySelector(\'input[type=\"radio\"]' +
                                '[id^=\"right_attack\"]:checked\')) {' +
                        'dataSt[6] = /right_attack(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // куда отходим
                    'if (elem = document.' +
                            'querySelector(\'input[type=\"radio\"]' +
                                '[id^=\"defence\"]:checked\')) {' +
                        'dataSt[7] = /defence(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // граната
                    'if (elem = document.' +
                            'querySelector(\'#bagaboom:checked\')) {' +
                        'dataSt[8] = \'1\';' +
                    '}' +

                    // подходим или нет
                    'if (elem = document.querySelector(\'#walk:checked\')) {' +
                        'dataSt[9] = \'1\';' +
                    '}' +

                    'dataStAll[4] = dataSt.join(\'|\');' +
                    'localStorage.setItem(\'' + general.STORAGENAME +
                        '\', dataStAll.join(\'@\'));' +
                    'fight();' +
                '}';

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

            // если одна рука, то сбрасываем чекбокс
            // "Говорить только левую руку (для БЩ)"
            if (vis) {
                var stData = general.getData(4);
                stData[18] = '';
                general.setData(stData, 4);
            }

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
                _this.tooltip.style.top = String(getPos.init(obj.x).y - obj.y);
                _this.tooltip.style.left = String(getPos.init(this).x - 50);
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
                selectEnemy.parentNode.
                    insertBefore(spanCheckRange, selectEnemy);
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
                        img[i].style.marginLeft = '6px';
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
                        // noinspection JSCheckFunctionSignatures
                        target.appendChild(general.doc.createElement('br'));
                        // noinspection JSCheckFunctionSignatures
                        target.appendChild(general.doc.createElement('br'));
                        target.appendChild(this.graphTable);
                        // noinspection JSCheckFunctionSignatures
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

                if (/Наблюдатели/.test(table.innerHTML)) {
                    table = table.previousElementSibling;
                }
            }

            table.setAttribute('style', 'border-collapse: collapse;');
            table.setAttribute('background', this.imgPath + 'battleField.gif');

            // вставим пустую строку после таблицы
            // (в НЕ JS-версии уже есть)
            if (!general.viewMode && !general.nojs) {   // JS-версия
                // noinspection JSCheckFunctionSignatures
                table.parentNode.appendChild(general.doc.createElement('br'));
            } else if (general.viewMode) {
                // noinspection JSCheckFunctionSignatures
                table.parentNode.insertBefore(general.doc.createElement('br'),
                    table.nextElementSibling);
            }

            var reg = /\/(left|right)_.*\.gif/,
                td = table.querySelectorAll('td'),
                prBarWidth = 27,
                rightDC = -1,
                leftDC = -1,
                divBattleField,
                diffCommand,
                trNumbers,
                divHealth,
                tdNumber,
                cloneTd,
                myInd,
                title,
                hpClr,
                even,
                divL,
                divR,
                flag,
                img,
                DC,
                hp,
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
                    title = img[j].getAttribute('title');

                    // ячейка где находится мой перс
                    if (!general.viewMode &&
                            title.indexOf(this.myPers.name) !== -1) {
                        myInd = -1 * i;
                    }

                    // крайний левый и крайний правый персонаж от центра
                    if (reg.exec(img[j].src)[1] === 'left') {
                        leftDC = i;
                    } else if (rightDC === -1) {
                        rightDC = i;
                    }

                    divBattleField = general.doc.createElement('div');

                    // формируем прогресс бар здоровья
                    hp = /\[(\d+)\/(\d+)\]/.exec(title);
                    if (hp) {
                        divHealth = general.doc.createElement('div');
                        divHealth.setAttribute('style',
                            'width: ' + prBarWidth + 'px; ' +
                            'background-color: #FFEFDD; ' +
                            'margin: 7px 1px 3px 1px;');

                        // вычисляем процент оставшегося здоровья
                        hp = Math.ceil(+hp[1] * 100 / +hp[2]);
                        hpClr = hp < 30 ? 'FF0000' :
                                    hp < 80 ? 'C44A00' : '339933';

                        divHealth.innerHTML = '<div style="' +
                            'height: 2px; width: ' +
                                Math.ceil(prBarWidth / 100 * hp) + 'px; ' +
                            'background-color: #' + hpClr + ';"></div>';
                        divBattleField.appendChild(divHealth);
                    }

                    if (!diffCommand) {
                        td[i].appendChild(divBattleField);
                        td[i].lastElementChild.
                                appendChild(img[j].cloneNode(true));
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

                tdNumber.innerHTML = String(Math.abs(myInd));
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

                ajax.init(url, 'GET', null, true, function (xhr) {
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
                // если есть список выбора врага (ход не сделан)
                if (selectEnemies) {
                    // играем звук о начале хода
                    if (!this.checkSound) {
                        new PlaySound().init(dataSt[22]);
                        this.checkSound = true;
                    }

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
                // JS-версия, ход сделан
                } else {
                    this.checkSound = false;
                    if (!this.enemies) {
                        return;
                    }
                }
            } else {    // в режиме наблюдения за боем
                dataSt[17] = '';    // удаляем данные из списка врагов
                general.setData(dataSt, 4);
            }

            this.getLeftRightCommands();

            // ссылки на персов слева и справа
            this.leftPers = this.getPers(this.leftRightCommands[0]);
            this.rightPers = this.getPers(this.leftRightCommands[1]);

            // бой закончился, режим наблюдения за боем,
            // форма для отправки сообщений присутствует
            if (!this.leftPers.length || !this.rightPers.length) {
                return;
            }

            // расстановка конвертиков и сбор дополнительной
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

            var stData = general.getData(4);
            if (stData[10]) {
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

            // чекбокс "Говорить только левую руку (для БЩ)"
            if (general.$('left_attack1') && general.$('right_attack1')) {
                var sayOnlyLeftHand = general.doc.createElement('input');
                sayOnlyLeftHand.setAttribute('id', 'sayOnlyLeftHand');
                sayOnlyLeftHand.type = 'checkbox';
                sayOnlyLeftHand.setAttribute('title', 'Говорить только левую ' +
                        'руку (для навыка Баллистический щит)');
                sayOnlyLeftHand.addEventListener('click', function () {
                    var data = general.getData(4);
                    data[18] = sayOnlyLeftHand.checked ? '1' : '';
                    general.setData(data, 4);
                }, false);
                sayOnlyLeftHand.checked = stData[18];
                sayOnlyMyCommand.parentNode.insertBefore(sayOnlyLeftHand,
                        sayOnlyMyCommand);
            }

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
                var _this = this;
                general.root.setTimeout(function () {
                    _this.tryStart();
                }, 100);
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
                if (refreshAppl && (general.doc.
                        querySelector('center>b>font[color="#990000"]') ||
                            general.doc.querySelector('td[width="70%"]>b>' +
                                    'font[color="#990000"]'))) {

                    var updateLink = general.$('updatetimer2') ||
                            general.$('updatetimer');
                    if (updateLink) {
                        general.root.setTimeout(function () {
                            general.root.location = updateLink.parentNode.href;
                        }, (+refreshAppl) * 1000);
                    }
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
                new PlaySound().init(general.getData(4)[21]);
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
                    // noinspection JSUnresolvedVariable
                    if (stData[1] && (/Подтверждаете бой с/.
                            test(a[i].parentNode.innerHTML))) {
                        link = general.doc.
                            querySelector('a[class="mainbutton"]' +
                                '[href*="/warlist.php?war=armed&do=5&cu="]');
                        link.removeAttribute('class');
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
            'emp_irs', 'emp_a', 'rgd5', 'grenade_f1', 'rgd2', 'lightst',
            'lights', 'rkg3', 'mdn', 'rgd2m', 'rgo', 'm84', 'rgn', 'emp_ir',
            'fg3l', 'l83a1', 'emp_s', 'm67', 'm3', 'hg78', 'hg84', 'fg6',
            'anm14', 'm34ph', 'fg7', 'fg8bd',
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
                url = 'http://www.ganjawars.ru/me.php';

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
                var cssSelector = 'td[align="center"][style="font-size:8pt"]' +
                        '[bgcolor="#e9ffe9"]',
                    linkObj = spanContent.querySelector(cssSelector);

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
                cssSelector = 'td[valign="bottom"][bgcolor="#e9ffe9"]' +
                    '[colspan="2"]';
                var items = spanContent.querySelector(cssSelector);
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
                            '"color: #0000FF;">' + time + '</span> мин ' +
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

                cssSelector = 'a[href="/workshop.php"][style$="#990000;"]';
                var testBroken = spanContent.querySelector(cssSelector) ||
                        false;
                _this.wpgbContainer.innerHTML += _this.addContent(testSms,
                    testGrenades, testBroken);

            }, function () {
                general.root.setTimeout(function () {
                    _this.startWorkPostGrenadesBroken(_this);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();
            if (topPanel) {
                // noinspection JSCheckFunctionSignatures
                topPanel.appendChild(general.doc.createTextNode(' | '));
                topPanel.appendChild(this.wpgbContainer);

                this.startWorkPostGrenadesBroken(null);
                var _this = this;
                general.root.setInterval(function () {
                    _this.startWorkPostGrenadesBroken(_this);
                }, new GetRandom().init(20, 40) * 1000);
            }
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
                '<img id="divres_close" style="cursor: pointer;" ' +
                'src="' + general.imgPath + 'close.gif" /></div>';

            var _this = this;
            general.$('divres_close').addEventListener('click', function () {
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
                var cssSelector = 'td[class="wb"][bgcolor="#f0fff0"]' +
                        '[align="center"][valign="top"]',
                    tables = spanContent.querySelectorAll(cssSelector),
                    data;

                if (!tables.length) {   // новый стиль оформления страницы инфы
                    cssSelector = 'td[class="greenbrightbg"][align="center"]' +
                        '[valign="top"]';
                    tables = spanContent.querySelectorAll(cssSelector);
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

            if (topPanel) {
                this.divResult.setAttribute('style', 'visibility: hidden; ' +
                        'position: absolute; padding: 3px; background-color: ' +
                        '#E7FFE7; border: solid 1px #339933; ' +
                        'border-radius:5px; top:0; left:0; box-shadow: ' +
                        '5px 6px 6px rgba(122,122,122,0.5);');
                general.doc.body.appendChild(this.divResult);

                // noinspection JSCheckFunctionSignatures
                topPanel.appendChild(general.doc.createTextNode(' | '));
                topPanel.appendChild(this.createButton('Ресурсы', 'res'));
                // noinspection JSCheckFunctionSignatures
                topPanel.appendChild(general.doc.createTextNode(' | '));
                topPanel.appendChild(this.createButton('Бонусы', 'bonus'));
            }
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
                node,
                next,
                prev,
                i;

            for (i = 0; i < b.length; i++) {
                // если это урон (-XX), 'vs', пок с '['
                if ((/^-\d+$|vs|\[|,/.test(b[i].innerHTML)) ||
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

                    // noinspection JSUndefinedPropertyAssignment
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
                prev = b[i].previousSibling || b[i].parentNode.previousSibling;
                if (prev && prev.nodeValue &&
                        /\d+:\d+, #\d+ :/.test(prev.nodeValue)) {

                    // получаем запись своего хода
                    str = '';
                    node = b[i].previousSibling ? b[i] : b[i].parentNode;
                    while (node && node.nodeName !== 'BR') {
                        next = node.nextElementSibling;
                        if (next.nodeName === 'I') {
                            str += next.innerHTML;
                        }

                        node = next;
                    }

                    if (str) {
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
                    general.root.setTimeout(function () {
                        _this.init();
                    }, 200);
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
                // noinspection JSCheckFunctionSignatures
                center.appendChild(general.doc.createElement('br'));
                // noinspection JSCheckFunctionSignatures
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
            // noinspection JSUnresolvedVariable
            return reg.test(chk.parentNode.nextElementSibling.innerHTML);
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('tr>td>a:last-child' +
                        '[href="/sms.php?page=2"]'),
                del = general.doc.querySelector('input[class="mainbutton"]' +
                    '[type="submit"][value="Удалить отмеченные"]'),
                smsChk = general.doc.
                    querySelectorAll('input[type="checkbox"][name^="kill"]');

            if (!target || !del) {
                return;
            }

            target = target.parentNode.parentNode;
            target.innerHTML += '<td valign="top" class="greengreenbg" ' +
                'align="center" style="width: 150px;"></td>';
            target = target.lastElementChild;

            // кнопка удаления
            var delButton = general.doc.createElement('span');
            delButton.innerHTML = 'Удалить отмеченные';
            delButton.setAttribute('style', 'cursor: pointer; ' +
                    'text-decoration: underline;');
            delButton.addEventListener('click', function () {
                del.click();
            }, false);

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
                // noinspection JSUnresolvedFunction
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
            if (/section=items/.test(general.root.location.href) ||
                    !general.doc.querySelector('div>' +
                        'img[src$="/img/ferma/ground.png"]')) {
                return;
            }

            var plants = general.doc.querySelectorAll('table[cellspacing="0"]' +
                    '[cellpadding="0"]  td[valign="top"][onclick*="btn_"]'),
                price1,
                price2,
                target,
                time,
                span,
                exp,
                i;

            for (i = 0; i < plants.length; i++) {
                span = general.doc.createElement('span');
                span.setAttribute('style', 'font-size: 9px;');
                price1 = +/\$(\d+)/.exec(plants[i].querySelector('font' +
                    '[color="#006600"]>b:last-child').innerHTML)[1];
                price2 = +/\$(\d+)/.exec(plants[i].querySelector('font' +
                    '[color="#990000"]>b').innerHTML)[1];
                time = +/созревания:\s(\d+)/.exec(plants[i].innerHTML)[1];
                // noinspection JSCheckFunctionSignatures
                exp = parseFloat(/(\d+\.?\d*) опыта/.exec(plants[i].innerHTML));
                span.innerHTML = this.calculateFarm(price1, price2, time, exp);
                target = plants[i].querySelector('br');
                target.parentNode.insertBefore(span, target);
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
         * @type {int}
         */
        this.checkInterval = 0;

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
            s -= h * 3600;
            min = Math.floor(s / 60);
            s -= min * 60;

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
            if (topPanel && stData[0]) {
                this.farmLink = general.doc.createElement('a');
                this.farmLink.setAttribute('style', 'color: #0000FF; ' +
                        'text-decoration: none;');
                this.farmLink.href = 'http://www.ganjawars.ru/ferma.php?id=' +
                    general.myID;
                this.farmLink.setAttribute('target', '_blank');
                // noinspection JSCheckFunctionSignatures
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
            }
        };
    };

    /**
     * @class ComfortableLinksForFarm
     * @constructor
     */
    var ComfortableLinksForFarm = function () {
        /**
         * @method setLink
         * @param   {Element}       a
         * @param   {String|null}   txt
         */
        this.setLink = function (a, txt) {
            var target = general.doc.
                    querySelector('center>b>font[color="#990000"]').parentNode;

            // noinspection JSUnresolvedVariable
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
            var a1 = general.doc.querySelector('td[bgcolor="#f0fff0"]' +
                    ':not([align="right"])>a[href^="/ferma.php?"]'),
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
                        'background: #F4F3F1; ' +
                        'border-radius: 7px; ' +
                        'padding: 1px; ' +
                        'top: ' + (pos.y + 15) + 'px; ' +
                        'left: ' + (pos.x - 7) + 'px;');

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
        this.tm = 1000;
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
                        'style="color: #990000;">Вы в пути. Данные NPC не ' +
                        'доступны.</td>';
                    _this.setCloseButton();
                    return;
                }

                var cssSelector1 = 'td[class="wb"][colspan="3"]' +
                        '[bgcolor="#f0fff0"]',
                    cssSelector2 = 'a[href*="/syndicate.php?id="]',
                    cssSelector3 = 'td[class="wb"][align="left" ]' +
                        '[width="100%"]>b',
                    syndLink = spanContent.querySelector(cssSelector1).
                                querySelector(cssSelector2),
                    nameNPC = spanContent.querySelector(cssSelector3).innerHTML;

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
            var s = sec,
                h = Math.floor(s / 3600);

            s -= h * 3600;
            var min = Math.floor(s / 60);
            s -= min * 60;

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

            if (/www\.ganjawars\.ru\/me(\/|\.php)/.test(general.loc)) {
                var mainDiv = general.doc.createElement('div'),
                    target = general.doc.querySelector('td[rowspan="3"]' +
                        '[valign="top"][bgcolor="#e9ffe9"]>' +
                        'div[style="padding-left:5px"]>' +
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
                    '</span><table id="dataNPC" style="width: 100%;"></table>';

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
            if (val !== '0') {
                var i;
                for (i = 3; i < 7; i++) {
                    str += '<img src="http://images.ganjawars.ru/' +
                        'img/ferma/' + val + i + '.png" />';
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
                // noinspection JSUnresolvedFunction
                var gb = table.querySelector('a[name="pf"]').parentNode.
                        querySelectorAll('b'),
                    exp = prod[1],
                    stData = general.getData(11);

                // количесво Гб на ферме с учетом схрона
                // Счет: $85 + урожай на $6.6 в схроне, 1 шт.
                gb = +gb[0].innerHTML.replace(/\$|,/g, '') + (gb[1] ?
                        Math.round(parseFloat(gb[1].innerHTML.
                            replace(/\$|,/g, ''))) : 0);

                // время сброса не установлено
                if (!stData[1]) {
                    this.clearCounter(gb.toString(), exp);
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
                    diffGb = gb - (+stData[2]),
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
                        _this.clearCounter(gb.toString(), exp);
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
                capcha = general.doc.querySelector('input[type="hidden"]' +
                    '[name="captcha_question"]');

            this.target = general.doc.
                    querySelector('form[action="/ferma.php"]') ||
                        general.doc.
                            querySelector('td[width="400"][valign="top"]');

            // нет капчи, не в постройках, на своей ферме
            if (!capcha && !(/section=items/.test(general.loc)) &&
                    !(farmId && farmId[2] !== general.myID) && this.target) {

                var canPlant = this.target.nodeName === 'FORM';

                // счетчики Гб и производа
                var stData = general.getData(11);
                if (canPlant && (stData[4] || stData[5])) {
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
         */
        this.setCSSGwMenu = function () {
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
                '.gwm table.main {background-image: url(' + this.imgPath +
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
                    div.style.top = '83';
                    div.style.left = '0';
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

            div.style.left = String(arrow.parentNode.offsetWidth +
                this.correctXGwMenu);
            div.style.top = String(arrow.offsetTop + _offsettop +
                this.correctYGwMenu);
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
                arrow.style.boxShadow = '1px 1px 1px inset';
                _this.fOver(div, arrow, offset);
            }, false);

            arrow.addEventListener('mouseout', function () {
                arrow.style.boxShadow = '';
                _this.fOut(div, arrow);
            }, false);

            div.addEventListener('mouseover', function () {
                arrow.style.boxShadow = '1px 1px 1px inset';
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
         */
        this.gwMenuInit = function () {
            var gw_menu = general.$('gw_menu'),
                gwM;

            if (gw_menu) {
                gw_menu.style.display = gw_menu.style.display === '' ?
                        'none' : '';
                return;
            }

            this.setCSSGwMenu();

            gwM = [
                {divm: 'gw_menu', lines: [
                    // шапка
                    ['<td class="center"><a target="_blank" id="op" ' +
                        'href="/info.php?id=2095458"><span id="c1">' +
                        'developed by</span> <span id="c2">MyRequiem&#169;' +
                        '</span><br><span id="c3">for GanjaWars fighters' +
                        '</span></a></td><td class="center" id="exit" ' +
                        'style="cursor: pointer;"><img src="' + this.imgPath +
                        'hide.gif" alt="Закрыть" title="Закрыть"></td>',
                        'gw_menu'],
                    // основные разделы
                    ['Ресурсы', 'resourses', 'brown'],
                    ['Бои', 'battles', 'crimson'],
                    ['ЭС, Уран', 'real_estate'],
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
                    ['Mои навыки', '/home.skills.php?page=perks', 0, 1],
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
                    ['Идущие бои', '/war.php', 0, 1]
                ], prnt: 'gw_menu', arrow: 'battles', offsetY: -15},
                {divm: 0, lines: [
                    ['Общие', '/warlist.php?war=armed'],
                    ['Стрельба из спецоружия', '/warlist.php?war=rogatki'],
                    ['Дуэли', '/warlist.php?war=duels']
                ], prnt: 'battles_1', arrow: 'battles_1_single'},
                {divm: 0, lines: [
                    ['Общие', '/wargroup.php?war=armed'],
                    ['Уличные', '/wargroup.php?war=street'],
                    ['Дуэли на спецоружии', '/wargroup.php?war=duels'],
                    ['Нападения', '/wargroup.php?war=attacks']
                ], prnt: 'battles_1', arrow: 'battles_1_group', offsetY: -15},
                {divm: 0, lines: [
                    ['ГосЭнергоАтом', '/info.realty.php?id=2'],
                    ['Статистика GanjaWars.Ru от vasena',
                        'http://gw-utils.ru/'],
                    ['GWTools от Bas', 'https://www.gwtools.ru/']
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
                        'http://www.ganjafoto.ru/image.php?aid=256649']
                ], prnt: 'gw_menu', arrow: 'scripts', offsetY: -45},
                {divm: 'syndicates_1', lines: [
                    ['Официальные синдикаты', 'offic_synd'],
                    ['Рейтинг синдикатов', '/srating.php', 0, 1],
                    ['Поиск синдиката',
                        'http://www.cccp-gw.su/listsynd/listsynd_search.php',
                        0, 1]
                ], prnt: 'gw_menu', arrow: 'syndicates', offsetY: -15},
                {divm: 'offic_synd_1', lines: [
                    ['Администраторы игры', '/syndicate.php?id=3'],
                    ['GW - Редакторы описания игры', '/syndicate.php?id=1323'],
                    ['GW - Помощники администраторов',
                        '/syndicate.php?id=2076'],
                    ['GW - Почетный легион', '/syndicate.php?id=1320'],
                    ['GW - Технические персонажи', '/syndicate.php?id=445'],
                    ['GW - Bugtesters', '/syndicate.php?id=1949'],
                    ['GW - Суд', '/syndicate.php?id=1318'],
                    ['GW - Суд по взломам', '/syndicate.php?id=4409'],
                    ['GW - Суд // Common', '/syndicate.php?id=1953'],
                    ['GW - Суд - Ветераны', '/syndicate.php?id=1914'],
                    ['GW - Мировой Суд', '/syndicate.php?id=3060'],
                    ['GW - Судебные приставы', '/syndicate.php?id=1920'],
                    ['GW - Следователи', '/syndicate.php?id=2309'],
                    ['GW - Коллегия адвокатов', '/syndicate.php?id=1948'],
                    ['GW - Полиция', '/syndicate.php?id=1321'],
                    ['GW - Загс', '/syndicate.php?id=1354'],
                    ['GW - 911', '/syndicate.php?id=911'],
                    ['GW - GanjaWiki', '/syndicate.php?id=6949'],
                    ['GW - Модераторы GanjaFoto.Ru', '/syndicate.php?id=3516'],
                    ['GW - Модераторы рейтинга сайтов',
                        '/syndicate.php?id=3516'],
                    ['GW - Модераторы чата', '/syndicate.php?id=274'],
                    ['GW - Модераторы форума', '/syndicate.php?id=1262'],
                    ['GW - Модераторы торговых форумов',
                        '/syndicate.php?id=3405'],
                    ['ЗАО "Букмекерская контора №1"', '/syndicate.php?id=909'],
                    ['GW - Маркетинговая служба игры', '/syndicate.php?id=2324']
                ], prnt: 'syndicates_1', arrow: 'offic_synd', offsetY: -45},
                {divm: 0, lines: [
                    ['Z', '/map.php?sx=150&sy=150'],
                    ['G', '/map.php?sx=50&sy=50'],
                    ['P', '/map.php?sx=123&sy=77'],
                    ['S', '/map.php?sx=100&sy=100'],
                    ['Аут', 'http://born2kill.clan.su/index/0-55']
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
                    ['Общий форум', '/threads.php?fid=27', 0, 1],
                    ['Идеи и предложения', '/threads.php?fid=2', 0, 1],
                    ['Форум для неигровых тем', '/threads.php?fid=22', 0, 1],
                    ['Клуб Нытиков', '/threads.php?fid=55', 0, 1],
                    ['Объявления синдикатов', '/threads.php?fid=38', 0, 1],
                    ['Вступлю в синдикат', '/threads.php?fid=56', 0, 1],
                    ['Тотализатор', '/threads.php?fid=5', 0, 1],
                    ['Общение гостей острова', '/threads.php?fid=30', 0, 1],
                    ['Конкурсы', '/threads.php?fid=3', 0, 1],
                    ['Благодарности и поздравления',
                        '/threads.php?fid=4', 0, 1],
                    ['Offline встречи', '/threads.php?fid=6', 0, 1],
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
                    ['Торговля high-tech предметами', '/threads.php?fid=35'],
                    ['Торговля недвижимостью', '/threads.php?fid=34'],
                    ['Торговля предметами : Редкие вещи',
                        '/threads.php?fid=44'],
                    ['Торговля модифицированными предметами',
                        '/threads.php?fid=47'],
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
                    ['Автоматы', '/shop.php?shop=shop_auto'],
                    ['Снайперское оружие', '/shop.php?shop=shop_sniper'],
                    ['ПП', '/shop.php?shop=shop_ppguns'],
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
                    ['Пояса', '/shop.php?shop=shop_belts'],
                    ['Правый карман', '/shop.php?shop=shop_rightpocket'],
                    ['Левый карман', '/shop.php?shop=shop_leftpocket'],
                    ['Доп.карманы', '/shop.php?shop=shop_epockets'],
                    ['Транспорт', '/shop.php?shop=shop_transport'],
                    ['Цветы', '/shop.php?shop=shop_flowers'],
                    ['Аптека', '/shop.php?shop=shop_drugs'],
                    ['Сувениры', '/shop.php?shop=shop_gifts']
                ], prnt: 'shop_1', arrow: 'shop_gos', offsetY: -75},
                {divm: 0, lines: [
                    ['Огнестрельное оружие', '', 'zag'],
                    ['Автоматы', '/shopc.php?shop=shop_auto_c'],
                    ['Пулемёты', '/shopc.php?shop=shop_heavy_c'],
                    ['Снайперское оружие', '/shopc.php?shop=shop_snipe_c'],
                    ['ПП', '/shopc.php?shop=shop_ppguns_c'],
                    ['Дробовики', '/shopc.php?shop=shop_shotguns_c'],
                    ['Гранатометы', '/shopc.php?shop=shop_grl_c'],
                    ['Полезные предметы', '', 'zag'],
                    ['Броня', '/shopc.php?shop=shop_armour_c'],
                    ['Шлемы', '/shopc.php?shop=shop_helmets_c'],
                    ['Броня ног', '/shopc.php?shop=shop_boots_c'],
                    ['Маскировка', '/shopc.php?shop=shop_masks_c'],
                    ['Тепловизоры', '/shopc.php?shop=shop_wear_c'],
                    ['Пояса', '/shopc.php?shop=shop_belts_c'],
                    ['Правый карман', '/shopc.php?shop=shop_rightpocket_c'],
                    ['Левый карман', '/shopc.php?shop=shop_leftpocket_c'],
                    ['Доп.карманы', '/shopc.php?shop=shop_epockets_c'],
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
                    ['EMP-IRS', '/market.php?buy=1&item_id=emp_irs'],
                    ['EMP-A', '/market.php?buy=1&item_id=emp_a'],
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
                    ['GHTB', '/sshop.php?tshop=grenades'],
                    ['Mk-5 Frag Grenade', '/statlist.php?r=fg5&type=i'],
                    ['Коктейль Молотова', '/statlist.php?r=molotov&type=i'],
                    ['HellsBreath', '/statlist.php?r=hellsbreath&type=i'],
                    ['Напалм', '/statlist.php?r=napalm&type=i'],
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
                    ['от Yeni', 'http://help.yeni.name/gan/'],
                    ['www.cccp-gw.su', 'http://www.cccp-gw.su/dress/']
                ], prnt: 'gw_menu', arrow: 'changeclothing'},
                {divm: 0, lines: [
                    ['Настройки', '/info.edit.php?type=main'],
                    ['Настройки боя', '/info.edit.php?type=battles'],
                    ['О себе', '/info.edit.php?type=pinfo'],
                    ['Анкета', '/info.anketa.php'],
                    ['E-mail и пароли', '/info.edit.php?type=security'],
                    ['Привязка к телефону', '/info.sms.php'],
                    ['Секретный ключ', '/info.edit.php?type=pkey'],
                    ['Аватар', '/info.edit.php?type=avatar'],
                    ['Приглашения', '/info.edit.php?type=invites'],
                    ['PDA', '/info.edit.php?type=pda'],
                    ['Навигация', '/info.edit.php?type=navy']
                ], prnt: 'gw_menu', arrow: 'settings', offsetY: -45}
            ];

            this.createGWMenuItems(gwM);

            var _this = this;
            //кнопка закрытия меню
            general.$('exit').addEventListener('click', function () {
                _this.gwMenuInit();
            }, false);

            //чекбокс "Показывать всегда"
            general.$('showt').addEventListener('click', function () {
                var showt = this;
                general.setData(showt.checked ? ['1'] : [], 12);
            }, false);

            this.gwMenuInit();
        };

        /**
         * @method init
         */
        this.init = function () {
            // ссылка в главном меню игры
            var mainLink = general.doc.querySelector('a[href$="/sites.php"]');
            if (mainLink) {
                mainLink.setAttribute('style', 'font-weight: bold; ' +
                    'cursor: pointer;');
                mainLink.removeAttribute('href');
                mainLink.innerHTML = 'GW-Меню';
                var _this = this;
                mainLink.addEventListener('click', function () {
                    _this.gwMenuInit(_this);
                }, false);

                // если есть запись в хранилище "Показывать всегда"
                if (general.getData(12)[0]) {
                    this.gwMenuInit();
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
                var tb = general.doc.getElementById('tr_' + id),
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

            line.link = line.line_1.querySelectorAll('a')[1];
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
         * @param   {Object}    _this
         */
        this.startInventoryPlus = function (_this) {
            // ищем таблицу с инвентарем
            var tbody = general.doc.querySelector('table[border="0"]' +
                    '[cellspacing="1"][cellpadding="5"][align="center"]' +
                    '[width="700"] tr[id^="item_tr"]');

            if (tbody) {
                // новое оформление экипировки
                tbody = tbody.parentNode;
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
                obj = _this.compareLines(allLines[i], linesObj);
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
                    td.setAttribute('colspan', '5');
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
                            _this.openCloseItem(id), false);
                    linesObj[i].line.link.parentNode.appendChild(divn);
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var _this = this;
            /*global $, filteritems, def_filter */
            general.root.postdo = function (url) {
                /*jslint unparam: true */
                /*eslint no-unused-vars: true */
                $('#itemsbody').
                    load(url, function (responseTxt, statusTxt) {
                        if (statusTxt === 'success') {
                            filteritems(def_filter);
                        }

                        _this.startInventoryPlus(_this);
                    });

                return false;
            };

            this.startInventoryPlus(this);
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
        this.tm = 1000;

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
                    // noinspection JSUnresolvedVariable
                    this.rez.btls.push(btlLogs[i].parentNode.parentNode.
                            nextElementSibling);
                } else {
                    return false;
                }
            }

            return !!btlLogs.length;
        };

        /**
         * @method showRezult
         */
        this.showReault = function () {
            var i, b, stl;

            for (i = 0; i < this.rez.btls.length; i++) {
                b = this.rez.btls[i].querySelector('a>b');
                if (b) {
                    // noinspection JSUnresolvedFunction
                    stl = b.parentNode.getAttribute('style');
                    if (/red/.test(stl)) {
                        this.rez.win++;
                    } else if (/blue/.test(stl)) {
                        this.rez.loss++;
                    } else {
                        this.rez.draw++;
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
         * @property spanCountGB
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
                'значение - 100.'],
            'бонус защиты': ['Бонус защиты снижает урон, получаемый ' +
                'персонажем, на (количество бонуса)% независимо от вида ' +
                'урона. Снижение урона распространяется и на обычные ' +
                'выстрелы, и на гранаты, и на критические попадания.'],
            'бонус точности': ['Бонус точности - бонус, увеличивает ' +
                'наносимый персонажем урон, когда расстояние до цели меньше, ' +
                'чем дальность стрельбы оружия в его руках. Расстояние ' +
                'должно быть на 5 ходов меньше дальности оружия, увеличение ' +
                'урона в процентах равно значению бонуса, и арифметически ' +
                'суммируется с бонусами урона.']
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
                    // noinspection JSUnresolvedVariable
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
                    // noinspection JSUnresolvedFunction
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
            var invit = general.doc.querySelector('a[href*="/me.php?nb=synd"]');
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
         * @type {NodeList}
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
                // noinspection JSUndefinedPropertyAssignment
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
                'id="txtFilter" size="40" style="margin-bottom: ' +
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
     * @class FilterWarlistOne2One
     * @constructor
     */
    var FilterWarlistOne2One = function () {
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
                /*eslint-disable no-useless-escape */
                if (tr[i].firstElementChild &&
                        (/<b>[^\[]*\[\d+\]/.test(tr[i].innerHTML))) {
                    /*eslint-enable no-useless-escape */
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
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode('от '));
                filtForm.appendChild(s_lmin);
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode(' до '));
                filtForm.appendChild(s_lmax);
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode(' тип '));
                filtForm.appendChild(s_ltype);
                var subm = general.doc.createElement('input');
                subm.type = 'submit';
                subm.value = '»';
                filtForm.appendChild(subm);

                var target = general.$('updatetimer').nextElementSibling;
                target.parentNode.
                    insertBefore(filtForm, target.nextElementSibling);

                s_lmin.setAttribute('style', 'width: 40px;');
                s_lmax.setAttribute('style', 'width: 40px;');

                var span = general.doc.createElement('span');
                span.innerHTML = 'Название: <input id="w_name" ' +
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
                x = /\((\d+.?\d*)\)\s*.*\+-\d+.?\d*<\/font>/.
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
                // noinspection JSUnresolvedFunction
                nobrs = general.doc.querySelector('td[class="txt"]' +
                        '[align="right"][style="font-size:10px"]').
                            parentNode.parentNode.querySelectorAll('nobr');
            } else {
                nobrs = general.doc.querySelector('td[valign="top"]' +
                    '[align="center"]>table[cellspacing="0"][cellpadding="0"]' +
                    '[border="0"]').querySelectorAll('nobr');
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

            if (/\/me(\/|\.php)/.test(general.loc)) {
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
            }, 1000);
        };

        /**
         * @method showHistory
         * @param   {int}       id
         * @param   {int}       id1
         * @param   {int|null}  id2
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
                    }, 1000);
                } else {
                    var time = _this.spanContent.querySelector('td[width=' +
                            '"100%"]>a[href*="/info.php?id="]:first-child').
                                nextSibling.nodeValue;

                    _this.sms[id].mess += time + ':</span><br>' +
                        _this.spanContent.querySelector('div[style*=' +
                                '"overflow:auto"]').innerHTML.
                                    replace(/^(\s|<br>)*|(\s|<br>)*$/g, '');
                    _this.sms[id].ofSyndLink = _this.spanContent.
                        querySelector('#attndiv+center>' +
                            'a[href*="/sms-pub.php?type="]').href;

                    id++;
                    if (!_this.sms[id]) {
                        _this.showSms();
                        return;
                    }

                    general.root.setTimeout(function () {
                        _this.showHistory(id, 0, null);
                    }, 1000);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.showHistory(id, id1, id2);
                }, 1000);
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
                'История</span> <input id="countSms" maxlength="5" ' +
                'style="width: 45px;" value="' + this.numberSms +
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
                'belts', 'rightpocket', 'leftpocket', 'epockets', 'drugs',
                'transport'],
            'sniper': 'snipe'
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
                        // noinspection JSUnresolvedVariable
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
        // noinspection JSUnresolvedVariable
        /**
         * @property target
         * @type {HTMLTableCellElement}
         */
        this.target = general.doc.querySelector('a[href*="/info.ach.php?id="]' +
                '+br+a[href*="/ferma.php?id="]').parentNode.nextElementSibling;
        // noinspection JSUnusedGlobalSymbols
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

            // noinspection JSUnusedGlobalSymbols
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
                new SetPoints().init(rez, ',', false) + '</td></tr>';
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
         * @property trs
         * @type {NodeList|null}
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
            var stData = general.getData(17),
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
                '<option value="3">Уран [2]</option><option value="4">' +
                'Уран [3]</option></select></td></tr><tr><td>Синдикат:</td>' +
                '<td><select id="selectSynd" style="margin-top: 5px;">' +
                '<option value="all">Все</option></select></td></tr></table>';
            general.doc.body.appendChild(divSort);

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
         * @property mainTable
         * @type {Object|null}
         */
        this.mainTable = general.doc.querySelector('table[width="600"]' +
                '[align="center"][cellspacing="0"][cellpadding="0"]');

        /**
         * @method sortBattles
         */
        this.sortBattles = function () {
            var trs = this.mainTable.querySelectorAll('tr'),
                reg = /\/warlog\.php\?bid=(\d+)/,
                battles = {},
                bid,
                i;

            for (i = 1; i < trs.length; i++) {
                bid = reg.exec(trs[i].innerHTML);
                // alert(trs[i].innerHTML);
                if (/<b>(\s?|&nbsp;)?\d+(\s?|&nbsp;)?<\/b>$/.
                        test(trs[i].firstElementChild.innerHTML) &&
                            bid) {
                    if (!battles[bid[1]]) {
                        battles[bid[1]] = [];
                    }

                    battles[bid[1]].push(trs[i].cloneNode(true));
                    trs[i].parentNode.removeChild(trs[i]);
                }
            }

            var target = this.mainTable.querySelector('tr'),
                tr = general.doc.createElement('tr');

            tr.innerHTML = '<td><table class="bordersupdown" width="100%" ' +
                'cellspacing="1" cellpadding="4" align="center" ' +
                'style="margin-bottom: 15px;"><tbody></tbody></table></td>';
            target.parentNode.insertBefore(tr, target);
            target = tr.querySelector('tbody');

            // ссылки на идущие синдикатные бои (таблица внизу страницы)
            var syndBattles = general.doc.
                    querySelectorAll('td[class="greengreenbg"][valign="top"]>' +
                        'a[href*="/warlog.php?bid="]'),
                countBattles = 1,
                color,
                btl;

            for (btl in battles) {
                if (battles.hasOwnProperty(btl)) {
                    color = '';
                    for (i = 0; i < syndBattles.length; i++) {
                        // если бой синдикатный, выделяем зеленым цветом
                        if (btl === reg.exec(syndBattles[i].href)[1]) {
                            color = ' style="color: #00AA00;"';
                            break;
                        }
                    }

                    tr = general.doc.createElement('tr');
                    tr.innerHTML = '<td colspan="8" class="greenbg" ' +
                        'style="text-align: center; font-weight: bold;">' +
                        '<span' + color + '>Бой: ' + countBattles +
                        '</span></td>';
                    target.appendChild(tr);

                    for (i = 0; i < battles[btl].length; i++) {
                        target.appendChild(battles[btl][i]);
                    }

                    countBattles++;
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page=online$/.test(general.loc) && this.mainTable &&
                    this.mainTable.
                        querySelector('td>a[href*="/warlog.php?bid="]>' +
                            'img[src*="/i/icons/"]')) {
                this.sortBattles();
            }
        };
    };

    /**
     * @class HousHealth
     * @constructor
     */
    var HousHealth = function () {
        /**
         * @method showSector
         * @param   {String}    url
         * @param   {string}    sector
         */
        this.showSector = function (url, sector) {
            var _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    cssSelector;

                spanContent.innerHTML = xml.responseText;

                if (!sector) {    // ищем сектор перса
                    cssSelector = 'b+a[href*="/map.php?s"]';
                    sector = spanContent.querySelector(cssSelector).innerHTML;
                    general.root.setTimeout(function () {
                        // на недвижимость перса
                        _this.showSector('http://www.ganjawars.ru/' +
                            'info.realty.php?id=' + general.myID, sector);
                    }, 1000);
                } else {
                    cssSelector = 'table[class="wb"][align="center"]';
                    var table = spanContent.querySelector(cssSelector);

                    if (table) {
                        var trs = table.querySelectorAll('tr'),
                            node,
                            i;

                        for (i = 1; i < trs.length; i++) {
                            node = trs[i].firstElementChild;
                            if (/Частный дом/.test(node.innerHTML) &&
                                    node.nextElementSibling.innerHTML.
                                        indexOf(sector) !== -1) {
                                return;
                            }
                        }
                    }

                    alert('Вы находитесь не в секторе с домиком !');
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.showSector(url, sector);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/b0/.test(general.loc)) {
                general.setData('1', 19);
                return;
            }

            if (general.getData(19)[0]) {
                general.setData('', 19);

                // если здоровье менее 80%
                if (general.doc.querySelector('#hpheader>font')) {
                    this.showSector('http://www.ganjawars.ru/info.php?id=' +
                            general.myID, '');
                }
            }
        };
    };

    /**
     * @class LinksInOne2One
     * @constructor
     */
    var LinksInOne2One = function () {
        /**
         * @method init
         */
        this.init = function () {
            var table = general.doc.querySelector('td[class="txt"]>' +
                    'table[border="0"][cellpadding="5"][cellspacing="1"]');

            if (table) {
                var trs = table.querySelectorAll('tr'),
                    last,
                    name,
                    i;

                for (i = 0; i < trs.length; i++) {
                    last = trs[i].lastElementChild;
                    name = /вызван (.*)( \[\d+\])/.exec(last.innerHTML);
                    if (name) {
                        last.innerHTML = 'вызван <a target="_blank" ' +
                            'href="http://www.ganjawars.ru/search.php?key=' +
                            name[1] + '" style="text-decoration: none; ' +
                            'font-weight: bold;">' + name[1] + '</a>' + name[2];
                    }
                }
            }
        };
    };

    /**
     * @class One2OneCallerInfo
     * @constructor
     */
    var One2OneCallerInfo = function () {
        /**
         * @property weapon
         * @type {Node|null}
         */
        this.weapon = null;
        /**
         * @property twoHand
         * @type {Boolean}
         */
        this.twoHand = false;

        /**
         * @method getRange
         * @param   {int}       ind
         * @param   {string}    str
         */
        this.getRange = function (ind, str) {
            var _this = this,
                a = _this.weapon.querySelectorAll('a'),
                url = a[ind].href,
                range;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                range = /стрельбы: (\d+) ходов/i.exec(xml.responseText);
                str += range ? range[1] : 'не найдена';

                if (!_this.twoHand || ind || (a[1].href === url)) {
                    var div = general.doc.createElement('div');
                    div.setAttribute('style', 'color: #0000FF; ' +
                        'font-weight: bold;');
                    div.innerHTML = str;
                    _this.weapon.appendChild(div);
                } else {
                    str += ', ';
                    general.root.setTimeout(function () {
                        _this.getRange(1, str);
                    }, 1000);
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getRange(ind, str);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var called = general.doc.querySelector('td[class="greengreenbg"]' +
                    '[colspan="2"]>center>b>a[href*="/info.php?id="]');

            if (!called) {
                return;
            }

            general.doc.title = 'БОЙ !!!';
            new PlaySound().init(general.getData(21)[0]);

            var url = called.href,
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    spanHp = general.doc.createElement('span');

                spanContent.innerHTML = xml.responseText;
                // здоровье
                spanHp.innerHTML = /\[(\d+) \/ (\d+)\]/.exec(spanContent.
                    querySelector('td[style="padding-top:3px;"]').innerHTML)[0];
                spanHp.setAttribute('style', 'color: #990000; ' +
                    'margin-left: 5px;');
                called.parentNode.appendChild(spanHp);

                // узел td с изображениями на оружие
                _this.weapon = spanContent.
                    querySelector('table[style="margin-right:1px;"]').
                        parentNode;
                general.doc.querySelector('table[style="padding-top:10px;"]' +
                    '[border="0"][cellspacing="1"][cellpadding="5"]' +
                        '[width="450"]').removeAttribute('width');
                _this.weapon.removeAttribute('rowspan');
                _this.weapon.firstElementChild.removeAttribute('align');
                var target = general.doc.
                        querySelector('td[class="greengreenbg"][colspan="2"]');
                target.parentNode.appendChild(_this.weapon);

                // раскрашиваем умелку
                target.innerHTML = target.innerHTML.replace(/(\(\d+\))/g,
                    '<span style="color: #00C000;">$1</span>');

                // две руки
                _this.twoHand = /Левая/.test(target.innerHTML) &&
                    /Правая/.test(target.innerHTML);

                // узел td со списком умелок
                var cssSelector = 'tr>td+td[align="right"][valign="top"]',
                    skills = spanContent.querySelectorAll(cssSelector)[2];
                skills.setAttribute('colspan', '2');
                var tr = general.doc.createElement('tr');
                tr.appendChild(skills);
                target = target.parentNode.parentNode;
                target.insertBefore(tr, target.lastElementChild);

                // узел td со списком бонусов
                var bonuses = spanContent.
                        querySelectorAll('td[align="center"][valign="top"]')[2];
                tr.appendChild(bonuses);

                // дальность оружия
                general.root.setTimeout(function () {
                    _this.getRange(0, 'Дальность оружия: ');
                }, 1000);
            }, function () {
                general.cons.log('Error xhr on One2OneCallerInfo');
            });
        };
    };

    /**
     * @class PortsAndTerminals
     * @constructor
     */
    var PortsAndTerminals = function () {
        /**
         * @property sectors
         * @type {Array}
         */
        this.sectors = [
            '50&sy=47|', '47&sy=49|', '49&sy=49|1', '51&sy=49|1',
            '53&sy=49|1', '48&sy=50|1', '50&sy=50|1', '52&sy=50|2',
            '49&sy=51|1', '53&sy=51|1', '47&sy=52|', '50&sy=52|1',
            '48&sy=53|1', '49&sy=53|', '53&sy=53|', '152&sy=148|',
            '149&sy=149|', '152&sy=149|1', '150&sy=150|1', '151&sy=150|',
            '149&sy=152|', '151&sy=152|2'
        ];
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'PortsAndTerminals/';

        /**
         * @method init
         */
        this.init = function () {
            var cells = general.doc.
                    querySelectorAll('a[href*="/map.php?sx="]>img'),
                coord,
                cls,
                tmp,
                j,
                i;

            for (i = 0; i < cells.length; i++) {
                // noinspection JSUnresolvedVariable
                coord = /\d+&sy=\d+/.exec(cells[i].parentNode.href)[0];
                for (j = 0; j < this.sectors.length; j++) {
                    tmp = this.sectors[j].split('|');
                    if (coord === tmp[0]) {
                        // noinspection JSUnresolvedFunction
                        cls = cells[i].parentNode.parentNode.
                                getAttribute('class');

                        if (!tmp[1]) {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'anchorS.png' : cls === 'wbb' ?
                                        'anchorS2.png' : 'anchor.png');
                        } else if (tmp[1] === '1') {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'coinsS.png' : cls === 'wbb' ?
                                        'coinsS2.png' : 'coins.png');
                        } else {
                            cells[i].src = this.imgPath + (cls === 'wbr' ?
                                    'bothS.png' : cls === 'wbb' ?
                                        'bothS2.png' : 'both.png');
                        }
                    }
                }
            }
        };
    };

    /**
     * @class RangeWeapon
     * @constructor
     */
    var RangeWeapon = function () {
        /**
         * @property equipment
         * @type {HTMLTableElement}
         */
        this.equipment = general.doc.querySelector('td[colspan="2"]>' +
                'table[border="0"][cellspacing="0"][cellpadding="0"]');
        /**
         * @property weapon
         * @type {Array|null}
         */
        this.weapon = null;
        /**
         * @property range
         * @type {Array}
         */
        this.range = [];

        /**
         * @method setRange
         * @param   {Object}    target
         * @param   {int}       ind
         */
        this.setRange = function (target, ind) {
            var targt = target[ind].nodeName === 'B' ?
                            target[ind] : target[ind].parentNode;
            targt.innerHTML += '<span style="color: #0000FF; ' +
                    'margin-left: 5px; font-weight: bold;">[' +
                    this.range[ind] + ']</span>';
        };

        /**
         * @method showRange
         */
        this.showRange = function () {
            var a  = this.equipment.
                        querySelectorAll('a[style*="font-weight:bold;"]'),
                b = this.equipment.querySelectorAll('b'),
                target = a.length ? a : b,
                i;

            for (i = 0; i < this.range.length; i++) {
                this.setRange(target, i);
            }
        };

        /**
         * @method getRange
         * @param   {int}   ind
         */
        this.getRange = function (ind) {
            var url = this.weapon[ind].parentNode.href,
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var reg = /Дальность стрельбы: (\d+) ход/i;

                _this.range.push(reg.test(xml.responseText) ?
                                    reg.exec(xml.responseText)[1] : '-');

                ind++;
                if (_this.weapon[ind] &&
                        // в правой и левой руке разное оружие
                        _this.weapon[ind - 1].src !== _this.weapon[ind].src) {
                    general.root.setTimeout(function () {
                        _this.getRange(ind);
                    }, 1000);
                } else {
                    if (_this.weapon[ind]) {
                        _this.range.push(_this.range[0]);
                    }
                    _this.showRange();
                }

            }, function () {
                general.root.setTimeout(function () {
                    _this.getRange(ind);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            if (this.equipment &&
                    (/(Левая|Правая) рука/.test(this.equipment.innerHTML))) {
                this.weapon = this.equipment.
                        querySelectorAll('a[href*="/item.php?item_id="]>img');

                var txt = this.equipment.innerHTML;
                if (/Левая/.test(txt) && (/Правая/.test(txt))) {
                    this.weapon = [this.weapon[0], this.weapon[1]];
                } else {
                    this.weapon = [this.weapon[0]];
                }

                this.getRange(0);
            }
        };
    };

    /**
     * @class RentAndSale
     * @constructor
     */
    var RentAndSale = function () {
        /**
         * @method changeColor
         */
        this.changeColor = function () {
            var td = general.doc.querySelector('input[name="sendtype"]').
                        parentNode,
                _this = this,
                color = _this.id === 'donotsend' ? '#E0EEE0' :
                            _this.id === 'send1' ? '#FB8F8F' : '#95CCF6';

            td.style.background = color;
            td.previousElementSibling.style.background = color;
        };

        /**
         * @method init
         */
        this.init = function () {
            var radio = general.doc.querySelectorAll('input[name="sendtype"]');

            if (radio.length) {
                var scrpt = general.doc.createElement('script');
                scrpt.innerHTML = 'function checkPrice(){if(document.' +
                        'getElementById("for_money_id").value=="0"){' +
                        'if(!confirm("Указана цена 0 Гб !!! Продолжить?"))' +
                        'return false;}return true;}';
                general.doc.querySelector('head').appendChild(scrpt);

                general.doc.querySelector('form[action="/home.senditem.php"]').
                    setAttribute('onsubmit', 'return checkPrice();');

                var i;
                for (i = 0; i < radio.length; i++) {
                    radio[i].addEventListener('click', this.changeColor, false);
                }
            }
        };
    };

    /**
     * @class ScanKarma
     * @constructor
     */
    var ScanKarma = function () {
        /**
         * @method init
         */
        this.init = function () {
            if (/\?id=(\d+)/.exec(general.loc)[1] === general.myID) {
                var karma = /Карма:\s\d+\.?\d*\s\((\d+\/\d+)\)/i.
                        exec(general.doc.body.textContent);

                if (karma) {
                    karma = karma[1];
                    if (!general.getData(23)[0]) {
                        general.setData(karma, 23);
                        return;
                    }

                    var oldKarma = general.getData(23)[0];
                    if (karma === oldKarma) {
                        return;
                    }

                    general.setData(karma, 23);

                    oldKarma = oldKarma.split('/');
                    oldKarma[0] = +oldKarma[0];
                    oldKarma[1] = +oldKarma[1];

                    karma = karma.split('/');
                    // noinspection JSValidateTypes
                    karma[0] = +karma[0];
                    // noinspection JSValidateTypes
                    karma[1] = +karma[1];

                    var str = 'Ваша карма была изменена \n\n';
                    if (karma[0] > oldKarma[0]) {
                        str += 'Отрицательная карма увеличилась на ' +
                            (karma[0] - oldKarma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + karma[0] + ')\n';
                    } else if (karma[0] < oldKarma[0]) {
                        str += 'Отрицательная карма уменьшилась на ' +
                            (oldKarma[0] - karma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + karma[0] + ')\n';
                    }

                    if (karma[1] > oldKarma[1]) {
                        str += 'Положительная карма увеличилась на ' +
                            (karma[1] - oldKarma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + karma[1] + ')';
                    } else if (karma[1] < oldKarma[1]) {
                        str += 'Положительная карма уменьшилась на ' +
                            (oldKarma[1] - karma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + karma[1] + ')';
                    }

                    alert(str);
                }
            }
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
                stData = general.getData(24);

            stData[ind] = _this.value !== '0' ? _this.value : '';
            general.setData(stData, 24);
        };

        /**
         * @method showHideLink
         */
        this.showHideLink = function () {
            var stData = general.getData(24),
                persId = stData[6],
                tdLink = general.$('td_link'),
                butReset = general.$('scan_reset'),
                butCheckNow = general.$('scan_checknow'),
                butSave = general.$('scan_save');

            if (persId) {
                tdLink.innerHTML = '<a target="_blank" style="color: ' +
                    '#008000;" href="http://www.ganjawars.ru/info.php?id=' +
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
            var url = 'http://www.ganjawars.ru/search.php?key=' +
                    new UrlEncode().init(persNik),
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
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

                var cssSelector = 'a[href*="/usertransfers.php?id="]',
                    stData = general.getData(24);
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
                general.setData(stData, 24);

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
            var stData = general.getData(24);
            if (!stData[0]) {
                return;
            }

            var url = 'http://www.ganjawars.ru/syndicate.php?id=' + stData[1] +
                    '&page=online',
                persNik = stData[0],
                persId = stData[6],
                _this = this;

            this.showHidePreloader();

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var cssSelector = 'a[href*="/info.php?id=' + persId + '"]',
                    online = spanContent.querySelector('center+br+table').
                        querySelector(cssSelector);

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
                    general.setData(stData, 24);
                    playSound(stData[4]);

                    if (stData[3]) {
                        alert('Персонаж ' + persNik + ' в игре');
                    }
                }

                // вышел
                if (!online && stData[7]) {
                    stData[7] = '';
                    general.setData(stData, 24);
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
            var stData = general.getData(24);

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
                var data = general.getData(24),
                    _this = this;

                sel1.disabled = !_this.checked;
                sel2.disabled = !_this.checked;
                listen1.disabled = !_this.checked;
                listen2.disabled = !_this.checked;
                data[2] = _this.checked ? '1' : '';
                general.setData(data, 24);
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
                var data = general.getData(24),
                    _this = this;

                data[3] = _this.checked ? '1' : '';
                general.setData(data, 24);
            }, false);

            chkAllert.checked = stData[3];

            // кнопка сброса
            var _this = this;
            general.$('scan_reset').addEventListener('click', function () {
                if (confirm('Сбросить данные?')) {
                    var data = general.getData(24);
                    data[0] = '';
                    data[1] = '';
                    data[6] = '';
                    data[7] = '';
                    data[8] = '';
                    general.setData(data, 24);
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

    /**
     * @class ShowInitMessOnForum
     * @constructor
     */
    var ShowInitMessOnForum = function () {
        /**
         * @property pageNum
         * @type {int}
         */
        this.pageNum = 0;
        /**
         * @property messages
         * @type {Array|null}
         */
        this.messages = null;

        /**
         * @method getMessagesOnPages
         * @param   {Object}    obj
         * @return  {NodeList}
         */
        this.getMessagesOnPages = function (obj) {
            return obj.querySelectorAll('td>table[cellpadding="5"]' +
                    '[cellspacing="0"][border="0"]');
        };

        /**
         * @method insertMess
         * @param   {Element}  target
         * @param   {Element}  last
         */
        this.insertMess = function (target, last) {
            target = target.querySelector('tr');
            target.firstElementChild.
                setAttribute('style', 'padding-left: 20px;');

            // noinspection JSUnresolvedVariable
            var author = last.parentNode.previousElementSibling.
                    querySelector('b').innerHTML,
                lastLink = last.previousElementSibling.querySelector('a').href,
                tr = last.querySelector('tr:last-child').cloneNode(true);

            tr.firstElementChild.setAttribute('style', 'border: 1px dashed ' +
                '#339933; background: #C2EDC1;');
            tr.firstElementChild.innerHTML = author + '&nbsp;&nbsp;&nbsp;' +
                '<a href="' + lastLink + '">[&#8593;]</a><br>' +
                tr.firstElementChild.innerHTML;
            target.parentNode.insertBefore(tr, target);
        };

        /**
         * @method parseMessages
         * @param   {int}   ind
         */
        this.parseMessages = function (ind) {
            if (!this.messages[ind]) {
                return;
            }

            var messDiv = this.messages[ind].querySelector('div');
            if (!messDiv) {
                ind++;
                this.parseMessages(ind);
                return;
            }

            var reg = /^\s*\+?\s*(\d+)(,\D+|\.\D+|\)|\s|:|\+\D+)/,
                numReply = reg.exec(messDiv.innerHTML);

            numReply = numReply ? +numReply[1] : 0;

            // нет номера/номер === 0 или число > текущего сообщения
            if (numReply < 1 || numReply >= this.pageNum * 20 + ind + 1) {
                ind++;
                this.parseMessages(ind);
                return;
            }

            // порядковый номер сообщения на странице, на которое отвечаем
            var sequenceNum = numReply < 21 ? numReply - 1 :
                    numReply % 20 !== 0 ? numReply % 20 - 1 : 19,
                // страница, где находится сообщение, на которое отвечаем
                // (на каждой странице 20 сообщений)
                pageReply = Math.floor((numReply - 1) / 20);

            // если сообщение, на которое отвечаем,
            // находится на текущей странице
            if (pageReply === this.pageNum) {
                this.insertMess(this.messages[ind], this.messages[sequenceNum]);
                ind++;
                this.parseMessages(ind);
            } else {
                var url = general.loc.replace(/&page_id=\d+(#\d+)?#?/g, '') +
                        '&page_id=' + pageReply,
                    _this = this;

                new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                    var spanContent = general.doc.createElement('span');
                    spanContent.innerHTML = xml.responseText;

                    var mess = _this.getMessagesOnPages(spanContent);
                    _this.insertMess(_this.messages[ind], mess[sequenceNum]);
                    ind++;
                    general.root.setTimeout(function () {
                        _this.parseMessages(ind);
                    }, 1000);
                }, function () {
                    general.root.setTimeout(function () {
                        _this.parseMessages(ind);
                    }, 1000);
                });
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page_id=\d+/.exec(general.loc)) {
                this.pageNum = +(/&page_id=(\d+)/.exec(general.loc)[1]);
            } else if (/page_id=last/.test(general.loc)) {
                var num = general.doc.querySelector('td[style="cursor:' +
                        'pointer;"][class="greenlightbg"]');
                if (num) {
                    this.pageNum = +num.firstElementChild.innerHTML;
                }
            }

            this.messages = this.getMessagesOnPages(general.doc);
            this.parseMessages(0);
        };
    };

    /**
     * @class SearchUser
     * @constructor
     */
    var SearchUser = function () {
        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();
            if (topPanel) {
                var td = general.doc.createElement('td');
                td.setAttribute('style', 'width: 130px;');
                td.innerHTML = '<form name="fsearch" id="fsearch" ' +
                    'method="GET" action="/search.php">' +
                    '<input id="skey" name="key" value="" ' +
                    'style="width: 130px;" ' +
                    'title="Введите ник и нажмите Enter" /></form>';
                topPanel = topPanel.parentNode.parentNode;
                topPanel = general.DESIGN_VERSION === 'v2' ?
                        topPanel.parentNode : topPanel;
                topPanel.appendChild(td);

                general.$('skey').addEventListener('keypress', function (e) {
                    var ev = e || general.root.event;
                    if (ev.keyCode === 13) {
                        general.$('fsearch').submit();
                    }
                }, false);
            }
        };
    };

    /**
     * @class SkillCounters
     * @constructor
     */
    var SkillCounters = function () {
        /**
         * @property counters
         * @type {NodeList}
         */
        this.counters = general.doc.querySelectorAll('td[valign="top"]' +
                '[bgcolor="#e9ffe9"]>div>table[border="0"] tr>td+td>nobr');
        /**
         * @property ids
         * @type {Array}
         */
        this.ids = [
            'cFighting', 'cEconomic', 'cProduction', 'cGuns', 'cGrenades',
            'cAuto', 'cHeavy', 'cShotguns', 'cSnipers'
        ];
        /**
         * @property dataNow
         * @type {Array|null}
         */
        this.dataNow = null;

        /**
         * @method getHtime
         * @param   {int}   time
         * @return  {String}
         */
        this.getHtime = function (time) {
            var date = new Date(time),
                day = date.getDate(),
                str = '';

            str  += day < 10 ? '0' + day : day;
            str += '.';
            var month = date.getMonth() + 1;
            str += month < 10 ? '0' + month : month;
            str += '.';
            var year = /20(\d+)/.exec(date.getFullYear().toString())[1];
            str += year + ' ' + (/(\d+:\d+):\d+/.exec(date.toString())[1]);

            return str;
        };

        /**
         * @method getValue
         * @param   {Element}   obj
         * @param   {int}       fix
         * @return  {String}
         */
        this.getValue = function (obj, fix) {
            return parseFloat(/\((\d+.?\d*)\)/.
                    exec(obj.innerHTML)[1]).toFixed(fix);
        };

        /**
         * @method getDataNow
         * @param   {Boolean}   loadPage
         */
        this.getDataNow = function (loadPage) {
            var i;
            this.dataNow = [];
            for (i = 0; i < this.counters.length; i++) {
                this.dataNow.
                    push(this.getValue(this.counters[i], i < 3 ? 0 : 2));

                if (loadPage) {
                    // noinspection JSUnresolvedVariable
                    this.counters[i].parentNode.parentNode.lastElementChild.
                        innerHTML = '<span id="' + this.ids[i] +
                        '" style="color: #FF0000; font-size: 9px;"></span>';
                }
            }

            var syndExp = general.doc.querySelector('span>b+nobr+nobr');
            if (syndExp && loadPage) {
                syndExp.innerHTML += '<span id="cSyndExp" ' +
                    'style="color: #FF0000; font-size: 9px;"></span> ' +
                    '<span id="syndLeftToLevel" style="font-size: 8px; ' +
                    'color: #696156;"></span>';
            }

            this.dataNow.push(syndExp ? this.getValue(syndExp, 0) : '');
            this.dataNow.push(new Date().getTime());
        };

        /**
         * @method setLeftToLevel
         * @param   {int}   val
         */
        this.setLeftToLevel = function (val) {
            var syndLevels = [5, 15, 37, 76, 143, 200, 280, 500, 750, 1000,
                1250, 1600, 2200, 3000, 4500, 6000, 9000, 15000, 26394,
                34353, 44377, 56931, 72568, 91947, 115853, 145214, 181127,
                224882, 277996, 342247, 419713, 512821, 624395, 757716, 916591,
                1105426, 1329313, 1594124, 1906627, 2274598, 2723523, 3293658,
                4046236, 5077268, 6541333, 8693509, 11964817, 17100771,
                25421016, 40000000];

            var i;
            for (i = 0; i < syndLevels.length; i++) {
                if (val < syndLevels[i]) {
                    general.$('syndLeftToLevel').innerHTML = '[+' +
                        (syndLevels[i] - val) + ']';
                    break;
                }
            }
        };

        /**
         * @method setCounters
         */
        this.setCounters = function () {
            var stData = general.getData(25),
                i;

            for (i = 0; i < this.counters.length; i++) {
                general.$(this.ids[i]).innerHTML = '[' +
                    ((parseFloat(this.dataNow[i]) - parseFloat(stData[i])).
                        toFixed(i < 3 ? 0 : 2)) + ']';
            }

            // синдовый уровень
            if (this.dataNow[9]) {
                // основной синдикат есть, а прошлого значения синдового нет
                if (!stData[9]) {
                    stData[9] = this.dataNow[9];
                    general.setData(stData, 25);
                }

                general.$('cSyndExp').innerHTML = '[' +
                    (+this.dataNow[9] - (+stData[9])) + ']';
                this.setLeftToLevel(+this.dataNow[9]);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            this.getDataNow(true);
            var stData = general.getData(25);

            if (!stData[0]) {
                stData = this.dataNow;
                general.setData(stData, 25);
            }

            // кнопа сброса счетчиков
            var tr = general.doc.createElement('tr');
            tr.innerHTML = '<td></td><td colspan="2" style="font-weight: ' +
                'bold; font-size: 9px;"><span id="resetCounters" ' +
                'style="cursor: pointer; color: #008000; text-decoration: ' +
                'underline;">Сбросить счетчики</span><br>' +
                '<span id="timeLastReset" style="cursor: default; color: ' +
                '#0000FF;">(' + this.getHtime(+stData[10]) + ')</span></td>';
            general.$('cSnipers').parentNode.parentNode.parentNode.
                appendChild(tr);

            var _this = this;
            general.$('resetCounters').addEventListener('click', function () {
                if (confirm('Сбросить счетчики?')) {
                    _this.getDataNow(false);
                    general.setData(_this.dataNow, 25);
                    general.$('timeLastReset').innerHTML = _this.
                        getHtime(_this.dataNow[10]);
                    _this.setCounters();
                }
            }, false);

            this.setCounters();
        };
    };

    /**
     * @class SyndPtsAnalyser
     * @constructor
     */
    var SyndPtsAnalyser = function () {
        /**
         * @property syndId
         * @type {String}
         */
        this.syndId = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1500;
        /**
         * @property mainTable
         * @type {Element}
         */
        this.mainTable = general.doc.querySelector('center+br+table');
        /**
         * @property lastDate
         * @type {String}
         */
        this.lastDate = '';
        /**
         * @property pers
         * @type {Array|null}
         */
        this.pers = null;
        /**
         * @property soExpForPTS
         * @type {Array|null}
         */
        this.soExpForPTS = null;
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property from
         * @type {int}
         */
        this.from = 0;
        /**
         * @property to
         * @type {int}
         */
        this.to = 0;
        /**
         * @property summ
         * @type {Array|null}
         */
        this.summ = null;
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property all
         * @type {int}
         */
        this.all = 0;
        /**
         * @property control
         * @type {int}
         */
        this.control = 0;
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = general.imgPath + 'SyndPtsAnalyser/';

        /**
         * @method getLastDate
         * @param   {String}    url
         */
        this.getLastDate = function (url) {
            var _url = url || 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&ptslog=1&page_id=100500',
                _this = this;

            new AjaxQuery().init(_url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var counter = general.$('analizePTSCounter');
                if (!url) {
                    general.root.setTimeout(function () {
                        counter.innerHTML = '2/1';
                        _this.getLastDate(spanContent.
                            querySelector('br+center>b>a:last-child').href);
                    }, _this.tm);
                } else {
                    counter.innerHTML = '2/2';
                    var fonts = spanContent.
                            querySelectorAll('nobr>font[color="green"]');
                    _this.lastDate = /\d+.\d+.\d+/.
                            exec(fonts[fonts.length - 1].innerHTML)[0];

                    var inpFrom = general.$('inpDateFrom');
                    inpFrom.value = _this.lastDate;
                    inpFrom.disabled = false;
                    general.$('inpDateTo').disabled = false;
                    general.$('goPTS').disabled = false;
                    general.$('ptsPreloader').style.display = 'none';
                }
            }, function () {
                var preloader = general.$('ptsPreloader');
                preloader.style.display = 'none';
                preloader.parentNode.innerHTML += '<br><span style="color: ' +
                    '#FF0000;">Ошибка ответа сервера...</span>';
            });
        };

        /**
         * @method enterPress
         * @param   {Object}    e
         */
        this.enterPress = function (e) {
            var ev = e || general.root.event;
            if (ev.keyCode === 13) {
                general.$('goPTS').click();
            }
        };

        /**
         * @method showRezult
         * @param   {String}    id
         */
        this.showRezult = function (id) {
            this.mainTable.removeAttribute('class');
            this.mainTable.setAttribute('style', 'border-collapse: ' +
                    'collapse; background: #D0EED0;');

            var str = '<tr style="font-weight: bold;"><td class="wb1">' +
                    'Персонаж</td><td class="wb1"><img id="gren" ' +
                    'style="cursor: pointer; margin: 2px;" src="' +
                    this.imgPath + 'gren.png" title="Покупка гранат" ' +
                    'alt="Гранаты"></td><td class="wb1"><img id="chip" ' +
                    'style="cursor: pointer; margin: 2px;" src="' +
                    this.imgPath + 'chip.png" title="Покупка чипов" ' +
                    'alt="Чипы"></td><td class="wb1"><img id="rank" ' +
                    'style="cursor: pointer; margin: 2px;" src="' +
                    this.imgPath + 'rank.png" title="Выдача званий" ' +
                    'alt="Звания"></td><td class="wb1"><img id="sign" ' +
                    'style="cursor: pointer; margin: 2px;" ' +
                    'src="http://images.ganjawars.ru/img/synds/' + this.syndId +
                    '.gif" title="Выдача знаков" alt="Знаки"></td>' +
                    '<td class="wb1"><span id="all" style="color: #008000; ' +
                    'cursor: pointer;">Всего</span></td></tr>',
                setPoints = new SetPoints().init;

            var getStrDate = new GetStrDate().init,
                txtAreaStr = 'Период анализа: ' +
                    getStrDate(this.from) + ' - ' + getStrDate(this.to) + '\n' +
                        '----------------------------------------------------' +
                            '---------\n\n',
                name,
                gren,
                chip,
                rank,
                sign,
                all,
                i;

            for (i = 0; i < this.pers.length; i++) {
                name = this.pers[i].name;
                gren = setPoints(this.pers[i].gren, '\'', false);
                chip = setPoints(this.pers[i].chip, '\'', false);
                rank = setPoints(this.pers[i].rank, '\'', false);
                sign = setPoints(this.pers[i].sign, '\'', false);
                all = setPoints(this.pers[i].all, '\'', false);

                str += '<tr><td class="wb2"><a target="_blank" ' +
                    'href="http://www.ganjawars.ru/search.php?key=' + name +
                    '" style="text-decoration: none; font-weight: bold; ' +
                    'color: #004400;">' + name + '</a></td><td class="wb1">' +
                    gren + '</td><td class="wb1">' + chip + '</td>' +
                    '<td class="wb1">' + rank + '</td><td class="wb1">' +
                    sign + '</td><td class="wb1" style="color: #008000;">' +
                    all + '</td></tr>';

                txtAreaStr += name + ':\nГранаты: ' + gren + ', Чипы: ' + chip +
                    ', Звания: ' + rank + ', Знак: ' + sign + ', Всего: ' +
                    all + '\n\n';
            }

            var s0 = setPoints(this.summ[0], '\'', false),
                s1 = setPoints(this.summ[1], '\'', false),
                s2 = setPoints(this.summ[2], '\'', false),
                s3 = setPoints(this.summ[3], '\'', false),
                control = setPoints(this.control, '\'', false);

            all = setPoints(this.all, '\'', false);
            str += '<tr style="font-weight: bold;"><td class="wb1" ' +
                'style="color: #0000FF;">Всего</td><td class="wb1" ' +
                'style="color: #0000FF;">' + s0 + '</td>' +
                '<td class="wb1" style="color: #0000FF;">' + s1 +
                '</td><td class="wb1" style="color: #0000FF;">' + s2 +
                '</td><td class="wb1" style="color: #0000FF;">' + s3 +
                '</td><td class="wb1" style="color: #FF0000;">' + all +
                '</td></tr><tr><td class="wb1" colspan="6"><b>Начислено за ' +
                'контроль</b>: <span style="color: #FF0000;">' + control +
                '</span> <b>PTS</b></td></tr>';

            var separator = '------------------------------------------------' +
                '--------------------------------------------------\n';
            txtAreaStr += separator + 'Всего:\n Гранаты: ' + s0 + ', Чипы: ' +
                s1 + ', Звания: ' + s2 + ', Знаки: ' + s3 + ', Всего: ' + all +
                '\n' + separator + 'Начислено за контроль: ' + control +
                ' PTS' + '\n' + separator;

            this.mainTable.innerHTML = str;

            if (!general.$('txtArea')) {
                var center = general.doc.createElement('center'),
                    tArea = general.doc.createElement('textarea');

                tArea.id = 'txtArea';
                tArea.setAttribute('cols', '90');
                tArea.setAttribute('rows', '10');
                tArea.setAttribute('readonly', 'true');
                center.appendChild(tArea);
                var table = this.mainTable,
                    prnt = table.parentNode,
                    br = general.doc.createElement('br');
                prnt.insertBefore(br, table);
                prnt.insertBefore(center, br);
            }

            var txtArea = general.$('txtArea');
            txtArea.value = txtAreaStr;

            // если есть переводы синдового опыта за PTS выводим их
            var len = this.soExpForPTS.length;
            if (len) {
                var div = general.doc.createElement('div');
                div.setAttribute('style', 'margin-top: 15px; width: 650px; ' +
                        'text-align: left;');
                txtArea.parentNode.appendChild(div);
                for (i = 0; i < len; i++) {
                    div.appendChild(this.soExpForPTS[i]);
                }
            }

            var titleSort = general.$(id);
            titleSort.parentNode.style.background = '#A0EEA0';

            general.$('gren').
                addEventListener('click', this.titleClick('gren'), false);
            general.$('chip').
                addEventListener('click', this.titleClick('chip'), false);
            general.$('rank').
                addEventListener('click', this.titleClick('rank'), false);
            general.$('sign').
                addEventListener('click', this.titleClick('sign'), false);
            general.$('all').
                addEventListener('click', this.titleClick('all'), false);
        };

        /**
         * @method titleClick
         * @param   {String}    id
         */
        this.titleClick = function (id) {
            var _this = this;
            return function () {
                _this.sortPers(id);
            };
        };

        /**
         * @method sortPers
         * @param   {String}    prop
         */
        this.sortPers = function (prop) {
            this.pers.sort(function (a, b) {
                var ret;

                if (a[prop] < b[prop]) {
                    ret = 1;
                } else if (a[prop] > b[prop]) {
                    ret = -1;
                } else {
                    ret = 0;
                }

                return ret;
            });

            this.showRezult(prop);
        };

        /**
         * @method addData
         * @param   {Object}    pers
         * @param   {String}    prop
         * @param   {int}       val
         */
        this.addData = function (pers, prop, val) {
            pers[prop] += val;
            pers.all += val;

            var ind;
            switch (prop) {
            case 'gren':
                ind = 0;
                break;
            case 'chip':
                ind = 1;
                break;
            case 'rank':
                ind = 2;
                break;
            case 'sign':
                ind = 3;
                break;
            default:
                break;
            }

            this.summ[ind] += val;
            // noinspection JSUnusedGlobalSymbols
            this.all += val;
        };

        /**
         * @method parsePTSProtocols
         * @param   {int}   ind
         */
        this.parsePTSProtocols = function (ind) {
            general.$('analizePTSCounter').innerHTML = ind;
            var url = 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&ptslog=1&page_id=' + ind,
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var lines = spanContent.
                        querySelectorAll('nobr>font[color="green"]');

                if (!lines.length) {
                    _this.sortPers('all');
                    return;
                }

                var getTimestamp = new GetTimestamp().init,
                    nobr1,
                    nobr2,
                    pers,
                    time,
                    rez,
                    str,
                    i;

                for (i = 0; i < lines.length; i++) {
                    time = getTimestamp(lines[i].innerHTML);
                    if (time > _this.to) {
                        continue;
                    }

                    if (time < _this.from) {
                        _this.sortPers('all');
                        return;
                    }

                    nobr1 = lines[i].parentNode;
                    nobr2 = nobr1.nextElementSibling;
                    str = nobr2.innerHTML;

                    rez = /(.*) купил.* за (\d+) PTS/.exec(str);
                    if (rez) {
                        pers = _this.getPers(rez[1]);
                        _this.addData(pers, /чип/i.test(str) ? 'chip' : 'gren',
                            +rez[2]);
                        continue;
                    }

                    rez = /выдал значок персонажу (.*) \((\d+) PTS/.exec(str);
                    if (rez) {
                        pers = _this.getPers(rez[1]);
                        _this.addData(pers, 'sign', +rez[2]);
                        continue;
                    }

                    rez = /Продлено звание для (.*) за (\d+) PTS/.exec(str);
                    if (rez) {
                        pers = _this.getPers(rez[1]);
                        _this.addData(pers, 'rank', +rez[2]);
                        continue;
                    }

                    rez = /выдал звание .* персонажу (.*) \((\d+) PT/.exec(str);
                    // бывает так:
                    // LPRulez выдал звание Private персонажу shiftman (0 PTS)
                    if (rez && rez[2] !== '0') {
                        pers = _this.getPers(rez[1]);
                        _this.addData(pers, 'rank', +rez[2]);
                        continue;
                    }

                    rez = /Начислено \$.* и (\d+) PTS за контроль/.exec(str);
                    if (rez) {
                        _this.control += +rez[1];
                    }

                    // перевод синдового опыта за PTS
                    rez = /\d+ ед. синдикатного опыта за \d+ PTS/.exec(str);
                    if (rez) {
                        _this.soExpForPTS.push(nobr1);
                        _this.soExpForPTS.push(nobr2);
                        _this.soExpForPTS.push(general.doc.createElement('br'));
                    }
                }

                general.root.setTimeout(function () {
                    ind++;
                    _this.parsePTSProtocols(ind);
                }, _this.tm);
            }, function () {
                general.root.setTimeout(function () {
                    _this.parsePTSProtocols(ind);
                }, _this.tm);
            });
        };

        /**
         * @method getPers
         * @param   {String}    nik
         * @return  {Object}
         */
        this.getPers = function (nik) {
            var i;
            for (i = 0; i < this.pers.length; i++) {
                if (this.pers[i].name === nik) {
                    return this.pers[i];
                }
            }

            var pers = {name: nik, gren: 0, chip: 0, sign: 0, rank: 0, all: 0};
            this.pers.push(pers);

            return pers;
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.
                    querySelector('td[colspan="3"]>a[href*="&ptslog=1"]').
                        parentNode;

            //css-ботва
            var style = general.doc.createElement('style');
            style.innerHTML = '.wb1 {text-align:center; padding-left:3px; ' +
                'border: 1px #339933 solid;} .wb2 {padding-left:3px; ' +
                'padding-right:3px; border: 1px #339933 solid;}';
            general.doc.querySelector('head').appendChild(style);

            if (target.lastElementChild.nodeName === 'BR') {
                target.removeChild(target.lastElementChild);
            }

            var butShowPTSAnalizePanel = general.doc.createElement('a');
            butShowPTSAnalizePanel.innerHTML = 'Анализ PTS';
            butShowPTSAnalizePanel.setAttribute('style', 'cursor: pointer');
            // noinspection JSCheckFunctionSignatures
            target.appendChild(general.doc.createTextNode(' | '));
            target.appendChild(butShowPTSAnalizePanel);

            var _this = this;
            butShowPTSAnalizePanel.addEventListener('click', function () {
                if (general.$('inpDateFrom')) {
                    return;
                }

                var table = _this.mainTable,
                    tArea = general.$('txtArea');

                if (tArea) {
                    table.parentNode.
                        removeChild(table.previousElementSibling);
                    table.parentNode.
                        removeChild(table.previousElementSibling);
                }

                table.setAttribute('class', 'wb');
                table.setAttribute('width', '600');
                table.setAttribute('style', 'margin-bottom: 50px;');

                var getStrDate = new GetStrDate().init;
                table.innerHTML = '<tr><td>' +
                    'Введите даты в формате дд.мм.гг<br>' +
                    'с: <input id="inpDateFrom" maxlength="8" ' +
                    'value="" style="width: 70px;" disabled> до: ' +
                    '<input id="inpDateTo" maxlength="8" value="' +
                    getStrDate('now')  + '" style="width: 70px;" disabled> ' +
                    '<input type="button" id="goPTS" value=">>" disabled>' +
                    '<span id="ptsPreloader" style="margin-left: 10px;">' +
                    '<img src="' + general.imgPath + 'preloader.gif" />' +
                    '<span id="analizePTSCounter" style="color: #0000FF; ' +
                    'margin-left: 10px;">2/0</span></span></td></tr>';

                _this.getLastDate('');

                general.$('inpDateFrom').
                    addEventListener('keypress', _this.enterPress, false);
                general.$('inpDateTo').
                    addEventListener('keypress', _this.enterPress, false);

                var getTimestamp = new GetTimestamp().init;
                general.$('goPTS').addEventListener('click', function () {
                    _this.from = getTimestamp(general.$('inpDateFrom').value);
                    _this.to = getTimestamp(general.$('inpDateTo').value);

                    var dateStrNow = getStrDate('now');
                    if (!_this.from || !_this.to ||
                            _this.from < getTimestamp(_this.lastDate) ||
                                _this.to > getTimestamp(dateStrNow) ||
                                    _this.from > _this.to) {
                        alert('Не верно введена дата !!!\n' +
                            'Первая запись в протоколе: ' + _this.lastDate +
                            '\nСегодня: ' + dateStrNow);
                        return;
                    }

                    general.$('ptsPreloader').style.display = '';
                    general.$('inpDateFrom').disabled = true;
                    general.$('inpDateTo').disabled = true;
                    general.$('goPTS').disabled = true;

                    _this.pers = [];
                    _this.soExpForPTS = [];
                    // гранаты, чипы, звания, знаки
                    _this.summ = [0, 0, 0, 0, 0];
                    _this.all = 0;
                    _this.control = 0;
                    _this.parsePTSProtocols(0);
                }, false);
            }, false);
        };
    };

    /**
     * @class SyndAnalyser
     * @constructor
     */
    var SyndAnalyser = function () {
        /**
         * @property syndId
         * @type {String}
         */
        this.syndId = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property mainTable
         * @type {Element}
         */
        this.mainTable = general.doc.querySelector('center+br+table');
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1500;
        /**
         * @property lastDate
         * @type {String}
         */
        this.lastDate = '';
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property from
         * @type {int}
         */
        this.from = 0;
        /**
         * @property to
         * @type {int}
         */
        this.to = 0;
        /**
         * @property mainData
         * @type {Object|null}
         */
        this.mainData = null;

        /**
         * @class MainData
         * @constructor
         */
        var MainData = function () {
            /**
             * @property pers
             * @type {Array}
             */
            this.pers = [];
            /**
             * @property allProtect
             * @type {int}
             */
            this.allProtect = 0;
            /**
             * @property allAttaks
             * @type {int}
             */
            this.allAttaks = 0;
            /**
             * @property allTake
             * @type {int}
             */
            this.allTake = 0;
            /**
             * @property allPut
             * @type {int}
             */
            this.allPut = 0;
            /**
             * @property takenSynd
             * @type {Array}
             */
            this.takenSynd = [];
            /**
             * @property dismissedSynd
             * @type {Array}
             */
            this.dismissedSynd = [];
            /**
             * @property realEstate
             * @type {Object}
             */
            this.realEstate = {
                es: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                uran: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                bars: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                another: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0}
            };
        };

        /**
         * @method getLastDate
         * @param   {String}    url
         */
        this.getLastDate = function (url) {
            var _url = url || 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&page_id=100500',
                _this = this;

            new AjaxQuery().init(_url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var counter = general.$('syndAnalyseCounter');
                if (!url) {
                    general.root.setTimeout(function () {
                        counter.innerHTML = '2/1';
                        _this.getLastDate(spanContent.
                            querySelector('br+center>b>a:last-child').href);
                    }, _this.tm);
                } else {
                    counter.innerHTML = '2/2';
                    var fonts = spanContent.
                            querySelectorAll('nobr>font[color="green"]');
                    _this.lastDate = /\d+.\d+.\d+/.
                            exec(fonts[fonts.length - 1].innerHTML)[0];

                    var inpFrom = general.$('inpDateFrom');
                    inpFrom.value = _this.lastDate;
                    inpFrom.disabled = false;
                    general.$('inpDateTo').disabled = false;
                    general.$('goSAnalyse').disabled = false;
                    general.$('syndAnalysePreloader').style.display = 'none';
                }
            }, function () {
                var preloader = general.$('syndAnalysePreloader');
                preloader.style.display = 'none';
                preloader.parentNode.innerHTML += '<br><span style="color: ' +
                    '#FF0000;">Ошибка ответа сервера...</span>';
            });
        };

        /**
         * @method enterPress
         * @param   {Object}    e
         */
        this.enterPress = function (e) {
            var ev = e || general.root.event;
            if (ev.keyCode === 13) {
                general.$('goSAnalyse').click();
            }
        };

        /**
         * @method getPers
         * @param   {Object}   link
         * @return  {Object}
         */
        this.getPers = function (link) {
            var i;
            for (i = 0; i < this.mainData.pers.length; i++) {
                if (this.mainData.pers[i].link === link.href) {
                    return this.mainData.pers[i];
                }
            }

            var pers = {
                link: link.href,
                name: link.firstElementChild.innerHTML,
                attaks: 0,
                putMoney: 0,
                takeMoney: 0
            };

            this.mainData.pers.push(pers);

            return pers;
        };

        /**
         * @method getTypeLine
         * @param   {String}    str
         * @return  {int|Object}
         */
        this.getTypeLine = function (str) {
            if (/инициировал нападение/i.test(str) &&
                    !(/контроль/i.test(str))) {
                return 1;
            }

            if (/На контролируемый объект/i.test(str)) {
                return 2;
            }

            if (/снято со счета/i.test(str)) {
                return {takeOff: +(/\$(\d+)/.exec(str)[1])};
            }

            if (/переведено на счет/i.test(str)) {
                return {takeOn: +(/\$(\d+)/.exec(str)[1])};
            }

            if (/на нападения на электростанции/i.test(str)) {
                return 3;
            }

            if (/на нападения на рудники/i.test(str)) {
                return 4;
            }

            if (/нападениях на остальную/i.test(str)) {
                return 5;
            }

            if (/принят/i.test(str)) {
                return 6;
            }

            if (/вышел/i.test(str)) {
                return 7;
            }

            if (/в нападениях за контроль баров/i.test(str)) {
                return 8;
            }

            // выгнали
            if (/покинул синдикат/i.test(str)) {
                return 9;
            }

            return 0;
        };

        /**
         * @method getPersLink
         * @param    {Element}  elem
         * @return   {Element}
         */
        this.getPersLink = function (elem) {
            // noinspection JSUnresolvedVariable
            return elem.parentNode.nextElementSibling.querySelector('a');
        };

        /**
         * @method parseLine
         * @param   {String}    str
         * @param   {Object}    obj
         */
        this.parseLine = function (str, obj) {
            var rez = /\$(\d+).*и (\d+).*\$(\d+).*и (\d+)/.exec(str);

            if (rez) {
                obj.mMoney += +rez[1].replace(/,/g, '');
                obj.mPTS += +rez[2].replace(/,/g, '');
                obj.pMoney += +rez[3].replace(/,/g, '');
                obj.pPTS += +rez[4].replace(/,/g, '');
            }
        };

        /**
         * @method getRealEstateStr
         * @param   {Object}    obj
         * @param   {String}    name
         * @param   {String}    title
         * @param   {String}    str1
         * @param   {String}    str2
         * @param   {String}    str3
         * @return  {String}    str
         */
        this.getRealEstateStr = function (obj, name, title, str1, str2, str3) {
            var setPoints = new SetPoints().init;

            return title + name + str3 +
                str1 + 'Потрачено гб' + str2 + '$' +
                setPoints(obj.mMoney, '\'', false) + str3 + str1 +
                'Заработано гб' + str2 + '$' +
                setPoints(obj.pMoney, '\'', false) + str3 +
                str1 + '<span style="font-weight: bold;">Итого:</span>' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(obj.pMoney - obj.mMoney, '\'', true) + '</span>' +
                str3 + str1 + 'Потрачено PTS' + str2 +
                setPoints(obj.mPTS, '\'', false) + str3 +
                str1 + 'Заработано PTS' + str2 +
                setPoints(obj.pPTS, '\'', false) + str3 + str1 +
                '<span style="font-weight: bold;">Итого:</span>' + str2 +
                '<span style="font-weight: bold;">' +
                setPoints(obj.pPTS - obj.mPTS, '\'', true) + '</span>' +
                str3;
        };

        /**
         * @method showRezult
         */
        this.showRezult = function () {
            this.sortPers();

            var setPoints = new SetPoints().init,
                main = this.mainData,
                str1 = '<tr><td class="wb">',
                str2 = '</td><td class="wb">',
                str3 = '</td></tr>',
                strTakeMoney = '',
                strPutMoney = '',
                strAttaks = '',
                persLink,
                pers,
                val,
                i;

            for (i = 0; i < main.pers.length; i++) {
                pers = main.pers[i];
                persLink = '<a target="_blank" style="font-weight: bold; ' +
                    'text-decoration: none; color: #004400;" ' +
                    'href="' + pers.link + '">' + pers.name + '</a>';

                if (pers.attaks) {
                    val = setPoints(pers.attaks, '\'', false);
                    strAttaks += str1 + persLink + str2 + val + str3;
                }

                if (pers.takeMoney) {
                    val = '$' + setPoints(pers.takeMoney, '\'', false);
                    strTakeMoney += str1 + persLink + str2 + val + str3;
                }

                if (pers.putMoney) {
                    val = '$' + setPoints(pers.putMoney, '\'', false);
                    strPutMoney += str1 + persLink + str2 + val + str3;
                }
            }

            var str4 = '<tr><td colspan="2" class="wb"><a target="_blank" ' +
                    'style="text-decoration: none; font-weight: bold; color: ' +
                    '#004400;" href="http://www.ganjawars.ru/search.php?key=',
                strDismissedSynd = '',
                strTakenSynd = '';

            for (i = 0; i < main.dismissedSynd.length; i++) {
                pers = main.dismissedSynd[i][0];
                strDismissedSynd += str4 + pers + '">' + pers + '</a>, ' +
                    main.dismissedSynd[i][1] + str3;
            }

            for (i = 0; i < main.takenSynd.length; i++) {
                pers = main.takenSynd[i][0];
                strTakenSynd += str4 + pers + '">' + pers + '</a>, ' +
                    main.takenSynd[i][1] + str3;
            }

            var title = '<tr><td colspan="2" style="background: #D0EED0; ' +
                'text-align: center; font-weight: bold;">',
                r = main.realEstate;

            this.mainTable.innerHTML = title + 'Нападающие [' +
                'нападений: <span style="color: #FF0000;">' + main.allAttaks +
                '</span>, защит: <span style="color: #0000FF;">' +
                main.allProtect + '</span>, всего боев: <span style="color: ' +
                '#990000;">' + (main.allAttaks + main.allProtect) + '</span>]' +
                str3 + strAttaks +

                this.getRealEstateStr(r.es, 'Электростанции',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.uran, 'Урановые рудники',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.bars, 'Бары',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.another, 'Другая недвижимость',
                        title, str1, str2, str3) +

                title + 'Счет синдиката [$<span style="color: #990000;">' +
                setPoints(main.allPut - main.allTake, '\'', true) +
                '</span>]' + str3 + str1 + '<span style="font-weight: bold; ' +
                'color: #FF0000;">Взяли со счета</span> (всего)' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(main.allTake, '\'', false) + '</span>' + str3 +
                strTakeMoney + str1 + '<span style="font-weight: bold; ' +
                'color: #0000FF;">Положили на счет</span> (всего)' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(main.allPut, '\'', false) + '</span>' + str3 +
                strPutMoney + title + 'Состав' + str3 + '<tr><td colspan="2" ' +
                'class="wb"><span style="font-weight: bold; color: #FF0000;">' +
                'Вышли из синдиката</span> (всего ' +
                main.dismissedSynd.length + ')' + str3 + strDismissedSynd +
                '<tr><td colspan="2" class="wb"><span style="font-weight: ' +
                'bold; color: #0000FF;">Приняты в синдикат</span> (всего ' +
                main.takenSynd.length + ')' + str3 + strTakenSynd;
        };

        /**
         * @method sortPers
         */
        this.sortPers = function () {
            this.mainData.pers.sort(function (a, b) {
                var ret;

                if (a.attaks < b.attaks) {
                    ret = 1;
                } else if (a.attaks > b.attaks) {
                    ret = -1;
                } else {
                    ret = 0;
                }

                return ret;
            });
        };

        /**
         * @method parseSyndProtocols
         * @param   {int}   ind
         */
        this.parseSyndProtocols = function (ind) {
            general.$('syndAnalyseCounter').innerHTML = ind;
            var url = 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&page_id=' + ind,
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var lines = spanContent.
                        querySelectorAll('nobr>font[color="green"]');

                if (!lines.length) {
                    _this.showRezult();
                    return;
                }

                var getTimestamp = new GetTimestamp().init,
                    typeLine,
                    take,
                    pers,
                    time,
                    tmp,
                    str,
                    i;

                for (i = 0; i < lines.length; i++) {
                    time = getTimestamp(lines[i].innerHTML);
                    if (time > _this.to) {
                        continue;
                    }

                    if (time < _this.from) {
                        _this.showRezult();
                        return;
                    }

                    // noinspection JSUnresolvedVariable
                    str = lines[i].parentNode.nextElementSibling.innerHTML;
                    typeLine = _this.getTypeLine(str);

                    if (!typeLine) {
                        continue;
                    }

                    //перс положил или взял со счета
                    take = typeLine.takeOff || typeLine.takeOn;
                    if (take) {
                        pers = _this.getPers(_this.getPersLink(lines[i]));
                        if (typeLine.takeOff) {
                            pers.takeMoney += take;
                            _this.mainData.allTake += take;
                        } else {
                            pers.putMoney += take;
                            _this.mainData.allPut += take;
                        }

                        continue;
                    }

                    str = str.replace(/,/g, '');
                    switch (typeLine) {
                    case 1:
                        _this.getPers(_this.getPersLink(lines[i])).attaks++;
                        _this.mainData.allAttaks++;
                        break;
                    case 2:
                        _this.mainData.allProtect++;
                        break;
                    case 3:
                        _this.parseLine(str, _this.mainData.realEstate.es);
                        break;
                    case 4:
                        _this.parseLine(str, _this.mainData.realEstate.uran);
                        break;
                    case 5:
                        _this.parseLine(str, _this.mainData.realEstate.another);
                        break;
                    case 6:
                        _this.mainData.takenSynd.
                            push([_this.getPersLink(lines[i]).
                                    firstElementChild.innerHTML,
                                lines[i].innerHTML]);
                        break;
                    case 7:
                        _this.mainData.dismissedSynd.
                            push([_this.getPersLink(lines[i]).
                                    firstElementChild.innerHTML,
                                lines[i].innerHTML]);
                        break;
                    case 8:
                        _this.parseLine(str, _this.mainData.realEstate.bars);
                        break;
                    case 9:
                        // выгнали
                        tmp = /^(.*) покинул синдикат( \(.*\))/.exec(str);
                        if (tmp) {
                            _this.mainData.dismissedSynd.push([tmp[1],
                                lines[i].innerHTML + tmp[2]]);
                        }

                        break;
                    default:
                        break;
                    }
                }

                general.root.setTimeout(function () {
                    ind++;
                    _this.parseSyndProtocols(ind);
                }, _this.tm);
            }, function () {
                general.root.setTimeout(function () {
                    _this.parseSyndProtocols(ind);
                }, _this.tm);
            });

        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.
                    querySelector('td[colspan="3"]>a[href*="&ptslog=1"]').
                        parentNode;

            if (target.lastElementChild.nodeName === 'BR') {
                target.removeChild(target.lastElementChild);
            }

            var butShowAnalysePanel = general.doc.createElement('a');
            butShowAnalysePanel.innerHTML = 'Анализ активности';
            butShowAnalysePanel.setAttribute('style', 'cursor: pointer');
            // noinspection JSCheckFunctionSignatures
            target.appendChild(general.doc.createTextNode(' | '));
            target.appendChild(butShowAnalysePanel);

            var _this = this;
            butShowAnalysePanel.addEventListener('click', function () {
                if (general.$('inpDateFrom')) {
                    return;
                }

                _this.mainTable.setAttribute('class', 'wb');
                _this.mainTable.removeAttribute('style');

                var getStrDate = new GetStrDate().init;
                _this.mainTable.innerHTML = '<tr><td>' +
                    'Введите даты в формате дд.мм.гг<br>' +
                    'с: <input id="inpDateFrom" maxlength="8" ' +
                    'value="" style="width: 70px;" disabled> до: ' +
                    '<input id="inpDateTo" maxlength="8" value="' +
                    getStrDate('now')  + '" style="width: 70px;" disabled> ' +
                    '<input type="button" id="goSAnalyse" value=">>" ' +
                    'disabled><span id="syndAnalysePreloader" ' +
                    'style="margin-left: 10px;"><img src="' + general.imgPath +
                    'preloader.gif" /><span id="syndAnalyseCounter" ' +
                    'style="color: #0000FF; margin-left: 10px;">2/0</span>' +
                    '</span></td></tr>';

                _this.getLastDate('');

                general.$('inpDateFrom').
                    addEventListener('keypress', _this.enterPress, false);
                general.$('inpDateTo').
                    addEventListener('keypress', _this.enterPress, false);

                var getTimestamp = new GetTimestamp().init;
                general.$('goSAnalyse').addEventListener('click', function () {
                    _this.from = getTimestamp(general.$('inpDateFrom').value);
                    _this.to = getTimestamp(general.$('inpDateTo').value);

                    var dateStrNow = getStrDate('now');
                    if (!_this.from || !_this.to ||
                            _this.from < getTimestamp(_this.lastDate) ||
                                _this.to > getTimestamp(dateStrNow) ||
                                    _this.from > _this.to) {
                        alert('Не верно введена дата !!!\n' +
                            'Первая запись в протоколе: ' + _this.lastDate +
                            '\nСегодня: ' + dateStrNow);
                        return;
                    }

                    general.$('syndAnalysePreloader').style.display = '';
                    general.$('inpDateFrom').disabled = true;
                    general.$('inpDateTo').disabled = true;
                    general.$('goSAnalyse').disabled = true;

                    _this.mainData = new MainData();
                    _this.parseSyndProtocols(0);
                }, false);
            }, false);
        };
    };

    /**
     * @class ShowMyAchievements
     * @constructor
     */
    var ShowMyAchievements = function () {
        /**
         * @property divResult
         * @type {HTMLElement|null}
         */
        this.divResult = null;

        /**
         * @method addCloseButton
         */
        this.addCloseButton = function () {
            this.divResult.innerHTML += '<img id="closemyachiev" ' +
                'src="' + general.imgPath + 'close.gif" style="cursor: ' +
                'pointer;" />';

            var _this = this;
            general.$('closemyachiev').addEventListener('click', function () {
                _this.divResult.style.visibility = 'hidden';
            }, false);
        };

        /**
         * @method getAchievNow
         * @param   {Object}    obj
         */
        this.getAchievNow = function (obj) {
            return obj.querySelectorAll('td[bgcolor="#ffffff"]>' +
                    'font[color="#336633"]');
        };

        /**
         * @method showData
         * @param   {Object}    ths
         */
        this.showData = function (ths) {
            var pos = new GetPos().init(ths);
            this.divResult.style.left = pos.x;
            this.divResult.style.top = pos.y + 25;
            this.divResult.style.visibility = 'visible';
            this.divResult.innerHTML = '<img src="' + general.imgPath +
                'preloader.gif' + '">';

            var stData = general.getData(26),
                url = 'http://www.ganjawars.ru/info.ach.php?id=' + general.myID;

            if (!stData[0]) {
                this.divResult.innerHTML = 'Не выбрано ни одной ачивки на ' +
                    '<a target="_blank" href="' + url + '">этой</a> странице.';
                this.addCloseButton();
            } else {
                var _this = this;
                new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                    var spanContent = general.doc.createElement('span');
                    spanContent.innerHTML = xml.responseText;

                    var achievNow = _this.getAchievNow(spanContent),
                        str = '<table>',
                        i;

                    for (i = 0; i < achievNow.length; i++) {
                        if (new RegExp('(^|,)' + i + '(,|$)').test(stData[0])) {
                            str += '<tr>' + achievNow[i].parentNode.parentNode.
                                innerHTML + '</tr>';
                        }
                    }

                    _this.divResult.innerHTML = str + '</table>';
                    _this.addCloseButton();
                }, function () {
                    _this.divResult.innerHTML = '<span style="color: ' +
                        '#FF0000;">Ошибка ответа сервера...</span>';
                    _this.addCloseButton();
                });
            }
        };

        /**
         * @method setChkHandler
         */
        this.setChkHandler = function () {
            var chks = general.doc.querySelectorAll('input[id^="achiev"]'),
                str = '',
                i;

            for (i = 0; i < chks.length; i++) {
                if (chks[i].checked) {
                    str += (/\d+/.exec(chks[i].id)[0]) + ',';
                }
            }

            general.setData([str.replace(/,$/, '')], 26);
        };

        /**
         * @method setCheckboxes
         */
        this.setCheckboxes = function () {
            var achievNow = this.getAchievNow(general.doc),
                stData = general.getData(26),
                target,
                prnt,
                chk,
                i;

            for (i = 0; i < achievNow.length; i++) {
                chk = general.doc.createElement('input');
                chk.type = 'checkbox';
                chk.id = 'achiev' + i;
                chk.checked = new RegExp('(^|,)' + i + '(,|$)').test(stData[0]);

                prnt = achievNow[i].parentNode;
                target = prnt.firstChild.nodeType === 3 ?
                            prnt.firstChild : prnt.firstChild.nextSibling;

                prnt.insertBefore(chk, target);
                chk.addEventListener('click', this.setChkHandler, false);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();

            if (topPanel) {
                this.divResult = general.doc.createElement('div');
                this.divResult.setAttribute('style', 'visibility: hidden; ' +
                        'position: absolute; padding: 3px; background-color: ' +
                        '#E7FFE7; border: solid 1px #339933; ' +
                        'max-width: 300px; border-radius:5px; top:0; left:0; ' +
                        'box-shadow: 5px 6px 6px rgba(122,122,122,0.5);');
                general.doc.body.appendChild(this.divResult);

                var span = general.doc.createElement('span');
                span.innerHTML = 'Достижения';
                span.id = 'spanAchievements';
                span.setAttribute('style', 'cursor: pointer;');

                var _this = this;
                span.addEventListener('click', function () {
                    _this.showData(this);
                }, false);

                // noinspection JSCheckFunctionSignatures
                topPanel.appendChild(general.doc.createTextNode(' | '));
                topPanel.appendChild(span);

                // на странице своих ачивок
                if (general.loc.
                        indexOf('/info.ach.php?id=' + general.myID) !== -1) {
                    this.setCheckboxes();
                }
            }
        };
    };

    /**
     * @class SyndOnlineOnMainPage
     * @constructor
     */
    var SyndOnlineOnMainPage = function () {
        /**
         * @property syndUnion
         * @type {HTMLElement|null}
         */
        this.syndUnion = null;
        /**
         * @property syndMain
         * @type {HTMLElement|null}
         */
        this.syndMain = null;

        /**
         * @method setSms
         */
        this.setSms = function () {
            var nobrs = general.$('friendsbody').querySelectorAll('nobr');
            if (nobrs.length) {
                var pLink, i;
                for (i = 0; i < nobrs.length; i++) {
                    pLink = nobrs[i].querySelector('a[href*="/info.php?id="]');
                    if (pLink) {
                        nobrs[i].innerHTML += '<a target="_blank" ' +
                            'href="/sms-create.php?mailto=' +
                            pLink.firstElementChild.innerHTML + '"><img ' +
                            'src="http://images.ganjawars.ru/i/sms.gif" /></a>';
                    }
                }

                return false;
            }
        };

        /**
         * @method getOnline
         * @param   {Boolean}   type
         */
        this.getOnline = function (type) {
            var target = general.$('friendsbody');
            if (!target.querySelector('div')) {
                target.innerHTML = '<div></div>' + (this.syndUnion ?
                        '<hr style="color: #C3C3C3;" /><div></div>' : '');
            }

            target = type ? target.lastElementChild : target.firstElementChild;
            target.innerHTML = '<img src="' + general.imgPath +
                'preloader.gif" />';

            var url = (type ? this.syndUnion.href : this.syndMain.href) +
                    '&page=online',
                _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                target.innerHTML = '<a href="' + url + '">' +
                    '<img src="http://images.ganjawars.ru/img/synds/' +
                    (/\?id=(\d+)/.exec(url)[1]) + '.gif" /></a> (' +
                    (/<b>(\d+) бойцов онлайн<\/b>/.
                        exec(spanContent.innerHTML)[1]) + ')<br>';

                var cssSelector = 'table[class="bordersupdown"][width="100%"]',
                    trs = spanContent.querySelector(cssSelector).
                        querySelectorAll('tr');

                if (trs.length > 1) {
                    var nobr, pers, syndImg, war, i;
                    for (i = 1; i < trs.length; i++) {
                        syndImg = trs[i].querySelector('a[href*=' +
                            '"/syndicate.php?id="]');
                        pers = trs[i].querySelector('a[href*="/info.php?id="]');
                        war = trs[i].
                            querySelector('a[href*="/warlog.php?bid="]');

                        nobr = general.doc.createElement('nobr');
                        if (syndImg) {
                            nobr.appendChild(syndImg);
                        }

                        if (war) {
                            pers.setAttribute('style', 'color: #FF0000;');
                        }

                        nobr.appendChild(pers);
                        nobr.innerHTML += ' <a target="_blank" ' +
                            'href="http://www.ganjawars.ru/sms-create.php?' +
                            'mailto=' + pers.firstElementChild.innerHTML +
                            '"><img src="http://images.ganjawars.ru/i/' +
                            'sms.gif" /></a>';

                        target.appendChild(nobr);
                        target.innerHTML += i < trs.length - 1 ? ',<wbr>' : '';
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getOnline(type);
                }, 1000);
            });
        };

        /**
         * @method createLink
         * @param   {String}    name
         * @param   {Boolean}   type
         * @return  {HTMLElement}
         */
        this.createLink = function (name, type) {
            var link = general.doc.createElement('a');
            link.setAttribute('style', 'text-decoration: underline; ' +
                    'cursor: pointer;');
            link.innerHTML = name;
            var _this = this;
            link.addEventListener('click', function () {
                _this.getOnline(type);
            }, false);

            return link;
        };

        /**
         * @method init
         */
        this.init = function () {
            // гости, друзья - ставим конвертики для отправки письма
            var friends = general.doc.querySelector('a[onclick*="setfriends"]'),
                guests = general.doc.querySelector('a[onclick*="setvisitor"]');

            friends.addEventListener('click', this.setSms, false);
            guests.addEventListener('click', this.setSms, false);
            friends.click();

            // основной синдикат
            this.syndMain = general.doc.
                    querySelector('span>b+nobr>a[href*="/syndicate.php?id="]');

            if (this.syndMain) {
                var b = general.doc.createElement('b');
                // noinspection JSCheckFunctionSignatures
                b.appendChild(general.doc.createTextNode(' / '));
                b.appendChild(this.createLink('Основа', false));
                guests.parentNode.parentNode.appendChild(b);

                var url = this.syndMain.href + '&page=politics',
                    _this = this;

                new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                    var spanContent = general.doc.createElement('span');
                    spanContent.innerHTML = xml.responseText;

                    var cssSelector = 'tr>td[colspan="3"]' +
                        '[class="greengreenbg"]>' +
                        'a[href*="/syndicate.php?id="]:last-child';
                    _this.syndUnion = spanContent.querySelector(cssSelector);

                    if (_this.syndUnion) {
                        // noinspection JSCheckFunctionSignatures
                        b.appendChild(general.doc.createTextNode(' '));
                        b.appendChild(_this.createLink('Союз', true));
                    }
                }, function () {
                    general.cons.log('Error request to: ' + url);
                });
            }
        };
    };

    /**
     * @class TimeKarma
     * @constructor
     */
    var TimeKarma = function () {
        /**
         * @method formatTime
         * @param   {int}   sec
         */
        this.formatTime = function (sec) {
            var m = Math.floor(sec / 60),
                s = sec % 60;

            if (!m && !s) {
                general.$('spanKarmaTimer').innerHTML = '&nbsp';
                general.setData('', 27);
                return;
            }

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            general.$('karmaTimer').innerHTML = m + ':' + s;

            var _this = this;
            general.root.setTimeout(function () {
                _this.formatTime(sec - 1);
            }, 1000);
        };

        /**
         * @method init
         */
        this.init = function () {
            // поставили карму, запоминаем время
            if (/vote/.test(general.loc) &&
                    (/Спасибо, Ваше мнение учтено/.
                        test(general.doc.body.innerHTML))) {
                general.setData(new Date().getTime().toString(), 27);
                return;
            }

            var time = +general.getData(27)[0];
            if (time) {
                var difference = new Date().getTime() - time;
                if (general.doc.querySelector('a[href*="/info.vote.php?id="]' +
                        '[title^="Отправить Ваш голос"]') ||
                            difference > 1800000) {
                    general.setData('', 27);
                    return;
                }

                var span = general.doc.createElement('span');
                span.setAttribute('id', 'spanKarmaTimer');
                span.setAttribute('style', 'margin-left: 5px; color: #07A703;');
                span.innerHTML = '» Вы сможете выставить карму через ' +
                    '<span id="karmaTimer" style="color: #056802;"></span>';

                var target = general.doc.
                        querySelector('td[colspan="3"]>table[width="100%"]'),
                    prnt = target.parentNode;

                prnt.removeChild(target.nextElementSibling);
                prnt.insertBefore(span, target.nextElementSibling);
                this.formatTime(+((1800000 - difference) / 1000).toFixed(0));
            }
        };
    };

    /**
     * @class ImgPokemonsOnBattle
     * @constructor
     */
    var ImgPokemonsOnBattle = function () {
        /**
         * @method deleteImagePoks
         */
        this.deleteImagePoks = function () {
            var divs = general.doc.querySelectorAll('div[name="imagepokemon"]'),
                i;

            for (i = 0; i < divs.length; i++) {
                divs[i].parentNode.removeChild(divs[i]);
            }
        };

        /**
         * @method showImagePoks
         */
        this.showImagePoks = function () {
            var enemies = general.doc.
                    querySelectorAll('div[style*="font-size:8pt;"]>' +
                        'span[class="battletags"]+b'),
                getPos = new GetPos().init,
                imgPath = 'http://www.gw-rent.h19.ru/pokemon/',
                ext = '.png',
                name,
                txt,
                pos,
                div,
                i;

            for (i = 0; i < enemies.length; i++) {
                txt = enemies[i].innerHTML;
                name = txt === 'Боец ОМОН' ?
                        ['', 'omon']  : /(^[^\s]+)\s/.exec(txt);
                if (name && (name[1] === 'omon' || (/\[/.test(txt)))) {
                    pos = getPos(enemies[i].parentNode);
                    div = general.doc.createElement('div');
                    general.doc.body.appendChild(div);
                    div.setAttribute('style', 'position: absolute;');
                    div.setAttribute('name', 'imagepokemon');
                    div.style.left = String(pos.x > 200 ?
                            pos.x - 70 : pos.x + 130);
                    div.style.top = String(pos.y);
                    div.innerHTML = '<img src="' + imgPath + name[1] + ext +
                        '" style="width: 70px; height: 80px;" ' +
                        'title="' + name[1] + '" alt="' + name[1] + '" />';
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            this.showImagePoks();

            // JS-версия боя
            if (!general.viewMode && !general.nojs) {
                var _this = this;
                general.root.setInterval(function () {
                    _this.deleteImagePoks();
                    _this.showImagePoks();
                }, 1000);
            }
        };
    };

    /**
     * @class SoundSyndBattle
     * @constructor
     */
    var SoundSyndBattle = function () {
        /**
         * @property redLink
         * @type {HTMLElement|null}
         */
        this.redLink = null;

        /**
         * @method setTimer
         * @param   {int}   sec
         */
        this.setTimer = function (sec) {
            var m = Math.floor(sec / 60),
                s = sec % 60;

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            this.redLink.innerHTML = this.redLink.innerHTML.
                replace(/\d+:\d+/, m + ':' + s);

            var _this = this;
            s = sec - 1;
            if (s > -1) {
                general.root.setTimeout(function () {
                    _this.setTimer(s);
                }, 1000);
            }
        };

        /**
         * @method syndAlert
         * @param   {String}    dataCheck
         * @param   {String}    data
         * @param   {int}       sound
         * @param   {int}       tm
         */
        this.syndAlert = function (dataCheck, data, sound, tm) {
            general.root.setTimeout(function () {
                var stData = general.getData(28);
                if (stData[3] === dataCheck) {
                    stData[3] = data;
                    general.setData(stData, 28);
                    new PlaySound().init(sound);
                }
            }, tm);
        };

        /**
         * @method init
         */
        this.init = function () {
            var stData = general.getData(28);

            if (!general.doc.querySelector('a[href*="/me.php"]' +
                        '[title^="Наличность"]')) {
                return;
            }

            this.redLink = general.doc.querySelector('a[style*="color:red;"]' +
                    '[title^="Ваш синдикат в нападении"]');

            if (!this.redLink) {
                stData[3] = '';
                general.setData(stData, 28);
                return;
            }

            // для нового оформления игры
            if (/\[(\d+):(\d+)\]/.
                    test(this.redLink.nextElementSibling.innerHTML)) {
                this.redLink = this.redLink.nextElementSibling;
            }

            var time = /\[(\d+):(\d+)\]/.exec(this.redLink.innerHTML),
                timeLimit = +stData[0],
                sound1 = +stData[1],
                sound2 = +stData[2];

            if (time && timeLimit > 14) {
                var t = +time[1] * 60 + (+time[2]);
                this.redLink.href = '/wargroup.php?war=attacks';
                this.setTimer(t);

                var getRandom = new GetRandom().init;
                if (!stData[3]) {
                    if (t > timeLimit) {
                        this.syndAlert('', '1', sound1, getRandom(0, 3000));
                        this.syndAlert('1', '2', sound2,
                                (t - timeLimit) * 1000 + getRandom(0, 3000));
                    } else {
                        this.syndAlert('', '2', sound2, getRandom(0, 3000));
                    }
                } else if (t > timeLimit && stData[3] === '2') {
                    this.syndAlert('2', '1', sound1, getRandom(0, 3000));
                    this.syndAlert('1', '2', sound2,
                            (t - timeLimit) * 1000 + getRandom(0, 3000));
                } else if (t <= timeLimit && stData[3] === '1') {
                    this.syndAlert('1', '2', sound2, getRandom(0, 3000));
                }
            }
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

            var stData = general.getData(29),
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
                        general.setData(stData, 29);
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
                var stData = general.getData(29),
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
                general.setData(stData, 29);

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
                var stData = general.getData(29),
                    f = stData[6].split(','),
                    _this = this,
                    ind = /\d+/.exec(_this.id)[0];

                f[ind] = _this.checked ? '1' : '';
                stData[6] = f.join(',');
                general.setData(stData, 29);
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

            imgSettins.src = 'http://images.ganjawars.ru/i/home/properties.gif';
            imgSettins.setAttribute('style', 'cursor: pointer; ' +
                    'margin-left: 10px;');
            imgSettins.setAttribute('title', 'Настройки');

            // кнопка сброса всех данных ветки
            var imgReset = general.doc.createElement('img');
            imgReset.src = 'http://images.ganjawars.ru/i/home/questlog.gif';
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
                    stData = general.getData(29),
                    f = stData[6].split(','),
                    str = '',
                    i;

                for (i = 0; i < themes.length; i++) {
                    str += '<tr><td><a target="_blank" ' +
                        'href="http://www.ganjawars.ru/threads.php?fid=' +
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
                    'href="http://www.ganjawars.ru/forum.php">этой странице' +
                    '</a>:</td></tr>' + str + '</table></td></tr>';

                // чекбокс "Отмечать закрытые"
                var markClosed = general.$('markClosed');
                markClosed.checked = stData[0];
                markClosed.addEventListener('click', function () {
                    var data = general.getData(29);
                    data[0] = markClosed.checked ? '1' : '';
                    general.setData(data, 29);
                }, false);

                // чекбокс "Не показывать закрытые темы"
                var showClosed = general.$('showClosed');
                showClosed.checked = stData[3];
                showClosed.addEventListener('click', function () {
                    var data = general.getData(29);
                    data[3] = showClosed.checked ? '1' : '';
                    general.setData(data, 29);
                }, false);

                // чекбокс "Не показывать прикрепленки"
                var showAttached = general.$('showAttached');
                showAttached.checked = stData[4];
                showAttached.addEventListener('click', function () {
                    var data = general.getData(29);
                    data[4] = showAttached.checked ? '1' : '';
                    general.setData(data, 29);
                }, false);

                // текстовое поле "Интервал перезагрузки страниц"
                var reloadInterval = general.$('reloadInterval');
                reloadInterval.value = stData[2] || '0';
                reloadInterval.addEventListener('input', function () {
                    var data = general.getData(29),
                        val = +reloadInterval.value;

                    data[2] = val && val > 4 ? val.toString() : '';
                    general.setData(data, 29);
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
                    var data = general.getData(29),
                        val = selSound.value;

                    data[1] = val === '0' ? '' : val;
                    general.setData(data, 29);
                }, false);

                // поле с номерами форумов-исключений
                var exclusion = general.$('exclusion');
                exclusion.value = stData[5];
                exclusion.addEventListener('input', function () {
                    var data = general.getData(29);
                    data[5] = exclusion.value.replace(/\s+/g, '');
                    general.setData(data, 29);
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
            var stData = general.getData(29),
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
                            general.setData(stData, 29);
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

    /**
     * @class DelAndAddBlackSms
     * @constructor
     */
    var DelAndAddBlackSms = function () {
        /**
         * @method init
         */
        this.init = function () {
            var del = general.doc.querySelector('td>a[class="mainbutton"]' +
                    '[href*="&do_black=1&addblack="]');

            if (del) {
                del.setAttribute('style', 'background: #FDD8D8;');

                del.addEventListener('click', function (e) {
                    if (!general.
                            root.confirm('Удалить и забанить. Уверены ???')) {

                        var ev = e || general.root.event;
                        ev.preventDefault();
                    }
                }, false);
            }
        };
    };

    /**
     * @class Regeneration
     * @constructor
     */
    var Regeneration = function () {
        // noinspection JSUnusedGlobalSymbols
        /**
         * @property currentHp
         * @type {int}
         */
        this.currentHp = 0;
        /**
         * @property maxHp
         * @type {int}
         */
        this.maxHp = 0;
        /**
         * @property speedHpRecovery
         * @type {int}
         */
        this.speedHpRecovery = 0;
        /**
         * @property spanHP
         * @type {HTMLElement|null}
         */
        this.spanHP = null;
        /**
         * @property progressBar
         * @type {HTMLDivElement|null}
         */
        this.progressBar = null;
        /**
         * @property pbWidth
         * @type {int}
         */
        this.pbWidth = 230;
        /**
         * @property pbHeight
         * @type {int}
         */
        this.pbHeight = 4;

        /**
         * @method formatTime
         * @param   {int}   sec
         * @return  {String}
         */
        this.formatTime = function (sec) {
            var str = '';
            if (sec >= 3600) {
                var h = Math.floor(sec / 3600);
                str += '0' + h + ':';
                sec -= h * 3600;
            }

            var m = Math.floor(sec / 60);
            str += m ? (m < 10 ? '0' + m : m) : '00';
            str += ':';
            sec -= m * 60;

            str += sec < 10 ? '0' + sec : sec;
            return str;
        };

        /**
         * @method hpupdate
         * @param   {Boolean}   first
         */
        this.hpupdate = function (first) {
            if (!first) {
                this.currentHp += this.speedHpRecovery;
            }

            if (this.currentHp > this.maxHp) {
                this.currentHp = this.maxHp;
            }

            // текущее HP в процентах
            var hpPercent = Math.floor((this.currentHp * 100) / this.maxHp);
            this.spanHP.innerHTML = '[' + hpPercent + '%]';

            // прогресс бар
            if (hpPercent >= 100) {
                // noinspection JSUnresolvedVariable
                this.progressBar.parentNode.style.display = 'none';
            } else if (hpPercent < 0) {
                // если кильнули
                this.progressBar.style.width = '0';
            } else {
                this.progressBar.style.width = String(Math.ceil(this.pbWidth *
                    hpPercent / 100) + 1);
            }

            //паказываем время
            var sec;
            if (hpPercent < 100) {
                sec = Math.floor((this.maxHp - this.currentHp) /
                        this.speedHpRecovery);
                this.spanHP.innerHTML += ' <span ' +
                    'style="font-weight: bold; color: #008000;">[' +
                    this.formatTime(sec) + ']</span>';
            }

            if (hpPercent < 80) {
                sec = Math.floor(((this.maxHp * 0.8) - this.currentHp) /
                        this.speedHpRecovery);
                this.spanHP.innerHTML += ' <span ' +
                    'style="font-weight: bold; color: #FF0000;"> [' +
                    this.formatTime(sec)  + ']</span>';
            }

            var stData = general.getData(31),
                playSound = new PlaySound().init;

            if (hpPercent < 100 && hpPercent  >= 80 && !stData[2]) {
                stData[2] = '1';
            }

            if (hpPercent === 100 && stData[2] === '3') {
                stData[2] = '2';
            }

            if (stData[2] === '1') {
                playSound(stData[0]);
                stData[2] = '3';
            } else if (stData[2] === '2') {
                playSound(stData[1]);
                stData[2] = '4';
            } else if ((stData[2] === '3' || stData[2] === '4') &&
                    hpPercent < 100) {
                stData[2] = hpPercent < 80 ? '' : '3';
            }

            general.setData(stData, 31);

            var _this = this;
            if (stData[2] !== '4') {
                general.root.setTimeout(function () {
                    _this.hpupdate(false);
                }, 1000);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('div#hpdiv');
            if (target) {
                var divHealth = general.doc.createElement('div');
                divHealth.setAttribute('style', 'color: #0000FF;');
                divHealth.innerHTML = '&nbsp;» ' +
                    '<span style="font-weight: bold;">Выздоровление:</span> ' +
                    '<span id="regenHpPercent"></span>' +
                    '<div style="width: 230px; border: 1px #BBCCBB solid; ' +
                            'margin: 2px 0 3px 3px; box-shadow: 1px 1px 3px ' +
                            'rgba(122,122,122,0.5);">' +
                        '<div id="progressBar" style="width: ' + this.pbWidth +
                            'px; height: ' + this.pbHeight + '; ' +
                            'background-image: url(' + general.imgPath +
                            'Regeneration/line.png);">' +
                        '</div>' +
                    '</div>';

                target = target.nextElementSibling;
                target.parentNode.insertBefore(divHealth, target.nextSibling);

                this.spanHP = general.$('regenHpPercent');
                this.progressBar = general.$('progressBar');

                // noinspection JSUnusedGlobalSymbols
                /** @namespace general.root.hp_start_h */
                this.currentHp = +general.root.hp_start_h;
                /** @namespace general.root.hp_max_h */
                this.maxHp = +general.root.hp_max_h;
                /** @namespace general.root.hp_speed_h */
                this.speedHpRecovery = parseFloat(general.root.hp_speed_h);

                this.hpupdate(true);
            }
        };
    };

    /**
     * @class ProfColor
     * @constructor
     */
    var ProfColor = function () {
        /**
         * @property activeProfs
         * @type {NodeList}
         */
        this.activeProfs = general.doc.
                querySelectorAll('tr>td>font[color="#006600"]');

        this.init = function () {
            var i;
            for (i = 0; i < this.activeProfs.length; i++) {
                this.activeProfs[i].setAttribute('color', '#FF0000');
            }
        };
    };

    /**
     * @class CurrentQuestOnInfo
     * @constructor
     */
    var CurrentQuestOnInfo = function () {
        /**
         * @property questURL
         * @type {String}
         */
        this.questURL = 'http://www.ganjawars.ru/questlog.php?id=';
        /**
         * @property persID
         * @type {String}
         */
        this.persID = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1200;

        /**
         * @method showQuest
         * @param   {String}    url
         */
        this.showQuest = function (url) {
            var _this = this;

            new AjaxQuery().init(url, 'GET', null, true, function (xhr) {
                var span = general.doc.createElement('span');
                span.innerHTML = xhr.responseText;

                // noinspection JSUnresolvedVariable
                var cssSelector = 'td[valign="top"][align="right"]>' +
                        'a[href*="/help/index.php?sid="]',
                    td = span.querySelector(cssSelector).parentNode.
                        previousElementSibling,
                    questDescr = td.firstElementChild.nextSibling.nodeValue,
                    acQuests = /-квестов:<\/b>\s?(\d+)/.exec(td.innerHTML)[1],
                    div = general.doc.createElement('div');

                div.setAttribute('style', 'margin-left: 10px;');
                div.innerHTML = '<span style="font-weight: bold;">Мини-квест:' +
                    '</span> ' + questDescr + '<span style="font-weight: ' +
                    'bold; margin-left: 10px;"><a target="_blank" ' +
                    'style="color:#007700; text-decoration: none;" ' +
                    'href="http://www.ganjawars.ru/help/index.php?' +
                    'sid=102&pid=45">Накоплено</a>:</span> ' + acQuests;
                general.doc.querySelector('#namespan').parentNode.
                        appendChild(div);
            }, function () {
                general.root.setTimeout(function () {
                    _this.showQuest(url);
                }, _this.tm);
            });
        };

        this.init = function () {
            if (this.persID) {
                this.showQuest(this.questURL + this.persID);
            }
        };
    };


    /**
     * @class CommonBattleFilter
     * @constructor
     */
    var CommonBattleFilter = function () {
        /**
         * @property battleTable
         * @type {Object|null}
         */
        this.battleTable = null;

        /**
         * @method getLvl
         * @param   {Object}    row
         * @return  {int}
         */
        this.getLvl = function (row) {
            return +row.querySelector('font[color="red"]').innerHTML.
                split('-')[1];
        };

        /**
         * @method sortBattleTable
         */
        this.sortBattleTable = function () {
            var stData = general.getData(20),
                row,
                i;

            for (i = 1; i < this.battleTable.rows.length; i++) {
                row = this.battleTable.rows[i];
                row.style.display = '';

                stData[0] = +stData[0];
                if (stData[0] && this.getLvl(row) > stData[0]) {
                    row.style.display = 'none';
                }

                if (stData[1] && !/<s>именные<\/s>/.test(row.innerHTML)) {
                    row.style.display = 'none';
                }

                if (stData[2] && !/по мощности/.test(row.innerHTML)) {
                    row.style.display = 'none';
                }
            }
        };

        /**
         * @method getSelect
         * @param   {String}    id
         * @return  {String}
         */
        this.getSelect = function (id) {
            return '<select id="' + id + '" style="margin-right: 3px;">' +
                '<option value="0">Любой&nbsp;</option>' +
                '<option value="5">5</option>' +
                '<option value="6">6</option>' +
                '<option value="7">7</option>' +
                '<option value="8">8</option>' +
                '<option value="9">9</option>' +
                '<option value="10">10</option>' +
                '<option value="11">11</option>' +
                '<option value="12">12</option>' +
                '<option value="13">13</option>' +
                '<option value="14">14</option>' +
                '<option value="15">15</option>' +
                '<option value="16">16</option>' +
                '<option value="17">17</option>' +
                '<option value="18">18</option>' +
                '<option value="19">19</option>' +
                '<option value="20">20</option>' +
                '<option value="21">21</option>' +
                '<option value="22">22</option>' +
                '<option value="23">23</option>' +
                '<option value="24">24</option>' +
                '<option value="25">25</option>' +
                '<option value="26">26</option>' +
                '<option value="27">27</option>' +
                '<option value="28">28</option>' +
                '<option value="29">29</option>' +
                '<option value="30">30</option>' +
                '<option value="31">31</option>' +
                '<option value="32">32</option>' +
                '<option value="33">33</option>' +
                '<option value="34">34</option>' +
                '<option value="35">35</option>' +
                '<option value="36">36</option>' +
                '<option value="37">37</option>' +
                '<option value="38">38</option>' +
                '<option value="39">39</option>' +
                '<option value="40">40</option>' +
                '<option value="41">41</option>' +
                '<option value="42">42</option>' +
                '<option value="43">43</option>' +
                '<option value="44">44</option>' +
                '<option value="45">45</option>' +
                '<option value="46">46</option>' +
                '<option value="47">47</option>' +
                '<option value="48">48</option>' +
                '<option value="49">49</option>' +
                '<option value="50">50</option>' +
                '</select>';
        };

        /**
         * @method init
         */
        this.init = function () {
            // форма создания заявки
            if (/&form=\d+/.test(general.loc)) {
                return;
            }

            // основная таблица общих заявок
            this.battleTable = general.doc.querySelector('table[border="0"]' +
                '[cellpadding="5"][cellspacing="1"][style="padding-left:10px;' +
                'padding-right:10px;"]');

            // нет общих заявок или таблица вообще не найдена
            if (!this.battleTable || this.battleTable.rows.length === 1) {
                return;
            }

            // заявка на бой отклонена
            if (/Заявка на бой отклонена/i.test(general.doc.body.innerHTML)) {
                general.root.location.href = '/wargroup.php?war=armed';
            }

            // уже в заявке
            if (/Вы заявлены на бой/i.test(general.doc.body.innerHTML)) {
                return;
            }

            // интерфейс
            var span = general.doc.createElement('span');
            span.setAttribute('style', 'margin-left: 10px;');
            span.innerHTML = 'Максимальный уровeнь: ' +
                this.getSelect('blevel') +
                'без именных:<input type="checkbox" id="personalchk" /> ' +
                'по мощности:<input type="checkbox" id="powerchk" />';
            general.$('updatetimer2').parentNode.parentNode.appendChild(span);

            var stData = general.getData(20),
                _this = this;

            // максимальный уровень
            var blevel = general.$('blevel');
            blevel.value = stData[0];
            blevel.addEventListener('change', function () {
                var data = general.getData(20);
                data[0] = blevel.value;
                general.setData(data, 20);
                _this.sortBattleTable();
            }, false);

            // чекбокс "без именных"
            var personal = general.$('personalchk');
            personal.checked = !!stData[1];
            personal.addEventListener('click', function () {
                personal.checked = !!personal.checked;
                var data = general.getData(20);
                data[1] = personal.checked ? 1 : '';
                general.setData(data, 20);
                _this.sortBattleTable();
            }, false);

            // чекбокс "по мощности"
            var power = general.$('powerchk');
            power.checked = !!stData[2];
            power.addEventListener('click', function () {
                power.checked = !!power.checked;
                var data = general.getData(20);
                data[2] = power.checked ? 1 : '';
                general.setData(data, 20);
                _this.sortBattleTable();
            }, false);

            this.sortBattleTable();
        };
    };

    /**
     * @class PortTimer
     * @constructor
     */
    var PortTimer = function () {
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1200;
        /**
         * @property topPanel
         * @type {HTMLElement|null}
         */
        this.topPanel = null;
        /**
         * @property url
         * @type {String|null}
         */
        this.url = null;
        /**
         * @property date
         * @type {int}
         */
        this.date = 0;

        /**
         * @method getBattles
         */
        this.getBattles = function () {
            var _this = this;
            new AjaxQuery().init(_this.url, 'GET', null, true, function (xhr) {
                var spanContent = general.doc.createElement('span'),
                    cssSelector = 'table[cellspacing="1"][cellpadding="5"]' +
                        '[width="100%"]';

                spanContent.innerHTML = xhr.responseText;
                var table = spanContent.querySelector(cssSelector);

                if (table) {
                    var data = JSON.parse(general.getData(22)[0]),
                        trs = table.querySelectorAll('tr'),
                        i;

                    data.time = [];
                    if (trs.length > 1 && !/<i>\(отсутствуют\)<\/i>/.
                            test(trs[1].innerHTML)) {
                        for (i = 1; i < trs.length; i++) {
                            data.time.push(trs[i].
                                querySelector('nobr').innerHTML);
                        }
                    }

                    data.date = _this.date;
                    data.time.reverse();
                    data.current = '';
                    general.setData(JSON.stringify(data), 22);
                    _this.setTime();
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getBattles();
                }, _this.tm);
            });
        };

        /**
         * @method resetStorage
         */
        this.resetStorage = function () {
            general.setData(JSON.stringify({
                'date': '',
                'syndid': '',
                'time': [],
                'current': ''
            }), 22);
        };

        /**
         * @method getTimeDiff
         * @return  {int}
         */
        this.getTimeDiff = function () {
            var stData = JSON.parse(general.getData(22)[0]),
                now = new Date();

            stData.current = stData.current.split(':');
            return (+stData.current[0] * 60 + (+stData.current[1])) -
                ((now.getUTCHours() + 3) * 60 + now.getMinutes());
        };

        /**
         * @method setTimer
         */
        this.setTimer = function () {
            var diff = this.getTimeDiff(),
                hours = parseInt((diff / 60).toString(), 10),
                min = diff - hours * 60;

            general.$('portTimer').innerHTML = (hours < 10 ? '0' + hours :
                    hours) + ':' + (min < 10 ? '0' + min : min);
        };

        /**
         * @method changeCurrentTime
         */
        this.changeCurrentTime = function () {
            var stData = JSON.parse(general.getData(22)[0]);
            if (!stData.time.length) {
                stData.current = '';
                general.setData(JSON.stringify(stData), 22);
                return;
            }

            var time = stData.time.pop();
            stData.current = time;
            general.setData(JSON.stringify(stData), 22);
            if (this.getTimeDiff() <= 0) {
                this.changeCurrentTime();
                return;
            }

            this.setInterface();
            general.$('portTime').innerHTML = time;
            this.setTimer();
        };

        /**
         * @method setInterface
         */
        this.setInterface = function () {
            var mainTimer = general.doc.createElement('span');
            mainTimer.innerHTML = '<a href="' + this.url +
                '" style="text-decoration: none;" target="_blank">' +
                'Порты</a> ' +
                '<span id="portTime" style="font-weight: bold;"></span> ' +
                '[<span id="portTimer" style=""></span>]';
            // noinspection JSCheckFunctionSignatures
            this.topPanel.appendChild(general.doc.createTextNode(' | '));
            this.topPanel.appendChild(mainTimer);
        };

        /**
         * @method setTime
         */
        this.setTime = function () {
            var stData = JSON.parse(general.getData(22)[0]);
            if (!stData.current || this.getTimeDiff() <= 0) {
                this.changeCurrentTime();
            } else {
                this.setInterface();
                general.$('portTime').innerHTML = stData.current;
                this.setTimer();
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            // верхняя панель
            this.topPanel = new GetTopPanel().init();
            if (!this.topPanel) {
                return;
            }

            /* localStorage:
             * [0] - '{date: '', syndid: '', time: [], current: ''}'
             */
            var stData = general.getData(22)[0];
            if (!stData) {
                this.resetStorage();
            }

            stData = JSON.parse(general.getData(22)[0]);

            // на главной странице персонажа проверяем ID основного синдиката
            if (/\/me(\/|\.php)/.test(general.loc)) {
                var linkMainSynd = general.doc.querySelector('span>b+nobr>' +
                    'a[href*="/syndicate.php?id="]');
                var syndID = linkMainSynd ?
                        /\?id=(\d+)/.exec(linkMainSynd.href)[1] : null;

                // нет основного синдиката
                if (!syndID) {
                    this.resetStorage();
                    return;
                }

                // сменили синд
                if (stData.syndid !== syndID) {
                    stData.syndid = syndID;
                    stData.time = [];
                    general.setData(JSON.stringify(stData), 22);
                }
            }

            // нет основного синдиката
            if (!stData.syndid) {
                return;
            }

            this.url = 'http://www.ganjawars.ru/object.php?id=11712&' +
                'page=oncoming1&sid=' + stData.syndid;

            // сегодня запрос не делали, делаем не ранее 7 утра.
            var serverHour = new Date().getUTCHours() + 3,
                now = new Date();

            serverHour = serverHour > 23 ? serverHour - 24 : serverHour;
            this.date = new Date(now.setHours(now.getHours() +
                    (now.getTimezoneOffset() / 60) + 3)).getDate();

            if (+stData.date !== this.date && serverHour >= 7) {
                this.getBattles();
            } else {
                this.setTime();
            }
        };
    };

    general = new General();

    if (!general.checkMainData()) {
        return;
    }

    initScript = general.getInitScript();

    // не в игре, на ganjafoto или ganjafile меняем фавикон
    if (general.doc.querySelector('a[href*="/regform.php"]') ||
            /ganjafoto\.ru|ganjafile\.ru|photos.ganjawars.ru/.
                test(general.loc)) {
        try {
            new NotGiveCannabisLeaf().init();
        } catch (e) {
            general.cons.log(e);
        }

        return;
    }

    // везде на www.ganjawars.ru
    if (initScript[0]) {
        try {
            new NotGiveCannabisLeaf().init();
        } catch (e) {
            general.cons.log(e);
        }
    }

    if (initScript[36]) {
        try {
            new PortTimer().init();
        } catch (e) {
            general.cons.log(e);
        }
    }

    if (initScript[52]) {
        try {
            new SoundSyndBattle().init();
        } catch (e) {
            general.cons.log(e);
        }
    }

    // везде кроме фермы
    if (!(/\/ferma\.php/.test(general.loc))) {
        if (initScript[41]) {
            try {
                new ScanPers().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (initScript[4]) {
            try {
                new BlacklistHighlighting().init();
            } catch (e) {
                general.cons.log(e);
            }
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

        if (/\/market(-p)?\.php/.test(general.loc)) {
            if (initScript[2] &&
                    (/\?(stage=2&item_id=|buy=)/.test(general.loc))) {
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

            if (/\?type=1&id=/.test(general.loc)) {
                if (initScript[54]) {
                    try {
                        new DelAndAddBlackSms().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
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

        if (initScript[14]) {
            try {
                new GwMenu().init();
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

        if (initScript[6]) {
            try {
                new ResourcesAndBonuses().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (!(/\/ferma\.php/.test(general.loc))) {
            if (initScript[47]) {
                try {
                    new ShowMyAchievements().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\/me(\/|\.php)|\/(warlog|warlist|wargroup)\.php\?/.
                    test(general.loc)) {
                if (initScript[5]) {
                    try {
                        new WorkPostGrenadesBroken().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }
            }

            if (initScript[43]) {
                try {
                    new SearchUser().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/me(\/|\.php)|\/npc\.php\?id=/.test(general.loc)) {
            if (initScript[12]) {
                try {
                    new TimeNpc().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\/me(\/|\.php)/.test(general.loc)) {
                if (initScript[17]) {
                    try {
                        new GbCounter().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[44]) {
                    try {
                        new SkillCounters().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[49]) {
                    try {
                        new SyndOnlineOnMainPage().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[56]) {
                    try {
                        new Regeneration().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }
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

        if (/\/me(\/|\.php)|\/messages\.php\?fid=1&tid=/.test(general.loc)) {
            if (initScript[20]) {
                try {
                    new NewsAndInvit().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/(messages|threads)\.php\?fid=/.test(general.loc) ||
                (/\/forum.php$/.test(general.loc))) {
            if (initScript[53]) {
                try {
                    new AdvForum().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\/messages\.php/.test(general.loc)) {
                if (initScript[42]) {
                    try {
                        new ShowInitMessOnForum().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
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

        if (/\/me(\/|\.php)|\/info\.php\?id=/.test(general.loc)) {
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

                if (initScript[38]) {
                    try {
                        new RangeWeapon().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[40]) {
                    try {
                        new ScanKarma().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[57]) {
                    try {
                        new ProfColor().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }

                if (initScript[58]) {
                    try {
                        new CurrentQuestOnInfo().init();
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

            if (initScript[45]) {
                try {
                    new SyndPtsAnalyser().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[46]) {
                try {
                    new SyndAnalyser().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/map.php/.test(general.loc)) {
            if (initScript[37]) {
                try {
                    new PortsAndTerminals().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/home\.senditem\.php/.test(general.loc)) {
            if (initScript[39]) {
                try {
                    new RentAndSale().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/info\.php\?id=|\/info\.vote\.php\?id=/.test(general.loc)) {
            if (initScript[50]) {
                try {
                    new TimeKarma().init();
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

            if (initScript[31]) {
                try {
                    new HousHealth().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[51]) {
                try {
                    new ImgPokemonsOnBattle().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }

        if (/\/warlist\.php/.test(general.loc)) {
            if (initScript[23]) {
                try {
                    new FilterWarlistOne2One().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (initScript[34]) {
                try {
                    new One2OneCallerInfo().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }

            if (/\?war=armed/.test(general.loc)) {
                if (initScript[33]) {
                    try {
                        new LinksInOne2One().init();
                    } catch (e) {
                        general.cons.log(e);
                    }
                }
            }
        }

        if (/\/wargroup\.php\?war=armed/.test(general.loc)) {
            if (initScript[59]) {
                try {
                    new CommonBattleFilter().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }
    }

}());

