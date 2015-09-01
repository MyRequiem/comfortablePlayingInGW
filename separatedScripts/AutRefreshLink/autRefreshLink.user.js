// ==UserScript==
// @name            AutRefreshLink
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На ауте и в прибрежке добавляет кнопку "Обновить" под чатом.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AutRefreshLink/autRefreshLink.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/AutRefreshLink/autRefreshLink.user.js
// @include         http://quest.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         2.00-220815
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
     * @class AutRefreshLink
     * @constructor
     */
    var AutRefreshLink = function () {
        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('td>a[href*="?itemslist="]'),
                refresh = general.doc.querySelector('div>a[href*="/walk"]');

            if (target && refresh) {
                refresh = refresh.cloneNode(true);
                refresh.setAttribute('style', 'margin-left: 5px;');
                target.parentNode.
                    insertBefore(refresh, target.nextElementSibling);
            }

        };
    };

    new AutRefreshLink().init();

}());

