// ==UserScript==
// @name            MinBetAtRoulette
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Показывает числа, на которые поставлено меньше всего Гб в данный момент на странице рулетки. Количество выводимых чисел определяется пользователем.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/MinBetAtRoulette/minBetAtRoulette.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/MinBetAtRoulette/minBetAtRoulette.user.js
// @include         http://www.ganjawars.ru/roulette.php
// @grant           none
// @license         MIT
// @version         2.02-121216
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, plusplus: true,
    devel: true
*/

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
     * @class AjaxQuery
     * @constructor
     */
    var AjaxQuery = function () {
        /**
         * @method init
         * @param   {String}    url
         * @param   {Function}  onsuccess
         * @param   {Function}  onfailure
         */
        this.init = function (url, onsuccess, onfailure) {
            var xmlHttpRequest = new XMLHttpRequest();

            if (!xmlHttpRequest) {
                general.root.console.log('Error create xmlHttpRequest !!!');
                return;
            }

            xmlHttpRequest.open('GET', url, true);
            xmlHttpRequest.send(null);

            var timeout = general.root.setTimeout(function () {
                xmlHttpRequest.abort();
            }, 10000);

            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState === 4) {
                    clearTimeout(timeout);
                    if (xmlHttpRequest.status === 200) {
                        onsuccess(xmlHttpRequest);
                    } else {
                        onfailure();
                    }
                }
            };
        };
    };

    /**
     * @class MinBetAtRoulette
     * @constructor
     */
    var MinBetAtRoulette = function () {
        /**
         * @method calculateBets
         */
        this.calculateBets = function () {
            var url = 'http://www.ganjawars.ru/rouinfo.php?id=0',
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span'),
                    divRez = general.$('resultBets');

                spanContent.innerHTML = xml.responseText;

                //если нет ни одной ставки
                if (/Доход казино: <b>0\$<\/b>/.test(spanContent.innerHTML)) {
                    divRez.innerHTML = '<span style="color: #FF0000;">' +
                        'Ставок пока нет</span>';
                    return;
                }

                var trs = spanContent.querySelector('center+table+br+' +
                        'center+table[border="0"][cellpadding="5"]' +
                        '[cellspacing="1"][align="center"]').
                            querySelectorAll('tr'),
                    bets = [],
                    i;

                for (i = 0; i < 36; i++) {
                    bets[i] = [i, 0];
                }

                var num, rate;
                for (i = 0; i < trs.length; i++) {
                    num = /Число (\d+)/.exec(trs[i].innerHTML);
                    if (num) {
                        num = +num[1];
                        rate = +trs[i].firstElementChild.innerHTML.
                            replace(/\$/, '').replace(/,/g, '');
                        bets[num - 1][1] += rate;
                    }
                }

                bets.sort(function (a, b) {
                    var rez;

                    if (a[1] > b[1]) {
                        rez = 1;
                    } else if (a[1] < b[1]) {
                        rez = -1;
                    } else {
                        rez = 0;
                    }

                    return rez;
                });

                var str = '<table style="border: #339933 solid 1px; ' +
                    'width: 100%"><tr style="font-weight: bold; ' +
                    'text-align: center;"><td>Число</td><td>Ставка</td></tr>',
                    count = +general.$('inptext').value,
                    j;

                for (i = 0, j = 0; i < 36; i++) {
                    if (j === count) {
                        break;
                    }

                    if (general.$('chknull').checked || bets[i][1]) {
                        str += '<tr style="text-align: center;">' +
                            '<td style="color: #0000FF;">' + (bets[i][0] + 1) +
                            '</td><td style="color: #FF0000;">$' + bets[i][1] +
                            '</td></tr>';

                        j++;
                    }
                }

                divRez.innerHTML = str + '</table>';
            }, function () {
                general.root.setTimeout(function () {
                    _this.calculateBets();
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('table+br+' +
                    'table[width="100%"][cellspacing="0"][cellpadding="0"]');

            target = target ? target.
                querySelector('td[valign="top"]+td') : false;

            if (target) {
                target.innerHTML += '<div style="background: #D0EED0; ' +
                    'margin-top: 5px; padding: 5px; text-align: center;">' +
                    '<span style="color: #0000FF">Показать минимальные ставки' +
                    '</span><br>Вывести <input type="text" id="inptext" ' +
                    'value="5" maxlength="2" style="width: 30px"> чисел ' +
                    '<input type="button" id="butb" value=">>" /><br>' +
                    '<input type=checkbox id="chknull" checked /> ' +
                    '<label for="chknull">Числа, на которые еще не ставили' +
                    '</label></div><div id="resultBets" style="visibility: ' +
                    'hidden; text-align: center; background-color:#D0EED0; ' +
                    'padding: 5px;"></div>';

                var _this = this;
                general.$('butb').addEventListener('click', function () {
                    var count = +general.$('inptext').value;
                    if (isNaN(count) || (count < 1)  || (count > 36)) {
                        alert('Введите число от 1 до 36');
                        return;
                    }

                    var divb = general.$('resultBets');
                    divb.style.visibility = 'visible';
                    divb.innerHTML = '<img src="' + general.imgPath +
                        'preloader.gif" />';

                    _this.calculateBets();
                }, false);

                general.$('inptext').addEventListener('keypress', function (e) {
                    var ev = e || general.root.event;
                    if (ev.keyCode === 13) {
                        general.$('butb').click();
                    }
                }, false);
            }
        };
    };

    new MinBetAtRoulette().init();

}());

