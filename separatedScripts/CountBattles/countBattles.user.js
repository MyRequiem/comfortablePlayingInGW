// ==UserScript==
// @name            CountBattles
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Показывает общее количество боев, побед и поражений за текущие сутки на страницax протоколов боев.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CountBattles/countBattles.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/CountBattles/countBattles.user.js
// @include         http://www.ganjawars.ru/info.warstats.php?id=*
// @grant           none
// @license         MIT
// @version         2.25-100418
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, plusplus: true, nomen: true */

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
         * @param   {String}        url
         * @param   {Function}      onsuccess
         * @param   {Function}      onfailure
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
     * @class CountBattles
     * @constructor
     */
    var CountBattles = function () {
        /**
         * @property rez
         * @type {Object}
         */
        this.rez = {win: 0, draw: 0, loss: 0, btls: []};
        /**
         * @property divContainer
         * @type {HTMLDivElement|null}
         */
        this.divContainer = null;
        /**
         * @property reg
         * @type {Object|null}
         */
        this.reg = null;
        /**
         * @property persId
         * @type {String}
         */
        this.persId = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1000;

        /**
         * @method getBattles
         * @param   {Object}    obj
         * @return  {Boolean}
         */
        this.getBattles = function (obj) {
            var btlLogs = obj.querySelectorAll('nobr>a[href*=' +
                    '"/warlog.php?bid="]>font[color="green"]'),
                i;

            for (i = 0; i < btlLogs.length; i++) {
                if (this.reg.test(btlLogs[i].innerHTML)) {
                    // noinspection JSUnresolvedVariable
                    this.rez.btls.push(btlLogs[i].parentNode.parentNode.
                            nextElementSibling);
                } else {
                    return false;
                }
            }

            return !!btlLogs.length;
        };

        /**
         * @method showRezult
         */
        this.showReault = function () {
            var i, b, stl;

            for (i = 0; i < this.rez.btls.length; i++) {
                b = this.rez.btls[i].querySelector('a>b');
                if (b) {
                    // noinspection JSUnresolvedFunction
                    stl = b.parentNode.getAttribute('style');
                    if (/red/.test(stl)) {
                        this.rez.win++;
                    } else if (/blue/.test(stl)) {
                        this.rez.loss++;
                    } else {
                        this.rez.draw++;
                    }
                }
            }

            this.divContainer.innerHTML = 'Проведено боев за текущие ' +
                'сутки: <span style="font-weight: bold;">' +
                this.rez.btls.length + ' (<span style="color: #FF0000;">' +
                this.rez.win + '</span>/<span style="color: #0000FF;">' +
                this.rez.loss + '</span>/<span style="color :#008000;">' +
                this.rez.draw + '</span>)</span>';
        };

        /**
         * @method startCountBattles
         * @param   {int}   ind
         */
        this.startCountBattles = function (ind) {
            if (!ind) {
                if (this.getBattles(general.doc)) {
                    this.divContainer.innerHTML = '<span style="margin-left: ' +
                        '100px;">Загрузка <img src="' + general.imgPath +
                        'preloader.gif" alt="Загрузка" ' +
                        'title="Загрузка"></span>';
                    ind++;
                    this.startCountBattles(ind);
                } else {
                    this.showReault();
                }
            } else {
                var url = 'http://www.ganjawars.ru/info.warstats.php?id=' +
                    this.persId + '&page_id=' + ind,
                    _this = this;

                new AjaxQuery().init(url, function (xml) {
                    var span = general.doc.createElement('span');
                    span.innerHTML = xml.responseText;
                    // если перс в это время зашел в заявку/бой, то просто
                    // перезагрузим страницу
                    if (/игрок находится в бою/.test(span.innerHTML)) {
                        general.root.location.reload();
                        return;
                    }

                    if (_this.getBattles(span)) {
                        ind++;
                        general.root.setTimeout(function () {
                            _this.startCountBattles(ind);
                        }, _this.tm);
                    } else {
                        _this.showReault();
                    }
                }, function () {
                    general.root.setTimeout(function () {
                        _this.startCountBattles(ind);
                    }, _this.tm);
                });
            }
        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.querySelector('center+br+br'),
                inBattle = /игрок находится в бою/.
                    test(general.doc.body.innerHTML),
                pageId = /page_id=(\d+)/.exec(general.loc);

            // если перс НЕ в заявке/бою и мы на первой странице протоколов
            if (target && !inBattle && !(pageId && pageId[1] !== '0') &&
                    !(/\(0 всего\)/.test(general.doc.body.innerHTML))) {
                this.divContainer = general.doc.createElement('div');
                this.divContainer.setAttribute('style', 'margin-left: 10px;');
                target.parentNode.insertBefore(this.divContainer, target);

                var date = new Date(),
                    year = /20(\d+)/.exec(' ' + date.getFullYear())[1],
                    month = date.getMonth() + 1,
                    day = date.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                this.reg  = new RegExp(day + '\\.' + month + '\\.' + year);

                this.startCountBattles(0);
            }
        };
    };

    new CountBattles().init();

}());

