// ==UserScript==
// @name            ScanKarma
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     При изменении Вашей кармы выводит сообщение на странице информации персонажа.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanKarma/scanKarma.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ScanKarma/scanKarma.user.js
// @include         http://www.ganjawars.ru/info.php?id=*
// @grant           none
// @license         MIT
// @version         2.00-081015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, devel: true, regexp: true */

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
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'ScanKarma:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            if (/\?id=(\d+)/.exec(general.loc)[1] === general.myID) {
                var nowKarma = /Карма:\s\d+\.?\d*\s\((\d+\/\d+)\)/i.
                        exec(general.doc.body.textContent);

                if (nowKarma) {
                    nowKarma = nowKarma[1];
                    if (!general.getData()) {
                        general.setData(nowKarma);
                        return;
                    }

                    var oldKarma = general.getData()[0];
                    if (nowKarma === oldKarma) {
                        return;
                    }

                    general.setData(nowKarma);

                    oldKarma = oldKarma.split('/');
                    oldKarma[0] = +oldKarma[0];
                    oldKarma[1] = +oldKarma[1];

                    nowKarma = nowKarma.split('/');
                    nowKarma[0] = +nowKarma[0];
                    nowKarma[1] = +nowKarma[1];

                    var str = 'Ваша карма была изменена \n\n';
                    if (nowKarma[0] > oldKarma[0]) {
                        str += 'Отрицательная карма увеличилась на ' +
                            (nowKarma[0] - oldKarma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + nowKarma[0] + ')\n';
                    } else if (nowKarma[0] < oldKarma[0]) {
                        str += 'Отрицательная карма уменьшилась на ' +
                            (oldKarma[0] - nowKarma[0]) + ' (' + oldKarma[0] +
                            ' ---> ' + nowKarma[0] + ')\n';
                    }

                    if (nowKarma[1] > oldKarma[1]) {
                        str += 'Положительная карма увеличилась на ' +
                            (nowKarma[1] - oldKarma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + nowKarma[1] + ')';
                    } else if (nowKarma[1] < oldKarma[1]) {
                        str += 'Положительная карма уменьшилась на ' +
                            (oldKarma[1] - nowKarma[1]) +  ' (' + oldKarma[1] +
                            ' ---> ' + nowKarma[1] + ')';
                    }

                    alert(str);
                }
            }
        };
    };

    new ScanKarma().init();

}());

