// ==UserScript==
// @name            WorkPostGrenadesBroken
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Окончание работы, осталось времени работать, пришла почта/посылка, нет гранаты, имеются сломанные вещи. На все события оповещения звуковые и визуальные.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/WorkPostGrenadesBroken/workPostGrenadesBroken.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/WorkPostGrenadesBroken/workPostGrenadesBroken.user.js
// @include         http://www.ganjawars.ru/*
// @exclude         http://www.ganjawars.ru/b0/*
// @exclude         http://www.ganjawars.ru/index.php*
// @exclude         http://www.ganjawars.ru/login.php*
// @grant           none
// @license         MIT
// @version         2.03-101015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, regexp: true, devel: true
    plusplus: true, nomen: true
*/

(function () {
    'use strict';

    // ======================= НАСТРОЙКИ ===========================
        // звук при получени почты/посылки (0 - без звука)
    var soundSms = 10,
        // звук при окончании работы (0 - без звука)
        soundWork = 15,
        // отображать время работы
        showWorkTime = 1,
        // отображать почту/посылки
        showSms = 1,
        // отображать отсутствие гранаты на поясе
        showGrenade = 1,
        // отображать слом
        showBroken = 1;
    // ==================== КОНЕЦ НАСТРОЕК =========================

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
        this.STNAME = 'workPostGrenadesBroken';
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
        this.imgPath = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'imgs/WorkPostGrenadesBroken/';
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
            return stData ? this.st.getItem(this.STNAME).split('|') : false;
        },

        /**
         * @method setData
         * @param   {Array}     data
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
        this.redFactory = general.imgPath + 'redFactory.gif';
        /**
         * @property blueFactory
         * @type {String}
         */
        this.blueFactory = general.imgPath + 'blueFactory.gif';
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
                str = '';

            if (sms[0] && showSms) {    // письмо
                str += host + 'sms.php"><img src="http://www.ganjawars.ru/i/' +
                    'sms.gif" title="' + sms[0].getAttribute('title') +
                    '" alt="Вам письмо"></a>]';
            }

            if (sms[1] && showSms) {    // посылка
                str += host + 'items.php"><img src="http://www.ganjawars.ru/' +
                    'i/woodbox.gif" title="Пришла посылка!" ' +
                    'alt="посылка"></a>]';
            }

            if (!gren && showGrenade) { // граната
                str += host + 'items.php"><span style="color: #FF0000; ' +
                    'font-weight: bold;">Грена</span></a>]';
            }

            if (broken && showBroken) { // слом
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
            var ajaxQuery = new AjaxQuery();

            _this = _this || this;
            ajaxQuery.init('http://www.ganjawars.ru/me/', function (xml) {
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

                var stData = general.getData(),
                    playSound = new PlaySound();

                if ((testSms[0] || testSms[1]) && !stData[0]) {
                    stData[0] = '1';
                    playSound.init(soundSms);
                    general.setData(stData);
                } else if (!testSms[0] && !testSms[1] && stData[0]) {
                    stData[0] = '';
                    general.setData(stData);
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
                    if (showWorkTime) {
                        _this.wpgbContainer.innerHTML = '[<span style=' +
                            '"color: #0000FF">' + time + '</span> мин ' +
                            '<a href="' + linkObj.href + '"><img src="' +
                            _this.blueFactory + ttl;
                    }

                    stData[1] = '';
                    general.setData(stData);
                } else {
                    if (showWorkTime) {
                        _this.wpgbContainer.innerHTML = '[<a href="' +
                            linkObj.href + '"><img src="' + _this.redFactory +
                            ttl;
                    }

                    if (!stData[1]) {
                        stData[1] = '1';
                        general.setData(stData);
                        playSound.init(soundWork);
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
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'Work Post Grenades Broken\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            /**
             * localStorage:
             * [0] - звук при получении почты (проигран или нет)
             * [1] - звук при окончании работы (проигран или нет)
             */
            if (!general.getData()) {
                general.setData(['', '']);
            }

            var topPanel = new GetTopPanel().init();
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.wpgbContainer);

            this.startWorkPostGrenadesBroken(null);
            var _this = this;
            general.root.setInterval(function () {
                _this.startWorkPostGrenadesBroken(_this);
            }, new GetRandom().init(30, 60) * 1000);
        };
    };

    new WorkPostGrenadesBroken().init();

}());

