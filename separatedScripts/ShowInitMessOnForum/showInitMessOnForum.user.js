// ==UserScript==
// @name            ShowInitMessOnForum
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В ответе на сообщение показывает то сообщение, на которое отвечают.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowInitMessOnForum/showInitMessOnForum.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ShowInitMessOnForum/showInitMessOnForum.user.js
// @include         http://www.gwars.ru/messages.php*
// @grant           none
// @license         MIT
// @version         2.22-030219
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, nomen: true,
    regexp: true
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
         * @property loc
         * @type {String}
         */
        this.loc = this.root.location.href;
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

            // noinspection JSUnresolvedVariable
            var author = last.parentNode.previousElementSibling.
                    querySelector('b').innerHTML,
                lastLink = last.previousElementSibling.querySelector('a').href,
                tr = last.querySelector('tr:last-child').cloneNode(true),
                divMess = tr.querySelector('td>div[style$="overflow:hidden;"]'),
                messComplete = divMess.innerHTML,
                // если длина сообщения более 400 символов или в сообщении
                // более 3 переносов строк ('<br>'), то выводим половину
                // сообщения если его длина менее 400 или только первые 200
                // символов если его длина более 400 символов
                longMess = messComplete.length > 400 ||
                    divMess.querySelectorAll('br').length > 3,
                messHeader = author + '&nbsp;&nbsp;&nbsp;<a href="' + lastLink +
                    '">[&#8593;]</a><br>';

            divMess.parentNode.setAttribute('style', 'border: 1px dashed ' +
                '#339933; background: #C2EDC1;');
            divMess.innerHTML = messHeader +
                (!longMess ? messComplete :
                        ((messComplete.length > 400 ?
                                messComplete.substring(0, 200) : messComplete.
                            substring(0, Math.round(messComplete.length / 2))).
                            // убираем тэги <br> в конце сокращенного сообщения
                            replace(/\s*(<b?r?\s*\/?>?\s*)*$/, '').
                            // убираем незавершенную ссылку
                            replace(/<a href=[^>]+(>(https?|ftp):\/\/.*)?$/,
                                '') +
                        ' ...[<span style="text-decoration: underline; ' +
                        'color: #007700; cursor: pointer;" name="openMess">' +
                        'развернуть</span>]'));
            target.parentNode.insertBefore(tr, target);

            if (longMess) {
                var openLink = divMess.querySelector('span[name="openMess"]');
                if (openLink) {
                    openLink.addEventListener('click', function () {
                        divMess.innerHTML = messHeader + messComplete;
                    }, false);
                }
            }
        };

        /**
         * @method parseMessages
         * @param   {int}   ind
         */
        this.parseMessages = function (ind) {
            if (!this.messages[ind]) {
                return;
            }

            var messDiv = this.messages[ind].querySelector('div');
            if (!messDiv) {
                ind++;
                this.parseMessages(ind);
                return;
            }

            var reg = /^\s*\+?\s*(\d+)(,\D+|\.\D+|\)|\s|:|\+\D+)/,
                numReply = reg.exec(messDiv.innerHTML);

            // noinspection JSValidateTypes
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
                    }, 1000);
                }, function () {
                    general.root.setTimeout(function () {
                        _this.parseMessages(ind);
                    }, 1000);
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

    var mainObj = general;
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js';
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID && !mainObj.root.cpigwchbl(mainObj.myID)) {
                new ShowInitMessOnForum().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

