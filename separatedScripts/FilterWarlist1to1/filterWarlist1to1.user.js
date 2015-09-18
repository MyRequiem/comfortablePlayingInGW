// ==UserScript==
// @name            FilterWarlist1to1
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр по оружию в одиночках. Фильтр по уровням и типу оружия, встроенный в игре, переносится вверх страницы.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterWarlist1to1/filterWarlist1to1.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterWarlist1to1/filterWarlist1to1.user.js
// @include         http://www.ganjawars.ru/warlist.php*
// @grant           none
// @license         MIT
// @version         2.00-100915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, nomen: true,
    plusplus: true, regexp: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'filterWarlist1to1';
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
     * @class FilterWarlist1to1
     * @constructor
     */
    var FilterWarlist1to1 = function () {
        /**
         * @property table
         * @type {HTMLTableElement}
         */
        this.table = general.doc.querySelector('table[cellpadding="5"]');

        /**
         * @method sortWeapon
         */
        this.sortWeapon = function () {
            var weapon = general.$('w_name').value.toLowerCase(),
                tr = this.table.querySelectorAll('tr'),
                text,
                i;

            for (i = 0; i < tr.length; i++) {
                if (tr[i].firstElementChild &&
                        (/<b>[^\[]*\[\d+\]/.test(tr[i].innerHTML))) {
                    tr[i].style.display = '';
                    if (weapon) {
                        text = tr[i].firstElementChild.nextElementSibling.
                            innerHTML.toLowerCase();
                        if (text.indexOf(weapon) === -1) {
                            tr[i].style.display = 'none';
                        }
                    }
                }
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
                    'FilterWarlist1to1:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var filtForm = general.doc.
                    querySelector('form[action="/warlist.php"]');

            if (filtForm && this.table) {
                filtForm = filtForm.cloneNode(false);
                filtForm.setAttribute('style', 'display: inline-block; ' +
                        'margin: 0 10px 0 10px;');

                var hidden1 = general.
                        doc.querySelector('input[name="levelset"]').
                            cloneNode(false),
                    hidden2 = general.doc.
                        querySelector('input[name="war"]').cloneNode(false),
                    s_lmin = general.doc.
                        querySelector('select[name="s_lmin"]').cloneNode(true),
                    s_lmax = general.doc.
                        querySelector('select[name="s_lmax"]').cloneNode(true),
                    s_ltype = general.doc.
                        querySelector('select[name="s_ltype"]').cloneNode(true);

                filtForm.appendChild(hidden1);
                filtForm.appendChild(hidden2);
                filtForm.appendChild(general.doc.createTextNode('от '));
                filtForm.appendChild(s_lmin);
                filtForm.appendChild(general.doc.createTextNode(' до '));
                filtForm.appendChild(s_lmax);
                filtForm.appendChild(general.doc.createTextNode(' тип '));
                filtForm.appendChild(s_ltype);
                var subm = general.doc.createElement('input');
                subm.type = 'submit';
                subm.value = '»';
                filtForm.appendChild(subm);

                var target = general.$('updatetimer').
                                parentNode.firstElementChild;
                target.parentNode.insertBefore(filtForm, target.nextSibling);

                s_lmin.setAttribute('style', 'width: 40px;');
                s_lmax.setAttribute('style', 'width: 40px;');

                var span = general.doc.createElement('span');
                span.innerHTML = 'Название: <input type="text" id="w_name" ' +
                    'style="width: 150px;" value="' +
                    (general.getData()[0] || '') + '" />';
                target.parentNode.insertBefore(span, filtForm.nextSibling);

                var _this = this;
                general.$('w_name').addEventListener('input', function () {
                    var weapName = this;
                    general.setData([weapName.value]);
                    _this.sortWeapon();
                }, false);

                //удаляем нижнюю форму
                this.table.firstElementChild.
                    removeChild(this.table.firstElementChild.lastElementChild);

                this.sortWeapon();
            }
        };
    };

    new FilterWarlist1to1().init();

}());
