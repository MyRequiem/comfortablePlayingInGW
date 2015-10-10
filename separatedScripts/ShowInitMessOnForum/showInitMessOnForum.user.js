// ==UserScript==
// @name            ShowInitMessOnForum
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В ответе на сообщение показывает то сообщение, на которое отвечают.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowInitMessOnForum/showInitMessOnForum.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowInitMessOnForum/showInitMessOnForum.user.js
// @include         http://www.ganjawars.ru/messages.php*
// @grant           none
// @license         MIT
// @version         2.00-101015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, plusplus: true, nomen: true
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
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method init
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.root.console.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
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
        };
    };

    /**
     * @class ShowInitMessOnForum
     * @constructor
     */
    var ShowInitMessOnForum = function () {
        /**
         * @property pageNum
         * @type {int}
         */
        this.pageNum = 0;
        /**
         * @property messages
         * @type {Array|null}
         */
        this.messages = null;

        /**
         * @method getMessagesOnPages
         * @param   {Object}    obj
         * @return  {NodeList}
         */
        this.getMessagesOnPages = function (obj) {
            return obj.querySelectorAll('td>table[cellpadding="5"]' +
                    '[cellspacing="0"][border="0"]');
        };

        /**
         * @method insertMess
         * @param   {Element}  target
         * @param   {Element}  last
         */
        this.insertMess = function (target, last) {
            target = target.querySelector('tr');
            target.firstElementChild.
                setAttribute('style', 'padding-left: 20px;');

            var author = last.parentNode.previousElementSibling.
                    querySelector('b').innerHTML,
                lastLink = last.previousElementSibling.querySelector('a').href,
                tr = last.querySelector('tr:last-child').cloneNode(true);

            tr.firstElementChild.setAttribute('style', 'border: 1px dashed ' +
                '#339933; background: #C2EDC1;');
            tr.firstElementChild.innerHTML = author + '&nbsp;&nbsp;&nbsp;' +
                '<a href="' + lastLink + '">[&#8593;]</a><br>' +
                tr.firstElementChild.innerHTML;
            target.parentNode.insertBefore(tr, target);
        };

        /**
         * @method parseMessages
         * @param   {int}   ind
         */
        this.parseMessages = function (ind) {
            if (!this.messages[ind]) {
                return;
            }

            var r = /^<tbody><tr><td>\s*\+?\s*(\d+)(,\D+|\.\D+|\)|\s|:|\+\D+)/,
                numReply = r.exec(this.messages[ind].innerHTML);

            numReply = numReply ? +numReply[1] : 0;

            // нет номера/номер === 0 или число > текущего сообщения
            if (numReply < 1 || numReply >= this.pageNum * 20 + ind + 1) {
                ind++;
                this.parseMessages(ind);
                return;
            }

            // порядковый номер сообщения на странице, на которое отвечаем
            var sequenceNum = numReply < 21 ? numReply - 1 :
                    numReply % 20 !== 0 ? numReply % 20 - 1 : 19,
                // страница, где находится сообщение, на которое отвечаем
                // (на каждой странице 20 сообщений)
                pageReply = Math.floor((numReply - 1) / 20);

            // если сообщение, на которое отвечаем,
            // находится на текущей странице
            if (pageReply === this.pageNum) {
                this.insertMess(this.messages[ind], this.messages[sequenceNum]);
                ind++;
                this.parseMessages(ind);
            } else {
                var url = general.loc.replace(/&page_id=\d+(#\d+)?#?/g, '') +
                        '&page_id=' + pageReply,
                    _this = this;

                new AjaxQuery().init(url, function (xml) {
                    var spanContent = general.doc.createElement('span');
                    spanContent.innerHTML = xml.responseText;

                    var mess = _this.getMessagesOnPages(spanContent);
                    _this.insertMess(_this.messages[ind], mess[sequenceNum]);
                    ind++;
                    general.root.setTimeout(function () {
                        _this.parseMessages(ind);
                    }, 700);
                }, function () {
                    general.root.setTimeout(function () {
                        _this.parseMessages(ind);
                    }, 700);
                });
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page_id=\d+/.exec(general.loc)) {
                this.pageNum = +(/&page_id=(\d+)/.exec(general.loc)[1]);
            } else if (/page_id=last/.test(general.loc)) {
                var num = general.doc.querySelector('td[style="cursor:' +
                        'pointer;"][class="greenlightbg"]');
                if (num) {
                    this.pageNum = +num.firstElementChild.innerHTML;
                }
            }

            this.messages = this.getMessagesOnPages(general.doc);
            this.parseMessages(0);
        };
    };

    new ShowInitMessOnForum().init();

}());

