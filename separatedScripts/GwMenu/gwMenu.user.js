// ==UserScript==
// @name            GwMenu
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Панель с множеством полезных ссылок для игры.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GwMenu/gwMenu.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/GwMenu/gwMenu.user.js
// @include         http://www.gwars.ru*
// @grant           none
// @license         MIT
// @version         2.39-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp :true, vars: true, nomen: true,
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
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'gwMenu';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
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
         * @param   {String}    data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data);
        },

        /**
         * @method getData
         * @return  {String}
         */
        getData: function () {
            var stData = this.st.getItem(this.STNAME);
            if (stData) {
                return stData;
            }

            stData = '';
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
     * @class GwMenu
     * @constructor
     */
    var GwMenu = function () {
        /**
         * @property scriptVersion
         * @type {String}
         */
        this.scriptVersion = 'v. 2.32-061117';
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
                        '</span><br><span id="c3">for GWars fighters' +
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
                    ['GanjaWiki.ru: Энциклопедия игры',
                        'http://www.ganjawiki.ru/', 0, 1],
                    ['Выход из игры', '/logout.php', 'red', 1],
                    ['<td colspan="2"><input type="checkbox" id="showt" ' +
                        'title="Показывать всегда" />' +
                        '<span style="margin-left: 10px; font-size: 7pt; ' +
                        'color: #585858;">' + this.scriptVersion +
                        '</span></td>', 'gw_menu']
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
                    ['Статистика GWars.ru от vasena',
                        'http://gw-utils.ru/'],
                    ['GWTools от Bas', 'https://www.gwtools.ru/']
                ], prnt: 'gw_menu', arrow: 'real_estate'},
                {divm: 0, lines: [
                    ['Синдикат "Скрипты для GW"', '/syndicate.php?id=3579'],
                    ['Скрипты на ganjascript.ucoz.com',
                        'http://ganjascript.ucoz.com/'],
                    ['Скрипты на gwscripts.ucoz.net',
                        'http://gwscripts.ucoz.net/'],
                    ['ComfortablePlayingInGW',
                        'https://github.com/MyRequiem/comfortablePlayingInGW'],
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
                    ['GW - Маркетинговая служба игры',
                        '/syndicate.php?id=2324']
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
                    ['Чипы на урон',
                        'http://www.gwars.ru/sshop.php?tshop=chipsets'],
                    ['Чипы защитные',
                        'http://www.gwars.ru/sshop.php?tshop=chipsets1'],
                    ['Чипы специальные',
                        'http://www.gwars.ru/sshop.php?tshop=chipsets2'],
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
            var showt = general.$('showt');
            showt.addEventListener('click', function () {
                general.setData(showt.checked ? '1' : '');
            }, false);

            this.gwMenuInit();
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'GwMenu\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            // ссылка в главном меню игры
            var target = general.doc.querySelector('a[href$="/ratings.php"]');
            if (target) {
                var mainLink = general.doc.createElement('span');
                mainLink.setAttribute('style', 'font-weight: bold; ' +
                    'cursor: pointer;');
                mainLink.innerHTML = 'GW-Меню';
                target.parentNode.insertBefore(mainLink, target);
                target.parentNode.
                    insertBefore(general.doc.createTextNode(' | '), target);

                var _this = this;
                mainLink.addEventListener('click', function () {
                    _this.gwMenuInit(_this);
                }, false);

                // если есть запись в хранилище "Показывать всегда"
                if (general.getData()) {
                    this.gwMenuInit();
                    general.$('showt').checked = true;
                }
            }
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
        script.src = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/cpigwchbl/cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new GwMenu().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

