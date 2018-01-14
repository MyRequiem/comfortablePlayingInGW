// ==UserScript==
// @name            DeleteSms
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Добавляет сылку "Удалить отмеченные" вверху страниц входящих и исходящих сообщений. Отметка синдикатных рассылок и сообщений от робота.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DeleteSms/deleteSms.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/DeleteSms/deleteSms.user.js
// @include         http://www.ganjawars.ru/sms.php*
// @grant           none
// @license         MIT
// @version         2.13-150118
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
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
    var markSyndSms = 1,        // отмечать синдовые рассылки
        markRobotSms = 1,       // отмечать рассылки от робота
        noMarkImportantSms = 1; // НЕ отмечать письма с пометкой "важное" при
                                // нажатии на [+] (Отметить все)
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
            // noinspection Annotator
            return reg.test(chk.parentNode.nextElementSibling.innerHTML);
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('tr>td>a:last-child' +
                        '[href="/sms.php?page=2"]'),
                del = general.doc.querySelector('input[class="mainbutton"]' +
                    '[type="submit"][value="Удалить отмеченные"]'),
                smsChk = general.doc.
                    querySelectorAll('input[type="checkbox"][name^="kill"]');

            if (!target || !del) {
                return;
            }

            target = target.parentNode.parentNode;
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

            // кнопка "Отметить все"
            var markAll = general.doc.createElement('span');
            markAll.setAttribute('style', 'margin-left: 5px; ' +
                    'cursor: pointer; color: #990000');
            markAll.setAttribute('title', 'Отметить все');
            markAll.innerHTML = '[+]';
            target.appendChild(markAll);
            var _this = this;
            markAll.addEventListener('click', function () {
                var but = this,
                    s = ['[+]', '[&minus;]', 'Отметить все',
                        'Снять все отметки'],
                    on = but.innerHTML === s[0];

                but.innerHTML = on ? s[1] : s[0];
                but.title = on ? s[3] : s[2];

                var i;
                for (i = 0; i < smsChk.length; i++) {
                    smsChk[i].checked = !(!on || (noMarkImportantSms &&
                    _this.testSubject(smsChk[i], /\[важное\]/)));
                }
            }, false);

            // отмечаем нужное
            var i;
            for (i = 0; i < smsChk.length; i++) {
                // noinspection Annotator
                if ((markSyndSms &&
                        this.testSubject(smsChk[i], /<b>#\d+<\/b>/)) ||
                            (markRobotSms && smsChk[i].parentNode.parentNode.
                                querySelector('a[href="/info.php?id=1"]'))) {
                    smsChk[i].checked = true;
                }
            }
        };
    };

    new DeleteSms().init();

}());

