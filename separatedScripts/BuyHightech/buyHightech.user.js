// ==UserScript==
// @name            BuyHightech
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     В HighTech магазине добавляет ссылки "Продать" и "Купить" для каждого предмета. При клике открывается страница с формой подачи объявления для данного предмета.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BuyHightech/buyHightech.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/BuyHightech/buyHightech.user.js
// @include         http://www.ganjawars.ru/shopc.php*
// @include         http://www.ganjawars.ru/market-p.php?stage=2&item_id=*
// @grant           none
// @license         MIT
// @version         2.02-150118
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
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
     * @class BuyHightech
     * @constructor
     */
    var BuyHightech = function () {
        /**
         * @method init
         */
        this.init = function () {
            if (/\/shopc\.php/.test(general.loc)) {
                var descrTd = general.doc.querySelectorAll('td[class$=' +
                         '"lightbg"][valign="top"][align="left"]' +
                             '[width="100%"]'),
                    strength,
                    price,
                    id,
                    i;

                for (i = 0; i < descrTd.length; i++) {
                    // noinspection Annotator
                    id = /id=(.+)$/.exec(descrTd[i].parentNode.
                            querySelector('a').href)[1];
                    price = /(\d+) EUN/.exec(descrTd[i].innerHTML)[1];
                    strength = /Прочность:<\/b> (\d+)/i.
                                    exec(descrTd[i].innerHTML)[1];

                    descrTd[i].removeChild(descrTd[i].lastElementChild);
                    descrTd[i].innerHTML += ' <span style="font-weight: ' +
                        'bold; margin-left: 7px;"> Создать объявление: ' +
                        '</span><a target="_blank" style="color: #0000FF;" ' +
                        'href="http://www.ganjawars.ru/market-p.php?' +
                        'stage=2&item_id=' + id + '&action_id=2&p=' + price +
                        '&s=' + strength + '">[Купить]' + '</a> ' +
                        '<a target="_blank" style="color: #990000;" href=' +
                        '"http://www.ganjawars.ru/market-p.php?' +
                        'stage=2&item_id=' + id + '&action_id=1&p=' + price +
                        '&s=' + strength + '">[Продать]</a>';
                }

                return;
            }

            //на странице подачи объявлений
            var param = /&p=(\d+)&s=(\d+)$/.exec(general.loc);
            if (param) {
                general.doc.querySelector('td[colspan="3"][class="wb"]').
                    innerHTML += ' <span style="color: #990000;">' +
                    '[Стоимость в магазине: ' + param[1] + ' EUN]</span>';

                //остров любой
                general.doc.querySelector('select[name="island"]').value = '-1';

                var dur1 = general.doc.
                            querySelector('input[name="durability1"]'),
                    dur2 = general.doc.
                            querySelector('input[name="durability2"]');

                //если продаем, то прочность максимальная,
                //если покупаем, то минимальная
                if (/action_id=1/.test(general.loc)) {
                    dur1.value = param[2];
                    dur2.value = param[2];
                } else {
                    dur1.value = '0';
                    dur2.value = '1';
                }

                // срок размещения 3 дня
                general.doc.
                    querySelector('select[name="date_len"]').value = '3';
            }
        };
    };

    new BuyHightech().init();

}());

