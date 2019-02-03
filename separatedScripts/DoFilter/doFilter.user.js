// ==UserScript==
// @name            DoFilter
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Быстрый поиск предметов на ДО при введении их названия в текстовое поле.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DoFilter/doFilter.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DoFilter/doFilter.user.js
// @include         http://www.gwars.ru/market.php*
// @include         http://www.gwars.ru/market-p.php*
// @grant           none
// @license         MIT
// @version         2.05-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    continue: true, regexp: true
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
     * @class DoFilter
     * @constructor
     */
    var DoFilter = function () {
        /**
         * @property selects
         * @type {NodeList}
         */
        this.selects = general.doc.querySelectorAll('select[name="item_id"]');

        /**
         * @method setHrefItem
         * @param   {HTMLSelectElement}     sel
         */
        this.setHrefItem = function (sel) {
            var a = sel.nextElementSibling,
                itemId = sel.value;

            if (itemId !== '#') {
                a.href = 'http://www.gwars.ru/item.php?item_id=' + itemId;
                a.setAttribute('target', '_blank');
            } else {
                a.href = itemId;
                a.removeAttribute('target');
            }
        };

        /**
         * @method selectChange
         * @param   {HTMLSelectElement}     sel
         */
        this.selectChange = function (sel) {
            var _this = this;

            return function () {
                _this.setHrefItem(sel);
            };
        };

        /**
         * @method findItem
         * @param   {Object}  inp
         */
        this.findItem = function (inp) {
            var i, j;
            for (i = 0; i < this.selects.length; i++) {
                // если текстовое поле пустое(стерто BackSpase'ом),
                // то вернем списки в начальное состояние
                if (!inp.value) {
                    this.selects[i].options[1].selected = true;
                    this.setHrefItem(this.selects[i]);
                    continue;
                }

                // выбираем самый первый пустой option
                // noinspection JSUndefinedPropertyAssignment
                this.selects[i].value = '#';
                // прокручиваем весь список и ищем совпадения
                for (j = 0; j < this.selects[i].options.length; j++) {
                    if (this.selects[i].options[j].innerHTML.toLowerCase().
                            indexOf(inp.value.toLowerCase()) !== -1) {
                        this.selects[i].options[j].selected = true;
                    }
                }

                this.setHrefItem(this.selects[i]);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('table+br+center');

            if (!this.selects.length || !this.selects[0].options || !target) {
                return;
            }

            var opt, a, i;
            for (i = 0; i < this.selects.length; i++) {
                //одинаковая длина у всех списков
                this.selects[i].setAttribute('style', 'width: 190px;');

                //добавим пустой елемент в select
                opt = general.doc.createElement('option');
                opt.innerHTML = '&nbsp';
                opt.setAttribute('value', '#');
                this.selects[i].insertBefore(opt,
                        this.selects[i].firstElementChild);
                //выделен первый option (не пустой)
                this.selects[i].options[1].selected = true;

                //добавим ссылки на предметы после селектов
                a = general.doc.createElement('a');
                a.innerHTML = '[?]';
                a.setAttribute('title', 'Страница описания предмета');
                a.setAttribute('style', 'margin-left: 2px; color: #808080; ' +
                        'text-decoration: none;');
                this.selects[i].parentNode.appendChild(a);

                //обработчик 'onchange' при изменении списка выбора
                this.selects[i].addEventListener('change',
                        this.selectChange(this.selects[i]), false);

                //устанавливаем атрибут href ссылки
                this.setHrefItem(this.selects[i]);
            }

            //вставляем текстовое поле ввода
            var divSearch = general.doc.createElement('div');
            divSearch.innerHTML = '<span style="color: #008000; ' +
                'font-weight: bold;">Быстрый поиск:</span> <input ' +
                'id="txtFilter" size="40" style="margin-bottom: ' +
                '10px;">';
            target.insertBefore(divSearch, target.firstChild);

            var textField = general.doc.querySelector('#txtFilter'),
                _this = this;

            textField.addEventListener('input', function () {
                _this.findItem(textField);
            }, false);
            textField.focus();
        };
    };

    var mainObj = general;
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/cpigwchbl/cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new DoFilter().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

