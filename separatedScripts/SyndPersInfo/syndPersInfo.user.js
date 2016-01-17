// ==UserScript==
// @name            SyndPersInfo
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     На страницах онлайна и состава синдиката выводит остров, боевой и синдикатный уровни бойцов, процент выздоровления.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndPersInfo/syndPersInfo.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndPersInfo/syndPersInfo.user.js
// @include         http://www.ganjawars.ru/syndicate.php?id=*
// @grant           none
// @license         MIT
// @version         2.01-170116
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow: true */

/*jslint
    browser: true, passfail: true, vars: true, nomen: true, plusplus: true
    regexp: true
*/

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
     * @class SyndPersInfo
     * @constructor
     */
    var SyndPersInfo = function () {
        /**
         * @property trs
         * @type {Array|null}
         */
        this.trs = null;

        /**
         * @method nextPers
         * @param   {int}       ind
         * @param   {Boolean}   timeout
         */
        this.nextPers = function (ind, timeout) {
            var tm = timeout ? 1500 : 0,
                _this = this;

            if (this.trs[ind + 1]) {
                general.root.setTimeout(function () {
                    _this.getPersInfo(ind + 1);
                }, tm);
            }
        };

        /**
         * @method getPersInfo
         * @param   {int}   ind
         */
        this.getPersInfo = function (ind) {
            var persLink = this.trs[ind].
                    querySelector('a[href*="/info.php?id="]');

            if (!persLink) {
                this.nextPers(ind, false);
                return;
            }

            var target = this.trs[ind].querySelectorAll('td')[4],
                _this = this;

            target.innerHTML = '';
            new AjaxQuery().init(persLink.href, function (xml) {
                var str = xml.responseText;
                if (/Технический персонаж<\/font> \d+ \(\d+\)/.
                        test(str)) {
                    target.innerHTML = '[Тех]';
                    _this.nextPers(ind, true);
                    return;
                }

                var area = /Район:<\/b> <a[^>]+>(\[(Z|G|P|S)\])/.exec(str);
                area = area ? area[1] : '[Аут]';

                var lvlF = /Боевой:.+<font color="?#99000"?><b>(\d+)/.
                        exec(str)[1];
                lvlF = ' <span style="color: #FF0000;">[' +
                    (+lvlF < 10 ? '0' + lvlF : lvlF) + ']</span> ';

                var lvlS = /<b>Основной синдикат:<\/b> #\d+[^\[]+\[\s?<b>(\d+)/.
                        exec(str);
                lvlS = '<span style="color: #0000FF;">[' +
                    (!lvlS ? 'Без основы' : (+lvlS[1] < 10 ?
                             '0' + lvlS[1] : lvlS[1])) + ']</span> ';

                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = str;

                var hp = spanContent.querySelector('#namespan') ||
                        spanContent.querySelector('span[style="padding-left:' +
                            '10px;padding-right:13px;"]');

                hp = /\[(-?)(\d+)\s\/\s(\d+)\]/.exec(hp.nextSibling.nodeValue);
                hp = hp[1] ? '<span style="color: #FF0000;">[Кильнули]</span>' :
                        '[' + Math.round(+hp[2] * 100 / +hp[3]) + '%]';

                target.innerHTML = area + lvlF + lvlS + hp;
                _this.nextPers(ind, true);
            }, function () {
                general.root.setTimeout(function () {
                    _this.getPersInfo(ind);
                }, 1000);
            });
        };

        /**
         * @method init
         */
        this.init = function () {
            if (/&page=online$|&page=members$/.test(general.loc)) {
                this.trs = general.doc.querySelector('br+center+br+table').
                        querySelectorAll('tr');

                if (this.trs.length > 1) {
                    var link = general.doc.createElement('a');
                    link.setAttribute('style', 'cursor: pointer; ' +
                            'text-decoration: underline;');
                    link.innerHTML = 'Инфо';
                    var target = general.doc.querySelector('br+center>' +
                            'a[style*="bold;"]').nextElementSibling;
                    target.parentNode.insertBefore(link, target);
                    target.parentNode.
                        insertBefore(general.doc.createTextNode(' | '), target);

                    var _this = this;
                    link.addEventListener('click', function () {
                        _this.getPersInfo(1);
                    }, false);
                }
            }
        };
    };

    new SyndPersInfo().init();

}());

