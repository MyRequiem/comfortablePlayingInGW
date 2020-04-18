// ==UserScript==
// @name            AdvBattleAll
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Расширенная информация в списке выбора противника + сортировка списка по номеру, дальности, уровню, видимости и т.д. Динамический центр, продвинутое расположение бойцов на поле боя в бою и в режиме наблюдения за боем, кнопка "Сказать ход", чекбоксы "Говорить только правую руку", "Говорить только левую руку", "Сказать своей команде", "Сказать как координатор". Быстрая вставка ника в поле чата (при клике на "конвертике" рядом с никами бойцов или при двойном клике на изображении бойца на схеме поле боя). Информация вверху страницы о набитом HP, вашем здоровье, видимости и т.д. При одиночном клике по противнику на схеме поля боя происходит его выбор в качестве цели. Кнопка "Обновить". Подсвечивает зеленым цветом тех персонажей, которые уже сделали ход. Выводит общее количество персонажей и количество персонажей сделавших ход. Таймаут обновления заявки после входа в нее и таймаут обновления данных в бою. Параметры в настройках персонажа для правильной работы скрипта: оформление боя в desktop-версии игры - упрощенное, расположение в бою - примитивное, JavaScript-версия - использовать.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvBattleAll/advBattleAll.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvBattleAll/advBattleAll.user.js
// @include         http://www.gwars.ru/b0/btl.php?bid=*
// @include         http://www.gwars.ru/warlog.php*
// @include         http://www.gwars.ru/wargroup.php*
// @include         http://www.gwars.ru/warlist.php*
// @grant           none
// @license         MIT
// @version         4.32-180420
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, nomen: true,
    plusplus: true, devel: true, continue: true
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

    //============= НАСТРОЙКИ ====================
        // обновление заявки после входа в нее (в секундах)
        // 0 - таймаут по умолчанию (20 сек)
    var refreshAppl = 0,
        // таймаут обновления данных в бою (в секундах)
        // 0 - таймаут по умолчанию, который выставлен в настройках персонажа
        refreshBattle = 0,
        // звук при начале боя (0 - без звука)
        sound1 = 0,
        // звук при начале хода (0 - без звука)
        sound2 = 0,
        // чекбокс для координаторов боя '!*' (1/0 - показывать/не показывать)
        coordButton = 1,
        // ###
        // # при нажатии на кнопку "Сказать ход"
        // ###
        // не выводить имя противника (0/1 - выводить/не выводить)
        notWriteEnemyNameWhenSayMove = 0,
        // не выводить применяемые навыки (0/1 - выводить/не выводить)
        notWriteSkillsWhenSayMove = 0;
    //============= КОНЕЦ НАСТРОЕК ===============

