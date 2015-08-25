// ==UserScript==
// @name            Resources And Bonuses.user.js
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Создает ссылки "Ресурсы" и "Бонусы" вверху страницы. При клике выводятся соответствующие данные.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ResourcesAndBonuses/resourcesAndBonuses.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ResourcesAndBonuses/resourcesAndBonuses.user.js
// @include         http://www.ganjawars.ru/*
// @exclude         http://www.ganjawars.ru/b0/*
// @exclude         http://www.ganjawars.ru/login.php*
// @exclude         http://www.ganjawars.ru/index.php*
// @grant           none
// @license         MIT
// @version         2.0-250815
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, regexp: true, nomen: true */

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
        /**
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie);
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

            if (!xmlHttpRequest) {
                general.cons.log('Error create xmlHttpRequest !!!');
                return;
            }

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
     * @class ResourcesAndBonuses
     * @constructor
     */
    var ResourcesAndBonuses = function () {
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
        /**
         * @property divResult
         * @type {HTMLElement}
         */
        this.divResult = general.doc.createElement('div');

        /**
         * @method fillData
         * @param   {string}    data
         */
        this.fillData = function (data) {
            this.divResult.innerHTML = data + '<div style="margin-top: 5px;">' +
                '<img id="divres_close" src="' + this.imgPath + 'close.gif' +
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
            this.divResult.innerHTML = '<img src="' + this.imgPath +
                'preloader.gif' + '">';

            var url = 'http://www.ganjawars.ru/info.php?id=' + general.myID,
                idElem = _this.id,
                ths = this;

            new AjaxQuery().init(url, function (xml) {
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

            this.divResult.setAttribute('style', 'visibility: hidden; ' +
                    'position: absolute; padding: 3px; background-color: ' +
                    '#E7FFE7; border: solid 1px #339933; border-radius:5px; ' +
                    'top:0; left:0; box-shadow: 5px 6px 6px ' +
                    'rgba(122,122,122,0.5);');
            general.doc.body.appendChild(this.divResult);

            var topPanel = new GetTopPanel().init();
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.createButton('Ресурсы', 'res'));
            topPanel.appendChild(general.doc.createTextNode(' | '));
            topPanel.appendChild(this.createButton('Бонусы', 'bonus'));
        };
    };

    new ResourcesAndBonuses().init();

}());


