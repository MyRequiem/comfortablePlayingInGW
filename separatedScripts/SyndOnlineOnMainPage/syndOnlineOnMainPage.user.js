// ==UserScript==
// @name            SyndOnlineOnMainPage
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На главной странице персонажа добавляет ссылки на его основной синдикат и союз (если есть), при нажатии на которые выводится онлайн синдиката со ссылками отправки сообщения каждому бойцу. Если персонаж в бою, то ссылка красного цвета. Так же добавляются конвертики для отправки сообщений в разделах "Мои друзья" и "Гости".
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndOnlineOnMainPage/syndOnlineOnMainPage.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndOnlineOnMainPage/syndOnlineOnMainPage.user.js
// @include         https://*gwars*/me.php*
// @include         https://*gwars*/me/*
// @grant           none
// @license         MIT
// @version         2.33-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
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
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/';
        /**
         * @property cons
         * @type {Object}
         */
        this.cons = this.root.console;
        /**
         * @property domain
         * @type {String}
         */
        this.domain = this.doc.domain;
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
     * @class SyndOnlineOnMainPage
     * @constructor
     */
    var SyndOnlineOnMainPage = function () {
        /**
         * @property syndUnion
         * @type {HTMLElement|null}
         */
        this.syndUnion = null;
        /**
         * @property syndMain
         * @type {HTMLElement|null}
         */
        this.syndMain = null;

        // noinspection FunctionWithInconsistentReturnsJS
        /**
         * @method setSms
         * @return {Boolean}
         */
        this.setSms = function () {
            var nobrs = general.$('friendsbody').querySelectorAll('nobr');
            if (nobrs.length) {
                var pLink, i;
                for (i = 0; i < nobrs.length; i++) {
                    pLink = nobrs[i].querySelector('a[href*="/info.php?id="]');
                    if (pLink) {
                        nobrs[i].innerHTML += '<a target="_blank" ' +
                            'style="margin-left: 3px;" ' +
                            'href="/sms-chat.php?id=' +
                            /\d+$/.exec(pLink.href)[0] + '">' +
                            '<img src="https://images.' +
                            general.domain.replace('www.', '') +
                            '/img/letter-pc.png" alt="img" /></a>';
                    }
                }

                return false;
            }
        };

        /**
         * @method getOnline
         * @param   {Boolean}   type
         */
        this.getOnline = function (type) {
            var target = general.$('friendsbody');
            if (!target.querySelector('div')) {
                target.innerHTML = '<div></div>' + (this.syndUnion ?
                        '<hr style="color: #C3C3C3;" /><div></div>' : '');
            }

            target = type ? target.lastElementChild : target.firstElementChild;
            target.innerHTML = '<img src="' + general.imgPath +
                'preloader.gif" alt="img" />';

            var url = (type ? this.syndUnion.href : this.syndMain.href) +
                    '&page=online',
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                target.innerHTML = '<a href="' + url + '">' +
                    '<img src="https://images.' +
                    general.domain.replace('www.', '') + '/img/synds/' +
                    /\?id=(\d+)/.exec(url)[1] + '.gif" alt="img" /></a> (' +
                    /<b>(\d+) бойцов онлайн<\/b>/.
                        exec(spanContent.innerHTML)[1] + ')<br>';

                var cssSelector = 'table[class="bordersupdown"][width="100%"]',
                    trs = spanContent.querySelector(cssSelector).
                        querySelectorAll('tr');

                if (trs.length > 1) {
                    var nobr, pers, syndImg, war, i;
                    for (i = 1; i < trs.length; i++) {
                        syndImg = trs[i].querySelector('a[href*=' +
                            '"/syndicate.php?id="]');
                        pers = trs[i].querySelector('a[href*="/info.php?id="]');
                        war = trs[i].
                            querySelector('a[href*="/warlog.php?bid="]');

                        nobr = general.doc.createElement('nobr');
                        if (syndImg) {
                            nobr.appendChild(syndImg);
                        }

                        if (war) {
                            pers.setAttribute('style', 'color: #FF0000;');
                        }

                        nobr.appendChild(pers);
                        nobr.innerHTML += ' <a target="_blank" ' +
                            '"><img src="https://images.' +
                            general.domain.replace('www.', '') +
                            '/img/letter-pc.png" alt="img" /></a>';

                        target.appendChild(nobr);
                        target.innerHTML += i < trs.length - 1 ? ',<wbr>' : '';
                    }
                }
            }, function () {
                general.root.setTimeout(function () {
                    _this.getOnline(type);
                }, 1000);
            });
        };

        /**
         * @method createLink
         * @param   {String}    name
         * @param   {Boolean}   type
         * @return  {HTMLElement}
         */
        this.createLink = function (name, type) {
            var link = general.doc.createElement('a');
            link.setAttribute('style', 'text-decoration: underline; ' +
                    'cursor: pointer;');
            link.innerHTML = name;
            var _this = this;
            link.addEventListener('click', function () {
                _this.getOnline(type);
            }, false);

            return link;
        };

        /**
         * @method init
         */
        this.init = function () {
            // гости, друзья - ставим конвертики для отправки письма
            var friends = general.doc.querySelector('a[onclick*="setfriends"]'),
                guests = general.doc.querySelector('a[onclick*="setvisitor"]');

            friends.addEventListener('click', this.setSms, false);
            guests.addEventListener('click', this.setSms, false);
            friends.click();

            // основной синдикат
            this.syndMain = general.doc.
                    querySelector('span>b+nobr>a[href*="/syndicate.php?id="]');

            if (this.syndMain) {
                var b = general.doc.createElement('b');
                b.appendChild(general.doc.createTextNode(' / '));
                b.appendChild(this.createLink('Основа', false));
                guests.parentNode.parentNode.appendChild(b);

                var url = this.syndMain.href + '&page=politics',
                    _this = this;

                new AjaxQuery().init(url, function (xml) {
                    var spanContent = general.doc.createElement('span');
                    spanContent.innerHTML = xml.responseText;

                    var cssSelector = 'tr>td[colspan="3"]' +
                        '[class="greengreenbg"]>' +
                        'a[href*="/syndicate.php?id="]:last-child';
                    _this.syndUnion = spanContent.querySelector(cssSelector);

                    if (_this.syndUnion) {
                        b.appendChild(general.doc.createTextNode(' '));
                        b.appendChild(_this.createLink('Союз', true));
                    }
                }, function () {
                    general.cons.log('Error request to: ' + url);
                });
            }
        };
    };

    new SyndOnlineOnMainPage().init();

}());

