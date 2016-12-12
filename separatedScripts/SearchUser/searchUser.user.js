// ==UserScript==
// @name            SearchUser
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Добавляет форму поиска персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SearchUser/searchUser.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SearchUser/searchUser.user.js
// @include         http://www.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         2.01-121216
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true */

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
         * @property DESIGN_VERSION
         * @type {String}
         */
        this.DESIGN_VERSION = /(^|;) ?version=([^;]*)(;|$)/.
                exec(this.doc.cookie)[2];
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
     * @class GetTopPanel
     * @constructor
     */
    var GetTopPanel = function () {
        /**
         * @method init
         * @return  {HTMLElement|null}
         */
        this.init = function () {
            if (general.DESIGN_VERSION === 'v2') {  // новый дизайн
                return general.doc.querySelector('td.gw-header-col2 ' +
                        'div:first-child nobr:first-child');
            }

            return general.doc.
                querySelector('td.txt[align="left"] nobr:first-child');
        };
    };

    /**
     * @class SearchUser
     * @constructor
     */
    var SearchUser = function () {
        /**
         * @method init
         */
        this.init = function () {
            var topPanel = new GetTopPanel().init();
            if (topPanel) {
                var td = general.doc.createElement('td');
                td.setAttribute('style', 'width: 130px;');
                td.innerHTML = '<form name="fsearch" id="fsearch" ' +
                    'method="GET" action="/search.php"><input type="text" ' +
                    'id="skey" name="key" value="" style="width: 130px;"' +
                    'title="Введите ник и нажмите Enter" /></form>';
                topPanel = topPanel.parentNode.parentNode;
                topPanel = general.DESIGN_VERSION === 'v2' ?
                        topPanel.parentNode : topPanel;
                topPanel.appendChild(td);

                general.$('skey').addEventListener('keypress', function (e) {
                    var ev = e || general.root.event;
                    if (ev.keyCode === 13) {
                        general.$('fsearch').submit();
                    }
                }, false);
            }
        };
    };

    new SearchUser().init();

}());