/* localStorage data
    [0]  - метод сортировки списка врагов (0 - 5)
    [1]  - чекбокс "запомнить ход"
    [2]  - чекбокс "не дублировать цель" (для двуруких)
    # последний сделаный ход (если включено "запомнить ход")
    [3]  - левая
    [4]  - правая
    [5]  - куда отходим
    [6]  - кидаем грену или нет
    [7]  - подходим или нет
    [8]  - чекбокс <Сказать своей команде>
    # запоминаем ход в хранилище перед тем как сказать ход
    [9]  - номер в кого стреляем
    [10] - направление левой руки
    [11] - направление правой руки
    [12] - куда отходим
    [13] - кидаем грену или нет
    [14] - подходим или нет
    [15] - данные из списка выбора врагов (хэш: имя --> номер)
    [16] - чекбокс "Говорить только левую руку"
    [17] - общий навык
    [18] - навык специалиста
    [19] - чекбокс "Говорить только правую руку"
    [20] - Подствольник
    [21] - чекбокс <Сказать как координатор>
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'advBattleAll';
        /**
         * @property viewMode
         * @type {Boolean}
         */
        this.viewMode = /\/warlog\.php/.test(this.loc);
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/AdvBattleAll/';
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
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STNAME);
            if (!stData || stData.split('|').length !== 22) {
                stData = '|||||||||||||||||||||';
                this.st.setItem(this.STNAME, stData);
            }

            return stData.split('|');
        },

        /**
         * @method setData
         * @param   {Array} data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data.join('|'));
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
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method init
         * @param   {String}        url
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
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
         * @property checkSound
         * @type {Boolean}
         */
        this.checkSound = true;
        /**
         * @property weapon
         * @type {Object}
         */
        this.rangeWeapon = {
            // Пистолеты
            'magnum': '1',
            'pm': '0',
            'rbcat': '0',
            'ttgun': '0',
            'eagle': '0',
            // Штурмовые винтовки гос
            'ak47': '2',
            'schmeisser': '2',
            'm16': '2',
            'ak_74': '2',
            'l1a1': '4',
            'aks': '0',
            'hk53': '4',
            'sg541': '6',
            'xm8': '6',
            'steyr': '7',
            'trw': '8',
            'sig': '10',
            'stg44': '8',
            'm14': '10',
            'sar': '12',
            'cz_sa': '12',
            'g3': '10',
            'fara83': '12',
            'g3aa': '10',
            'arx160': '12',
            'sr88': '12',
            'fnfal': '12',
            'm82': '13',
            'fs2000': '14',
            'fnscar': '15',
            'aps95': '16',
            'bofors': '16',
            'm17s': '18',
            'hk417': '20',
            'vektor': '22',
            'sw_m203': '20/1',
            'tiger': '24',
            'soar': '28',
            'sw_gl1': '26/2',
            'hk762': '21',
            'enfield80': '26',
            'cz805': '28',
            'm468': '29',
            // Штурмовые винтовки арт
            'g11': '4',
            'oicw': '6',
            'an94': '10',
            'f2000': '12',
            'fnfnc': '13',
            'hk_416': '14',
            'groza': '14',
            'ka90': '15',
            'taiga': '16',
            'xcr': '17',
            'tkb517': '18',
            'steyr_a3': '20',
            'ak103': '20',
            'g36': '22',
            'g41': '24',
            'sig552': '26',
            'sw_gp34': '24/1',
            'ace': '28',
            'sc2010': '32',
            'sw_m6': '28/3',
            'colt692': '24',
            'thales': '30',
            // встроенный подствол:
            // дальность оружия, подствола и радиус поражения подствола
            'thales_grl': '30/28/1',
            'rec7': '32',
            'sigmcx': '34',
            // Штурмовые винтовки аренда
            'colt_extreme': '26',
            'lr300': '30',
            'sig750': '34',
            // Снайперское оружие гос
            'svdmini': '4',
            'l96': '8',
            '149s': '8',
            'cz527': '10',
            'm40': '12',
            'police': '14',
            'mauser': '12',
            'remington700': '14',
            'psg': '15',
            'ssg': '14',
            'm76': '16',
            'svd': '16',
            'om50': '16',
            'ssg2000': '16',
            'b94': '15',
            'ssg3000': '18',
            'falcon': '16',
            'f2': '18',
            'm24': '20',
            'savage10fp': '18',
            'steyr_iws': '20',
            'ulr338': '20',
            'savage100fp': '22',
            'tikka': '24',
            'cz700': '26',
            'bora': '26',
            'ksv': '28',
            'amr2': '30',
            'fd308': '25',
            'r11': '28',
            'bor762': '30',
            'ultima': '30',
            'gepard': '31',
            // Снайперское оружие арт
            'barret': '18',
            'bfg': '20',
            'tactical600': '20',
            'pgm': '18',
            'm89sr': '20',
            'm107': '20',
            'vssk': '22',
            'rt20': '22',
            'cs5': '22',
            'barret_xm500': '24',
            'm85': '26',
            'steyr_ste': '28',
            'rangemaster': '28',
            'mauser93': '30',
            'sateravi': '34',
            'ar10': '28',
            'thor': '32',
            'awm': '34',
            'm110': '34',
            'msr': '35',
            // Снайперское оружие аренда
            'blaser_93': '30',
            'blaser-t': '32',
            'sharpshooter': '36',
            // Пистолеты-пулемёты гос
            'uzi': '0',
            'calico': '0',
            'lf57': '1',
            'ump': '0',
            'gg95': '3',
            'm4': '4',
            'mas38': '4',
            'kashtan': '8',
            'suomi': '8',
            'ingram': '8',
            'colt': '8',
            'walther': '10',
            'fmk3': '10',
            'vihr': '10',
            'saf': '7',
            'mpi81': '10',
            'agram': '12',
            'bizon': '14',
            'kedr': '16',
            'colt636': '20',
            'scorpionevo': '22',
            'berettamx4': '24',
            'fmg9': '26',
            'gilboa': '28',
            'pmx': '30',
            // Пистолеты-пулемёты арт
            'mp5': '4',
            'berettam12': '10',
            'scorpion': '12',
            'stkinetics': '10',
            'p90': '12',
            '90m1': '13',
            'mp7': '15',
            'kriss2': '22',
            'mtar21': '24',
            'pm06': '26',
            'uzipro': '28',
            'apc9': '30',
            'mpx': '32',
            // Пулемёты гос
            'fn_min': '1',
            'lewis': '2',
            'type95': '2',
            'fnmag': '4',
            'bren': '6',
            'l86': '4',
            'm16a2': '6',
            'mg3': '6',
            'type62': '6',
            'ar70': '6',
            'p41': '6',
            'saw': '6',
            'zb53': '7',
            'nsv': '6',
            'type67': '7',
            'galil': '7',
            'sig710': '8',
            'm60': '8',
            'vickers': '10',
            'vz59': '12',
            'mg4': '12',
            'mg36': '12',
            'm61': '14',
            'aat': '14',
            'xm312': '16',
            'sturm': '18',
            'sw_ubl37': '20/1',
            'venom': '20',
            'zastava': '24',
            'fort401': '16',
            'vektorss77': '22',
            'xm806': '24',
            'kord': '26',
            // Пулемёты арт
            'pkp': '6',
            'ameli': '8',
            'hk21': '8',
            'rpk74': '10',
            'pkm': '9',
            'm16lmg': '10',
            'aa52': '11',
            'mg43': '13',
            'pssg': '14',
            'ares16': '14',
            'spitfire': '15',
            'pkms': '16',
            'minigun762': '18',
            'mg50': '20',
            'ultimax': '22',
            'sw_agc': '25/1',
            'shrike': '24',
            'mg5': '28',
            'ng7': '20',
            'lwmmg': '26',
            'hk121': '28',
            'ukm': '30',
            // Пулемёты аренда
            'minigun_heavy': '24',
            'sigmg': '28',
            'hk221': '32',
            // Дробовики гос
            'winchester1200': '0',
            'hunter': '0',
            'remington': '2',
            'sgun2': '3',
            'm37': '4',
            'toz': '7',
            'jackhammer': '1',
            'spas12': '0',
            'striker': '2',
            'saiga': '10',
            'rmb93': '4',
            'neostead': '6',
            'xm26': '20',
            'hawk': '2',
            'benelli': '12',
            'liberator': '16',
            'spas15': '18',
            'r8': '22',
            'sw_gl1_sg': '26/2',
            'versamax': '22',
            'fnslp': '24',
            'srm1216': '26',
            // Дробовики арт
            'mossberg': '12',
            'vepr': '12',
            'mag7': '7',
            'usas12': '14',
            'ksg': '18',
            'usas15': '22',
            'uts15': '26',
            'sw_m6_sg': '28/3',
            'fabarm': '28',
            'origin12s': '30',
            'xtr12': '32',
            // Гранатометы гос
            'rpg': '5/1',
            'ptrk': '12/2',
            'glauncher': '8/1',
            'grg': '10/1',
            'paw20': '12/2',
            'rpgu': '14/3',
            'grom2': '10/1',
            'ags30': '16/1',
            'gm94': '8/2',
            'gl06': '8/2',
            'gmg': '17/2',
            'balkan': '20/2',
            'rg6': '24/2',
            'm202': '20/5',
            'mm1': '24/4',
            // Гранатометы арт
            'mk47': '27/3',
            'm32': '28/4',
            // Гранаты гос
            'emp_irs': '10/0',
            'emp_a': '20/0',
            'rgd5': '5/1',
            'grenade_f1': '3/2',
            'rgd2': '10/0',
            'lightst': '10/0',
            'lights': '10/0',
            'rkg3': '6/0',
            'mdn': '5/3',
            'rgd2m': '10/0',
            'rgo': '6/2',
            'm84': '16/0',
            'rgn': '8/0',
            'emp_ir': '10/0',
            'fg3l': '6/2',
            'l83a1': '20/0',
            'emp_s': '10/0',
            'm67': '8/0',
            'm3': '8/2',
            'hg78': '10/1',
            'hg84': '12/1',
            'fg6': '10/1',
            'anm14': '8/1',
            'm34ph': '8/2',
            'fg7': '12/1',
            'fg8bd': '16/2',
            // Гранаты синдовые
            'lightsm': '20/0',
            'grenade_dg1': '20/0',
            'ghtb': '12/1',
            'lightss': '12/0',
            'rgd2s': '15/0',
            'fg5': '6/2',
            'molotov': '6/1',
            'hellsbreath': '10/1',
            'napalm': '10/2',
            'me85': '17/2',
            // Гранаты лут
            'old_rgd5': '5/1',
            // Специальное оружие
            'rogatka': '0',
            'saw_airsoft': '0',
            'pb_marker': '2',
            'potato2': '0',
            // Турели
            'heavysg': '60',
            'tavor': '60',
            'larue': '60',
            'ga2gl': '60',
            // другое
            '11y_revolver': '0'
        };
        /**
         * @property art
         * @type {Array}
         */
        this.art = [
            'g11', 'oicw', 'an94', 'f2000', 'fnfnc', 'hk_416', 'groza', 'ka90',
            'taiga', 'xcr', 'tkb517', 'steyr_a3', 'ak103', 'g36', 'g41',
            'sig552', 'sw_gp34', 'ace', 'sc2010', 'sw_m6', 'colt692', 'thales',
            'thales_grl', 'rec7', 'sigmcx', 'pkp', 'ameli', 'hk21', 'rpk74',
            'pkm', 'm16lmg', 'aa52', 'mg43', 'pssg', 'ares16', 'spitfire',
            'pkms', 'minigun762', 'mg50', 'ultimax', 'sw_agc', 'shrike',
            'mg5', 'ng7', 'lwmmg', 'hk121', 'ukm', 'barret', 'bfg',
            'tactical600', 'pgm', 'm89sr', 'm107', 'vssk', 'rt20', 'cs5',
            'barret_xm500', 'm85', 'steyr_ste', 'rangemaster', 'mauser93',
            'sateravi', 'ar10', 'thor', 'awm', 'm110', 'msr', 'mp5',
            'berettam12', 'scorpion', 'stkinetics', 'p90', '90m1', 'mp7',
            'kriss2', 'mtar21', 'pm06', 'uzipro', 'apc9', 'mpx', 'mossberg',
            'vepr', 'mag7', 'usas12', 'ksg', 'usas15', 'uts15', 'sw_m6_sg',
            'fabarm', 'origin12s', 'xtr12', 'mk47', 'm32', 'bronik3c',
            'bronik4c', 'bronik5c', 'bronik6c', 'blackhawk', 'armour_p300',
            'blackcell', 'rbr', 'armour_patrol', 'delta5', 'mr1_armour',
            'delta7', 'fav', 'protector', 'sandsarmour', 'ar500', 'lwhelmet',
            'empires', 'sas_helmet', 'chelmet', 'spectra', 'arhelmet',
            'fasthelmet', 'helmetmk6', 'mpas', 'g15helmet', 'ksfhelmet',
            'predatorhelmet', 'mwshelmet', 'lowshieldc', 'cboots', 'shields_la',
            'hboots', 'dboots', 'swatboots', 'cobraboots', 'officerboots',
            'bootspec', 'spiderboots', 'dwboots', 'sandsboots', 'maskl',
            'rockycamo', 'predator', 'mesh', 'forester', 'jackpyke', 'swatcamo',
            'deltamask', 'woodsman', 'ilight', 'deye', 'nighthawk', 'atn14',
            'edge', 'nvg1', 'pvs21', 'irgs1', 'nyx7', 'nokia9500', 'fieldcomp',
            'attackbelt', 'ammobelt', 'bomberbelt', 'mealpack', 'eaglebag',
            'cbelt', 'commandobelt', 'loadbelt', 'armybag', 'fan', 'brelok',
            'cigar', 'clocks', 'gift_wallet', 'gift_watch', 'lighter',
            'saperka3', 'watch_ganjarmani', 'armyknife', 'uniknife', 'nrs2',
            'gt_multitool', 'ctactical', 'flask_gt', 'nokia9500', 'n81', 'n95',
            'armygps', 'gwatch', 'ganjapad', 'radio_srx', 'gwsat45',
            'tacticalgps', 'oldcompass', 'bottleopener', 'ganjacup', 'pendant',
            'flashlight', 'heartglasses', 'radio_gw148', 'bors', 'ganjacola2',
            'mentats2', 'minimedikit', 'medikit', 'bigmedikit', 'slr', 'apache',
            'mi8', 'cadillac', 'chinook', 'harley', 'ch148', 'irvs12', 'jscamo',
            'tactilight', 'gwtab7', 'triforce_xb', 'gcombatflask'
        ];
        /**
         * @property rent
         * @type {Array}
         */
        this.rent = [
            'minigun_heavy', 'sigmg', 'hk221', 'colt_extreme', 'lr300',
            'sig750', 'blaser_93', 'blaser-t', 'sharpshooter', 'irlights',
            'mask_hawster', 'mask_hawster1', 'nokia8800', 'nokia8800_se',
            'tesla_armour'
        ];

        /**
         * @metod getRandom1to3
         * @return  {int}
         */
        this.getRandom1to3 = function () {
            return Math.round(Math.random() * 1000) % 3 + 1;
        };

        /**
         * @method clearSavedStrokeAfterSay
         */
        this.clearSavedStrokeAfterSay = function () {
            var dataSt = general.getData();
            dataSt[9] = '';
            dataSt[10] = '';
            dataSt[11] = '';
            dataSt[12] = '';
            dataSt[13] = '';
            dataSt[14] = '';
            dataSt[17] = '';
            dataSt[18] = '';
            dataSt[20] = '';
            general.setData(dataSt);
        };

        /**
         * @metod sayMove
         * @param   {Object}    _this
         * @param   {Boolean}   fake
         */
        this.sayMove = function (_this, fake) {
            /**
             * fake - если нажали <Enter> в поле ввода или кнопку "Написать",
             *  (т.е. отправляем обычное сообщение), то реально не говорим ход,
             *  а просто сохраняем его для восстановления после отправки
             *  сооощения.
             */

            // ход сделан
            if (/Ждём ход противника/i.test(general.$('bf').innerHTML)) {
                return;
            }

            // куда отходим
            var def = general.doc.querySelector('input[type="radio"]' +
                    '[name="defence"]:checked'),
                dataSt = general.getData();

            dataSt[12] = def ? /\d/.exec(def.id)[0] : _this.getRandom1to3();

            // подходим или нет
            dataSt[14] = general.doc.querySelector('input[type="checkbox"]' +
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
                    enemy = reg.exec(tmps) || /^(\d+)\. ([^\s]+)/.exec(tmps);
                    break;
                }
            }

            dataSt[9] = enemy[1];

            // общий навык
            var generalSkill = '';
            if (!notWriteSkillsWhenSayMove &&
                    general.doc.querySelector('input[type="checkbox"]' +
                        '[name="apm_activate"]:checked')) {
                dataSt[17] = general.doc.querySelector('label[for="apmid"]').
                    innerHTML;
                generalSkill = ' + ' + dataSt[17];
            }

            // навык специалиста
            var specialSkill = '';
            if (!notWriteSkillsWhenSayMove &&
                    general.doc.querySelector('input[type="checkbox"]' +
                        '[name="aps_activate"]:checked')) {
                dataSt[18] = general.doc.querySelector('label[for="apsid"]').
                    innerHTML;
                specialSkill = ' + ' + dataSt[18];
            }

            var str = '~';

            // граната
            var isGren = false;
            if (general.doc.querySelector('input[type="checkbox"]' +
                    '[name="use_grenade"]:checked')) {
                str += general.doc.querySelector('label[for="bagaboom"]').
                    innerHTML.replace(/: бросить/, '');
                dataSt[13] = '1';

                if (!fake) {
                    _this.inpTextChat.value = str + ' в ' + enemy[1] +
                        (!notWriteEnemyNameWhenSayMove ?
                                ' [' + enemy[2] + ']' : '') +
                                    generalSkill + specialSkill;
                }

                isGren = true;
            }

            // подствол
            var isLauncher = false;
            if (general.doc.querySelector('input[type="checkbox"]' +
                    '[name="subweapon_shot"]:checked')) {
                str += 'Подствол в ';
                dataSt[20] = '1';
                isLauncher = true;
            }

            var leftAttack = general.doc.querySelector('input[type="radio"]' +
                '[name^="left_attack"]:checked'),
                rightAttack = general.doc.querySelector('input[type="radio"]' +
                    '[name^="right_attack"]:checked');

            dataSt[10] = leftAttack ? /\d/.exec(leftAttack.id)[0] : '';
            dataSt[11] = rightAttack ? /\d/.exec(rightAttack.id)[0] : '';

            general.setData(dataSt);

            if (!isGren) {
                str += enemy[1];

                // правая рука
                // (если не установлен чекбокс "Говорить только левую руку")
                if (!isLauncher && dataSt[11] && !dataSt[16]) {
                    str += dataSt[11] === '1' ? ' ле' :
                            dataSt[11] === '2' ? ' ц' : ' пр';
                }

                // левая рука
                // (если не установлен чекбокс "Говорить только правую руку")
                if (!isLauncher && dataSt[10] && !dataSt[19]) {
                    str += dataSt[10] === '1' ? ' ле' :
                            dataSt[10] === '2' ? ' ц' : ' пр';
                }

                if (!fake) {
                    _this.inpTextChat.value = str +
                        (!notWriteEnemyNameWhenSayMove ?
                                ' [' + enemy[2] + ']' : '') +
                                    generalSkill + specialSkill;
                }
            }

            // отправляем сообщение в чат
            general.doc.querySelector('input[type="submit"]' +
                '[value="Написать"]').click();
        };

        /**
         * @method getLeftRightCommands
         */
        this.getLeftRightCommands = function () {
            if (this.leftRightCommands.length) {
                return;
            }

            if (general.viewMode) {
                this.leftRightCommands.push(general.doc.
                        querySelector('tr>td[valign="top"][width="15%"]' +
                            ':first-child'));
                this.leftRightCommands.push(general.doc.
                        querySelector('tr>td[valign="top"][width="15%"]' +
                            ':last-child'));
                return;
            }

            // в бою ищем DIV'ы с бойцами явно, т.к.они меняются местами по ID
            this.leftRightCommands.push(general.doc.
                    querySelector('#listleft,#listright'));
            this.leftRightCommands[1] =
                this.leftRightCommands[0].id === 'listleft' ?
                        general.$('listright') : general.$('listleft');
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
                    /HP: (\d+)\/(\d+)/.exec(allText) : '';
            objPers.dist = /расстояние: \d+/.test(allText) ?
                    /расстояние: (\d+)/.exec(allText)[1] : '';
            objPers.visib = /видимость: \d+%/.test(allText) ?
                    /видимость: (\d+%)/.exec(allText)[1] : '';
            objPers.power = /мощность: \d+/.test(allText) ?
                    /мощность: (\d+)/.exec(allText)[1] : '';
            objPers.skill = '';

            // номера противников в режиме наблюдения за боем
            if (general.viewMode) {
                var persNum = prnt.querySelector('span.battletags');
                objPers.num = persNum ? persNum.innerHTML : null;
            }

            // добавляем умелку
            var skill = prnt.querySelectorAll('img[src*="/skill_"]+b>' +
                    'font[style="font-size:8px;"]'),
                i;

            if (skill.length) {
                objPers.skill = '<br>' +
                    '<span style="color: #0087FF; font-size:9px;">';

                for (i = 0; i < skill.length; i++) {
                    objPers.skill += skill[i].innerHTML +
                        (i !== skill.length - 1 ? ', ' : '');
                }

                objPers.skill += '</span>';
            }

            // оружие (для заполнения списка выбора врагов)
            objPers.weapon = '';
            // оружие и амуниция
            objPers.allWeapon = '';
            var allAmmunition = prnt.
                    querySelectorAll('a[href*="/item.php?item_id="]'),
                indent = '<span style="font-weight: bold; ' +
                            'margin: 0 3px 0 3px;">&bull;</span>',
                getSw = function (range) {
                    return '<span style="color: #FF0000; font-size: 7pt; ' +
                        'margin-left: 7px; float: right;">(' + range + ')' +
                        '</span>' + indent + '<span style="color: #FF5555;">' +
                        'Подствол</span><br>';
                },
                // для некоторых предметов установка модуля дальности
                // увеличивает дальность больше чем на 1
                modeUpgRange = {
                    'hk762': 3,
                    'colt692': 3,
                    'fd308': 2,
                    'ar10': 2,
                    'saf': 2,
                    'fort401': 3,
                    'ng7': 2,
                    'grom2': 2
                },
                builtinSw = '',
                baseUpgRange,
                isGrenade,
                itemLink,
                itemId,
                range,
                color,
                splt,
                sw;

            // у поков ссылок на амуницию нет
            if (allAmmunition.length) {
                objPers.weapon = allAmmunition[0].innerHTML;
                for (i = 0; i < allAmmunition.length; i++) {
                    itemLink = allAmmunition[i];
                    itemId = /\?item_id=([^&$]+)/.exec(itemLink.href)[1];
                    range = this.rangeWeapon[itemId];
                    color = this.art.indexOf(itemId) !== -1 ? '#009900' :
                                this.rent.indexOf(itemId) !== -1 ? '#870000' :
                                    '#000000';

                    // красим ссылки на странице,
                    // открываем их в отдельной вкладке
                    itemLink.style.color = color;
                    itemLink.setAttribute('target', '_blank');

                    if (range) {
                        // наличие встроенного подствола, например thales_grl
                        builtinSw = '';
                        splt = range.split('/');
                        if (splt.length > 2) {
                            builtinSw = splt[1] + '/' + splt[2];
                        }

                        splt[0] = +splt[0];
                        // установленные модули на дальность
                        baseUpgRange = modeUpgRange[itemId] || 1;
                        if (/&upg=1(&|$)/.test(itemLink.href)) {
                            splt[0] += baseUpgRange;
                        } else if (/&upg=11(&|$)/.test(itemLink.href)) {
                            splt[0] += baseUpgRange + 1;
                        } else if (/&upg=(12|13)(&|$)/.test(itemLink.href)) {
                            splt[0] += 1;
                        }

                        // модификаторы на дальность
                        if (/&m=(27|43)(&|$)/.test(itemLink.href)) {
                            splt[0] += 1;
                        } else if (/&m=(8|16|34)(&|$)/.test(itemLink.href)) {
                            splt[0] += 2;
                        }

                        range = builtinSw ? splt[0] : splt[0] +
                            (splt[1] ? '/' + splt[1] : '');

                        // граната или гранатомет
                        isGrenade = /\//.test(range);
                        objPers.allWeapon += '<span style="color: ' +
                            (isGrenade ? '#870000' : '#0000FF') + '; ' +
                            'font-size: 7pt; margin-left: 7px; ' +
                            'float: right;">(' + range + ')' +
                            '</span>' + indent + '<span style="color: ' +
                            color + ';">' + itemLink.innerHTML + '</span><br>';

                        // подствол (или встроенный, или установленный)
                        if (builtinSw) {
                            objPers.allWeapon += getSw(builtinSw);
                        } else {
                            sw = /&sw=([^&$]+)/.exec(itemLink.href);
                            range = sw ? this.rangeWeapon[sw[1]] : '';
                            if (range) {
                                objPers.allWeapon += getSw(range);
                            }
                        }
                    } else {
                        objPers.allWeapon += indent + '<span style="color: ' +
                            color + ';">' + itemLink.innerHTML + '</span><br>';
                    }
                }
            }

            var name = persLink.textContent.replace(/&amp;/, '&');

            // личные NPC персонажей
            if (/\[NPC\]$/.test(name)) {
                objPers.npc = true;
            }

            this.allFighters[name] = objPers;

            // в бою и если это мой перс, то запоминаем его
            if (!general.viewMode && persLink.href &&
                    persLink.href.indexOf('?id=' + general.myID) !== -1) {
                this.myPers = objPers;
                this.myPers.name = name;
                this.myPers.damage = /урон: (\d+)(\+\d+)? \((\d+)\)/.
                        exec(allText);
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
                    span.setAttribute('name', 'sendmessenv');
                    span.innerHTML = ' <img src="' + general.imgPath +
                        'envelope.gif" style="width: 15px; cursor: pointer; ' +
                        'margin-right: 5px;" alt="img" />';
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
                str = '<span style="color: ' + color + ';">' +
                    // HP
                    this.myPers.hp[1] + '</span>/' +
                    '<span style="color: #008000; font-weight: bold;">' +
                    this.myPers.hp[2] + '</span>' +
                    // урон
                    '<span style="margin-left: 15px;">' +
                    this.myPers.damage[1] +
                    (this.myPers.damage[2] ? '<span style="color: #009900; ' +
                        'font-weight: bold;">' + this.myPers.damage[2] +
                            '</span>' : '') +
                    '(<span style="font-weight: bold; color: #FF0000;">' +
                    this.myPers.damage[3] + '</span>)</span>' +
                    // видимость
                    '<span style="margin-left: 15px; font-weight: bold;">' +
                    this.myPers.visib + '</span>' +
                    // количество бойцов
                    '<span style="margin-left: 15px; font-weight: bold;">' +
                    '<span style="color: #FF0000;">' + this.leftPers.length +
                    '</span> / <span style="color: #0000FF;">' +
                    this.rightPers.length + '</span></span>' +
                    // ссылка "Наблюдение"
                    '<a href="http://www.gwars.ru/warlog.php?bid=' +
                    /\?bid=(\d+)/.exec(general.loc)[1] + '&rev=1" ' +
                    'target="_blank" style="margin-left: 15px;"><img src="' +
                    general.imgPath + 'eyes.png" width="16" height="9" ' +
                    'title="Режим наблюдения за боем" alt="img" /></a>';

            // счетчик количества бойцов сделавших ход
            if (count) {
                str += '<span style="margin-left: 15px;">' + count + '/' +
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

            var id = +/\d/.exec(_this.id)[0],
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
            var dataSt = general.getData();
            dataSt[0] = id.toString();
            general.setData(dataSt);

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

            general.$('s' + (general.getData()[0] || '0')).click();
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

        /**
         * @method setWalk
         * @param   {int}   ind
         */
        this.setWalk = function (ind) {
            var dataSt = general.getData(),
                walk = general.$('walk');

            if (walk) {
                // noinspection JSRemoveUnnecessaryParentheses
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
            var dataSt = general.getData();

            // Дуэли - отходить можно только в центр (чекбоксы лево и
            // право не активны). Стрелям тоже всегда в центр.
            if (general.doc.querySelector('#defence1:disabled')) {
                this.clickElem(general.$('defence2'));
                this.clickElem(general.$('left_attack2'));
                this.clickElem(general.$('right_attack2'));

                return;
            }

            // если в хранилище есть запись в кого стреляли
            // (сказали ход), то устанавливаем именно его
            if (dataSt[9]) {
                var options = general.$('euids').querySelectorAll('option'),
                    i;

                for (i = 0; i < options.length; i++) {
                    if (new RegExp('^' + dataSt[9] + '\\.').
                            test(options[i].innerHTML)) {
                        options[i].selected = true;
                        break;
                    }
                }

                // левая рука
                if (dataSt[10]) {
                    this.clickElem(general.$('left_attack' + dataSt[10]));
                }

                // правая рука
                if (dataSt[11]) {
                    this.clickElem(general.$('right_attack' + dataSt[11]));
                }

                // куда отходим
                if (dataSt[12]) {
                    this.clickElem(general.$('defence' + dataSt[12]));
                }

                // если грена
                if (dataSt[13]) {
                    this.clickElem(general.$('bagaboom'));
                }

                // подходим или нет
                this.setWalk(14);

                // общий навык
                if (dataSt[17]) {
                    this.clickElem(general.$('apmid'));
                }

                // навык специалиста
                if (dataSt[18]) {
                    this.clickElem(general.$('apsid'));
                }

                // подствол
                if (dataSt[20]) {
                    this.clickElem(general.$('sbw'));
                }

                this.clearSavedStrokeAfterSay();

                return;
            }

            // отмечен чекбокс "запомнить ход"
            if (dataSt[1]) {
                // левая рука
                if (dataSt[3]) {
                    this.clickElem(general.$('left_attack' + dataSt[3]));
                }

                // правая рука
                if (dataSt[4]) {
                    this.clickElem(general.$('right_attack' + dataSt[4]));
                }

                // куда отходим
                if (dataSt[5]) {
                    this.clickElem(general.$('defence' + dataSt[5]));
                }

                // граната
                if (dataSt[6] && general.$('bagaboom')) {
                    this.clickElem(general.$('bagaboom'));
                }

                // подствол
                if (dataSt[20] && general.$('sbw')) {
                    this.clickElem(general.$('sbw'));
                }

                // подходим или нет
                this.setWalk(7);

            // отмечен чебокс "не дублировать цель" и две руки
            } else if (dataSt[2] && !general.$('span_two_hand').style.display) {
                var rightAttack = general.doc.querySelector('input' +
                        '[type="radio"][name^="right_attack"]:checked'),
                    leftAttack = general.doc.querySelector('input' +
                        '[type="radio"][name^="left_attack"]:checked'),
                    x = /\d/.exec(rightAttack.id)[0],
                    y = /\d/.exec(leftAttack.id)[0];

                // если ход дублируется
                if (x === y) {
                    while (x === y) {
                        x = this.getRandom1to3();
                        y = this.getRandom1to3();
                    }

                    this.clickElem(general.$('right_attack' + x));
                    this.clickElem(general.$('left_attack' + y));
                }
            }
        };

        /**
         * @method setHandlerSubmit
         */
        this.setHandlerSubmit = function () {
            var s = general.doc.createElement('script');
            s.innerHTML = 'function fight_mod() {' +
                    'var dataSt = localStorage.getItem(\'' + general.STNAME +
                                    '\').split(\'|\'),' +
                    'elem;' +

                    'dataSt[3] = \'\';' +   // левая
                    'dataSt[4] = \'\';' +   // правая
                    'dataSt[5] = \'\';' +   // куда отходим
                    'dataSt[6] = \'\';' +   // граната
                    'dataSt[7] = \'\';' +   // подходим или нет

                    // левая рука
                    'if (elem = document.querySelector(\'input[type="radio"]' +
                            '[id^="left_attack"]:checked\')) {' +
                        'dataSt[3] = /left_attack(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // правая рука
                    'if (elem = document.querySelector(\'input[type="radio"]' +
                            '[id^="right_attack"]:checked\')) {' +
                        'dataSt[4] = /right_attack(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // куда отходим
                    'if (elem = document.querySelector(\'input[type="radio"]' +
                            '[id^="defence"]:checked\')) {' +
                        'dataSt[5] = /defence(\\d)/.exec(elem.id)[1];' +
                    '}' +

                    // граната
                    'if (elem = document.' +
                            'querySelector(\'#bagaboom:checked\')) {' +
                        'dataSt[6] = \'1\';' +
                    '}' +

                    // подходим или нет
                    'if (elem = document.querySelector(\'#walk:checked\')) {' +
                        'dataSt[7] = \'1\';' +
                    '}' +

                    'localStorage.setItem(\'' + general.STNAME +
                        '\', dataSt.join(\'|\'));' +
                    'fight();' +
                '}';
            general.doc.body.appendChild(s);
        };

        /**
         * @method setControlOfShooting
         */
        this.setControlOfShooting = function () {
            var divGenerator = general.doc.createElement('div'),
                bf = general.$('bf'),
                coord = new GetPos().init(bf);

            divGenerator.setAttribute('style', 'position: absolute; top: ' +
                    coord.y + 'px; left: ' + coord.x + 'px; ' +
                    'margin: 5px 0 0 5px;');

            // если две руки, то "не дублировать цель" делаем видимым
            var vis = general.$('left_attack1') && general.$('right_attack1') ?
                        '' : 'none';

            // если одна рука, то сбрасываем чекбокс
            // "Говорить только левую руку (для БЩ)"
            if (vis) {
                var stData = general.getData();
                stData[16] = '';
                stData[19] = '';
                general.setData(stData);
            }

            divGenerator.innerHTML = '<input type="checkbox" ' +
                'id="save_stroke">  <label for="save_stroke" ' +
                'style="vertical-align: top;">запомнить ход</label><br>' +
                '<span id="span_two_hand" style="display: ' + vis +
                ';"><input type="checkbox" id="repeat_two_hand"> <label ' +
                'for="repeat_two_hand" style="vertical-align: top;">не ' +
                'дублировать цель</label></span>';
            bf.appendChild(divGenerator);

            var chkRememberStroke = general.$('save_stroke'),
                chkNoDuplicateTarget = general.$('repeat_two_hand'),
                goButton = general.doc.
                    querySelector('a[href^="javascript:void(fight"]');

            var _this = this;
            chkRememberStroke.addEventListener('click', function () {
                var dataSt = general.getData(),
                    thischk = this;

                if (thischk.checked) {
                    chkNoDuplicateTarget.checked = false;
                    dataSt[2] = '';

                    goButton.setAttribute('href',
                            ['javascript', ':', 'void(fight_mod())'].join(''));
                    dataSt[1] = '1';
                    general.setData(dataSt);
                    _this.setStroke();
                } else {
                    goButton.setAttribute('href',
                            ['javascript', ':', 'void(fight())'].join(''));
                    dataSt[1] = '';
                    general.setData(dataSt);
                }
            }, false);

            chkNoDuplicateTarget.addEventListener('click', function () {
                var dataSt = general.getData(),
                    thischk = this;

                if (thischk.checked) {
                    chkRememberStroke.checked = false;
                    dataSt[1] = '';
                }

                dataSt[2] = thischk.checked ? '1' : '';
                general.setData(dataSt);
                _this.setStroke();
            }, false);

            // установим свой обработчик нажатия кнопки "Сделать ход"
            // (если установлен чекбокс "запомнить ход", то отправленный
            // ход будет запоминаться в localStorage)
            this.setHandlerSubmit();

            var dataSt = general.getData();
            if (dataSt[1]) {                    // чекбокс "запомнить ход"
                chkRememberStroke.click();
            } else if (dataSt[2]) {             // чекбокс "не дублировать цель"
                chkNoDuplicateTarget.click();
            } else {                            // все чекбоксы сброшены
                this.setStroke();
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
         * @return  {Function}
         */
        this.showTooltip = function (ttl, _this) {
            return function () {
                var getPos = new GetPos(),
                    obj;

                // относительно чего будем выравнивать тултип
                if (general.viewMode) {
                    obj = {
                        x: general.doc.querySelector('table[background$=' +
                            '"/battleField.gif"]').nextElementSibling.
                                nextElementSibling,
                        y: 14
                    };
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
         * @return  {Function}
         */
        this.hideTooltip = function (_this) {
            return function () {
                _this.tooltip.style.display = 'none';
            };
        };

        /**
         * @method  setPersNikInChat
         * @param   {Object}    _this
         * @param   {String}    pName
         * @return  {Function}
         */
        this.setPersNikInChat = function (_this, pName) {
            return function () {
                _this.inpTextChat.value = _this.inpTextChat.value + ' ' +
                    pName + ' ';
                _this.inpTextChat.focus();
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
                if (!ttl || !/(.*) \[\d+/.test(ttl)) {
                    continue;
                }

                ttlName = /(.*) \[\d+/.exec(ttl)[1].replace(/&amp;/, '&');
                // если есть список выбора врага (ход не сделан)
                if (options) {
                    // noinspection JSUnresolvedVariable
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
                            (general.viewMode ?
                                    (pers.num ? pers.num + '. ' : '') :
                                        this.enemies[name] ?
                                            this.enemies[name] + '. ' : '') +
                            '<span style="color: #0000FF;">' + pers.lvl +
                            '</span> ' +
                            '<span' +
                            (pers.npc ? ' style="opacity:0.6;"' : '') + '>' +
                            name + '</span> ' +
                            '<span>[' + pers.hp[1] + '/' + pers.hp[2] + ']' +
                            '</span>' +
                            '</span>' +
                            '<div style="color: ' +
                            '#B85006; margin-left: 10px;">Видимость: ' +
                            pers.visib + '<br><span style="color: #000000;">' +
                            'Мощность: ' + pers.power + '</span>' + pers.skill +
                            '</div><div>' +
                            pers.allWeapon + '</div>';

                        // прозрачность перса в зависимости от его видимости
                        visib = +/\d+/.exec(pers.visib)[0];
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
                // по двойному клику вставляем ник персонажа в поле ввода чата
                img[i].addEventListener('dblclick',
                    _this.setPersNikInChat(_this, ttlName), false);

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
            // в бою
            if (!general.viewMode) {
                var bf = general.$('bf');
                // ход сделан, вставляем сохраненную таблицу
                if (/Ждём ход противника/i.test(bf.innerHTML)) {
                    if (this.graphTable) {
                        var target = bf.querySelector('a').parentNode;
                        target.appendChild(general.doc.createElement('br'));
                        target.appendChild(general.doc.createElement('br'));
                        target.appendChild(this.graphTable);
                        target.appendChild(general.doc.createElement('br'));
                        this.setTooltipsFighters(this.graphTable);
                        return;
                    }
                } else {    // ход еще не сделан
                    table = bf.querySelector('div>table:last-child');
                }
            } else {    // режим наблюдения за боем
                table = this.leftRightCommands[0].nextElementSibling.
                    lastElementChild.previousElementSibling;

                if (/Наблюдатели/.test(table.innerHTML)) {
                    table = table.previousElementSibling;
                }
            }

            table.setAttribute('style', 'border-collapse: collapse;');
            table.setAttribute('background', general.imgPath +
                    'battleField.gif');

            // вставим пустую строку после таблицы
            if (!general.viewMode) {    // в бою
                table.parentNode.appendChild(general.doc.createElement('br'));
            } else {    // режим наблюдения за боем
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
                        hpClr = hp < 30 ? '#FF0000' :
                                    hp < 80 ? '#C44A00' : '#339933';

                        divHealth.innerHTML = '<div style="' +
                            'height: 2px; width: ' +
                                Math.ceil(prBarWidth / 100 * hp) + 'px; ' +
                            'background-color: ' + hpClr + ';"></div>';
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
            DC = even ? leftDC + DC / 2 : leftDC + Math.floor(DC / 2);

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

            if (!general.viewMode) {
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

            if (greenPersLinks.length) {
                var persLinkInBattle, i;
                for (i = 0; i < greenPersLinks.length; i++) {
                    persLinkInBattle = general.doc.
                        querySelector('a[href="' + greenPersLinks[i].href +
                                '"]');
                    if (persLinkInBattle) {
                        persLinkInBattle.style.color = '#008800';
                    }
                }

                this.setMyInfo(greenPersLinks.length);
            }
        };

        /**
         * @method setColorFighters
         * @param   {Object}    _this
         */
        this.setColorFighters = function (_this) {
            return function () {
                // ход сделан
                if (/Ждём ход противника/i.test(general.$('bf').innerHTML)) {
                    // ссылка на страницу НЕ JS-версии боя
                    var url = general.loc.replace('btl.php', 'b.php'),
                        ajax = new AjaxQuery();

                    ajax.init(url, function (xhr) {
                        var span = general.doc.createElement('span');
                        span.innerHTML = xhr.responseText;
                        _this.setCountStroke(span);
                    }, function () {
                        general.root.console.log('Error XHR to: ' + url);
                    });
                }
            };
        };

        /**
         * @method start
         */
        this.start = function () {
            // сразу скрываем тултип (на всякий случай, если остался)
            this.tooltip.style.display = 'none';

            var selectEnemies = general.$('euids'),
                dataSt = general.getData(),
                options,
                i;

            // в бою
            // noinspection JSUnresolvedVariable
            if (!general.viewMode && general.root.bvhc) {
                // если есть список выбора врага (ход не сделан)
                if (selectEnemies) {
                    // играем звук о начале хода
                    if (!this.checkSound) {
                        new PlaySound().init(sound2);
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
                } else {    // ход сделан
                    this.checkSound = false;
                    if (!this.enemies) {
                        return;
                    }
                }
            } else {    // в режиме наблюдения за боем
                dataSt[15] = '';    // удаляем данные из списка врагов
                general.setData(dataSt);
            }

            // noinspection JSUnresolvedVariable
            if (general.root.bvhc) {
                this.getLeftRightCommands();
            }

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
            if (this.leftPers[0].nextElementSibling.
                    getAttribute('name') !== 'sendmessenv') {
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
                        /*eslint-disable no-useless-escape */
                        enemyName = /^\d+\. ([^\[]+)\[/.
                            exec(options[i].innerHTML);
                        /*eslint-enable no-useless-escape */

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

                    // установка чекбоксов "запомнить ход" и
                    // "не дублировать цель"
                    this.setControlOfShooting();

                    // показываем кнопку "Сказать ход"
                    this.sayMoveButton.style.display = '';
                } else {    // уже сходили
                    // прячем кнопку "Сказать ход"
                    this.sayMoveButton.style.display = 'none';
                }

                // обновление данных в бою
                if (refreshBattle && !this.tmRefreshBattle) {
                    this.tmRefreshBattle = general.root.
                        setInterval(function () {
                            var updLink = general.doc.
                                    querySelector('a[href*="updatedata()"], ' +
                                        'input[onclick$="void(updatedata())"]');

                            if (updLink) {
                                updLink.click();
                            }
                        }, refreshBattle * 1000);
                }

                // подсвечиваем персонажей, которые уже сделали ход,
                // устанавливаем количество персонажей, сделавших ход
                if (!this.tmHighlightPers) {
                    this.setColorFighters(this);
                    this.tmHighlightPers = general.root.
                        setInterval(this.setColorFighters(this), 3000);
                }
            }

            // изменяем расположение бойцов, ставим тултипы...
            this.changeLocationFighters();
        };

        /**
         * @method setChatInterface
         */
        this.setChatInterface = function () {
            // чекбокс "Сказать своей команде"
            var sayOnlyMyCommand = general.doc.createElement('input');
            sayOnlyMyCommand.type = 'checkbox';
            sayOnlyMyCommand.setAttribute('title', 'Сказать своей команде');
            this.inpTextChat.parentNode.insertBefore(sayOnlyMyCommand,
                    this.inpTextChat);

            // чекбокс "Сказать как координатор"
            var sayAsCoord = general.doc.createElement('input');
            sayAsCoord.type = 'checkbox';
            sayAsCoord.setAttribute('style', 'margin-right: 10px;');
            sayAsCoord.setAttribute('title', 'Сказать как координатор');
            this.inpTextChat.parentNode.insertBefore(sayAsCoord,
                    this.inpTextChat);

            if (!coordButton) {
                sayAsCoord.style.display = 'none';
                sayOnlyMyCommand.setAttribute('style', 'margin-right: 10px;');
            }

            if (general.viewMode) {
                sayOnlyMyCommand.style.display = 'none';
            }

            var _this = this;
            sayOnlyMyCommand.addEventListener('click', function () {
                var dataSt = general.getData(),
                    thisChk = this;

                if (thisChk.checked) {
                    if (sayAsCoord.checked) {
                        dataSt[21] = '';
                        sayAsCoord.checked = false;
                        _this.inpTextChat.value = _this.inpTextChat.value.
                            replace(/^\s*!\*\s*/, '');
                    }

                    dataSt[8] = '1';
                    var chatMessage = _this.inpTextChat.value;
                    // noinspection RegExpSingleCharAlternation
                    if (!general.viewMode &&
                            !/^\s*(~|\*|@)/.test(chatMessage)) {
                        _this.inpTextChat.value = '~' + chatMessage;
                    }

                    if (_this.intervalUpdateInpTextChat) {
                        general.root.clearInterval(_this.
                            intervalUpdateInpTextChat);
                    }

                    // костыль после отправки сообщения в чат
                    if (!general.viewMode) {
                        _this.intervalUpdateInpTextChat = general.root.
                            setInterval(function () {
                                if (!_this.inpTextChat.value) {
                                    _this.inpTextChat.value = '~';
                                }
                            }, 1000);
                    }
                } else {
                    dataSt[8] = '';
                    // noinspection RegExpSingleCharAlternation
                    _this.inpTextChat.value = _this.inpTextChat.value.
                        replace(/^\s*(~|\*|@)\s*/, '');

                    if (_this.intervalUpdateInpTextChat) {
                        general.root.clearInterval(_this.
                            intervalUpdateInpTextChat);
                    }
                }

                general.setData(dataSt);
                _this.inpTextChat.focus();
            }, false);

            sayAsCoord.addEventListener('click', function () {
                var dataSt = general.getData(),
                    thisChk = this;

                if (thisChk.checked) {
                    if (sayOnlyMyCommand.checked) {
                        dataSt[8] = '';
                        sayOnlyMyCommand.checked = false;
                        _this.inpTextChat.value = _this.inpTextChat.value.
                            replace(/^\s*~\s*/, '');
                    }

                    dataSt[21] = '1';
                    var chatMessage = _this.inpTextChat.value;
                    // noinspection RegExpSingleCharAlternation
                    if (!/^!\*/.test(chatMessage)) {
                        _this.inpTextChat.value = '!*' + chatMessage;
                    }

                    if (_this.intervalUpdateInpTextChat) {
                        general.root.clearInterval(_this.
                            intervalUpdateInpTextChat);
                    }

                    // костыль после отправки сообщения в чат
                    _this.intervalUpdateInpTextChat = general.root.
                        setInterval(function () {
                            if (!_this.inpTextChat.value) {
                                _this.inpTextChat.value = '!*';
                            }
                        }, 1000);
                } else {
                    dataSt[21] = '';
                    // noinspection RegExpSingleCharAlternation
                    _this.inpTextChat.value = _this.inpTextChat.value.
                        replace(/^\s*!\*\s*/, '');

                    if (_this.intervalUpdateInpTextChat) {
                        general.root.clearInterval(_this.
                            intervalUpdateInpTextChat);
                    }
                }

                general.setData(dataSt);
                _this.inpTextChat.focus();
            }, false);

            var stData = general.getData();
            if (stData[8]) {
                sayOnlyMyCommand.click();
            } else if (stData[21]) {
                sayAsCoord.click();
            }

            if (general.viewMode) {
                return;
            }

            // если отмечен чекбокс "Сказать своей команде", символ '~' стереть
            // будет нельзя
            // если отмечен чекбокс "Сказать как координатор", символы '!*'
            // стереть будет нельзя
            this.inpTextChat.addEventListener('input', function (e) {
                var thisInp = this;
                if (sayOnlyMyCommand.checked && !thisInp.value) {
                    thisInp.value = '~';
                }

                if (sayAsCoord.checked &&
                        (!thisInp.value || thisInp.value === '!')) {
                    thisInp.value = '!*';
                }

                // при нажатии <Enter> сохраняем установленный ход
                var ev = e || general.root.event,
                    key = ev.keyCode;

                if (key === 13 || key === 10) {
                    _this.sayMove(_this, true);
                }
            }, false);

            // при клике на "Написать" сохраняем установленный ход
            var writeButton = general.doc.querySelector('input[type="submit"]' +
                '[value="Написать"]');
            writeButton.addEventListener('click', function () {
                _this.sayMove(_this, true);
            }, false);

            // кнопа "Сказать ход"
            this.sayMoveButton = general.doc.createElement('input');
            this.sayMoveButton.type = 'button';
            this.sayMoveButton.setAttribute('class', 'mainbutton');
            this.sayMoveButton.setAttribute('style', 'background: #F5FFF5; ' +
                'border-radius: 3px; cursor: pointer; box-shadow: ' +
                '1px 1px 2px rgba(122,122,122,0.5);');
            this.sayMoveButton.value = 'Сказать ход';
            this.sayMoveButton.addEventListener('click', function () {
                _this.sayMove(_this, false);
            }, false);
            sayOnlyMyCommand.parentNode.insertBefore(this.sayMoveButton,
                    sayOnlyMyCommand);

            // если двурукий, устанавливаем чекбоксы:
            // "Говорить только правую руку" и "Говорить только левую руку"
            if (general.$('left_attack1') && general.$('right_attack1')) {
                // "Говорить только левую руку"
                var sayOnlyLeftHand = general.doc.createElement('input');
                sayOnlyLeftHand.setAttribute('id', 'sayOnlyLeftHand');
                sayOnlyLeftHand.type = 'checkbox';
                sayOnlyLeftHand.setAttribute('title',
                    'Говорить только левую руку');
                sayOnlyLeftHand.checked = !!stData[16];
                sayOnlyMyCommand.parentNode.
                    insertBefore(sayOnlyLeftHand, sayOnlyMyCommand);

                sayOnlyLeftHand.addEventListener('click', function () {
                    var data = general.getData(),
                        this_checked = sayOnlyLeftHand.checked;

                    data[16] = this_checked ? '1' : '';
                    general.setData(data);

                    // если отмечен, сбрасываем чекбокс для правой руки
                    var onlyRightHand = general.$('sayOnlyRightHand');
                    if (this_checked && onlyRightHand.checked) {
                        onlyRightHand.click();
                    }
                }, false);

                // "Говорить только правую руку"
                var sayOnlyRightHand = general.doc.createElement('input');
                sayOnlyRightHand.setAttribute('id', 'sayOnlyRightHand');
                sayOnlyRightHand.type = 'checkbox';
                sayOnlyRightHand.setAttribute('title',
                    'Говорить только правую руку');
                sayOnlyRightHand.checked = !!stData[19];
                sayOnlyMyCommand.parentNode.
                    insertBefore(sayOnlyRightHand, sayOnlyLeftHand);

                sayOnlyRightHand.addEventListener('click', function () {
                    var data = general.getData(),
                        this_checked = sayOnlyRightHand.checked;

                    data[19] =  this_checked ? '1' : '';
                    general.setData(data);

                    // если отмечен, сбрасываем чекбокс для левой руки
                    var onlyLeftHand = general.$('sayOnlyLeftHand');
                    if (this_checked && onlyLeftHand.checked) {
                        onlyLeftHand.click();
                    }
                }, false);
            }

            // добавляем кнопку "Обновить"
            var buttonUpdate = general.doc.createElement('input');
            buttonUpdate.type = 'button';
            buttonUpdate.setAttribute('class', 'mainbutton');
            buttonUpdate.setAttribute('style', 'background: #F5FFF5; ' +
                'border-radius: 3px; cursor: pointer; box-shadow: ' +
                '1px 1px 2px rgba(122,122,122,0.5);');
            buttonUpdate.value = 'Обновить';
            buttonUpdate.setAttribute('onclick',
                    ['javascript', ':', 'void(updatedata())'].join(''));

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
                        general.root.bf1 : general.root.bf2 + general.root.bf3;
                general.$('bfndl').innerHTML = general.root.bfndl;
                _this.start();
            };
        };

        /**
         * @method tryStart
         */
        this.tryStart = function () {
            if (general.viewMode) {
                this.setChatInterface();
                this.start();
                return;
            }

            this.inpTextChat = general.doc.querySelector('input[name="oldm"]');
            // основное поле боя
            var bf = general.$('bf');

            if (this.inpTextChat && bf &&
                    !/Загружаются данные/.test(bf.innerHTML)) {
                this.changeMakebf();
                this.setChatInterface();
                this.start();
            } else {
                // ждем загрузки фрейма с данными
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
            // графическое оформление боев
            if (general.doc.querySelector('table[style*="battleground"]') ||
                    general.root.self !== general.root.top) {
                return;
            }

            // обновление страницы, когда висим в заявке
            if (/(\/wargroup|\/warlist)\.php/.test(general.loc)) {
                if (refreshAppl > 2 && (general.doc.
                        querySelector('center>b>font[color="#990000"]') ||
                            general.doc.querySelector('td[width="70%"]>b>' +
                                    'font[color="#990000"]'))) {

                    var updateLink = general.$('updatetimer2') ||
                            general.$('updatetimer');
                    if (updateLink) {
                        general.root.setTimeout(function () {
                            general.root.location = updateLink.parentNode.href;
                        }, refreshAppl * 1000);
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
            }

            // в бою
            if (!general.viewMode) {
                new PlaySound().init(sound1);
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
                'padding: 3px; border: 1px solid #339933; border-radius: ' +
                '7px; box-shadow: 2px 3px 5px rgba(122,122,122,0.5);');
            general.doc.body.appendChild(this.tooltip);
            // на всякий случай, если останется виден
            this.tooltip.addEventListener('click', function () {
                var _this = this;
                _this.style.display = 'none';
            }, false);

            this.tryStart();
        };
    };

    var mainObj = general;
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new AdvBattleAll().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

