// ==UserScript==
// @name            NotGiveCannabisLeaf
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах игры заменяет логотип "звезда" на зеленый листик.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotGiveCannabisLeaf/notGiveCannabisLeaf.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotGiveCannabisLeaf/notGiveCannabisLeaf.user.js
// @include         https://*gwars.ru*
// @include         https://*ganjafoto.ru*
// @include         http*://*ganjafile.ru*
// @grant           none
// @license         MIT
// @version         2.18-140820
// @author          MyRequiem [https://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true */

/*eslint-env browser */
/*eslint indent: ['error', 4], linebreak-style: ['error', 'unix'],
    quotes: ['error', 'single'], semi: ['error', 'always'],
    eqeqeq: 'error', curly: 'error'
*/

/*jscs:disable requireMultipleVarDecl, requireVarDeclFirst */
/*jscs:disable disallowKeywords, disallowDanglingUnderscores */
/*jscs:disable validateIndentation */

(function () {
    'use strict';

    /**
     * @class NotGiveCannabisLeaf
     * @constructor
     */
    var NotGiveCannabisLeaf = function () {
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
         * @property imgPath
         * @type {String}
         */
        this.imgPath = 'https://raw.githubusercontent.com/MyRequiem/' +
            'comfortablePlayingInGW/master/imgs/NotGiveCannabisLeaf/';
    };

    /**
     * @lends NotGiveCannabisLeaf.prototype
     */
    NotGiveCannabisLeaf.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method  changeFavicon
         */
        changeFavicon: function () {
            var head = this.doc.querySelector('head');

            if (head) {
                var linkTags = head.querySelectorAll('link[rel*="icon"]'),
                    i;

                for (i = 0; i < linkTags.length; i++) {
                    head.removeChild(linkTags[i]);
                }

                var link = this.doc.createElement('link');
                link.setAttribute('type', 'image/x-icon');
                link.setAttribute('rel', 'shortcut icon');
                link.setAttribute('href', this.imgPath + 'favicon.ico');
                head.appendChild(link);
            }
        },

        /**
         * @method  changeIcons
         */
        changeIcons: function () {
            var imgOn = this.imgPath + 'on.gif',
                imgOff = this.imgPath + 'off.gif',
                imgs = this.doc.querySelectorAll('img'),
                src,
                i;

            for (i = 0; i < imgs.length; i++) {
                src = imgs[i].getAttribute('src');
                if (/\/i\/gon\.gif|\/info\.online\.php\?id=/.test(src)) {
                    imgs[i].setAttribute('src', imgOn);
                } else if (/\/i\/goff\.gif/.test(src)) {
                    imgs[i].setAttribute('src', imgOff);
                }
            }
        },

        /**
         * @method init
         */
        init: function () {
            this.changeFavicon();
            if (!/\/news\.php\?set=1/.test(this.root.location.href)) {
                this.changeIcons();
            }
        }
    };

    new NotGiveCannabisLeaf().init();

}());

