// ==UserScript==
// @name            ShowMyAchievements
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Добавляет ссылку "Достижения" в верхней части страниц игры при нажатии на которую выводятся Ваши ачивки, но только те, которые были отмечены на странице достижений.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowMyAchievements/showMyAchievements.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowMyAchievements/showMyAchievements.user.js
// @include         http://www.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         2.01-051115
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458] Идея: Горыныч
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, nomen: true, devel: true
    regexp: true, plusplus: true
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
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'showMyAchievements';
        /**
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie)[2];
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
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

            stData = [];
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
            if (general.DESIGN_VERSION === 'v2') {
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
            this.divResult.innerHTML += '<div style="margin-top: 5px;">' +
                '<img id="closemyachiev" src="' + general.imgPath +
                'close.gif" style="cursor: pointer;" /></div>';

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

            var stData = general.getData(),
                url = 'http://www.ganjawars.ru/info.ach.php?id=' + general.myID;

            if (!stData[0]) {
                this.divResult.innerHTML = 'Не выбрано ни одной ачивки на ' +
                    '<a target="_blank" href="' + url + '">этой</a> странице.';
                this.addCloseButton();
            } else {
                var _this = this;
                new AjaxQuery().init(url, function (xml) {
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

            general.setData([str.replace(/,$/, '')]);
        };

        /**
         * @method setCheckboxes
         */
        this.setCheckboxes = function () {
            var achievNow = this.getAchievNow(general.doc),
                stData = general.getData(),
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
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'ShowMyAchievements:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

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

    new ShowMyAchievements().init();

}());

