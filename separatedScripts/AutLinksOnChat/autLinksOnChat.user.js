// ==UserScript==
// @name            Aut Links On Chat
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В чате аута и прибрежки делает все ники ссылками на персонажей.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AutLinksOnChat/autLinksOnChat.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AutLinksOnChat/autLinksOnChat.user.js
// @include         http://quest.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         2.0-220815
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, plusplus: true */

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
     * @class AutLinksOnChat
     * @constructor
     */
    var AutLinksOnChat = function () {
        /**
         * @method init
         */
        this.init = function () {
            var chat = general.doc.querySelector('td[class="wb"]' +
                    '[valign="top"][style="font-size:8pt"]');

            if (chat) {
                var fonts = chat.querySelectorAll('font'),
                    name,
                    i;

                for (i = 0; i < fonts.length; i++) {
                    if (!fonts[i].firstElementChild) {
                        name = fonts[i].innerHTML;
                        fonts[i].innerHTML = '<a target="_blank" ' +
                            'style="font-size: 8pt; text-decoration: none; ' +
                            'color: #990000;" href="http://www.ganjawars.ru' +
                            '/search.php?key=' + name + '">' + name + '</a>';
                    }
                }
            }
        };
    };

    new AutLinksOnChat().init();

}());

