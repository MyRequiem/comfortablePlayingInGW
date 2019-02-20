// ==UserScript==
// @name            BonusInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице информации персонажа делает названия бонусов кликабельными. При нажатии выводится описание бонуса.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BonusInfo/bonusInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BonusInfo/bonusInfo.user.js
// @include         http://www.gwars.ru/info.php?id=*
// @grant           none
// @license         MIT
// @version         2.10-200219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    regexp: true
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

        $: function (id) {
            return this.doc.querySelector('#' + id);
        }
    };

    var general = new General();

    /**
     * @class BonusInfo
     * @constructor
     */
    var BonusInfo = function () {
        /**
         * @property target
         * @type {HTMLTableCellElement|null}
         */
        this.target = general.doc.querySelector('td[class="greenbrightbg"]' +
            '[align="center"][valign="top"]:last-child');

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
                    if (this.bonus[bonusName] && general.root.amp4) {
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
            if (this.target) {
                this.savecontent = this.target.innerHTML;
                this.setBonusInfo();
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
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new BonusInfo().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

