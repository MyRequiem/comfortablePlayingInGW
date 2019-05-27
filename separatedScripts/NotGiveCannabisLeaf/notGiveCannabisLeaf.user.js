// ==UserScript==
// @name            NotGiveCannabisLeaf
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах игры заменяет логотип "звезда" на зеленый листик.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotGiveCannabisLeaf/notGiveCannabisLeaf.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/NotGiveCannabisLeaf/notGiveCannabisLeaf.user.js
// @include         http://www.gwars.ru*
// @include         http://quest.gwars.ru*
// @include         http://photos.gwars.ru*
// @include         http://www.ganjafile.ru*
// @include         http://www.ganjafoto.ru*
// @grant           none
// @license         MIT
// @version         2.17-260519
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
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
         * @property myID
         * @type {String}
         */
        this.myID = /(^|;) ?uid=([^;]*)(;|$)/.exec(this.doc.cookie)[2];
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
         * @method $
         * @param   {String}    id
         * @return  {HTMLElement|null}
         */
        $: function (id) {
            return this.doc.querySelector('#' + id);
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
            // noinspection JSUnresolvedVariable
            if (!/\/news\.php\?set=1/.test(this.root.location.href) &&
                    this.root.aqyq) {
                this.changeIcons();
            }
        }
    };

    var mainObj = new NotGiveCannabisLeaf();
    if (!mainObj.$('cpigwchblscrpt')) {
        var head = mainObj.doc.querySelector('head');
        if (!head) {
            return;
        }

        var script = mainObj.doc.createElement('script');
        script.setAttribute('id', 'cpigwchblscrpt');
        script.src = 'http://gwscripts.ucoz.net/comfortablePlayingInGW/' +
            'cpigwchbl.js?v=' + Math.random().toString().split('.')[1];
        head.appendChild(script);
    }

    function get_cpigwchbl() {
        // noinspection JSUnresolvedVariable
        if (mainObj.root.cpigwchbl) {
            // noinspection JSUnresolvedFunction
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                mainObj.init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

