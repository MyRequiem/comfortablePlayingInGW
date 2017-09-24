// ==UserScript==
// @name            NotesForFriends
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Добавляет возможность сохранять комментарии для ваших друзей и персонажей из черного списка.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotesForFriends/notesForFriends.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotesForFriends/notesForFriends.user.js
// @include         http://www.ganjawars.ru/home.friends.php*
// @include         http://www.ganjawars.ru/me.php*
// @grant           none
// @license         MIT
// @version         2.12-240917
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458] (идея: ЧупакаЪра)
// ==/UserScript==

/*global unsafeWindow, escape */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, nomen: true,
    devel: true
*/

/*eslint-env browser */
/*eslint indent: ['error', 4], linebreak-style: ['error', 'unix'],
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
        this.STORAGENAME = 'notesForFriends';
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

            stData = ['', ''];
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
         * @param   {String}        url
         * @param   {String}        rmethod
         * @param   {String|null}   param
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
         */
        this.init = function (url, rmethod, param, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.root.console.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open(rmethod, url, true);

            if (rmethod === 'POST') {
                xmlHttpRequest.setRequestHeader('Content-Type',
                        'application/x-www-form-urlencoded');
                xmlHttpRequest.setRequestHeader('Content-length',
                    param.length.toString());
                xmlHttpRequest.setRequestHeader('Connection', 'close');
            }

            xmlHttpRequest.send(param);

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
     * @class EncodeUTF
     * @constructor
     */
    var EncodeUTF = function () {
        /**
         * @method init
         * @param    {String}   str
         * @return   {String}
         */
        this.init = function (str) {
            var rez = '',
                ch = 0,
                i;

            for (i = 0; i < str.length; i++) {
                ch = str.charCodeAt(i);
                if (ch > 1024) {
                    ch = ch === 1025 ? 1016 : (ch === 1105 ? 1032 : ch);
                    rez += String.fromCharCode(ch - 848);
                } else if (ch <= 127) {
                    rez += str.charAt(i);
                }
            }

            return rez;
        };
    };

    /**
     * @class NotesForFriends
     * @constructor
     */
    var NotesForFriends = function () {
        /**
         * @property friendPage
         * @type {Boolean}
         */
        this.friendPage = /friends/.test(general.loc);
        /**
         * @property data
         * @type {String}
         */
        this.data = '';
        /**
         * @property divTooltip
         * @type {HTMLDivElement|null}
         */
        this.divTooltip = null;
        /**
         * @property urlComplaint
         * @type {String}
         */
        this.urlComplaint = 'http://www.ganjawars.ru/complaint.php?isk_id=';

        /**
         * @method setSettingsPanel
         * @param   {Element}  table
         */
        this.setSettingsPanel = function (table) {
            var imgSettings = general.doc.createElement('img');
            imgSettings.setAttribute('style', 'cursor: pointer; ' +
                    'margin-right: 10px;');
            imgSettings.setAttribute('title', 'Настройки');
            imgSettings.src = 'http://images.ganjawars.ru/i/home/' +
                'properties.gif';

            var target = table.querySelector('td');
            target.insertBefore(imgSettings, target.firstElementChild);

            var stData = general.getData();
            if (stData[1]) {
                var linkComplaint = general.doc.createElement('a');
                linkComplaint.setAttribute('style', 'color: #0000FF; ' +
                    'margin-right: 10px; text-decoration: none;');
                linkComplaint.setAttribute('target', '_blank');
                linkComplaint.href = this.urlComplaint + stData[1];
                linkComplaint.innerHTML = 'Заметки';
                target.insertBefore(linkComplaint, target.firstElementChild);
            }

            imgSettings.addEventListener('click', function () {
                table.innerHTML = '<tr><td>Создайте и сохраните ПУСТУЮ ' +
                    'жалобу (если еще не создана) на <a href="http://www.' +
                    'ganjawars.ru/complaint.php" target="_blank">этой</a> ' +
                    'странице.<br><br><input id="compl_id"  maxlength="7" ' +
                    'size="6" /> <label for="compl_id">ID жалобы</label><br>' +
                    '<input id="chk" type="checkbox" /> <label for="chk">' +
                    'Заметки на главной странице</label><br><input id="back" ' +
                    'type="button" value="Отмена" /> <input id="set" ' +
                    'type="button" value="Принять" /><td></tr>';

                var inp = general.$('compl_id'),
                    chk = general.$('chk'),
                    butOk = general.$('set'),
                    back = general.$('back');

                inp.value = stData[1];
                if (!stData[1]) {
                    butOk.disabled = true;
                    inp.style.background = '#F4DEDE';
                }

                chk.checked = stData[0];

                inp.addEventListener('input', function () {
                    var _this = this;
                    if (!(/^\d+\s*$/.test(_this.value))) {
                        butOk.disabled = true;
                        _this.style.background = '#F4DEDE';
                    } else {
                        butOk.disabled = false;
                        _this.style.background = '#FFFFFF';
                    }
                }, false);

                butOk.addEventListener('click', function () {
                    general.setData([chk.checked ? '1' : '', inp.value]);
                    general.root.location.reload();
                }, false);

                back.addEventListener('click', function () {
                    general.root.location.reload();
                }, false);
            }, false);
        };

        /**
         * @method getPersNote
         * @param    {String}   id
         * @return   {String}
         */
        this.getPersNote = function (id) {
            if (/Ошибка|Err/.test(this.data)) {
                return this.data;
            }

            var reg = new RegExp('\\|' + id + '\\|: ([^\\n]*)\\n'),
                note = reg.exec(this.data);

            return note ? note[1] : '';
        };

        /**
         * @method saveData
         * @param   {Object}  inp
         */
        this.saveData = function (inp) {
            inp.disabled = true;
            var val = inp.value;
            inp.value = 'Сохранение...';

            var reg = new RegExp('\\|' + inp.id + '\\|: [^\\n]*\\n'),
                rezTest = reg.test(this.data);

            //поле пустое и записи для персонажа нет
            if (!rezTest && !val) {
                inp.disabled = false;
                inp.value = '';
                alert('Нечего сохранять');
                return;
            }

            //нет записи для персонажа, добавляем
            if (!rezTest && val) {
                this.data += '|' + inp.id + '|: ' + val + '\n';
            //есть запись и ничего не введено, удаляем ее
            } else if (rezTest && !val) {
                this.data = this.data.replace(reg, '');
            } else {
                this.data = this.data.
                    replace(reg, '|' + inp.id + '|: ' + val + '\n');
            }

            var param = 'isk_id=' + general.getData()[1] +
                    '&save_body=1&isk_body=' +
                    escape(new EncodeUTF().init(this.data)),
                url = 'http://www.ganjawars.ru/complaint.php';

            new AjaxQuery().init(url, 'POST', param, function () {
                general.root.location.reload();
            }, function () {
                inp.disabled = false;
                inp.value = 'Ошибка ответа сервера...';
            });
        };

        /**
         * @method addEvent
         * @param   {String}    id
         * @param   {String}    evnt
         */
        this.addEvent = function (id, evnt) {
            var node = general.$(id),
                _this = this;

            if (evnt === 'mouseout') {
                node.addEventListener(evnt, function () {
                    _this.divTooltip.style.display = 'none';
                }, false);

                return;
            }

            node.addEventListener(evnt, function (e) {
                var ev = e || general.root.event;
                _this.divTooltip.style.left = ev.pageX - 50;
                _this.divTooltip.style.top = ev.pageY - 30;
                _this.divTooltip.innerHTML = _this.
                    getPersNote('p' + (/\d+/.exec(id)[0])) || '-------';
                _this.divTooltip.style.display = '';
            }, false);
        };

        /**
         * @method checkKeyCode
         * @param   {Object}    ths
         */
        this.checkKeyCode = function (ths) {
            return function (e) {
                var ev = e || general.root.event;
                if (ev.keyCode === 13) {
                    ths.saveData(this);
                }
            };
        };

        /**
         * @method notesClick
         * @param   {String}    id
         */
        this.notesClick = function (id) {
            return function () {
                var inp = general.$(id);
                inp.style.display = inp.style.display === 'none' ? '' : 'none';
                inp.focus();
            };
        };

        /**
         * @method setFriendPage
         */
        this.setFriendPage = function () {
            var table = general.doc.
                    querySelector('table[align="center"][width="600"]'),
                persLinks = table.querySelectorAll('a[href*="/info.php?id="]');

            this.setSettingsPanel(table.querySelector('table'));

            var inpText,
                persId,
                i;

            for (i = 0; i < persLinks.length; i++) {
                persId = /\?id=(\d+)/.exec(persLinks[i].href)[1];
                persLinks[i].parentNode.innerHTML += ' <span id="info_' +
                    persId + '" style="cursor: pointer;">[?]</span> ' +
                    '<img id="edit_' + persId + '" src="http://images.' +
                    'ganjawars.ru/i/home/wlog.gif" style="cursor: pointer;" ' +
                    'title="Изменить заметку"/><br><input id="p' + persId +
                    '" value="' + this.getPersNote('p' + persId) +
                    '" style="width: 250px; margin-top: 3px; display: none;" ' +
                    'title="Введите заметку и нажмите Enter" />';

                inpText = general.$('p' + persId);
                if (/Err/.test(inpText.value)) {
                    inpText.disabled = true;
                } else {
                    inpText.addEventListener('keypress',
                        this.checkKeyCode(this), false);
                }

                general.$('edit_' + persId).
                    addEventListener('click',
                        this.notesClick('p' + persId), false);

                this.addEvent('info_' + persId, 'mouseover');
                this.addEvent('info_' + persId, 'mouseout');
            }
        };

        /**
         * @method setMainPage
         * @param   {Object}    _this
         */
        this.setMainPage = function (_this) {
            var friendsbody = general.$('friendsbody');
            if (!(/\[\?\]/.test(friendsbody.innerHTML))) {
                var nobrs = friendsbody.querySelectorAll('nobr'),
                    persLink,
                    id,
                    i;

                for (i = 0; i < nobrs.length; i++) {
                    persLink = nobrs[i].
                        querySelector('a[href*="/info.php?id="]');

                    if (persLink) {
                        id = /\?id=(\d+)/.exec(persLink.href)[1];
                        nobrs[i].innerHTML += ' <span id="info_' + id +
                            '" style="cursor: pointer;">[?]</span>';

                        this.addEvent('info_' + id, 'mouseover');
                        this.addEvent('info_' + id, 'mouseout');
                    }
                }

                //обработчик 'onclick' на ссылке "Друзья онлайн"
                general.doc.querySelector('a[onclick*="return setfriends"]').
                    addEventListener('click', function () {
                        general.root.setTimeout(_this.setMainPage(_this), 50);
                    }, false);
            }
        };

        /**
         * @method selectMode
         */
        this.selectMode = function () {
            if (this.friendPage) {
                this.setFriendPage();
            } else {
                this.setMainPage(this);
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
                    'NotesForFriends:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            /* localStorage:
             * [0] - отображать/не отображать на главной странице,
             * [1] - ID жалобы
             */
            var stData = general.getData();
            if (this.friendPage || stData[0]) {
                this.divTooltip = general.doc.createElement('div');
                this.divTooltip.setAttribute('style', 'position: absolute; ' +
                    'display: none; background: #E7FFE7; border: 1px #339933 ' +
                    'solid; padding: 3px; border-radius: 5px;');
                general.doc.body.appendChild(this.divTooltip);

                this.data = 'Err: Проверьте ID жалобы в настройках';

                if (stData[1]) {
                    var url = this.urlComplaint + stData[1],
                        _this = this;

                    new AjaxQuery().init(url, 'GET', null, function (xml) {
                        var spanContent = general.doc.createElement('span');
                        spanContent.innerHTML = xml.responseText;
                        var txtArea = spanContent.querySelector('textarea');
                        if (txtArea) {
                            _this.data = txtArea.value;
                        }

                        _this.selectMode();
                    }, function () {
                        _this.data = 'Ошибка ответа сервера...';
                        _this.selectMode();
                    });
                } else {
                    this.selectMode();
                }
            }
        };
    };

    new NotesForFriends().init();

}());

