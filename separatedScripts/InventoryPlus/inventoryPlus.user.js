// ==UserScript==
// @name            InventoryPlus
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Упаковка одинаковых предметов в инвентаре.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/InventoryPlus/inventoryPlus.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/InventoryPlus/inventoryPlus.user.js
// @include         http://www.ganjawars.ru/items.php*
// @grant           none
// @license         MIT
// @version         2.20-241115
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, plusplus: true, nomen: true
    regexp: true, continue: true
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
     * @class InventoryPlus
     * @constructor
     */
    var InventoryPlus = function () {
        /**
         * @method openCloseItem
         * @param   {String}    id
         */
        this.openCloseItem = function (id) {
            return function () {
                var tb = general.doc.querySelector('#tr_' + id),
                    _this = this;

                if (tb.style.display === '') {
                    tb.style.display = 'none';
                    _this.innerHTML = _this.innerHTML.replace('-', '+');
                } else {
                    tb.style.display = '';
                    _this.innerHTML = _this.innerHTML.replace('+', '-');
                }
            };
        };

        /**
         * @method compareLines
         * @param   {Object}        line
         * @param   {Array}         linesObj
         * @return  {Object|null}
         */
        this.compareLines = function (line, linesObj) {
            var i;

            line.link = line.line_1.querySelector('font[color="#990000"]').
                parentNode.parentNode;
            line.id = /id=(.*)$/.exec(line.link)[1];
            for (i = 0; i < linesObj.length; i++) {
                if (linesObj[i].line.id === line.id) {
                    return linesObj[i];
                }
            }

            return null;
        };

        /**
         * @method startInventoryPlus
         * @param   {Object}    _this
         */
        this.startInventoryPlus = function (_this) {
            // ищем таблицу с инвентарем
            var tbody = general.doc.querySelector('table[border="0"]' +
                    '[cellspacing="1"][cellpadding="5"][align="center"]' +
                    '[width="700"]+script');

            if (tbody) {
                // новое оформление экипировки
                tbody = tbody.previousElementSibling.firstElementChild;
            } else {
                // старое оформление экипировки
                tbody = general.doc.querySelector('table[border="0"]' +
                        '[cellspacing="1"][cellpadding="3"][align="center"]' +
                        '[width="700"]>tbody');
            }

            if (!tbody.firstElementChild) {
                return;
            }

            var node = tbody.firstElementChild.nextElementSibling;
            if (/предметов нет/.test(node.innerHTML)) {
                return;
            }

            var allLines = [], // все узлы <tr> из инвентаря
                next,
                i;

            while (node) {
                i = allLines.length;
                allLines[i] = {'line_1': node.cloneNode(true), 'line_2': 0};
                next = node.nextSibling;
                if (next.nodeType === 1) {
                    allLines[i].line_2 = next.cloneNode(true);
                    node = next.nextElementSibling;
                } else {
                    node = node.nextElementSibling;
                }
            }

            // удаляем все предметы из инвентаря
            var title = tbody.firstElementChild.cloneNode(true);
            tbody.innerHTML = '';
            tbody.appendChild(title);

            // массив "уникальных" вещей (каждая вешь по одной и количество)
            var linesObj = [],
                obj;

            for (i = 0; i < allLines.length; i++) {
                obj = _this.compareLines(allLines[i], linesObj);
                if (!obj) {
                    linesObj[linesObj.length] = {line: allLines[i], count: 1};
                } else {
                    obj.count++;
                }
            }

            // вставляем вещи обратно в инвентарь
            var tblTarget,
                trHide,
                divn,
                id,
                td,
                j;

            for (i = 0; i < linesObj.length; i++) {
                tbody.appendChild(linesObj[i].line.line_1);
                if (linesObj[i].line.line_2) {
                    tbody.appendChild(linesObj[i].line.line_2);
                }

                // показываем количество только если оно больше 1
                if (linesObj[i].count !== 1) {
                    id = linesObj[i].line.id;
                    // вставим скрытые вещи
                    trHide = general.doc.createElement('tr');
                    trHide.id = 'tr_' + id;
                    trHide.setAttribute('style', 'display: none');
                    td = general.doc.createElement('td');
                    td.setAttribute('colspan', '2');
                    tblTarget = general.doc.createElement('table');
                    tblTarget.setAttribute('style',
                            'width: 100%; margin-left: 30px;');
                    td.appendChild(tblTarget);
                    trHide.appendChild(td);
                    tbody.appendChild(trHide);

                    for (j = 0; j < allLines.length; j++) {
                        if (allLines[j].id === id &&
                                linesObj[i].line.line_1.innerHTML !==
                                allLines[j].line_1.innerHTML) {
                            allLines[j].line_1.firstElementChild.
                                setAttribute('width', '400px');
                            tblTarget.appendChild(allLines[j].line_1);
                            if (allLines[j].line_2) {
                                tblTarget.appendChild(allLines[j].line_2);
                            }
                        }
                    }

                    //показываем количество и кнопу раскрытия списка
                    divn = general.doc.createElement('div');
                    divn.setAttribute('style', 'color: #606060; ' +
                            'margin-right: 300px; margin-left: 10px; ' +
                            'font-weight: bold; cursor: pointer;');
                    divn.innerHTML = '[' + linesObj[i].count + '+]';
                    divn.addEventListener('click',
                            _this.openCloseItem(id), false);
                    linesObj[i].line.link.parentNode.appendChild(divn);
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            // костыль для хрома
            if (/Chrome/i.test(general.root.navigator.appVersion)) {
                var scrpt = general.doc.createElement('script');
                scrpt.innerHTML =  'function postdo_mod(url) {' +
                    'new Ajax.Updater("itemsbody", url, ' +
                    '{asynchronous: true, onComplete: dumb, onSuccess: ' +
                    'function() {location.reload();}, method: "post"}); ' +
                    'return false;}';
                general.doc.body.insertBefore(scrpt,
                        general.doc.body.querySelectorAll('script')[0]);

                // изменим все ссылки на странице, использующие в
                // атрибуте onclick функцию 'postdo' на 'postdo_mod'
                var a = general.doc.
                            querySelectorAll('a[onclick^="return postdo"]'),
                    i;

                for (i = 0; i < a.length; i++) {
                    a[i].setAttribute('onclick', a[i].getAttribute('onclick').
                            replace('postdo', 'postdo_mod'));
                }
            } else {
                var _this = this;
                general.root.dumb = function () {
                    general.root.
                        setTimeout(_this.startInventoryPlus(_this), 100);
                };
            }

            this.startInventoryPlus(this);
        };
    };

    new InventoryPlus().init();

}());

