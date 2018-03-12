// ==UserScript==
// @name            PortTimer
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Вывод точного/оставшегося времени до боя за порт в верхней части страницы.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortTimer/portTimer.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortTimer/portTimer.user.js
// @include         http://www.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         1.00-120318
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458], идея Enemy333
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, nomen: true,
    plusplus: true */

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
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'portTimer';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
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
         * @param   {String} data
         */
        setData: function (data) {
            this.st.setItem(this.STORAGENAME, data);
        },

        /**
         * @method getData
         * @return  {String}
         */
        getData: function () {
            return this.st.getItem(this.STORAGENAME) || null;
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
         * @type {int|null}
         */
        this.date = null;

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.ajax = function (url, onsuccess, onfailure) {
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

        /**
         * @method getBattles
         */
        this.getBattles = function () {
            var _this = this;
            this.ajax(_this.url, function (xhr) {
                var spanContent = general.doc.createElement('span');

                spanContent.innerHTML = xhr.responseText;
                var table = spanContent.querySelector('table[cellspacing="1"]' +
                    '[cellpadding="5"][width="100%"]');

                if (table) {
                    var data = JSON.parse(general.getData()),
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
                    general.setData(JSON.stringify(data));
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
            }));
        };

        /**
         * @method getTimeDiff
         * @return  {int}
         */
        this.getTimeDiff = function () {
            var stData = JSON.parse(general.getData()),
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
            var stData = JSON.parse(general.getData());
            if (!stData.time.length) {
                stData.current = '';
                general.setData(JSON.stringify(stData));
                return;
            }

            var time = stData.time.pop();
            stData.current = time;
            general.setData(JSON.stringify(stData));
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
            var stData = JSON.parse(general.getData());
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
            var stData = general.getData();
            if (!stData) {
                this.resetStorage();
            }

            stData = JSON.parse(general.getData());

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
                    general.setData(JSON.stringify(stData));
                }
            }

            // нет основного синдиката
            if (!stData.syndid) {
                return;
            }

            this.url = 'http://www.ganjawars.ru/object.php?id=11712&' +
                'page=oncoming1&sid=' + stData.syndid;

            // сегодня запрос не делали, делаем не ранее 7 утра.
            var now = new Date();
            this.date = new Date(now.setHours(now.getHours() +
                    (now.getTimezoneOffset() / 60) + 3)).getDate();
            if (+stData.date !== this.date &&
                    new Date().getUTCHours() + 3 >= 7) {
                this.getBattles();
            } else {
                this.setTime();
            }
        };
    };

    new PortTimer().init();

}());

