// ==UserScript==
// @name            WorkPostGrenadesBroken
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Окончание работы, осталось времени работать, пришла почта/посылка, нет гранаты, имеются сломанные вещи. На все события оповещения звуковые и визуальные.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/WorkPostGrenadesBroken/workPostGrenadesBroken.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/WorkPostGrenadesBroken/workPostGrenadesBroken.user.js
// @include         https://*gwars*/me.php*
// @include         https://*gwars*/me/*
// @include         https://*gwars*/warlog.php?bid=*
// @include         https://*gwars*/warlist.php*
// @include         https://*gwars*/wargroup.php*
// @grant           none
// @license         MIT
// @version         2.51-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, nomen: true,
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
         * @type {RegExpExecArray}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie);
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/WorkPostGrenadesBroken/';
        /**
         * @property domain
         * @type {String}
         */
        this.domain = this.doc.domain;
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
            // ищем верхнюю панель "MyRequiem [603/603] ... 21:01, 3095 онлайн"
            var topPanel;

            if (general.DESIGN_VERSION[2] === 'v2') {  // новый дизайн
                topPanel = general.doc.querySelector('td.gw-header-col2 ' +
                        'td[width="50%"][valign="middle"]');
                if (topPanel) {
                    topPanel.setAttribute('style', 'width: 70%;');
                }
            } else {
                topPanel = general.doc.
                    querySelector('td.txt[align="left"] nobr:first-child');
                if (topPanel) {
                    // noinspection JSUnresolvedFunction
                    topPanel.parentNode.setAttribute('style', 'width: 70%;');
                }
            }

            return topPanel;
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
            'emp_irs', 'emp_a', 'rgd5', 'grenade_f1', 'rgd2', 'lightst',
            'lights', 'rkg3', 'mdn', 'rgd2m', 'rgo', 'm84', 'rgn', 'emp_ir',
            'fg3l', 'l83a1', 'emp_s', 'm67', 'm3', 'hg78', 'hg84', 'fg6',
            'anm14', 'm34ph', 'fg7', 'fg8bd', 'r10',
            //синдовые
            'lightss', 'lightsm', 'rgd2s', 'grenade_dg1', 'fg5', 'molotov',
            'hellsbreath', 'napalm', 'ghtb', 'me85',
            //ржавка
            'old_rgd5',
            //гранатометы
            /* гос */
            'rpg', 'ptrk', 'glauncher', 'grg', 'paw20', 'rpgu', 'grom2',
            'ags30', 'gm94', 'gl06', 'gmg', 'balkan', 'rg6', 'm202', 'mm1',
            /* арт */
            'milkor', 'm32', 'mk47',
            /* пасхальные яйца */
            'pegg1', 'pegg2', 'pegg3', 'egg1', 'egg2', 'egg3'
        ];

        /**
         * @method addContent
         * @param   {Array}     sms
         * @param   {Boolean}   gren
         * @param   {Boolean}   broken
         * @return  {String}
         */
        this.addContent = function (sms, gren, broken) {
            var host = ' [<a href="https://' + general.domain + '/',
                str = '';

            if (sms[0] && showSms) {    // письмо
                str += host + 'sms.php">' +
                    '<img src="https://images.' +
                    general.domain.replace('www.', '') +
                    '/img/letter-pc.png" title="' +
                    sms[0].getAttribute('title') + '" alt="Вам письмо"></a> ' +
                    '<span style="color: #005F00">' + sms[2] + '</span>]';
            }

            if (sms[1] && showSms) {    // посылка
                str += host + 'items.php"><img src="https://' + general.domain +
                    '/i/woodbox.gif" title="Пришла посылка!" ' +
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
            var ajaxQuery = new AjaxQuery(),
                ajaxUrl = 'https://' + general.domain + '/me.php';

            _this = _this || this;
            ajaxQuery.init(ajaxUrl, function (xml) {
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
                // [письмо, посылка, количество новых писем]
                var testSms = [
                    spanContent.querySelector('img[src$="/img/letter-pc.png"]'),
                    spanContent.querySelector('a>img[src$="/i/woodbox.gif"]'),
                    ''
                ];

                // если есть письмо, смотрим количество новых/не прочитанных
                if (testSms[0]) {
                    var countSmsLink = spanContent.
                            querySelector('a[href$="/sms.php"]' +
                                '[class="graybutton"]');

                    if (countSmsLink) {
                        var countSms = /В почте (\d+)/.
                                exec(countSmsLink.innerHTML);
                        testSms[2] = countSms ? countSms[1] : '';
                    }
                }

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
                var cssSelector = 'td.font8pt[align="center"]',
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
                if (/(Вы сможете устроиться на|осталось)[^\d]*\d+ минут/i.
                        test(content)) {
                    time = +/(\d+) минут/i.exec(content)[1];
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
                        /object\.php\?id=(\d+)/.exec(linkObj.href)[1] +
                        '" alt="GW объект" /></a>]';

                if (time) {
                    if (showWorkTime) {
                        _this.wpgbContainer.innerHTML = '[<span style=' +
                            '"color: #0000FF;">' + time + '</span> мин ' +
                            '<a href="' + linkObj.href + '"><img alt="img" ' +
                            'src="' + _this.blueFactory + ttl;
                    }

                    stData[1] = '';
                    general.setData(stData);
                } else {
                    if (showWorkTime) {
                        _this.wpgbContainer.innerHTML = '[<a href="' +
                            linkObj.href + '"><img alt="img" src="' +
                            _this.redFactory + ttl;
                    }

                    if (!stData[1]) {
                        stData[1] = '1';
                        general.setData(stData);
                        playSound.init(soundWork);
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
            /**
             * localStorage:
             * [0] - звук при получении почты (проигран или нет)
             * [1] - звук при окончании работы (проигран или нет)
             */
            if (!general.getData()) {
                general.setData(['', '']);
            }

            var topPanel = new GetTopPanel().init();
            if (topPanel) {
                topPanel.appendChild(general.doc.createTextNode(' | '));
                topPanel.appendChild(this.wpgbContainer);

                this.startWorkPostGrenadesBroken(null);
                var _this = this;
                general.root.setInterval(function () {
                    _this.startWorkPostGrenadesBroken(_this);
                }, Math.round(20000 + 20000 * Math.random()));
            }
        };
    };

    new WorkPostGrenadesBroken().init();

}());

