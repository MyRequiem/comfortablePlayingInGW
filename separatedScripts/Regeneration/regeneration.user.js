// ==UserScript==
// @name            Regeneration
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Таймер выздоровления персонажа на главной странице.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/Regeneration/regeneration.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/Regeneration/regeneration.user.js
// @include         http://www.ganjawars.ru/me/*
// @grant           none
// @license         MIT
// @version         2.31-051216
// @author          W_or_M (редакция MyRequiem)
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, devel: true, nomen: true
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
         * @property st
         * @type {Object}
         */
        this.st = this.root.localStorage;
        /**
         * @property STORAGENAME
         * @type {String}
         */
        this.STORAGENAME = 'regeneration';
        /**
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/imgs/';
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
         * @param   {String} data
         */
        setData: function (data) {
            this.st.setItem(this.STORAGENAME, data);
        },

        /**
         * @method getData
         * @return  {Array}
         */
        getData: function () {
            var stData = this.st.getItem(this.STORAGENAME);
            if (stData) {
                return stData;
            }

            stData = '0';
            this.setData(stData);
            return stData;
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
     * @class Regeneration
     * @constructor
     */
    var Regeneration = function () {
        /**
         * @property currentHp
         * @type {int}
         */
        this.currentHp = 0;
        /**
         * @property maxHp
         * @type {int}
         */
        this.maxHp = 0;
        /**
         * @property speedHpRecovery
         * @type {int}
         */
        this.speedHpRecovery = 0;
        /**
         * @property sounds
         * @type {Array}
         */
        this.sounds = [29, 30];
        /**
         * @property spanHP
         * @type {HTMLElement|null}
         */
        this.spanHP = null;
        /**
         * @property progressBar
         * @type {HTMLDivElement|null}
         */
        this.progressBar = null;
        /**
         * @property pbWidth
         * @type {int}
         */
        this.pbWidth = 230;
        /**
         * @property pbHeight
         * @type {int}
         */
        this.pbHeight = 4;

        /**
         * @method playSound
         * @param   {int}   sound
         */
        this.playSound = function (sound) {
            var fl = general.$('_flashcontent');
            if (!fl) {
                fl = general.doc.createElement('div');
                fl.id = '_flashcontent';
                general.doc.body.appendChild(fl);
            }

            fl.innerHTML = '<embed ' +
                'flashvars="soundPath=http://www.ganjawars.ru/sounds/' + sound +
                '.mp3" allowscriptaccess="always" quality="high" height="1" ' +
                'width="1" src="http://images.ganjawars.ru/i/play.swf" ' +
                'type="application/x-shockwave-flash" pluginspage=' +
                '"http://www.macromedia.com/go/getflashplayer" />';
        };

        /**
         * @method formatTime
         * @param   {int}   sec
         * @return  {String}
         */
        this.formatTime = function (sec) {
            var str = '';
            if (sec >= 3600) {
                var h = Math.floor(sec / 3600);
                str += '0' + h + ':';
                sec -= h * 3600;
            }

            var m = Math.floor(sec / 60);
            str += m ? (m < 10 ? '0' + m : m) : '00';
            str += ':';
            sec -= m * 60;

            str += sec < 10 ? '0' + sec : sec;
            return str;
        };

        /**
         * @method hpupdate
         * @param   {Boolean}   first
         */
        this.hpupdate = function (first) {
            if (!first) {
                this.currentHp += this.speedHpRecovery;
            }

            if (this.currentHp > this.maxHp) {
                this.currentHp = this.maxHp;
            }

            // текущее HP в процентах
            var hpPercent = Math.floor((this.currentHp * 100) / this.maxHp);
            this.spanHP.innerHTML = '[' + hpPercent + '%]';

            // прогресс бар
            if (hpPercent >= 100) {
                this.progressBar.parentNode.style.display = 'none';
            } else if (hpPercent < 0) {
                // если кильнули
                this.progressBar.style.width = 0;
            } else {
                this.progressBar.style.width = Math.
                        ceil(this.pbWidth * hpPercent / 100) + 1;
            }

            //паказываем время
            var sec;
            if (hpPercent < 100) {
                sec = Math.floor((this.maxHp - this.currentHp) /
                        this.speedHpRecovery);
                this.spanHP.innerHTML += ' <span ' +
                    'style="font-weight: bold; color: #008000;">[' +
                    this.formatTime(sec) + ']</span>';
            }

            if (hpPercent < 80) {
                sec = Math.floor(((this.maxHp * 0.8) - this.currentHp) /
                        this.speedHpRecovery);
                this.spanHP.innerHTML += ' <span ' +
                    'style="font-weight: bold; color: #FF0000;"> [' +
                    this.formatTime(sec)  + ']</span>';
            }

            /**
             * состояния:
             * 0 - пустое
             * 1 - получили 80%
             * 2 - получили 100%
             * 3 - получили 80%, но еще не получили 100%
             * 4 - финиш
             */
            var stData = general.getData();

            if (hpPercent < 100 && hpPercent >= 80 && stData === '0') {
                general.setData('1');
            }

            if (hpPercent === 100 && stData === '3') {
                general.setData('2');
            }

            if (stData === '1') {
                this.playSound(this.sounds[0]);
                general.setData('3');
            } else if (stData === '2') {
                this.playSound(this.sounds[1]);
                general.setData('4');
            } else if ((stData === '3' || stData === '4') && hpPercent < 100) {
                stData = hpPercent < 80 ? '0' : '3';
                general.setData(stData);
            }

            var _this = this;
            if (stData !== '4') {
                general.root.setTimeout(function () {
                    _this.hpupdate(false);
                }, 1000);
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'Рекомендуется скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'Regeneration:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            var target = general.doc.querySelector('div#hpdiv');
            if (target) {
                var divHealth = general.doc.createElement('div');
                divHealth.setAttribute('style', 'color: #0000FF;');
                divHealth.innerHTML = '&nbsp;» ' +
                    '<span style="font-weight: bold;">Выздоровление:</span> ' +
                    '<span id="regenHpPercent"></span>' +
                    '<div style="width: 230px; border: 1px #BBCCBB solid; ' +
                            'margin: 2px 0 3px 3px; box-shadow: 1px 1px 3px ' +
                            'rgba(122,122,122,0.5);">' +
                        '<div id="progressBar" style="width: ' + this.pbWidth +
                            'px; height: ' + this.pbHeight + '; ' +
                            'background-image: url(' + general.imgPath +
                            'Regeneration/line.png);">' +
                        '</div>' +
                    '</div>';

                target = target.nextElementSibling;
                target.parentNode.insertBefore(divHealth, target.nextSibling);

                this.spanHP = general.$('regenHpPercent');
                this.progressBar = general.$('progressBar');

                /** @namespace general.root.hp_start_h */
                this.currentHp = +general.root.hp_start_h;
                /** @namespace general.root.hp_max_h */
                this.maxHp = +general.root.hp_max_h;
                /** @namespace general.root.hp_speed_h */
                this.speedHpRecovery = parseFloat(general.root.hp_speed_h);

                this.hpupdate(true);
            }
        };
    };

    new Regeneration().init();

}());
