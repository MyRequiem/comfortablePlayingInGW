// ==UserScript==
// @name            ImgPokemonsOnBattle
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В боях с покемонами и в режиме наблюдения за боем (Ejection Point, Overlord Point, прибрежная зона) показывает изображения для каждого пока.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ImgPokemonsOnBattle/imgPokemonsOnBattle.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ImgPokemonsOnBattle/imgPokemonsOnBattle.user.js
// @include         https://*gwars.ru/b0/*
// @include         https://*gwars.ru/warlog.php*
// @grant           none
// @license         MIT
// @version         2.21-140820
// @author          MyRequiem, идея Buger_man
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
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
         * @property viewMode
         * @type {Boolean}
         */
        this.viewMode = /\/warlog\.php/.test(this.loc);
        /**
         * @property nojs
         * @type {Boolean}
         */
        this.nojs = /\/b0\/b\.php/.test(this.loc);
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
     * @class GetPos
     * @constructor
     */
    var GetPos = function () {
        /**
         * @method init
         * @param   {Object}    obj
         * @return  {Object}
         */
        this.init = function (obj) {
            var _obj = obj,
                x = 0,
                y = 0;

            while (_obj) {
                x += _obj.offsetLeft;
                y += _obj.offsetTop;
                _obj = _obj.offsetParent;
            }

            return {x: x, y: y};
        };
    };

    /**
     * @class ImgPokemonsOnBattle
     * @constructor
     */
    var ImgPokemonsOnBattle = function () {
        /**
         * @method deleteImagePoks
         */
        this.deleteImagePoks = function () {
            var divs = general.doc.querySelectorAll('div[name="imagepokemon"]'),
                i;

            for (i = 0; i < divs.length; i++) {
                divs[i].parentNode.removeChild(divs[i]);
            }
        };

        /**
         * @method showImagePoks
         */
        this.showImagePoks = function () {
            var enemies = general.doc.
                    querySelectorAll('div[style*="font-size:8pt;"]>' +
                        'span[class="battletags"]+b'),
                getPos = new GetPos().init,
                imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
                    'comfortablePlayingInGW/master/imgs/ImgPokemonsOnBattle/',
                name,
                size,
                txt,
                pos,
                div,
                i;

            for (i = 0; i < enemies.length; i++) {
                txt = enemies[i].innerHTML;
                name = null;
                if (txt === 'Боец ОМОН') {
                    name = 'omon';
                    size = [50, 60];
                } else if (/\s\[NPC\]$/.test(txt)) {
                    name = 'personalnpc';
                    size = [30, 30];
                } else if (/(^[^\s]+)\s\[/.test(txt)) {
                    name = /(^[^\s]+)\s\[/.exec(txt)[1];
                    size = [70, 80];
                }

                if (name) {
                    pos = getPos(enemies[i].parentNode);
                    div = general.doc.createElement('div');
                    general.doc.body.appendChild(div);
                    div.setAttribute('style', 'position: absolute;');
                    div.setAttribute('name', 'imagepokemon');
                    div.style.left = String(pos.x > 200 ?
                            pos.x - size[0] - 5 : pos.x + 140);
                    div.style.top = String(pos.y);
                    div.innerHTML = '<img src="' + imgPath + name + '.png" ' +
                        'style="width: ' + size[0] + 'px; height: ' + size[1] +
                        'px;" title="' + name + '" alt="' + name + '" />';
                }
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            this.showImagePoks();

            // JS-версия боя
            if (!general.viewMode && !general.nojs) {
                var _this = this;
                general.root.setInterval(function () {
                    _this.deleteImagePoks();
                    _this.showImagePoks();
                }, 1000);
            }
        };
    };

    new ImgPokemonsOnBattle().init();

}());

