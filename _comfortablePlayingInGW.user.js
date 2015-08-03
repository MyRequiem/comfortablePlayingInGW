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
    nomen: true, plusplus: true, continue: true
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
        initScript,

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
             * @method  changeFavicon
             */
            this.changeFavicon = function () {
                var FAVICON = 'http://gwscripts.ucoz.net/images_for_scripts/' +
                                'notgivecannabisleaf/favicon.ico',
                    head = general.doc.querySelector('head'),
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
                    link.setAttribute('href', FAVICON);
                    head.appendChild(link);
                }
            };

            /**
             * @method  changeIcons
             */
            this.changeIcons = function () {
                var imgPath = general.imgPath + 'notGiveCannabisLeaf/',
                    FILL_GREEN = imgPath + 'fillGreen.gif',
                    FILL_GRAY = imgPath + 'fillGray.gif',
                    imgs = general.doc.querySelectorAll('img'),
                    src,
                    i;

                for (i = 0; i < imgs.length; i++) {
                    src = imgs[i].getAttribute('src');
                    if (/\/i\/gon\.gif|\/info\.online\.php\?id=/.test(src)) {
                        imgs[i].setAttribute('src', FILL_GREEN);
                    } else if (/\/i\/goff\.gif/.test(src)) {
                        imgs[i].setAttribute('src', FILL_GRAY);
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

        /**
         * @class GetTopPanel
         * @constructor
         */
        GetTopPanel = function () {
            /**
             * @method init
             * @return  {Object}
             */
            this.init = function () {
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
             * @method init
             */
            this.init = function () {
                var topPanel = new GetTopPanel().init(),
                    settingsButton,
                    target;

                if (!topPanel) {
                    return;
                }

                settingsButton = general.doc.createElement('a');
                target = topPanel.parentNode.nextElementSibling;
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
            this.init = function (url, rmethod, param, async, onsuccess,
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
                var URLCHECKVERSION = 'http://www.ganjawars.ru/' +
                        'object-messages.php?id=117721&tid=88232514&' +
                        'fid=117721&page_id=last',
                    settingsContainer = general.doc.querySelector('tr>td.txt' +
                        '[valign="top"]'),
                    groupStyle = ' style="background-color: #D0EED0; ' +
                        'text-align: center; color: #990000;"><b>',
                    spanStyle = ' style="cursor: pointer;">',
                    tdStyle = ' style="background-color: #E0FFE0;">',
                    hiddenDivStyle = ' style="display: none; padding-left: ' +
                        '50px; background-color: #E7E7E7">',
                    info = {
                        'Персонаж': [
                            ['Логотип игры',
                                'На всех страницах заменяет логотип игры ' +
                                '&nbsp;&nbsp;<img style="box-shadow: 2px 3px ' +
                                '3px rgba(122,122,122, 0.5);" src="' +
                                'http://images.ganjawars.ru/i/gon.gif" /> ' +
                                '&nbsp;&nbsp;на зеленый листик &nbsp;&nbsp;' +
                                '<img style="box-shadow: 2px 3px 3px ' +
                                'rgba(122,122,122,0.5);" src="' +
                                general.imgPath + 'notGiveCannabisLeaf/' +
                                'fillGreen.gif" />'],
                            ['Дополнение для панели навигации',
                                'Добавляет возможность установить ' +
                                'дополнительные ссылки в панель навигации.']],

                        //'Бои': [],

                        'Доска объявлений': [
                            ['Фильтр поиска аренды/продажи',
                                'Фильтр онлайн/оффлайн и по островам на ' +
                                'странице поиска аренды/продажи предметов.']]

                        //'Ферма': []
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
                query.init(URLCHECKVERSION, 'GET', null, true, function (xml) {
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
        },

        /**
         * @class GetPos
         * @constructor
         */
        GetPos = function () {
            /**
             * @method init
             * @param   {Object}    obj
             * @return  {Object}
             */
            this.init = function (obj) {
                var x = 0,
                    y = 0,
                    tmp = obj;

                while (tmp) {
                    x += tmp.offsetLeft;
                    y += tmp.offsetTop;
                    tmp = tmp.offsetParent;
                }

                return {x: x, y: y};
            };
        },

        /**
         * @class AdditionForNavigationBar
         * @constructor
         */
        AdditionForNavigationBar = function () {
            /**
             * @property getSetData
             * @type {Object}
             */
            this.getSetData = new GetSetData();

            /**
             * @method addLink
             * @param   {HTMLLinkElement}   link
             * @param   {Object}            panel
             * @param   {Object}            div_main
             * @param   {Boolean}           mode
             */
            this.addLink = function (link, panel, div_main, mode) {
                var del_link = general.doc.createElement('span'),
                    divLink,
                    target;

                if (!mode) {    // добавление в панель
                    target = panel.lastElementChild.previousSibling;
                    panel.insertBefore(general.doc.createTextNode(' | '),
                            target);
                    panel.insertBefore(link, target);
                } else {    // добавление в div
                    // кнопка удаления ссылки
                    del_link.setAttribute('style', 'margin-left: 2px; ' +
                            'cursor: pointer; font-size: 7pt;');
                    del_link.innerHTML = '[x]';

                    divLink = general.doc.createElement('div');
                    divLink.appendChild(link);
                    divLink.appendChild(del_link);
                    div_main.insertBefore(divLink, div_main.lastElementChild);

                    // обработчик удаления ссылки
                    del_link.addEventListener('click', function () {
                        var _this = this,
                            name = _this.previousElementSibling.innerHTML,
                            a_panel = panel.querySelectorAll('a'),
                            getSetData = new GetSetData(),
                            data = JSON.parse(getSetData.getData(2)[0]),
                            temp = {},
                            n,
                            i;

                        // удаляем ссылку из панели
                        for (i = 0; i < a_panel.length; i++) {
                            if (a_panel[i].innerHTML === name) {
                                panel.removeChild(a_panel[i].previousSibling);
                                panel.removeChild(a_panel[i]);
                                break;
                            }
                        }

                        // удаляем ссылку из div'а
                        div_main.removeChild(_this.parentNode);

                        // удаляем запись из хранилища
                        for (n in data) {
                            if (data.hasOwnProperty(n)) {
                                if (n === name) {
                                    continue;
                                }

                                temp[n] = data[n];
                            }
                        }

                        getSetData.setData(JSON.stringify(temp), 2);
                    }, false);
                }
            };

            /**
             * @method createLink
             * @param   {String}    name
             * @param   {Array}     href
             * @param   {int}       size
             * @return  {Object}
             */
            this.createLink = function (name, href, size) {
                var link = general.doc.createElement('a');
                link.setAttribute('style', 'color: #669966; text-decoration: ' +
                        'none; font-size: ' + size + 'pt;' + href[1]);
                link.innerHTML = name;
                link.href = href[0];
                return link;
            };

            /**
             * @method clearFields
             */
            this.clearFields = function () {
                general.$('lname').value = '';
                general.$('lhref').value = '';
                general.$('lstyle').value = '';
            };

            /**
             * @method init
             */
            this.init = function () {
                var data = this.getSetData.getData(2)[0],
                    add_link = general.doc.createElement('span'),
                    div_add = general.doc.createElement('div'),
                    div_main = general.doc.createElement('div'),
                    panel,
                    lnk,
                    pos,
                    n;

                if (!data) {
                    data = '{}';
                    this.getSetData.setData(data, 2);
                }

                data = JSON.parse(data);

                // ищем панель навигации
                panel = general.DESIGN_VERSION === 'v2' ?
                        general.doc.querySelector('div[style="position: ' +
                            'relative; left: 0; top: 0; width:100%; ' +
                            'font-size:7pt;color:#669966;"] ' +
                            'center:first-child') :
                        general.doc.querySelector('td[style="font-size:7pt;' +
                            'color:#669966;"]');

                // панель не найдена
                if (!panel) {
                    return;
                }

                // добавляем в панель '+'
                add_link.setAttribute('style', 'cursor: pointer;');
                add_link.innerHTML = '+';
                panel.appendChild(general.doc.createTextNode(' | '));
                panel.appendChild(add_link);

                // div для добавления ссылок
                div_add.setAttribute('style', 'margin-top: 5px;');
                div_add.innerHTML = 'Название:<br><input id="lname" ' +
                    'type="text" maxlength="20" style="width: 237px;" /><br>' +
                    'Ссылка:<br><input id="lhref" style="width: 237px;" ' +
                    'value="http://"/><br>Стиль, например: "color: blue;"<br>' +
                    '<input id="lstyle" type="text" style="width: 237px;" />' +
                    '<br><span id="set_link" style="cursor: pointer; color: ' +
                    '#0000FF;">Добавить</span><span id="hide_nav_div" ' +
                    'style="cursor: pointer; margin-left: 20px; color: ' +
                    '#FF0000;">Закрыть</span>';
                div_main.appendChild(div_add);

                pos = new GetPos().init(add_link);
                div_main.setAttribute('style', 'position: absolute; ' +
                    'display: none; border: 1px #339933 solid; background: ' +
                    '#F0FFF0; width: 240px; font-size: 8pt; padding: 3px; ' +
                    'left: ' + (pos.x - 260) + '; top: ' + (pos.y + 12) + ';');
                general.doc.body.appendChild(div_main);

                // добавляем ссылки из хранилища в панель и в div
                for (n in data) {
                    if (data.hasOwnProperty(n)) {
                        lnk = this.createLink(n, data[n], 7);
                        this.addLink(lnk, panel, div_main, false);
                        lnk = this.createLink(n, data[n], 9);
                        this.addLink(lnk, panel, div_main, true);
                    }
                }

                // кнопа закрытия div'а
                general.$('hide_nav_div').addEventListener('click',
                    function () {
                        div_main.style.display = 'none';
                        new AdditionForNavigationBar().clearFields();
                    }, false);

                // обработчик открытия/закрытия div'а
                add_link.addEventListener('click', function () {
                    div_main.style.display = div_main.style.display ? '' :
                            'none';
                    new AdditionForNavigationBar().clearFields();
                }, false);

                // обработчик кнопы добавления ссылки
                general.$('set_link').addEventListener('click', function () {
                    var val1 = general.$('lname').value,
                        val2 = general.$('lhref').value,
                        val3 = general.$('lstyle').value,
                        _this = new AdditionForNavigationBar(),
                        getSetData = new GetSetData(),
                        datast,
                        link,
                        a_pan,
                        i;

                    if (!val1 || !val2) {
                        alert('Не верно введены данные');
                        return;
                    }

                    // если ссылка с таким названием уже есть
                    a_pan = panel.querySelectorAll('a');
                    for (i = 0; i < a_pan.length; i++) {
                        if (a_pan[i].innerHTML === val1) {
                            alert('Ссылка с таким названием уже существует');
                            return;
                        }
                    }

                    // создаем ссылку и втыкаем ее в панель
                    link = _this.createLink(val1, [val2, val3], 7);
                    _this.addLink(link, panel, div_main, false);
                    link = _this.createLink(val1, [val2, val3], 9);
                    // добавляем ссылку в div
                    _this.addLink(link, panel, div_main, true);

                    // добавляем ссылку в хранилище
                    datast = JSON.parse(getSetData.getData(2)[0]);
                    datast[val1] = [val2, val3];
                    getSetData.setData(JSON.stringify(datast), 2);

                    _this.clearFields();
                }, false);
            };
        },

        /**
         * @class AdsFilter
         * @constructor
         */
        AdsFilter = function () {
            /**
             * @method setButton
             * @param   {String}    id
             * @param   {String}    value
             * @param   {Object}    target
             */
            this.setButton = function (id, value, target) {
                var but = general.doc.createElement('span');
                but.setAttribute('style', 'cursor: pointer; color: #808080; ' +
                        'margin-right: 3px;');
                but.id = id;
                but.innerHTML = value;
                target.appendChild(but);
            };

            /**
             * @method setFilter
             * @param   {Array}     lines
             * @param   {int}       type
             * @param   {Object}    reg
             */
            this.setFilter = function (lines, type, reg) {
                var i;

                switch (type) {
                case 0: // показать все
                    for (i = 3; i < lines.length; i++) {
                        lines[i].style.display = '';
                    }

                    break;

                case 1: // острова
                    this.setFilter(lines, 0, null);    // сброс всех фильтров
                    for (i = 3; i < lines.length; i++) {
                        if (!reg.test(lines[i].querySelector('td:nth-child(4)').
                                    innerHTML)) {
                            lines[i].style.display = 'none';
                        }
                    }

                    break;

                case 2: // онлайн/оффлайн
                    for (i = 3; i < lines.length; i++) {
                        if (lines[i].style.display === 'none') {
                            continue;
                        }

                        if (lines[i].querySelector('td:last-child ' +
                                    'a:first-child[style="color:#999999"]')) {
                            lines[i].style.display = 'none';
                        }
                    }

                    break;

                default:
                    break;
                }
            };

            /**
             * @method init
             */
            this.init = function () {
                var li = general.doc.querySelector('li'),
                    span = general.doc.createElement('span'),
                    lines;

                if (!li) {
                    return;
                }

                span.setAttribute('style', 'margin-left: 10px;');
                this.setButton('isl_z', '[Z]', span);
                this.setButton('isl_g', '[G]', span);
                this.setButton('online', '[Online]', span);
                this.setButton('reset1', '[Сброс]', span);
                li.insertBefore(span, li.lastElementChild);
                if (span.previousElementSibling.nodeName === 'BR') {
                    li.removeChild(span.previousElementSibling);
                }

                lines = general.doc.querySelector('table.wb[align="center"]').
                    querySelectorAll('tr');

                if (!lines) {
                    return;
                }

                general.$('reset1').addEventListener('click', function () {
                    new AdsFilter().setFilter(lines, 0, null);
                }, false);

                general.$('isl_z').addEventListener('click', function () {
                    new AdsFilter().setFilter(lines, 1, new RegExp('Z'));
                }, false);

                general.$('isl_g').addEventListener('click', function () {
                    new AdsFilter().setFilter(lines, 1, new RegExp('G'));
                }, false);

                general.$('online').addEventListener('click', function () {
                    new AdsFilter().setFilter(lines, 2, null);
                }, false);

                /**
                 * TODO:
                 * убрать в общей версии скрипта
                 */
                general.$('isl_g').click();
                general.$('online').click();
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
            this.st.setItem(this.STORAGENAME, this.version + '@||@');
        },

        /**
         * @method getInitScript
         * @return  {Array}
         */
        getInitScript: function () {
            if (/\/\/www.ganjawars.ru\//.test(this.loc)) {
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
            return this.doc.querySelector('#' + id);
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

    // аут + прибрежка
    if (/\/quest\.ganjawars\.ru/.test(general.loc)) {
        alert('test');
        return;
    }

    initScript = general.getInitScript();

    // везде
    if (initScript[0]) {
        try {
            new NotGiveCannabisLeaf().init();
        } catch (e) {
            general.root.console.log(e);
        }
    }

    // перс не залогинен
    if (general.doc.querySelector('a[href*="/regform.php"]')) {
        return;
    }

    // везде кроме боев
    if (!(/\/b0\//.test(general.loc))) {
        try {
            new SetSettingsButton().init();
        } catch (e) {
            general.root.console.log(e);
        }

        if (/\/news\.php\?set=1/.test(general.loc)) {
            try {
                new ShowMainSettings().init();
            } catch (e) {
                general.root.console.log(e);
            }
        }

        if (initScript[1]) {
            try {
                new AdditionForNavigationBar().init();
            } catch (e) {
                general.root.console.log(e);
            }
        }

        if (/\/market(-p)?\.php/.test(general.loc)) {
            if (initScript[2] &&
                    (/\?(stage=2\&item_id=|buy=)/.test(general.loc))) {
                try {
                    new AdsFilter().init();
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

}());

