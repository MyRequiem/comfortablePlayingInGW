// ==UserScript==
// @name            CurrentQuestOnInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Вывод текущего ужедневного мини-квеста на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CurrentQuestOnInfo/currentQuestOnInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CurrentQuestOnInfo/currentQuestOnInfo.user.js
// @include         http://www.gwars.ru/info.php?id=*
// @grant           none
// @license         MIT
// @version         1.07-101018
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458], идея kaa
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, regexp: true */

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
     * @class CurrentQuestOnInfo
     * @constructor
     */
    var CurrentQuestOnInfo = function () {
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
         * @property questURL
         * @type {String}
         */
        this.questURL = 'http://www.gwars.ru/questlog.php?id=';
        /**
         * @property persID
         * @type {String}
         */
        this.persID = /\?id=(\d+)/.exec(this.root.location.href)[1];
    };

    /**
     * @lends CurrentQuestOnInfo.prototype
     */
    CurrentQuestOnInfo.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method ajax
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        ajax: function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (xmlHttpRequest) {
                xmlHttpRequest.open('GET', url, true);
                xmlHttpRequest.send(null);

                var timeout = this.root.setTimeout(function () {
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
            }
        },

        /**
         * @method showQuest
         * @param   {String}    url
         */
        showQuest: function (url) {
            var _this = this;

            this.ajax(url, function (xhr) {
                var spanContent = _this.doc.createElement('span');
                spanContent.innerHTML = xhr.responseText;

                // noinspection JSUnresolvedVariable
                var cssSelector = 'td[valign="top"][align="right"]>' +
                        'a[href*="/help/index.php?sid="]',
                    td = spanContent.querySelector(cssSelector).parentNode.
                         previousElementSibling,
                    questDescr = td.firstElementChild.nextSibling.nodeValue,
                    reg = /(.*):\s*(\d+) из (\d+)/.exec(questDescr),
                    acQuests = /-квестов:<\/b>\s?(\d+)/.exec(td.innerHTML);

                if (!reg || !acQuests) {
                    return;
                }

                var span = _this.doc.createElement('span');
                span.setAttribute('style', 'margin-left: 7px; font-size: 8pt;');
                span.innerHTML = reg[1] + ' [' +
                    '<a href="/questlog.php" style="color: ' +
                    (+reg[2] < (+reg[3]) ? '#AA5500' : '#008700') + '; ' +
                    'text-decoration: none; font-size: 8pt;" target="_blank">' +
                    reg[2] + '</a>/' + reg[3] + '] ' +
                    '(<a target="_blank" style="color:#007700; ' +
                    'font-weight: bold; text-decoration: none;" ' +
                    'href="http://www.gwars.ru/help/index.php?' +
                    'sid=102&pid=45">' + acQuests[1] + '</a>)';

                var target = _this.doc.querySelector('#actiondivin');
                if (target) {
                    // новое оформление страницы информации о персонаже
                    target.parentNode.setAttribute('width', '100%');
                    target.parentNode.nextElementSibling.
                        removeAttribute('width');
                } else {
                    // примитивное оформление страницы информации о персонаже
                    target = _this.doc.querySelector('td[class="wb"]' +
                        '[align="left"][valign="middle"][width="100%"]' +
                            '[style="padding-top:3px;"]');
                }

                target.appendChild(span);
            }, function () {
                _this.root.setTimeout(function () {
                    _this.showQuest(url);
                }, 1200);
            });
        },

        /**
         * @method init
         */
        init: function () {
            if (this.persID) {
                this.showQuest(this.questURL + this.persID);
            }
        }
    };

    new CurrentQuestOnInfo().init();

}());

