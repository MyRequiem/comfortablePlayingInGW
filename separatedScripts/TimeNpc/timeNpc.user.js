// ==UserScript==
// @name            TimeNpc
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На главной странице выводит время, оставшееся до взятия квеста и сcылку на NPC, у которого в последний раз брали квест. Звуковое оповещение. Умеет выводить список NPC с информацией о них для каждого острова.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeNpc/timeNpc.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeNpc/timeNpc.user.js
// @include         http://www.ganjawars.ru/me/*
// @include         http://www.ganjawars.ru/npc.php?id=*
// @grant           none
// @license         MIT
// @version         2.00-300815
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, nomen: true
    plusplus: true
*/

(function () {
    'use strict';

    // ================= НАСТРОЙКИ ==========================
    var soundNPC = 17; //  номер звука, когда пора делать квест
                        // 0 - без звука
    // ============== КОНЕЦ НАСТРОЕК ========================

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
         * @property STNAME
         * @type {String}
         */
        this.STNAME = 'timeNpc';
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
         * @param   {Array}     data
         */
        setData: function (data) {
            this.st.setItem(this.STNAME, data.join('|'));
        },

        /**
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STNAME);
            if (stData) {
                return stData.split('|');
            }

            stData = ['1', '', ''];
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
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method ajaxQuery
         * @param   {String}        url
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
                xmlHttpRequest.abort();
            }, 10000);

            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState !== 4) {
                    return;
                }

                clearTimeout(timeout);
                if (xmlHttpRequest.readyState === 4 &&
                        xmlHttpRequest.status === 200 && onsuccess) {
                    onsuccess(xmlHttpRequest);
                } else {
                    if (xmlHttpRequest.readyState === 4 &&
                            xmlHttpRequest.status !== 200 &&
                                onfailure) {
                        onfailure(xmlHttpRequest);
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

            new AjaxQuery().init(url, function (xml) {
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
            var stData = general.getData();
            general.$('timerNPC').innerHTML = '<a href="/npc.php?id=' +
                stData[1] + '" style="color: #1C9C03; font-weight: bold;">' +
                'Взять квест</a>';

            if (stData[0]) {
                new PlaySound().init(soundNPC);
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
                    general.getData()[1] + '&talk=1',
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var time = /\[подождите (\d+) мин/.exec(xml.responseText);

                if (time) {
                    var stData = general.getData();
                    stData[2] = +time[1] * 60 * 1000 + _this.getTimeNow();
                    general.setData(stData);
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
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'TimeNpc\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            /**
             * localStorage
             * [0] - звук вкл/выкл
             * [1] - ID NPC, у которого последний раз брали квест
             * [2] - время
             */

            var stData = general.getData();

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
                    var data = general.getData(),
                        d = data[0],
                        s = d ? 'Sound Off' : 'Sound On',
                        img = this;

                    img.src = _this.imgPath +
                            (d ? 'soundOff.png' : 'soundOn.png');
                    img.setAttribute('title', s);
                    img.setAttribute('alt', s);
                    data[0] = d ? '' : '1';
                    general.setData(data);
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
                    general.setData(stData);
                    return;
                }

                // если берем или отказываемся от квеста,
                // то стираем время из хранилища
                if (/Ваш ответ:/.test(talkNPC.innerHTML)) {
                    stData[2] = '';
                    general.setData(stData);
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

    new TimeNpc().init();

}());
