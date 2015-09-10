// ==UserScript==
// @name            FuckTheFarm
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Убирает ссылку на ферму на главной странице и на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FuckTheFarm/fuckTheFarm.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FuckTheFarm/fuckTheFarm.user.js
// @include         http://www.ganjawars.ru/me/*
// @include         http://www.ganjawars.ru/info.php?*
// @grant           none
// @license         MIT
// @version         2.00-100915
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true */

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
     * @class FuckTheFarm
     * @constructor
     */
    var FuckTheFarm = function () {
        /**
         * @method init
         */
        this.init = function () {
            var link;

            if (/\/me\//.test(general.loc)) {
                link = general.doc.querySelector('[src$="images.ganjawars.' +
                        'ru/i/home/farm.gif"]').parentNode;
                var lparent = link.parentNode;
                lparent.removeChild(link.previousElementSibling);
                lparent.removeChild(link.nextElementSibling);
                lparent.removeChild(link);
                return;
            }

            link = general.doc.querySelector('a[href*="/info.ach.php?id="]+' +
                    'a[href*="/info.ach.php?id="]').nextSibling;
            while (link.nextSibling) {
                link.parentNode.removeChild(link.nextSibling);
            }
        };
    };

    new FuckTheFarm().init();

}());

