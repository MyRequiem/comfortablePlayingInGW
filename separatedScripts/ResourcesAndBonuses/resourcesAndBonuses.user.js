// ==UserScript==
// @name            ResourcesAndBonuses
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Создает ссылки "Ресурсы" и "Бонусы" вверху страницы. При клике выводятся соответствующие данные.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ResourcesAndBonuses/resourcesAndBonuses.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ResourcesAndBonuses/resourcesAndBonuses.user.js
// @include         http://www.gwars.ru/*
// @grant           none
// @license         MIT
// @version         2.18-221118
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, nomen: true */

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

            if (general.DESIGN_VERSION === 'v2') {  // новый дизайн
                topPanel = general.doc.querySelector('td.gw-header-col2 ' +
                        'td[width="50%"][valign="middle"]');
                if (topPanel) {
                    topPanel.setAttribute('style', 'width: 70%;');
                }
            } else {
                topPanel = general.doc.
                    querySelector('td.txt[align="left"] nobr:first-child');
                if (topPanel) {
                    topPanel.parentNode.setAttribute('style', 'width: 70%;');
                }
            }

            return topPanel;
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
                '<img id="divres_close" style="cursor: pointer;" ' +
                'src="' + this.imgPath + 'close.gif" /></div>';

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

            var url = 'http://www.gwars.ru/info.php?id=' + general.myID,
                idElem = _this.id,
                ths = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var cssSelector = 'td[class="greenbrightbg"][align="center"]' +
                        '[valign="top"]',
                    tables = spanContent.querySelectorAll(cssSelector),
                    data;

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

    new ResourcesAndBonuses().init();

}());


