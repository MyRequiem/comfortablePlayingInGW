// ==UserScript==
// @name            BbCodeInMessages
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В формах для отправки личных сообщений и сообщений на форуме добавляет кнопки для вставки в позиции курсора bb-кодов для цитирования [q][/q] и наклонного шрифта [i][/i].
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BbCodeInMessages/bbCodeInMessages.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BbCodeInMessages/bbCodeInMessages.user.js
// @include         http://www.gwars.ru/messages.php?fid=*
// @include         http://www.gwars.ru/sms-create.php*
// @include         http://www.gwars.ru/sms-read.php*
// @include         http://www.gwars.ru/hmessages.php*
// @grant           none
// @license         MIT
// @version         1.00-210919
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, regexp: true, nomen: true */

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
         * @property loc
         * @type {String}
         */
        this.loc = this.root.location.href;
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/BbCodeInMessages/';
        /**
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|)/.exec(this.doc.cookie)[2];
    };

    /**
     * @lends General.prototype
     */
    General.prototype = {
        /**
         * @method  getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method  $
         * @param   {String}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
        }
    };

    var general = new General();

    /**
     * @class BbCodeInMessages
     * @constructor
     */
    var BbCodeInMessages = function () {
        /**
         * @property textArea
         * @type {Object|null}
         */
        this.textArea = general.doc.querySelector('textarea[name="msg"],' +
                'textarea[name="message"]');

        /**
         * @method  setButton
         * @param   {String}    imgName
         * @param   {String}    title
         * @param   {Object}    target
         * @param   {String}    tag
         */
        this.setButton = function (imgName, title, target, tag) {
            var button = general.doc.createElement('span');
            button.setAttribute('style', 'margin-left: 10px; cursor: pointer;');
            button.innerHTML = '<img src="' + general.imgPath + imgName +
                '.png" width="14" height="14" title="' + title + '" ' +
                'alt="' + title + '">';
            target.appendChild(button);

            var _this = this;
            button.addEventListener('click', function () {
                var text = _this.textArea.value,
                    cursorPos = _this.textArea.selectionStart;

                if (!general.root.KKaf) {
                    _this.textArea.value = '';
                } else if (general.root.v0WD) {
                    _this.textArea.value = text.substring(0, cursorPos) + tag +
                        text.substring(cursorPos, text.length);
                    _this.textArea.focus();
                    _this.textArea.selectionEnd = cursorPos + 3;
                }
            }, false);
        };

        /**
         * @method  init
         */
        this.init = function () {
            var sendButton = general.doc.
                    querySelector('input[value="Отправить сообщение"]');

            if (this.textArea && sendButton) {
                var target = sendButton.parentNode.parentNode.parentNode.
                        parentNode.querySelectorAll('td');

                target = /sms-create/.test(general.loc) ? target[4] : target[0];

                this.setButton('quote', 'Цитирование', target, '[q][/q]');
                this.setButton('italic', 'Наклонный шрифт', target, '[i][/i]');
            }
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
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new BbCodeInMessages().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

