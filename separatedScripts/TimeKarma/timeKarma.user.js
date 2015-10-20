// ==UserScript==
// @name            TimeKarma
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На странице информации персонажа показывает динамический счетчик времени до возможности поставить карму.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeKarma/timeKarma.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/TimeKarma/timeKarma.user.js
// @include         http://www.ganjawars.ru/info.php?id=*
// @include         http://www.ganjawars.ru/info.vote.php?id=*
// @grant           none
// @license         MIT
// @version         2.01-201015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, plusplus: true
    nomen: true
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
        /**
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'timeKarma';
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
         * @return  {String}
         */
        getData: function () {
            return this.st.getItem(this.STORAGENAME) || '';
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
     * @class TimeKarma
     * @constructor
     */
    var TimeKarma = function () {
        /**
         * @method formatTime
         * @param   {int}   sec
         */
        this.formatTime = function (sec) {
            var m = Math.floor(sec / 60),
                s = sec % 60;

            if (!m && !s) {
                general.$('spanKarmaTimer').innerHTML = '&nbsp';
                general.setData('');
                return;
            }

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            general.$('karmaTimer').innerHTML = m + ':' + s;

            var _this = this;
            general.root.setTimeout(function () {
                _this.formatTime(sec - 1);
            }, 1000);
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'TimeKarma:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            // поставили карму, запоминаем время
            if (/vote/.test(general.loc) &&
                    (/Спасибо, Ваше мнение учтено/.
                        test(general.doc.body.innerHTML))) {
                general.setData(new Date().getTime().toString());
                return;
            }

            var time = +general.getData();
            if (time) {
                var difference = new Date().getTime() - time;
                if (general.doc.querySelector('a[href*="/info.vote.php?id="]' +
                        '[title^="Отправить Ваш голос"]') ||
                            difference > 1800000) {
                    general.setData('');
                    return;
                }

                var span = general.doc.createElement('span');
                span.setAttribute('id', 'spanKarmaTimer');
                span.setAttribute('style', 'margin-left: 5px; color: #07A703;');
                span.innerHTML = '» Вы сможете выставить карму через ' +
                    '<span id="karmaTimer" style="color: #056802"></span>';

                var target = general.doc.
                        querySelector('td[colspan="3"]>table[width="100%"]'),
                    prnt = target.parentNode;

                prnt.removeChild(target.nextElementSibling);
                prnt.insertBefore(span, target.nextElementSibling);
                this.formatTime(+((1800000 - difference) / 1000).toFixed(0));
            }
        };
    };

    new TimeKarma().init();

}());

