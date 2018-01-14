// ==UserScript==
// @name            FilterWarlistOne2One
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Фильтр по оружию в одиночках. Фильтр по уровням и типу оружия, встроенный в игре, переносится вверх страницы.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterWarlistOne2One/filterWarlistOne2One.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FilterWarlistOne2One/filterWarlistOne2One.user.js
// @include         http://www.ganjawars.ru/warlist.php*
// @grant           none
// @license         MIT
// @version         2.03-150118
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true
    devel: true, nomen: true
*/

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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'filterWarlistOne2One';
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
     * @class FilterWarlistOne2One
     * @constructor
     */
    var FilterWarlistOne2One = function () {
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
                /*eslint-disable no-useless-escape */
                if (tr[i].firstElementChild &&
                        (/<b>[^\[]*\[\d+\]/.test(tr[i].innerHTML))) {
                    /*eslint-enable no-useless-escape */
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
                    'FilterWarlistOne2One:\n\nFireFox 4+\nOpera 11+\n' +
                    'Chrome 12+');

                return;
            }

            var filtForm = general.doc.
                    querySelector('form[action="/warlist.php"]');

            if (filtForm && this.table) {
                filtForm = filtForm.cloneNode(false);
                filtForm.setAttribute('style', 'display: inline-block; ' +
                    'margin: 10px 0 10px 0;');

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
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode('от '));
                filtForm.appendChild(s_lmin);
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode(' до '));
                filtForm.appendChild(s_lmax);
                // noinspection JSCheckFunctionSignatures
                filtForm.appendChild(general.doc.createTextNode(' тип '));
                filtForm.appendChild(s_ltype);
                var subm = general.doc.createElement('input');
                subm.type = 'submit';
                subm.value = '»';
                filtForm.appendChild(subm);

                var target = general.$('updatetimer').nextElementSibling;
                target.parentNode.
                    insertBefore(filtForm, target.nextElementSibling);

                s_lmin.setAttribute('style', 'width: 40px;');
                s_lmax.setAttribute('style', 'width: 40px;');

                var span = general.doc.createElement('span');
                span.innerHTML = 'Название: <input id="w_name" ' +
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

    new FilterWarlistOne2One().init();

}());

