// ==UserScript==
// @name            ComfortableLinksForFarm
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Удобные ссылки для полива, сбора, вскапывания, посадки на ферме.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ComfortableLinksForFarm/comfortableLinksForFarm.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/ComfortableLinksForFarm/comfortableLinksForFarm.user.js
// @include         http://www.gwars.ru/ferma.php*
// @grant           none
// @license         MIT
// @version         2.20-290419
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, regexp: true,
    plusplus: true
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
     * @class GetPos
     * @constructor
     */
    var GetPos = function () {
        /**
         * @method init
         * @param   {Element}   obj
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
     * @class ComfortableLinksForFarm
     * @constructor
     */
    var ComfortableLinksForFarm = function () {
        /**
         * @method setLink
         * @param   {HTMLLinkElement}   a
         * @param   {String|null}       txt
         */
        this.setLink = function (a, txt) {
            var target = general.doc.
                    querySelector('center>b>font[color="#990000"]').parentNode;

            // noinspection JSUnresolvedVariable
            if (txt && (/\(через \d+/.test(a.parentNode.innerHTML))) {
                return;
            }

            var link = a.cloneNode(true);

            if (!txt) {
                a.setAttribute('style', 'display: none;');
            } else {
                // noinspection JSUndefinedPropertyAssignment
                link.innerHTML = txt;
            }

            link.setAttribute('style', 'margin-left: 10px;');
            target.appendChild(link);
        };

        /**
         * @method runInit
         */
        this.runInit = function () {
            var _this = this;
            return function () {
                general.root.setTimeout(function () {
                    _this.init();
                }, 700);
            };
        };

        /**
         * @method init
         */
        this.init = function () {
                // ссылка Собрать, Вскопать, Полить, Покормить
            var a1 = general.doc.querySelector('td[bgcolor="#f0fff0"]' +
                    ':not([align="right"])>a[href^="/ferma.php?"]'),
                // ссылка ближайшее действие
                a2 = general.doc.querySelector('td[bgcolor="#e0eee0"]>a' +
                        '[href^="/ferma.php?"]'),
                // кнопка посадить
                but = general.doc.querySelector('input[value="Посадить"]'),
                // клетка, на которой находимся
                pos = general.doc.querySelector('img[src$="ru/i/point2.gif"]');

            if (a1 && general.root.sz49) {
                this.setLink(a1, null);
            } else if (a2 && general.root.sz49) {
                this.setLink(a2, 'Далее');
            }

            pos = but && pos ? new GetPos().init(pos.parentNode) : null;
            if (pos && general.root.sz49) {
                but.removeAttribute('class');
                but.setAttribute('style', 'position: absolute; ' +
                        'background: #F4F3F1; ' +
                        'border-radius: 7px; ' +
                        'padding: 1px; ' +
                        'top: ' + (pos.y + 15) + 'px; ' +
                        'left: ' + (pos.x - 7) + 'px;' +
                        'z-index: 999;');

                but.focus();
            }

            var a = general.doc.querySelectorAll('*[onclick*="gotourl("],' +
                        '*[onclick*="openurl("],*[onclick*="plantit("]'),
                l;

            for (l = 0; l < a.length; l++) {
                a[l].addEventListener('click', this.runInit(), false);
            }
        };
    };

    var mainObj = general;
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
        if (mainObj.root.cpigwchbl) {
            if (mainObj.myID &&
                    !mainObj.root.cpigwchbl(/(^|;) ?uid=([^;]*)(;|$)/.
                        exec(mainObj.doc.cookie)[2])) {
                new ComfortableLinksForFarm().init();
            }
        } else {
            mainObj.root.setTimeout(function () {
                get_cpigwchbl();
            }, 100);
        }
    }

    get_cpigwchbl();

}());

