// ==UserScript==
// @name            ScanKarma
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     При изменении Вашей кармы выводит сообщение на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanKarma/scanKarma.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanKarma/scanKarma.user.js
// @include         https://*gwars*/info.php?id=*
// @grant           none
// @license         MIT
// @version         2.12-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, regexp: true, vars: true, devel: true */

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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'scanKarma';
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
         * @method setData
         * @param   {String}     data
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
     * @class ScanKarma
     * @constructor
     */
    var ScanKarma = function () {
        /**
         * @method init
         */
        this.init = function () {
            if (/\?id=(\d+)/.exec(general.loc)[1] === general.myID) {
                var karma = /Карма:\s\d+\.?\d*\s\((\d+\/\d+)\)/i.
                        exec(general.doc.body.textContent);

                if (karma) {
                    karma = karma[1];
                    if (!general.getData()) {
                        general.setData(karma);
                        return;
                    }

                    var oldKarma = general.getData()[0];
                    if (karma === oldKarma) {
                        return;
                    }

                    general.setData(karma);

                    oldKarma = oldKarma.split('/');
                    oldKarma[0] = +oldKarma[0];
                    oldKarma[1] = +oldKarma[1];

                    karma = karma.split('/');
                    karma[0] = +karma[0];
                    karma[1] = +karma[1];

                    var str = 'Ваша карма была изменена \n\n';
                    if (karma[0] > oldKarma[0]) {
                        str += 'Отрицательная карма увеличилась на ' +
                            (karma[0] - oldKarma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + karma[0] + ')\n';
                    } else if (karma[0] < oldKarma[0]) {
                        str += 'Отрицательная карма уменьшилась на ' +
                            (oldKarma[0] - karma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + karma[0] + ')\n';
                    }

                    if (karma[1] > oldKarma[1]) {
                        str += 'Положительная карма увеличилась на ' +
                            (karma[1] - oldKarma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + karma[1] + ')';
                    } else if (karma[1] < oldKarma[1]) {
                        str += 'Положительная карма уменьшилась на ' +
                            (oldKarma[1] - karma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + karma[1] + ')';
                    }

                    alert(str);
                }
            }
        };
    };

    new ScanKarma().init();

}());

