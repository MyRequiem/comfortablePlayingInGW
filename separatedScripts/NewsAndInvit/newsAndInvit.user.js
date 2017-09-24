// ==UserScript==
// @name            NewsAndInvit
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Выделение и мигание приглашений в синдикаты, новых и не прочитанных новостей на главной странице персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NewsAndInvit/newsAndInvit.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NewsAndInvit/newsAndInvit.user.js
// @include         http://www.ganjawars.ru/me.php*
// @include         http://www.ganjawars.ru/messages.php?fid=1&tid=*
// @grant           none
// @license         MIT
// @version         2.03-240917
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, devel: true, plusplus: true,
    continue: true
*/

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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'newsAndInvit';
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
        },

        /**
         * @method setData
         * @param   {String}    data
         */
        setData: function (data) {
            this.st.setItem(this.STORAGENAME, data);
        },

        /**
         * @method getData
         * @return  {Array|null}
         */
        getData: function () {
            var stData = this.st.getItem(this.STORAGENAME);
            return stData ? stData.split('|') : null;
        }
    };

    var general = new General();

    /**
     * @class NewsAndInvit
     * @constructor
     */
    var NewsAndInvit = function () {
        /**
         * @method isForumPage
         * @return   {Boolean}
         */
        this.isForumPage = function () {
            return (/fid=1&tid=\d+/.test(general.loc));
        };

        /**
         * @method blink
         * @param   {Object}    link
         */
        this.blink = function (link) {
            link.style.color = '#FF0000';
            general.root.setInterval(function () {
                link.style.color = link.style.color ? '' : '#FF0000';
            }, 700);
        };

        /**
         * @method getNewsId
         * @param    {String}   link
         * @return   {String}
         */
        this.getNewsId = function (link) {
            return (/&tid=(\d+)/.exec(link))[1];
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'newsAndInvit:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var stData = general.getData();
            stData = stData ? JSON.parse(stData[0]) : null;

            var newsId;
            // на форуме новостей
            if (this.isForumPage() && stData) {
                newsId = this.getNewsId(general.loc);
                if (stData[newsId] === '0') {
                    stData[newsId] = '1';
                    general.setData(JSON.stringify(stData));
                }

                return;
            }

            // на главной
            // приглосы
            var invit = general.doc.querySelector('a[href*="/me/?nb=synd"]');
            if (invit) {
                invit.setAttribute('style', 'color: #FF0000; ' +
                        'font-weight: bold;');
            }

            // новости
            var newsLinks = general.doc.querySelectorAll('nobr>' +
                    'a[href*="/messages.php?fid=1&tid="]');

            if (newsLinks.length) {
                var newData = {},
                    i;

                for (i = 0; i < newsLinks.length; i++) {
                    newsId = this.getNewsId(newsLinks[i].href);
                    // storage пустой... записываем все темы как прочитанные
                    if (!stData) {
                        newData[newsId] = '1';
                        continue;
                    }

                    if (!stData[newsId]) {
                        stData[newsId] = '0';
                    }

                    if (stData[newsId] === '0') {
                        this.blink(newsLinks[i]);
                    }

                    newData[newsId] = stData[newsId];
                }

                general.setData(JSON.stringify(newData));
            }
        };
    };

    new NewsAndInvit().init();

}());

