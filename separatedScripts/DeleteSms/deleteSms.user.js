// ==UserScript==
// @name            DeleteSms
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Добавляет сылку "Удалить отмеченные" вверху страниц входящих и исходящих сообщений. Отметка синдикатных рассылок и сообщений от робота.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DeleteSms/deleteSms.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DeleteSms/deleteSms.user.js
// @include         http://www.gwars.ru/sms.php*
// @grant           none
// @license         MIT
// @version         2.16-170918
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true */

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

    // ============================ НАСТРОЙКИ ==================================
    // 0 - выключено, 1 - включено
    var markSyndSms = 1,        // отмечать синдовые рассылки
        markRobotSms = 1,       // отмечать рассылки от робота
        noMarkImportantSms = 1; // НЕ отмечать письма с пометкой "важное"
    // ========================= КОНЕЦ НАСТРОЕК ================================

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
     * @class DeleteSms
     * @constructor
     */
    var DeleteSms = function () {
        /**
         * @method testSubject
         * @param   {HTMLInputElement}  chk
         * @param   {Object}            reg
         * @return  {Boolean}
         */
        this.testSubject = function (chk, reg) {
            // noinspection JSUnresolvedVariable
            return reg.test(chk.parentNode.nextElementSibling.innerHTML);
        };

        /**
         * @method checkSms
         * @param   {HTMLElement}   chk
         * @param   {Boolean}       is_check
         * @param   {Boolean}       load
         */
        this.checkSms = function (chk, is_check, load) {
            if (is_check) {
                chk.checked = false;
                return;
            }

            var no_check_important = this.testSubject(chk, /\[важное\]/) &&
                    noMarkImportantSms;

            if (this.testSubject(chk, /<b>#\d+<\/b>/)) {
                // синдрассылка
                if (!no_check_important) {
                    chk.checked = !!markSyndSms;
                } else {
                    chk.checked = false;
                }
            } else if (chk.parentNode.parentNode.
                    querySelector('a[href="/info.php?id=1"]')) {
                // сообщение от робота
                if (!no_check_important) {
                    chk.checked = !!markRobotSms;
                } else {
                    chk.checked = false;
                }
            } else {
                // все остальные сообщения (только при нажатии [+])
                if (!no_check_important) {
                    chk.checked = !load;
                } else {
                    chk.checked = false;
                }
            }
        };

        /**
         * @method get_checkbox_checked
         * @return  {HTMLElement|null}
         */
        this.get_checkbox_checked = function () {
            return general.doc.querySelector('input[type="checkbox"]' +
                '[name^="kill"]:checked');
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('tr>td>a:last-child' +
                        '[href="/sms.php?page=2"]'),
                del = general.doc.querySelector('input[class="mainbutton"]' +
                    '[type="submit"][value="Удалить отмеченные"]'),
                smsChk = general.doc.querySelectorAll('input[type="checkbox"]' +
                    '[name^="kill"]'),
                i;

            if (!target || !del) {
                return;
            }

            // отмечаем сообщения в соответствии с настройками скрипта
            for (i = 0; i < smsChk.length; i++) {
                this.checkSms(smsChk[i], false, true);
            }

            target = target.parentNode.parentNode;
            // noinspection JSUndefinedPropertyAssignment
            target.innerHTML += '<td valign="top" class="greengreenbg" ' +
                'align="center" style="width: 150px;"></td>';
            target = target.lastElementChild;

            // кнопка удаления
            var delButton = general.doc.createElement('span');
            delButton.innerHTML = 'Удалить отмеченные';
            delButton.setAttribute('style', 'cursor: pointer; ' +
                    'text-decoration: underline;');
            delButton.addEventListener('click', function () {
                del.click();
            }, false);

            target.appendChild(delButton);

            // кнопка "Отметить все/Снять все отметки"
            var markAll = general.doc.createElement('span'),
                checkbox_checked = this.get_checkbox_checked(),
                check_all = 'Отметить все',
                clear_all = 'Снять все',
                minus = '[&minus;]',
                plus = '[+]';

            markAll.setAttribute('style', 'margin-left: 5px; ' +
                    'cursor: pointer; color: #990000');
            markAll.innerHTML = checkbox_checked ? minus : plus;
            markAll.title = checkbox_checked ? clear_all : check_all;
            target.appendChild(markAll);

            var _this = this;
            markAll.addEventListener('click', function () {
                var but = this,
                    is_check = _this.get_checkbox_checked();

                but.innerHTML = is_check ? plus : minus;
                but.title = is_check ? check_all : clear_all;

                var l;
                for (l = 0; l < smsChk.length; l++) {
                    _this.checkSms(smsChk[l], is_check, false);
                }
            }, false);
        };
    };

    new DeleteSms().init();

}());

