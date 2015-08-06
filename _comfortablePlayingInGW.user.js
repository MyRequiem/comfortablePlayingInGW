// ==UserScript==
// @name            Comfortable Playing In GW
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Веселые плюшки для ganjawars.ru
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/_comfortablePlayingInGW.user.js
// @include         http://www.ganjawars.ru/*
// @include         http://quest.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         1.00-050815-dev
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true , ActiveXObject: true */

/*jslint
    browser: true, todo: true, passfail: true, devel: true, regexp: true
    plusplus: true, continue: true, vars: true, nomen: true
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
         * @property cons
         * @type {Object}
         */
        this.cons = this.root.console;
        /**
         * @property version
         * @type {String}
         */
        this.version = '1.00-050815-dev';
        /**
         * @property stString
         * @type {String}
         */
        this.stString = this.version + '@|||@@|@|||||||||||||||||';
        /**
         * @property myID
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
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
        /**
         * @property viewMode
         * @type {Boolean}
         */
        //this.viewMode = /\/warlog\.php/.test(this.loc);
        /**
         * @property mainDomain
         * @type {Boolean}
         */
        this.mainDomain = /\/\/www.ganjawars.ru\//.test(this.loc);
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
            var oldSt = this.st.getItem(this.STORAGENAME);
            if (!oldSt) {
                this.st.setItem(this.STORAGENAME, this.stString);
                return;
            }

            // если были старые данные, переносим их в новую storage-строку
            var newSt = this.stString.split('@');
            oldSt = oldSt.split('@');
            var nSt, oSt, i, j;
            for (i = 1; i < oldSt.length; i++) {
                nSt = newSt[i].split('|');
                if (nSt.length === 1) {
                    newSt[i] = oldSt[i];
                    continue;
                }

                oSt = oldSt[i].split('|');
                for (j = 0; j < oSt.length; j++) {
                    nSt[j] = oSt[j];
                }

                newSt[i] = nSt.join('|');
            }

            this.st.setItem(this.STORAGENAME, newSt.join('@'));
        },

        /**
         * @method getData
         * @param   {int}   ind
         * @return  {Array}
         */
        getData: function (ind) {
            return this.st.getItem(this.STORAGENAME).
                split('@')[ind].split('|');
        },

        /**
         * @method setData
         * @param   {String|Array}  data
         * @param   {int}           ind
         */
        setData: function (data, ind) {
            var dt = this.st.getItem(this.STORAGENAME).split('@');
            dt[ind] = typeof data !== 'string' ? data.join('|') : data;
            this.st.setItem(this.STORAGENAME, dt.join('@'));
        },

        /**
         * @method getInitScript
         * @return  {Array}
         */
        getInitScript: function () {
            if (this.mainDomain) {
                return this.getData(1);
            }

            return [];
        },

        /**
         * @method $
         * @param   {string}    id
         * @return  {HTMLElement|null}
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

            if (this.mainDomain) {
                if (!this.myID || !this.DESIGN_VERSION) {
                    this.cons.log('!this.myID || !this.DESIGN_VERSION');
                    return false;
                }

                if (!this.st.getItem(this.STORAGENAME) ||
                        this.getData(0)[0] !== this.version) {
                    this.setNewStorage();
                }

                this.myID = this.myID[2];
                this.DESIGN_VERSION = this.DESIGN_VERSION[2];
            }

            return true;
        }
    };

    var general, initScript;

    /**
     * @class NotGiveCannabisLeaf
     * @constructor
     */
    var NotGiveCannabisLeaf = function () {
        /**
         * @method  changeFavicon
         */
        this.changeFavicon = function () {
            var head = general.doc.querySelector('head');

            if (head) {
                var linkTags = head.querySelectorAll('link[rel*="icon"]'),
                    i;

                for (i = 0; i < linkTags.length; i++) {
                    head.removeChild(linkTags[i]);
                }

                var link = general.doc.createElement('link');
                link.setAttribute('type', 'image/x-icon');
                link.setAttribute('rel', 'shortcut icon');
                link.setAttribute('href',
                        /** TODO исправить images_for_scripts
                         * на imagesForScripts
                         */
                        'http://gwscripts.ucoz.net/images_for_scripts/' +
                        'notgivecannabisleaf/favicon.ico');
                head.appendChild(link);
            }
        };

        /**
         * @method  changeIcons
         */
        this.changeIcons = function () {
            var imgPath = general.imgPath + 'NotGiveCannabisLeaf/',
                imgOn = imgPath + 'on.gif',
                imgOff = imgPath + 'off.gif',
                imgs = general.doc.querySelectorAll('img'),
                src,
                i;

            for (i = 0; i < imgs.length; i++) {
                src = imgs[i].getAttribute('src');
                if (/\/i\/gon\.gif|\/info\.online\.php\?id=/.test(src)) {
                    imgs[i].setAttribute('src', imgOn);
                } else if (/\/i\/goff\.gif/.test(src)) {
                    imgs[i].setAttribute('src', imgOff);
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
     * @class SetSettingsButton
     * @constructor
     */
    var SetSettingsButton = function () {
        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();

            if (topPanel) {
                var settingsButton = general.doc.createElement('a');
                var target = topPanel.parentNode.nextElementSibling;
                settingsButton.innerHTML = '<img src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" whidth="15" height="15" ' +
                    'title="Настройки" alt="Настройки" />';
                settingsButton.setAttribute('href',
                        'http://www.ganjawars.ru/news.php?set=1');
                target.insertBefore(settingsButton, target.firstChild);
            }
        };
    };

    /**
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
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
         * @param   {String}        url
         * @param   {String}        rmethod
         * @param   {String|null}   param
         * @param   {Boolean}       async
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, rmethod, param, async, onsuccess,
                onfailure) {
            var xmlHttpRequest = this.createRequestObject();

            if (!xmlHttpRequest) {
                general.cons.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open(rmethod, url, async);

            if (rmethod === 'POST') {
                xmlHttpRequest.setRequestHeader('Content-Type',
                    'application/x-www-form-urlencoded');
            }

            xmlHttpRequest.send(param);

            if (async) {
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
    };

    /**
     * @class CheckInputText
     * @constructor
     */
    var CheckInputText = function () {
        /**
         * @method init
         * @param   {Object}    inp
         * @param   {int}       limit
         * @return  {Boolean}
         */
        this.init = function (inp, limit) {
            var _inp = inp,
                val = _inp.value,
                lim = limit || 0;

            return !(!val || isNaN(+val) || +val < lim);
        };
    };

    /**
     * @class ShowMainSettings
     * @constructor
     */
    var ShowMainSettings = function () {
        /**
         * @property infoScripts
         * @type {Object}
         */
        this.infoScripts = {
            'Персонаж': [
                ['Логотип игры', 'На всех страницах заменяет логотип игры ' +
                    '&nbsp;&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122, 0.5);" src="http://images.ganjawars.' +
                    'ru/i/gon.gif" /> &nbsp;&nbsp;на зеленый листик &nbsp;' +
                    '&nbsp;<img style="box-shadow: 2px 3px 3px ' +
                    'rgba(122,122,122,0.5);" src="' + general.imgPath +
                    'NotGiveCannabisLeaf/on.gif" />', '0'],
                ['Дополнение для панели навигации',
                    'Добавляет возможность установить дополнительные ссылки ' +
                    'в панель навигации.', '1']],

            'Бои': [
                ['Дополнение для боев', 'Генератор ходов(только подсветка ' +
                    'хода), нумерация противников, расширенная информация в ' +
                    'списке выбора противника, сортировка списка, ДЦ, ' +
                    'продвинутое расположение бойцов на поле боя как в бою, ' +
                    'так и в режиме наблюдения за боем, полный лог боя в НЕ ' +
                    'JS-версии, кнопка "Сказать ход", быстрая вставка ника в ' +
                    'поле чата. Информация вверху страницы боя о набитом HP, ' +
                    'вашем здоровье и т.д. При щелчке на картинке противника ' +
                    'происходит его выбор в качестве цели. Кнопка "Обновить" ' +
                    'на поле боя. В JS-версии боя подсвечивает зеленым ' +
                    'цветом тех персонажей, которые уже сделали ход. В обоих ' +
                    'версиях выводит количество персонажей, сделавших ход.' +
                    '<br><br><span style="color: #FF0000">Не ставьте ' +
                    'значения менее 3 секунд.</span><br>Таймаут обновления ' +
                    'данных в бою: <input id="refreshBattle" type="text" ' +
                    'maxlength="3" style="width: 30px;" value="' +
                    (general.getData(3)[0] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)<br>Таймаут обновления ' +
                    'заявки при входе в нее: <input id="refreshAppl" type="' +
                    'text" maxlength="3" style="width: 30px;" value="' +
                    (general.getData(3)[1] || '0') + '" disabled /> сек (0 - ' +
                    'настройки игры по умолчанию)', '3']],

            'Доска объявлений': [
                ['Фильтр поиска аренды/продажи', 'Фильтр онлайн/оффлайн и по ' +
                    'островам на странице поиска аренды/продажи предметов.',
                    '2']],

            'Ферма': []
        };

        /**
         * @method showHideScriptInfo
         */
        this.showHideScriptInfo = function () {
            var _this = this,
                info = _this.parentNode.lastElementChild;

            if (info.style.display) {
                info.style.display = '';
                _this.innerHTML = '[&minus;]';
            } else {
                info.style.display = 'none';
                _this.innerHTML = '[+]';
            }
        };

        /**
         * @method onOffScript
         */
        this.onOffScript = function () {
            var _this = this,
                ind = /chk(\d+)/.exec(_this.id)[1],
                hiddenDiv = _this.nextElementSibling,
                inp = hiddenDiv.querySelectorAll('input'),
                sel = hiddenDiv.querySelectorAll('select'),
                i;

            initScript[ind] = _this.checked ? '1' : '';
            general.setData(initScript, 1);

            // выкл/вкл элементы управления настройками
            for (i = 0; i < inp.length; i++) {
                inp[i].disabled = !_this.checked;
            }

            for (i = 0; i < sel.length; i++) {
                sel[i].disabled = !_this.checked;
            }
        };

        /**
         * @method checkScriptUpdate
         */
        this.checkScriptUpdate = function () {
            var url = 'http://www.ganjawars.ru/object-messages.php?' +
                'id=117721&tid=88232514&fid=117721&page_id=last';
            new AjaxQuery().init(url, 'GET', null, true, function (xml) {
                var v = /version: ([^<]+)<\/td>/.exec(xml.responseText);
                if (v) {
                    if (v[1] !== general.version) {
                        general.$('linkNewVerScript').style.
                            visibility = 'visible';
                        general.$('refreshVer').innerHTML = '(' + v[1] + ')';
                    }
                }
            }, null);
        };

        /**
         * @method setSettingsForAdvBattleAll
         */
        this.setSettingsForAdvBattleAll = function () {
            var _this = this,
                ind = _this.id === 'refreshBattle' ? 0 : 1,
                data = general.getData(3);

            data[ind] = new CheckInputText().init(_this, 3) ?
                    _this.value : '';
            general.setData(data, 3);
        };

        /**
         * @method init
         */
        this.init = function () {
            var str = '<div style="margin-bottom: 10px;"><a id="' +
                    'linkNewVerScript" target="_blank" style="color: ' +
                    '#008000; visibility: hidden;" href="https://raw.' +
                    'githubusercontent.com/MyRequiem/comfortablePlayingInGW/' +
                    'master/_comfortablePlayingInGW.user.js">Доступна новая ' +
                    'версия</a> <span id="refreshVer"></span></div><table ' +
                    'style="width: 100%; box-shadow: 8px 10px 7px ' +
                    'rgba(122,122,122,0.5);">',
                groupStyle = ' style="background-color: #D0EED0; text-align: ' +
                    'center; color: #990000;"><b>',
                spanStyle = ' style="cursor: pointer;">',
                tdStyle = ' style="background-color: #E0FFE0;">',
                hiddenDivStyle = ' style="display: none; padding-left: 50px; ' +
                    'background-color: #E7E7E7">',
                prop,
                i;

            // формирование таблицы настроек
            for (prop in this.infoScripts) {
                if (this.infoScripts.hasOwnProperty(prop)) {
                    str += '<tr><td' + groupStyle + prop + '</b></td></tr>';

                    for (i = 0; i < this.infoScripts[prop].length; i++) {
                        str += '<tr><td' + tdStyle + '<span' + spanStyle +
                            '[+]</span> ' + '<input id="chk' +
                            this.infoScripts[prop][i][2] +
                            '" type="checkbox" /> ' +
                            this.infoScripts[prop][i][0] + '<div' +
                            hiddenDivStyle + this.infoScripts[prop][i][1] +
                            '</div></td></tr>';
                    }
                }
            }

            str += '</table>';
            var settingsContainer = general.doc.querySelector('tr>td.txt' +
                    '[valign="top"]');
            settingsContainer.innerHTML = '<div></div>';
            settingsContainer = settingsContainer.firstElementChild;
            settingsContainer.setAttribute('style', 'margin: 10px 0 20px 0');
            settingsContainer.innerHTML = str;

            // проверка обновлений
            this.checkScriptUpdate();

            // обрабочики открытия/закрытия скрытых контейнеров описания
            // скрипта, обработчики чекбоксов и установка значений чекбоксов
            var spans = settingsContainer.
                    querySelectorAll('span[style="cursor: pointer;"]'),
                chkid,
                chk;

            for (i = 0; i < spans.length; i++) {
                spans[i].addEventListener('click',
                        this.showHideScriptInfo, false);
                chk = spans[i].nextElementSibling;
                chk.addEventListener('click', this.onOffScript, false);
                chkid = +(/chk(\d+)/.exec(chk.getAttribute('id')))[1];
                if (initScript[chkid]) {
                    chk.click();
                }
            }

            // обработчики текстовых полей модуля дополнений для боев
            general.$('refreshBattle').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);
            general.$('refreshAppl').
                addEventListener('input',
                        this.setSettingsForAdvBattleAll, false);
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
     * @class AdditionForNavigationBar
     * @constructor
     */
    var AdditionForNavigationBar = function () {
        /**
         * @property navigPanel
         * @type {HTMLElement|null}
         */
        this.navigPanel = null;
        /**
         * @property divMain
         * @type {HTMLDivElement|null}
         */
        this.divMain = null;

        /**
         * @method addLink
         * @param   {HTMLElement}   link
         */
        this.addLink = function (link) {
            // добавление в панель
            var target = this.navigPanel.
                    lastElementChild.previousSibling;
            this.navigPanel.insertBefore(general.doc.createTextNode(' | '),
                    target);
            this.navigPanel.insertBefore(link, target);

            // добавление ссылки и кнопы ее удаления в основной div
            var divLink = general.doc.createElement('div');

            var linkClone = link.cloneNode(true);
            linkClone.style.fontSize = '9pt';
            divLink.appendChild(linkClone);

            var delLinkButton = general.doc.createElement('span');
            delLinkButton.setAttribute('style', 'margin-left: 2px; ' +
                    'cursor: pointer; font-size: 7pt;');
            delLinkButton.innerHTML = '[x]';
            divLink.appendChild(delLinkButton);

            this.divMain.insertBefore(divLink,
                    this.divMain.lastElementChild);

            // обработчик кнопы удаления ссылки
            var _this = this;
            delLinkButton.addEventListener('click', function () {
                var thisLink = this,
                    linkName = thisLink.previousElementSibling.innerHTML,
                    allPanelLinks = _this.navigPanel.querySelectorAll('a'),
                    i;

                // удаляем ссылку из панели
                for (i = 0; i < allPanelLinks.length; i++) {
                    if (allPanelLinks[i].innerHTML === linkName) {
                        _this.navigPanel.removeChild(allPanelLinks[i].
                            previousSibling);
                        _this.navigPanel.removeChild(allPanelLinks[i]);
                        break;
                    }
                }

                // удаляем ссылку из div'а
                _this.divMain.removeChild(thisLink.parentNode);

                // удаляем запись из хранилища
                var dataSt = JSON.parse(general.getData(2)[0]),
                    temp = {},
                    name;

                for (name in dataSt) {
                    if (dataSt.hasOwnProperty(name)) {
                        if (name === linkName) {
                            continue;
                        }

                        temp[name] = dataSt[name];
                    }
                }

                general.setData(JSON.stringify(temp), 2);
            }, false);
        };

        /**
         * @method createLink
         * @param   {String}    name
         * @param   {Array}     attr    href, style
         * @return  {HTMLElement}
         */
        this.createLink = function (name, attr) {
            var link = general.doc.createElement('a');
            link.setAttribute('style', 'color: #669966; text-decoration: ' +
                    'none; font-size: 7pt;' + attr[1]);
            link.innerHTML = name;
            link.href = attr[0];
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
            this.navigPanel = general.DESIGN_VERSION === 'v2' ?
                    general.doc.querySelector('div[style="position: ' +
                        'relative; left: 0; top: 0; width:100%; ' +
                        'font-size:7pt;color:#669966;"] ' +
                        'center:first-child') :
                    general.doc.querySelector('td[style="font-size:7pt;' +
                        'color:#669966;"]');

            if (!this.navigPanel) {
                return;
            }

            var dataSt = general.getData(2)[0];
            if (!dataSt) {
                dataSt = '{}';
                general.setData(dataSt, 2);
            }

            dataSt = JSON.parse(dataSt);

            // добавляем в панель кнопу для создания ссылки
            var addLinkButton = general.doc.createElement('span');
            addLinkButton.setAttribute('style', 'cursor: pointer;');
            addLinkButton.innerHTML = '+';
            this.navigPanel.appendChild(general.doc.createTextNode(' | '));
            this.navigPanel.appendChild(addLinkButton);

            var _this = this;
            // обработчик открытия/закрытия div'а
            addLinkButton.addEventListener('click', function () {
                _this.divMain.style.display = _this.divMain.style.display ?
                        '' : 'none';
                _this.clearFields();
            }, false);

            // div для добавления ссылок
            var divAddLink = general.doc.createElement('div');
            divAddLink.setAttribute('style', 'margin-top: 5px;');
            divAddLink.innerHTML = 'Название:<br><input id="lname" ' +
                'type="text" maxlength="20" style="width: 237px;" /><br>' +
                'Ссылка:<br><input id="lhref" style="width: 237px;" ' +
                'value="http://"/><br>Стиль, например: "color: blue;"<br>' +
                '<input id="lstyle" type="text" style="width: 237px;" />' +
                '<br><span id="set_link" style="cursor: pointer; color: ' +
                '#0000FF;">Добавить</span><span id="hide_nav_div" ' +
                'style="cursor: pointer; margin-left: 20px; color: ' +
                '#FF0000;">Закрыть</span>';
            this.divMain = general.doc.createElement('div');
            this.divMain.appendChild(divAddLink);

            var pos = new GetPos().init(addLinkButton);
            this.divMain.setAttribute('style', 'position: absolute; ' +
                'display: none; border: 1px #339933 solid; background: ' +
                '#F0FFF0; width: 240px; font-size: 8pt; padding: 3px; ' +
                'left: ' + (pos.x - 260) + '; top: ' + (pos.y + 12) + ';');
            general.doc.body.appendChild(this.divMain);

            // добавляем ссылки из хранилища в панель и в div
            var linkName, lnk;
            for (linkName in dataSt) {
                if (dataSt.hasOwnProperty(linkName)) {
                    lnk = this.createLink(linkName, dataSt[linkName]);
                    this.addLink(lnk);
                }
            }

            // кнопа закрытия div'а
            general.$('hide_nav_div').addEventListener('click',
                function () {
                    _this.clearFields();
                    _this.divMain.style.display = 'none';
                }, false);


            // обработчик кнопы добавления ссылки
            general.$('set_link').addEventListener('click', function () {
                var name = general.$('lname').value,
                    href = general.$('lhref').value,
                    style = general.$('lstyle').value;

                if (!name || !href) {
                    alert('Не верно введены данные');
                    return;
                }

                var allPanelLinks = _this.navigPanel.querySelectorAll('a'),
                    i;

                for (i = 0; i < allPanelLinks.length; i++) {
                    if (allPanelLinks[i].innerHTML === name) {
                        alert('Ссылка с таким названием уже существует');
                        return;
                    }
                }

                // создаем ссылку и втыкаем ее в панель и в div
                var newLink = _this.createLink(name, [href, style]);
                _this.addLink(newLink);

                // добавляем данные в хранилище
                var dtSt = JSON.parse(general.getData(2)[0]);
                dtSt[name] = [href, style];
                general.setData(JSON.stringify(dtSt), 2);

                _this.clearFields();
            }, false);
        };
    };

    /**
     * @class AdsFilter
     * @constructor
     */
    var AdsFilter = function () {
        /**
         * @property spanContainer
         * @type {HTMLElement|null}
         */
        this.spanContainer = null;
        /**
         * @property stl
         * @type {String}
         */
        this.stl = 'cursor: pointer; margin-right: 3px; ';
        /**
         * @property styleNormal
         * @type {String}
         */
        this.styleNormal = this.stl + 'color: #808080';
        /**
         * @property styleBold
         * @type {String}
         */
        this.styleBold =  this.stl + 'color: #990000; font-weight: bold;';

        /**
         * @method setButton
         * @param   {String}        id
         * @param   {String}        value
         */
        this.setButton = function (id, value) {
            var button = general.doc.createElement('span');
            button.setAttribute('style', this.styleNormal);
            button.id = id;
            button.innerHTML = value;
            this.spanContainer.appendChild(button);
        };

        /**
         * @method setFilter
         * @param   {NodeList}  trs
         * @param   {String}    type
         * @param   {String}    island
         */
        this.setFilter = function (trs, type, island) {
            var dataSt = general.getData(3),
                i;

            switch (type) {
            case 'reset':
                if (!island) {
                    general.setData('|', 3);
                    general.$('islZ').setAttribute('style', this.styleNormal);
                    general.$('islG').setAttribute('style', this.styleNormal);
                    general.$('online').setAttribute('style', this.styleNormal);
                }

                for (i = 3; i < trs.length; i++) {
                    trs[i].style.display = '';
                }

                break;

            case 'island':
                this.setFilter(trs, 'reset', 'flag');
                dataSt[0] = island === 'Z' ? '1' : '2';
                general.setData(dataSt, 3);
                general.$('isl' + island).setAttribute('style', this.styleBold);
                general.$('isl' + (island === 'G' ? 'Z' : 'G')).
                    setAttribute('style', this.styleNormal);

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('td:nth-child(4)').
                                innerHTML.indexOf(island) === -1) {
                        trs[i].style.display = 'none';
                    }
                }

                if (dataSt[1]) {
                    this.setFilter(trs, 'online', 'flag');
                }

                break;

            case 'online':
                if (!island) {
                    dataSt[1] = '1';
                    general.setData(dataSt, 3);
                    general.$('online').setAttribute('style', this.styleBold);
                }

                for (i = 3; i < trs.length; i++) {
                    if (trs[i].querySelector('a[style*="#999999"]')) {
                        trs[i].style.display = 'none';
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
            var table = general.doc.querySelector('table.wb[align="center"]');
            if (!table) {
                return;
            }

            var li = table.querySelector('li');
            if (!li) {
                return;
            }

            this.spanContainer = general.doc.createElement('span');
            this.spanContainer.setAttribute('style', 'margin-left: 10px;');
            this.setButton('islz', '[Z]');
            this.setButton('islg', '[G]');
            this.setButton('online', '[Online]');
            this.setButton('resetFilter', '[Сброс]');
            li.insertBefore(this.spanContainer, li.lastElementChild);
            if (this.spanContainer.previousElementSibling.nodeName === 'BR') {
                li.removeChild(this.spanContainer.previousElementSibling);
            }

            var trs = table.querySelectorAll('tr'),
                _this = this;

            general.$('resetFilter').addEventListener('click', function () {
                _this.setFilter(trs, 'reset', null);
            }, false);

            general.$('islZ').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'Z');
            }, false);

            general.$('islG').addEventListener('click', function () {
                _this.setFilter(trs, 'island', 'G');
            }, false);

            general.$('online').addEventListener('click', function () {
                _this.setFilter(trs, 'online', null);
            }, false);

            var dataSt = general.getData(3);
            if (dataSt[0] === '1') {
                general.$('islZ').click();
            } else if (dataSt[0] === '2') {
                general.$('islG').click();
            }

            if (dataSt[1]) {
                general.$('online').click();
            }
        };
    };

    /**
     * @class AdvBattleAll
     * @constructor
     */
    var AdvBattleAll = function () {
        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.' +
                    '\nMyRequiеm рекомендует вам установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'AdditionForNavigationBar\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            alert('test');
        };
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
            general.cons.log(e);
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
            general.cons.log(e);
        }

        if (/\/news\.php\?set=1/.test(general.loc)) {
            try {
                new ShowMainSettings().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (initScript[1]) {
            try {
                new AdditionForNavigationBar().init();
            } catch (e) {
                general.cons.log(e);
            }
        }

        if (/\/market(-p)?\.php/.test(general.loc)) {
            if (initScript[2] &&
                    (/\?(stage=2\&item_id=|buy=)/.test(general.loc))) {
                try {
                    new AdsFilter().init();
                } catch (e) {
                    general.cons.log(e);
                }
            }
        }
    }

    // бои
    if (/(\/b0\/|\/wargroup\.php|\/warlist\.php|\/warlog\.php)/.
            test(general.loc)) {
        if (initScript[3]) {
            try {
                new AdvBattleAll().init();
            } catch (e) {
                general.cons.log(e);
            }
        }
    }

}());

