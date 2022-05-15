// ==UserScript==
// @name            PortsSyndLinks
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах списков ближайших/прошедших боев за порты добавляет знаки синдикатов, являющиеся ссылками на их онлайн.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsSyndLinks/portsSyndLinks.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsSyndLinks/portsSyndLinks.user.js
// @include         https://*gwars*/object.php?id=*
// @grant           none
// @license         MIT
// @version         1.08-140522
// @author          MyRequiem [https://www.gwars.io/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, regexp: true */

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
     * @class PortsSyndLinks
     * @constructor
     */
    var PortsSyndLinks = function () {
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
         * @property domain
         * @type {String}
         */
        this.domain = this.doc.domain;
    };

    /**
     * @lends PortsSyndLinks.prototype
     */
    PortsSyndLinks.prototype = {
        /**
         * @method getRoot
         * @return  {Object}
         */
        getRoot: function () {
            var rt = typeof unsafeWindow;
            return rt !== 'undefined' ? unsafeWindow : window;
        },

        /**
         * @method init
         */
        init: function () {
            var table = this.doc.querySelector('td>table.simplewhitebg');

            if (table) {
                var syndLinks = table.querySelectorAll('a[href*="&page="]'),
                    link,
                    sign,
                    reg,
                    i;

                for (i = 0; i < syndLinks.length; i++) {
                    link = syndLinks[i];
                    reg = /&sid=(\d+)$/.exec(link.href);

                    if (reg) {
                        sign = this.doc.createElement('a');
                        sign.setAttribute('href', 'https://' + this.domain +
                            '/syndicate.php?id=' + reg[1] + '&page=online');
                        sign.setAttribute('target', '_blank');
                        sign.setAttribute('style', 'margin-right: 2px;');
                        sign.innerHTML = '<img src="https://images.' +
                            this.domain.replace('www.', '') +
                            '/img/synds/' + reg[1] + '.gif" width="20" ' +
                            'height="14" border="0" alt="img" />';

                        link.parentNode.insertBefore(sign, link);
                    }
                }
            }
        }
    };

    new PortsSyndLinks().init();

}());

