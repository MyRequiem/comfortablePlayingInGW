// ==UserScript==
// @name            FindSyndUser
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице управления синдикатом, в разделе "Состав" добавляет возможность быстрого поиска персонажа в выпадающем списке.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FindSyndUser/findSyndUser.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/FindSyndUser/findSyndUser.user.js
// @include         http://www.ganjawars.ru/syndicate.edit.php*
// @grant           none
// @license         MIT
// @version         2.00-110316
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458] Идея: Miay
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, plusplus: true, vars: true */

(function () {
    'use strict';

    /**
     * @class FindSyndUser
     * @constructor
     */
    var FindSyndUser = function () {
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
     * @lends FindSyndUser.prototype
     */
    FindSyndUser.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method init
         */
        init: function () {
            var sel = this.doc.querySelector('select[name="cid"]');

            if (sel) {
                var inp = this.doc.createElement('input'),
                    submit = sel.nextElementSibling;

                inp.type = 'text';
                inp.setAttribute('style', 'width: 130px;');
                sel.parentNode.insertBefore(inp, submit);

                var i;
                inp.addEventListener('input', function () {
                    for (i = 0; i < sel.options.length; i++) {
                        if (sel.options[i].innerHTML.toLowerCase().
                                indexOf(inp.value.toLowerCase()) !== -1) {
                            sel.options[i].selected = true;
                            break;
                        }
                    }
                }, false);

                inp.addEventListener('keypress', function (e) {
                    var ev = e || this.root.event,
                        key = ev.keyCode;

                    if (key === 13 || key === 10) {
                        submit.click();
                    }
                }, false);
            }
        }
    };

    new FindSyndUser().init();

}());

