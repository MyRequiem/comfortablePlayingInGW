// ==UserScript==
// @name            SoundSyndBattle
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Динамический счетчик времени до начала синдикатного боя, звуковое оповещение.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SoundSyndBattle/soundSyndBattle.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SoundSyndBattle/soundSyndBattle.user.js
// @include         http://www.ganjawars.ru/*
// @grant           none
// @license         MIT
// @version         2.00-221015
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */
/*jslint browser: true, passfail: true, vars: true, devel: true, nomen: true */

(function () {
    'use strict';

    // ======================= НАСТРОЙКИ ============================
    var timeLimit = 90, // осталось времени до боя в секундах (НЕ МЕНЕЕ 15 СЕК)
        // номера звуков (1 - 30), 0 - без звука
        sound1 = 14,    // звук если более timeLimit
        sound2 = 7;     // звук если менее timeLimit
    // ==================== КОНЕЦ НАСТРОЕК ==========================

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
        this.STORAGENAME = 'soundSyndBattle';
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
     * @class PlaySound
     * @constructor
     */
    var PlaySound = function () {
        /**
         * @method init
         * @param   {int|String}    sound
         */
        this.init = function (sound) {
            if (!sound || sound === '0') {
                return;
            }

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
    };

    /**
     * @class GetRandom
     * @constructor
     */
    var GetRandom = function () {
        /**
         * @method init
         * @param   {int}   a
         * @param   {int}   b
         * @return  {int}
         */
        this.init = function (a, b) {
            return Math.round(a + (b - a) * Math.random());
        };
    };

    /**
     * @class SoundSyndBattle
     * @constructor
     */
    var SoundSyndBattle = function () {
        /**
         * @property redLink
         * @type {HTMLElement|null}
         */
        this.redLink = null;

        /**
         * @method setTimer
         * @param   {int}   sec
         */
        this.setTimer = function (sec) {
            var m = Math.floor(sec / 60),
                s = sec % 60;

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            this.redLink.innerHTML = this.redLink.innerHTML.
                replace(/\d+\:\d+/, m + ':' + s);

            var _this = this;
            s = sec - 1;
            if (s > -1) {
                general.root.setTimeout(function () {
                    _this.setTimer(s);
                }, 1000);
            }
        };

        /**
         * @method syndAlert
         * @param   {String}    dataCheck
         * @param   {String}    data
         * @param   {int}       sound
         * @param   {int}       tm
         */
        this.syndAlert = function (dataCheck, data, sound, tm) {
            general.root.setTimeout(function () {
                if (general.getData() === dataCheck) {
                    general.setData(data);
                    new PlaySound().init(sound);
                }
            }, tm);
        };

        /**
         * @method init
         */
        this.init = function () {
            if (!general.st) {
                alert('Ваш браузер не поддерживает технологию localStorage.\n' +
                    'MyRequiеm рекомендует вам скачать и установить один из\n' +
                    'ниже перечисленных браузеров или удалите скрипт\n' +
                    'SoundSyndBattle:\n\nFireFox 4+\nOpera 11+\nChrome 12+');

                return;
            }

            //на login или index
            if (general.doc.querySelector('a[href*="/regform.php"]')) {
                general.setData('');
                return;
            }

            if (!general.doc.querySelector('a[href*="/me/"]' +
                        '[title^="Наличность"]')) {
                return;
            }

            this.redLink = general.doc.querySelector('a[style*="color:red;"]' +
                    '[title^="Ваш синдикат в нападении"]');

            if (!this.redLink) {
                general.setData('');
                return;
            }

            // для нового оформления игры
            if (/\[(\d+)\:(\d+)\]/.
                    test(this.redLink.nextElementSibling.innerHTML)) {
                this.redLink = this.redLink.nextElementSibling;
            }

            var time = /\[(\d+)\:(\d+)\]/.exec(this.redLink.innerHTML);
            if (time && timeLimit > 14) {
                var t = +time[1] * 60 + (+time[2]);
                this.redLink.href = '/wargroup.php?war=attacks';
                this.setTimer(t);

                var getRandom = new GetRandom().init,
                    stData = general.getData();

                if (!stData) {
                    if (t > timeLimit) {
                        this.syndAlert('', '1', sound1, getRandom(0, 3000));
                        this.syndAlert('1', '2', sound2,
                                (t - timeLimit) * 1000 + getRandom(0, 3000));
                    } else {
                        this.syndAlert('', '2', sound2, getRandom(0, 3000));
                    }
                } else if (t > timeLimit && stData === '2') {
                    this.syndAlert('2', '1', sound1, getRandom(0, 3000));
                    this.syndAlert('1', '2', sound2,
                            (t - timeLimit) * 1000 + getRandom(0, 3000));
                } else if (t <= timeLimit && stData === '1') {
                    this.syndAlert('1', '2', sound2, getRandom(0, 3000));
                }
            }
        };
    };

    new SoundSyndBattle().init();

}());

