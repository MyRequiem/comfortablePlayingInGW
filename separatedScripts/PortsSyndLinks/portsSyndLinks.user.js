// ==UserScript==
// @name            PortsSyndLinks
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах списков ближайших/прошедших боев за порты добавляет знаки синдикатов, являющиеся ссылками на их онлайн.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsSyndLinks/portsSyndLinks.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PortsSyndLinks/portsSyndLinks.user.js
// @include         http://www.gwars.ru/object.php?id=*
// @grant           none
// @license         MIT
// @version         1.00-031118
// @author          MyRequiem [http://www.gwars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true */

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
            if (!/&page=(oncoming|complete)/.test(this.loc)) {
                return;
            }

            var css = 'td>table[cellspacing="1"][cellpadding="5"]' +
                    '[width="100%"]',
                table = this.doc.querySelector(css);

            if (table) {
                var syndLinks = table.querySelectorAll('a[href*="&page="]'),
                    syndId,
                    link,
                    sign,
                    i;

                for (i = 0; i < syndLinks.length; i++) {
                    link = syndLinks[i];
                    syndId = /&sid=(\d+)$/.exec(link.href)[1];

                    sign = this.doc.createElement('a');
                    sign.setAttribute('target', '_blank');
                    sign.setAttribute('style', 'margin-right: 2px;');
                    sign.href = 'http://www.gwars.ru/syndicate.php?id=' +
                        syndId + '&page=online';
                    sign.innerHTML = '<img src="http://images.gwars.ru/img/' +
                        'synds/' + syndId + '.gif" width="20" height="14" ' +
                        'border="0" />';

                    link.parentNode.insertBefore(sign, link);
                }
            }
        }
    };

    new PortsSyndLinks().init();

}());

