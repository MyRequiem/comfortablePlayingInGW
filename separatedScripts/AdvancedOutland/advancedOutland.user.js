// ==UserScript==
// @name            AdvancedOutland
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На ауте и в прибрежной зоне подсвечивает дорожки, отображает информацию покемонов и время для флагов без наведения на них мышью, добавляет ссылки "Моя инфа | Рюкзак | Ремонт | Магазин лицензий", автоматический выбор Аута в списке портов при отплытии.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvancedOutland/advancedOutland.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AdvancedOutland/advancedOutland.user.js
// @include         http://quest.ganjawars.ru*
// @include         http://www.ganjawars.ru/object.php*
// @grant           none
// @license         MIT
// @version         2.00-070416
// @author          W_or_M (редакция MyRequiem)
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, regexp: true, devel: true,
    plusplus: true, nomen: true
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
        this.STORAGENAME = 'advancedOutland';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
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
         * @param   {Array} data
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

            /** localStorage:
                [0] - подсветка дорожек
                [1] - показывать инфу поков
                [2] - показывать время флагов
            */
            stData = ['', '', ''];
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
     * @class AdvancedOutland
     * @constructor
     */
    var AdvancedOutland = function () {
        /**
         * @method changeStData
         */
        this.changeStData = function () {
            return function () {
                var data = general.getData(),
                    _this = this,
                    ind;

                switch (_this.id) {
                case 'chkTrack':
                    ind = 0;
                    break;
                case 'chkShowDataPoks':
                    ind = 1;
                    break;
                default:
                    ind = 2;
                    break;
                }

                data[ind] = _this.checked ?  '1' : '';
                general.setData(data);
            };
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'AdvancedOutland:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var i;
            // выбираем аут в списке портов
            if (/\/object\.php/.test(general.loc)) {
                var select = general.doc.
                        querySelector('select[name="sectorin"]');

                if (select) {
                    var reg = /Overlord/.test(select.innerHTML) ?
                                (/Overlord/i) : (/Ejection/i);

                    for (i = 0; i < select.options.length; i++) {
                        if (reg.test(select.options[i].innerHTML)) {
                            select.options[i].selected = true;
                            break;
                        }
                    }
                }

                return;
            }

            // окно настроек
            var divSettings = general.doc.createElement('div');
            divSettings.setAttribute('style', 'position: absolute; ' +
                    'visibility: hidden; background-color: #F5FFF5; ' +
                    'border-radius: 7px; border: solid 1px #339933; ' +
                    'padding: 5px; top: 0; left: 0;');
            divSettings.innerHTML = '<input id="chkTrack" type="checkbox">' +
                '<label for="chkTrack">Показывать дорожки</label><br>' +
                '<input id="chkShowDataPoks" type="checkbox">' +
                '<label for="chkShowDataPoks">Показывать инфу поков</label>' +
                '<br><input id="chkShowDataFlags" type="checkbox">' +
                '<label for="chkShowDataFlags">Показывать время для флагов' +
                '</label>';
            general.doc.body.appendChild(divSettings);

            // кнопа "Настройки"
            var butSettings = general.doc.createElement('span');
            butSettings.innerHTML = 'Настройки';
            butSettings.
                setAttribute('style', 'color: #0000FF; cursor: pointer;');
            butSettings.addEventListener('click', function (e) {
                var ev = e || general.root.event;
                if (divSettings.style.visibility === 'hidden') {
                    divSettings.style.left = ev.pageX - 127;
                    divSettings.style.top = ev.pageY + 15;
                    divSettings.style.visibility = 'visible';
                } else {
                    divSettings.style.visibility = 'hidden';
                }
            }, false);

            var target = general.doc.querySelector('nobr');
            target.appendChild(general.doc.createTextNode(' | '));
            target.appendChild(butSettings);

            // чекбоксы в настройках
            var chkTrack = general.$('chkTrack'),
                stData = general.getData();

            chkTrack.checked = stData[0];
            chkTrack.addEventListener('click', this.changeStData(), false);

            var chkShowDataPoks = general.$('chkShowDataPoks');
            chkShowDataPoks.checked = stData[1];
            chkShowDataPoks.
                addEventListener('click', this.changeStData(), false);

            var chkShowDataFlags = general.$('chkShowDataFlags');
            chkShowDataFlags.checked = stData[2];
            chkShowDataFlags.
                addEventListener('click', this.changeStData(), false);

            // вставляем ссылки "Моя инфа | Рюкзак | Ремонт | Магазин лицензий"
            var span = general.doc.createElement('span');
            span.innerHTML = '<a target="_blank" ' +
                'href="http://www.ganjawars.ru/info.php?id=' + general.myID +
                '">Моя инфа</a> | <a target="_blank" ' +
                'href="http://www.ganjawars.ru/items.php">Рюкзак</a> | ' +
                '<a target="_blank" href="http://www.ganjawars.ru/' +
                'workshop.php">Ремонт</a> | <a target="_blank" ' +
                'href="http://www.ganjawars.ru/shopl.php" target="_blank">' +
                'Магазин лицензий</a> | ';
            var forum = general.doc.querySelector('a[href*="/forum.php"]');
            forum.parentNode.insertBefore(span, forum);

            // подсвечиваем дорожки
            if (stData[0]) {
                var imgs = general.doc.querySelectorAll('td>a[href*="/walk"]>' +
                        'img[src*="/q-new/t.gif"]');

                for (i = 0; i < imgs.length; i++) {
                    imgs[i].parentNode.parentNode.
                                setAttribute('style', 'background: #D89D58');
                }
            }

            // показываем инфу поков и время флагов
            if (stData[1] || stData[2]) {
                // помещаем на страницу скрипт с новым
                // обработчиком события onMouseOver
                var s = general.doc.createElement('script');
                general.doc.querySelector('head').appendChild(s);
                s.innerHTML = 'function overat_mod(x, y) {' +
                        'var uh = userhere(x,y);' +
                        'if (Page_Loaded && uh >= 0) {' +
                            // убираем стандартный титл
                            // (костыль для хрома 34+)
                            'var oldtitle = document.' +
                                    'querySelector("#infolayer");' +
                            'oldtitle.style.left = -500;' +
                            'oldtitle.style.top = -500;' +
                            'oldtitle.innerHTML = "";' +

                            'var ttipid = x + "|" + y;' +
                            'if (document.querySelector("#ttipid")) {' +
                                'return;' +
                            '}' +

                            'var ttip = document.createElement("div");' +
                            'ttip.id = ttipid;' +
                            'ttip.setAttribute("style", "position: absolute; ' +
                                'padding: 2px; border-radius: 5px; ' +
                                'font-size: 11px; border: solid 1px ' +
                                '#339933; background-color: #D0EED0; ' +
                                'opacity: 0.7;");' +
                            'ttip.style.top = users[uh]["y"] * 25 + 30;' +
                            'ttip.style.left = users[uh]["x"] * 25 + 12 + 25;' +
                            'var text = users[uh]["info"];' +
                            'if (/Бот, \\d+ уровень сложности/.test(text)) {' +
                                'ttip.innerHTML = "<b>" + ' +
                                    '/Бот, (\\d+) уровень сложности/.' +
                                        'exec(text)[1] + " уровень</b>";' +
                            '} else {' +
                                'var txt = "",' +
                                    'rez;' +

                                // 'alert(text);' +
                                'rez = /Опасность:[^<]+/i.exec(text);' +
                                'if (rez) {' +
                                    'txt += "<li>" + rez[0] + "</li>";' +
                                '}' +

                                'rez = /количество: ([^<]+)/i.exec(text);' +
                                'if (rez) {' +
                                    'txt += "<li>Количество: " + rez[1] + ' +
                                        '"</li>";' +
                                '}' +

                                'rez = /мии за убийство: (\\d+%)/i.exec(text);' +
                                'if (rez) {' +
                                    'txt += "<li>Премия: " + rez[1] +' +
                                        '"</li>";' +
                                '}' +

                                'rez = /Мощность: ~\\d+/i.exec(text);' +
                                'if (rez) {' +
                                    'txt += "<li><span style=\'color: ' +
                                        '#FF0000\'>" + rez[0] + "</span>' +
                                            '</li>"' +
                                '}' +

                                'rez = /\\d+ мин. назад/i.exec(text);' +
                                'if (rez) {' +
                                    'txt += rez[0];' +
                                '}' +

                                'ttip.innerHTML = "<b>" + txt + "</b>";' +
                            '}' +

                            'ttip.addEventListener("click", function () {' +
                                'this.style.visibility = "hidden";' +
                            '}, false);' +

                            'document.body.appendChild(ttip);' +
                        '}' +
                    '}';

                // ищем всех ботов и флаги, изменяем обработчики onMouseOver
                // на свои, вызываем и убираем все обработчики
                var imgsOver = [];
                if (stData[1]) {
                    imgsOver = imgsOver.
                        concat(Array.prototype.slice.
                                call(general.doc.
                                    querySelectorAll('img[src*="/bot"]')));
                }

                if (stData[2]) {
                    imgsOver = imgsOver.
                        concat(Array.prototype.slice.
                                call(general.doc.
                                    querySelectorAll('img[src*="/flag.gif"]')));
                }

                var handler,
                    o;

                for (i = 0; i < imgsOver.length; i++) {
                    handler = imgsOver[i].getAttribute('onMouseOver');
                    handler = 'overat_mod' +
                                (/\(\d+,\d+\)/.exec(handler)[0]) + ';';
                    imgsOver[i].setAttribute('onMouseOver', handler);

                    // опера, FF
                    if (imgsOver[i].onmouseover) {
                        imgsOver[i].onmouseover();
                    } else {
                        // костыль для хромого
                        // создаём объект события c модулем событий мыши
                        o = general.doc.createEvent('MouseEvents');
                        // инициализируем объект события
                        o.initMouseEvent('mouseover', true, true, general.root,
                                1, 12, 345, 7, 220, false, false, true,
                                    false, 0, null);
                        // инициализация события mouseover
                        imgsOver[i].dispatchEvent(o);
                    }

                    imgsOver[i].removeAttribute('onMouseOut');
                    imgsOver[i].removeAttribute('onMouseOver');
                }
            }
        };
    };

    new AdvancedOutland().init();

}());

