// ==UserScript==
// @name            Comfortable Playing In GW
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Веселые плюшки для ganjawars.ru
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/comfortablePlayingInGW.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.user.js
// @include         http://www.ganjawars.ru/*
// @include         http://quest.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         1.0-310715-dev
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true , ActiveXObject: true */

/*jslint
    browser: true, todo: true, passfail: true, devel: true, regexp: true
    nomen: true, plusplus: true
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
             * @property myId
             * @type {String}
             */
            this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie);
            /**
             * @property DESIGN_VERSION
             * @type {String}
             */
            this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                    exec(this.doc.cookie);
            /**
             * @property STORAGENAME
             * @type {String}
             */
            this.STORAGENAME = '_comfortablePlayingInGW';
            /**
             * @property version
             * @type {String}
             */
            this.version = '1.0-310715-dev';
            /**
             * @property imgPath
             * @type {String}
             */
            this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
                'comfortablePlayingInGW/master/imgs/';
        },
        general,

        /**
         * @class GetSetData
         * @constructor
         */
        GetSetData = function () {
            /**
             * @method getData
             * @param   {int}   ind
             * @return  {Array}
             */
            this.getData = function (ind) {
                return general.st.getItem(general.STORAGENAME).
                    split('@')[ind].split('|');
            };

            /**
             * @method setData
             * @param   {String|Array}  data
             * @param   {int}           ind
             */
            this.setData = function (data, ind) {
                var tmp = general.st.getItem(general.STORAGENAME).split('@');
                tmp[ind] = typeof data !== 'string' ? data.join('|') : data;
                general.st.setItem(general.STORAGENAME, tmp.join('@'));
            };
        },

        /**
         * @class NotGiveCannabisLeaf
         * @constructor
         */
        NotGiveCannabisLeaf = function () {
            /**
             * @property imgPath
             * @type {String}
             */
            this.imgPath = general.imgPath + 'notGiveCannabisLeaf/';
            /**
             * @property FAVICON
             * @type {String}
             */
            this.FAVICON = 'http://gwscripts.ucoz.net/images_for_scripts/' +
                'notgivecannabisleaf/favicon.ico';
            /**
             * @property FILL_GREEN
             * @type {String}
             */
            this.FILL_GREEN = this.imgPath + 'fillGreen.gif';
            /**
             * @property FILL_GRAY
             * @type {String}
             */
            this.FILL_GRAY = this.imgPath + 'fillGray.gif';

            /**
             * @method  changeFavicon
             */
            this.changeFavicon = function () {
                var head = general.doc.querySelector('head'),
                    linkTags,
                    link,
                    i;

                if (head) {
                    linkTags = general.doc.querySelectorAll('head>link');
                    for (i = 0; i < linkTags.length; i++) {
                        if (/icon/.test(linkTags[i].getAttribute('rel'))) {
                            head.removeChild(linkTags[i]);
                        }
                    }

                    link = general.doc.createElement('link');
                    link.setAttribute('type', 'image/x-icon');
                    link.setAttribute('rel', 'shortcut icon');
                    link.setAttribute('href', this.FAVICON);
                    head.appendChild(link);
                }
            };

            /**
             * @method  changeIcons
             */
            this.changeIcons = function () {
                var imgs = general.doc.querySelectorAll('img'),
                    src,
                    i;

                for (i = 0; i < imgs.length; i++) {
                    src = imgs[i].getAttribute('src');
                    if (/\/i\/gon\.gif|\/info\.online\.php\?id=/.test(src)) {
                        imgs[i].setAttribute('src', this.FILL_GREEN);
                    } else if (/\/i\/goff\.gif/.test(src)) {
                        imgs[i].setAttribute('src', this.FILL_GRAY);
                    }
                }
            };

            /**
             * @method init
             */
            this.init = function () {
                this.changeFavicon();
                if (!(/\/news\.php\?set=1/.test(general.loc))) {
                    this.changeIcons();
                }
            };
        },

        initScript,

        /**
         * @class GetTopPanel
         * @constructor
         */
        GetTopPanel = function () {
            /**
             * @method getTopPanel
             * @return  {Object}
             */
            this.getTopPanel = function () {
                // ищем верхнюю панель "Новости | Об игре | Форум"
                if (general.DESIGN_VERSION === 'v2') {  // новый дизайн
                    return general.doc.querySelector('td.gw-header-col2 ' +
                            'div:first-child nobr:first-child');
                }

                return general.doc.querySelector('td.txt nobr:first-child');
            };
        },

        /**
         * @class SetSettingsButton
         * @constructor
         */
        SetSettingsButton = function () {
            /**
             * @property topPanel
             * @type {Object}
             */
            this.topPanel = new GetTopPanel().getTopPanel();

            /**
             * @method setSettingsButton
             */
            this.setSettingsButton = function () {
                if (!this.topPanel) {
                    return;
                }

                var settingsButton = general.doc.createElement('a'),
                    target = this.topPanel.parentNode.nextElementSibling;

                settingsButton.innerHTML = '<img src="' + general.imgPath +
                    'imgMainSettings.gif" whidth="15" height="15" ' +
                    'title="Настройки" alt="Настройки" />';
                settingsButton.setAttribute('href', 'http://www.ganjawars.ru/' +
                    'news.php?set=1');
                target.insertBefore(settingsButton, target.firstChild);
            };
        },

        /**
         * @class AjaxQuery
         * @constructor
         */
        AjaxQuery = function () {
            /**
             * @method createRequestObject
             * @return  {Object|null}
             */
            this.createRequestObject = function () {
                try {
                    return new XMLHttpRequest();
                } catch (e) {
                    try {
                        return new ActiveXObject('Msxml2.XMLHTTP');
                    } catch (e1) {
                        try {
                            return new ActiveXObject('Microsoft.XMLHTTP');
                        } catch (e2) {
                            return null;
                        }
                    }
                }
            };

            /**
             * @method ajaxQuery
             * @param   {string}        url
             * @param   {string}        rmethod
             * @param   {(string|null)} param
             * @param   {boolean}       async
             * @param   {function}      onsuccess
             * @param   {function}      onfailure
             */
            this.ajaxQuery = function (url, rmethod, param, async, onsuccess,
                    onfailure) {
                var xmlHttpRequest = this.createRequestObject(),
                    timeout;

                if (!xmlHttpRequest) {
                    general.root.console.log('Error create xmlHttpRequest !!!');
                    return;
                }

                xmlHttpRequest.open(rmethod, url, async);

                if (rmethod === 'POST') {
                    xmlHttpRequest.setRequestHeader('Content-Type',
                        'application/x-www-form-urlencoded');
                }

                xmlHttpRequest.send(param);

                if (async) {
                    timeout = general.root.setTimeout(function () {
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
                } else {
                    if (xmlHttpRequest.status === 200 && onsuccess) {
                        onsuccess(xmlHttpRequest);
                    } else {
                        if (xmlHttpRequest.status !== 200 && onfailure) {
                            onfailure(xmlHttpRequest);
                        }
                    }
                }
            };
        },

        /**
         * @class ShowMainSettings
         * @constructor
         */
        ShowMainSettings = function () {
            /**
             * @property urlCheckVersion
             * @type {String}
             */
            this.URLCHECKVERSION = 'http://www.ganjawars.ru/object-messages.' +
                'php?id=117721&tid=88232514&fid=117721&page_id=last';

            /**
             * @method showHideScriptInfo
             */
            this.showHideScriptInfo = function () {
                var _this = this,
                    info = _this.parentNode.lastElementChild;

                if (info.style.display === 'none') {
                    info.style.display = '';
                    this.innerHTML = '[&minus;]';
                } else {
                    info.style.display = 'none';
                    this.innerHTML = '[+]';
                }
            };

            /**
             * @method onOffScript
             */
            this.onOffScript = function () {
                var _this = this,
                    ind = /chk(\d+)/.exec(_this.id)[1],
                    inp,
                    i;

                initScript[ind] = _this.checked ? '1' : '';
                new GetSetData().setData(initScript, 1);

                // выкл/вкл элементы управления настройками
                inp = _this.nextElementSibling.querySelectorAll('input');
                for (i = 0; i < inp.length; i++) {
                    inp[i].disabled = !_this.checked;
                }

                inp = _this.nextElementSibling.querySelectorAll('select');
                for (i = 0; i < inp.length; i++) {
                    inp[i].disabled = !_this.checked;
                }
            };

            /**
             * @method init
             */
            this.init = function () {
                var settingsContainer = general.doc.querySelector('tr>td.txt' +
                        '[valign="top"]'),
                    groupStyle = ' style="background-color: #D0EED0; ' +
                        'text-align: center; color: #990000;"><b>',
                    spanStyle = ' style="cursor: pointer;">',
                    tdStyle = ' style="background-color: #E0FFE0;">',
                    hiddenDivStyle = ' style="display: none; padding-left: ' +
                        '50px; background-color: #E7E7E7">',
                    info = {
                        'Персонаж': [['Логотип игры', 'На всех страницах ' +
                            'заменяет логотип игры &nbsp;&nbsp;<img style="' +
                            'box-shadow: 2px 3px 3px rgba(122,122,122, 0.5);' +
                            '" src="http://images.ganjawars.ru/i/gon.gif" /> ' +
                            '&nbsp;&nbsp;на зеленый листик &nbsp;&nbsp;' +
                            '<img style="box-shadow: 2px 3px 3px ' +
                            'rgba(122,122,122,0.5);" src="' + general.imgPath +
                            'notGiveCannabisLeaf/fillGreen.gif" />']]
                    },
                    j = 0,
                    query,
                    spans,
                    chkid,
                    prop,
                    str,
                    chk,
                    i;

                settingsContainer.innerHTML = '<div></div>';
                settingsContainer = settingsContainer.firstElementChild;
                settingsContainer.setAttribute('style',
                        'margin: 10px 0 20px 0');
                str = '<div style="margin-bottom: 10px;">' +
                    '<a id="linkNewVerScript" target="_blank" style="color: ' +
                    '#008000; visibility: hidden;" href="https://' +
                    'raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/_comfortablePlayingInGW.' +
                    'user.js">Доступна новая версия</a> <span ' +
                    'id="refreshVer"></span></div><table style="width: ' +
                    '100%; box-shadow: 8px 10px 7px rgba(122,122,122,0.5);">';

                for (prop in info) {
                    if (info.hasOwnProperty(prop)) {
                        str += '<tr><td' + groupStyle + prop + '</b></td></tr>';

                        for (i = 0; i < info[prop].length; i++) {
                            str += '<tr><td' + tdStyle + '<span' + spanStyle +
                                '[+]</span> ' + '<input id="chk' + j +
                                '" type="checkbox" /> ' + info[prop][i][0] +
                                '<div' + hiddenDivStyle + info[prop][i][1] +
                                '</div></td></tr>';
                            j++;
                        }
                    }
                }

                str += '</table>';
                settingsContainer.innerHTML = str;

                // проверка обновлений
                query = new AjaxQuery();
                query.ajaxQuery(this.URLCHECKVERSION, 'GET', null,
                        true, function (xml) {
                        var v = /version: ([^<]+)<\/td>/.exec(xml.responseText);
                        if (v) {
                            if (v[1] !== general.version) {
                                general.$('linkNewVerScript').style.
                                    visibility = 'visible';
                                general.$('refreshVer').innerHTML = '(' +
                                    v[1] + ')';
                            }
                        }
                    }, null);

                // обрабочики открытия/закрытия скрытых контейнеров
                // описания скрипта, обработчики чекбоксов и установка
                // значений чекбоксов
                spans = settingsContainer.querySelectorAll('span[style="' +
                        'cursor: pointer;"]');
                for (i = 0; i < spans.length; i++) {
                    spans[i].addEventListener('click',
                            this.showHideScriptInfo, false);
                    chk = spans[i].nextElementSibling;
                    chk.addEventListener('click', this.onOffScript, false);
                    chkid = +(/chk(\d+)/.exec(chk.getAttribute('id')))[1];
                    if (initScript[chkid]) {
                        chk.click();
                    } else {
                        chk.click();
                        chk.click();
                    }
                }
            };
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
         * @method setNewStorage
         */
        setNewStorage: function () {
            this.st.setItem(this.STORAGENAME, this.version + '@');
        },

        /**
         * @method getInitScript
         * @return  {Array}
         */
        getInitScript: function () {
            if (/\/\/www.ganjawars.ru\//.test(general.loc)) {
                return new GetSetData().getData(1);
            }

            return [];
        },

        /**
         * @method $
         * @param   {string}    id
         * @return  {object}
         */
        $: function (id) {
            return general.doc.querySelector('#' + id);
        },

        /**
         * @method checkMainData
         * @return  {Boolean}
         */
        checkMainData: function () {
            if (!this.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'Comfortable Playing In GW\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return false;
            }

            if (/\/\/www.ganjawars.ru\//.test(this.loc)) {
                if (!this.myID || !this.DESIGN_VERSION) {
                    general.root.console.log('!this.myID || ' +
                            '!this.DESIGN_VERSION');
                    return false;
                }

                if (!this.st.getItem(this.STORAGENAME) || new GetSetData().
                        getData(0)[0] !== this.version) {
                    this.setNewStorage();
                }

                this.myID = this.myID[2];
                this.DESIGN_VERSION = this.DESIGN_VERSION[2];
            }

            return true;
        }
    };

    general = new General();
    if (!general.checkMainData()) {
        return;
    }

    initScript = general.getInitScript();

    // везде
    if (/\/\/www.ganjawars.ru\//.test(general.loc)) {
        try {
            if (initScript[0]) {
                new NotGiveCannabisLeaf().init();
            }
        } catch (e) {
            general.root.console.log(e);
        }

        if (general.doc.querySelector('a[href*="/regform.php"]')) {
            return;
        }
    }

    // везде кроме боев
    if (/\/\/www.ganjawars.ru\//.test(general.loc) &&
            !(/\/b0\//.test(general.loc))) {

        try {
            new SetSettingsButton().setSettingsButton();
        } catch (e) {
            general.root.console.log(e);
        }

        if (/\/news\.php\?set=1/.test(general.loc)) {
            new ShowMainSettings().init();
        }
    }

}());

