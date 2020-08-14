// ==UserScript==
// @name            SoundSyndBattle
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Динамический счетчик времени до начала синдикатного боя, звуковое оповещение.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SoundSyndBattle/soundSyndBattle.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SoundSyndBattle/soundSyndBattle.user.js
// @include         https://*gwars.ru/*
// @grant           none
// @license         MIT
// @version         2.21-140820
// @author          MyRequiem [https://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, devel: true,
    regexp: true
*/

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
            if (sound && sound !== '0') {
                var audio = general.$('cpingw_audio');
                if (!audio) {
                    audio = general.doc.createElement('audio');
                    audio.setAttribute('id', 'cpingw_audio');
                    var divAudio = general.doc.createElement('div');
                    divAudio.setAttribute('style', 'display: none;');
                    divAudio.appendChild(audio);
                    general.doc.body.appendChild(divAudio);
                }

                audio.volume = 0.3;
                audio.src = 'https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/sounds/' + sound + '.ogg';
                // noinspection JSIgnoredPromiseFromCall
                audio.play();
            }
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
                replace(/\d+:\d+/, m + ':' + s);

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
            if (!general.doc.querySelector('a[href*="/me.php"]' +
                        '[title^="Наличность"]')) {
                return;
            }

            this.redLink = general.doc.
                    querySelector('a[style*="color:#ff0000;"]' +
                        '[title^="Ваш синдикат в нападении"]');

            if (!this.redLink) {
                general.setData('');
                return;
            }

            // для нового оформления игры
            if (/\[(\d+):(\d+)\]/.
                    test(this.redLink.nextElementSibling.innerHTML)) {
                this.redLink = this.redLink.nextElementSibling;
            }

            var time = /\[(\d+):(\d+)\]/.exec(this.redLink.innerHTML);
            if (time && timeLimit > 14) {
                // noinspection JSRemoveUnnecessaryParentheses
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

