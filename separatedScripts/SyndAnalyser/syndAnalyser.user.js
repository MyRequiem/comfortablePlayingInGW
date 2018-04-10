// ==UserScript==
// @name            SyndAnalyser
// @namespace       https://github.com/MyRequiem/comfortablePlayingInGW
// @description     Анализ активности синдиката.
// @id              comfortablePlayingInGW@MyRequiem
// @updateURL       https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndAnalyser/syndAnalyser.meta.js
// @downloadURL     https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/SyndAnalyser/syndAnalyser.user.js
// @include         http://www.ganjawars.ru/syndicate.php?id=*
// @grant           none
// @license         MIT
// @version         2.15-110418
// @author          MyRequiem [http://www.ganjawars.ru/info.php?id=2095458]
// ==/UserScript==

/*global unsafeWindow */
/*jslint browser: true, maxlen: 80, vars: true, nomen: true, regexp: true,
    plusplus: true, continue: true, devel: true
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
     * @class GetStrDateNow
     * @constructor
     */
    var GetStrDateNow = function () {
        /**
         * @method init
         * @return  {String}
         */
        this.init = function () {
            var date = new Date(),
                month = date.getMonth() + 1,
                day = date.getDate();

            return (day < 10 ? '0' + day : day) +  '.' +
                        (month < 10 ? '0' + month : month) + '.' +
                            (/20(\d+)/.exec(date.getFullYear().toString())[1]);
        };
    };

    /**
     * @class GetTimestamp
     * @constructor
     */
    var GetTimestamp = function () {
        /**
         * @method init
         * @param   {String}    val
         * @return  {int}
         */
        this.init = function (val) {
            var date = /(\d\d)\.(\d\d)\.(\d\d)/.exec(val);

            if (!date) {
                return 0;
            }

            var d = +date[1],
                m = +date[2],
                y = +date[3];

            if (!d || d > 31 || !m || m > 12 || !y || y < 9 || y > 20) {
                return 0;
            }

            return new Date(2000 + y, m - 1, d).getTime();
        };
    };

    /**
     * @class SetPoints
     * @constructor
     */
    var SetPoints = function () {
        /**
         * @method init
         * @param   {String|int}    num
         * @param   {String}        separator
         * @param   {Boolean}       flagSign
         * @return  {String}
         */
        this.init = function (num, separator, flagSign) {
            var x = +num,
                sign = (x > 0 && flagSign) ? '+' : '',
                i;

            if (isNaN(x)) {
                return 'NaN';
            }

            x = x.toString().split('').reverse();
            for (i = 2; i < x.length; i += 3) {
                if (x[i] === '-' || !x[i + 1] || x[i + 1] === '-') {
                    break;
                }

                x[i] = separator + x[i];
            }

            return sign + x.reverse().join('');
        };
    };

    /**
     * @class SyndAnalyser
     * @constructor
     */
    var SyndAnalyser = function () {
        /**
         * @property syndId
         * @type {String}
         */
        this.syndId = /\?id=(\d+)/.exec(general.loc)[1];
        /**
         * @property mainTable
         * @type {Element}
         */
        this.mainTable = general.doc.querySelector('center+br+table');
        /**
         * @property tm
         * @type {int}
         */
        this.tm = 1500;
        /**
         * @property lastDate
         * @type {String}
         */
        this.lastDate = '';
        /**
         * @property from
         * @type {int}
         */
        this.from = 0;
        /**
         * @property to
         * @type {int}
         */
        this.to = 0;
        /**
         * @property mainData
         * @type {Object|null}
         */
        this.mainData = null;

        /**
         * @class MainData
         * @constructor
         */
        var MainData = function () {
            /**
             * @property pers
             * @type {Array}
             */
            this.pers = [];
            /**
             * @property allProtect
             * @type {int}
             */
            this.allProtect = 0;
            /**
             * @property allAttaks
             * @type {int}
             */
            this.allAttaks = 0;
            /**
             * @property allTake
             * @type {int}
             */
            this.allTake = 0;
            /**
             * @property allPut
             * @type {int}
             */
            this.allPut = 0;
            /**
             * @property takenSynd
             * @type {Array}
             */
            this.takenSynd = [];
            /**
             * @property dismissedSynd
             * @type {Array}
             */
            this.dismissedSynd = [];
            /**
             * @property realEstate
             * @type {Object}
             */
            this.realEstate = {
                es: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                uran: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                bars: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0},
                another: {mMoney: 0, pMoney: 0, mPTS: 0, pPTS: 0}
            };
        };

        /**
         * @method getLastDate
         * @param   {String}    url
         */
        this.getLastDate = function (url) {
            var _url = url || 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&page_id=100500',
                _this = this;

            new AjaxQuery().init(_url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var counter = general.$('syndAnalyseCounter');
                if (!url) {
                    general.root.setTimeout(function () {
                        counter.innerHTML = '2/1';
                        _this.getLastDate(spanContent.
                            querySelector('br+center>b>a:last-child').href);
                    }, _this.tm);
                } else {
                    counter.innerHTML = '2/2';
                    var fonts = spanContent.
                            querySelectorAll('nobr>font[color="green"]');
                    _this.lastDate = /\d+.\d+.\d+/.
                            exec(fonts[fonts.length - 1].innerHTML)[0];

                    var inpFrom = general.$('inpDateFrom');
                    inpFrom.value = _this.lastDate;
                    inpFrom.disabled = false;
                    general.$('inpDateTo').disabled = false;
                    general.$('goSAnalyse').disabled = false;
                    general.$('syndAnalysePreloader').style.display = 'none';
                }
            }, function () {
                var preloader = general.$('syndAnalysePreloader');
                preloader.style.display = 'none';
                preloader.parentNode.innerHTML += '<br><span style="color: ' +
                    '#FF0000;">Ошибка ответа сервера...</span>';
            });
        };

        /**
         * @method enterPress
         * @param   {Object}    e
         */
        this.enterPress = function (e) {
            var ev = e || general.root.event;
            if (ev.keyCode === 13) {
                general.$('goSAnalyse').click();
            }
        };

        /**
         * @method getPers
         * @param   {Object}   link
         * @return  {Object}
         */
        this.getPers = function (link) {
            var i;
            for (i = 0; i < this.mainData.pers.length; i++) {
                if (this.mainData.pers[i].link === link.href) {
                    return this.mainData.pers[i];
                }
            }

            var pers = {
                link: link.href,
                name: link.firstElementChild.innerHTML,
                attaks: 0,
                putMoney: 0,
                takeMoney: 0
            };

            this.mainData.pers.push(pers);

            return pers;
        };

        /**
         * @method getTypeLine
         * @param   {String}    str
         * @return  {int|Object}
         */
        this.getTypeLine = function (str) {
            if (/инициировал нападение/i.test(str) &&
                    !(/контроль/i.test(str))) {
                return 1;
            }

            if (/На контролируемый объект/i.test(str)) {
                return 2;
            }

            if (/снято со счета/i.test(str)) {
                return {takeOff: +(/\$(\d+)/.exec(str)[1])};
            }

            if (/переведено на счет/i.test(str)) {
                return {takeOn: +(/\$(\d+)/.exec(str)[1])};
            }

            if (/на нападения на электростанции/i.test(str)) {
                return 3;
            }

            if (/на нападения на рудники/i.test(str)) {
                return 4;
            }

            if (/нападениях на остальную/i.test(str)) {
                return 5;
            }

            if (/принят/i.test(str)) {
                return 6;
            }

            if (/вышел/i.test(str)) {
                return 7;
            }

            if (/в нападениях за контроль баров/i.test(str)) {
                return 8;
            }

            // выгнали
            if (/покинул синдикат/i.test(str)) {
                return 9;
            }

            return 0;
        };

        /**
         * @method getPersLink
         * @param    {Node}     node
         * @return   {Element}
         */
        this.getPersLink = function (node) {
            // noinspection JSUnresolvedVariable
            return node.parentNode.nextElementSibling.querySelector('a');
        };

        /**
         * @method parseLine
         * @param   {String}    str
         * @param   {Object}    obj
         */
        this.parseLine = function (str, obj) {
            var rez = /\$(\d+).*и (\d+).*\$(\d+).*и (\d+)/.exec(str);

            if (rez) {
                obj.mMoney += +rez[1].replace(/,/g, '');
                obj.mPTS += +rez[2].replace(/,/g, '');
                obj.pMoney += +rez[3].replace(/,/g, '');
                obj.pPTS += +rez[4].replace(/,/g, '');
            }
        };

        /**
         * @method getRealEstateStr
         * @param   {Object}    obj
         * @param   {String}    name
         * @param   {String}    title
         * @param   {String}    str1
         * @param   {String}    str2
         * @param   {String}    str3
         * @return  {String}    str
         */
        this.getRealEstateStr = function (obj, name, title, str1, str2, str3) {
            var setPoints = new SetPoints().init;

            return title + name + str3 +
                str1 + 'Потрачено гб' + str2 + '$' +
                setPoints(obj.mMoney, '\'', false) + str3 + str1 +
                'Заработано гб' + str2 + '$' +
                setPoints(obj.pMoney, '\'', false) + str3 +
                str1 + '<span style="font-weight: bold;">Итого:</span>' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(obj.pMoney - obj.mMoney, '\'', true) + '</span>' +
                str3 + str1 + 'Потрачено PTS' + str2 +
                setPoints(obj.mPTS, '\'', false) + str3 +
                str1 + 'Заработано PTS' + str2 +
                setPoints(obj.pPTS, '\'', false) + str3 + str1 +
                '<span style="font-weight: bold;">Итого:</span>' + str2 +
                '<span style="font-weight: bold;">' +
                setPoints(obj.pPTS - obj.mPTS, '\'', true) + '</span>' +
                str3;
        };

        /**
         * @method showRezult
         */
        this.showRezult = function () {
            this.sortPers();

            var setPoints = new SetPoints().init,
                main = this.mainData,
                str1 = '<tr><td class="wb">',
                str2 = '</td><td class="wb">',
                str3 = '</td></tr>',
                strTakeMoney = '',
                strPutMoney = '',
                strAttaks = '',
                persLink,
                pers,
                val,
                i;

            for (i = 0; i < main.pers.length; i++) {
                pers = main.pers[i];
                persLink = '<a target="_blank" style="font-weight: bold; ' +
                    'text-decoration: none; color: #004400;" ' +
                    'href="' + pers.link + '">' + pers.name + '</a>';

                if (pers.attaks) {
                    val = setPoints(pers.attaks, '\'', false);
                    strAttaks += str1 + persLink + str2 + val + str3;
                }

                if (pers.takeMoney) {
                    val = '$' + setPoints(pers.takeMoney, '\'', false);
                    strTakeMoney += str1 + persLink + str2 + val + str3;
                }

                if (pers.putMoney) {
                    val = '$' + setPoints(pers.putMoney, '\'', false);
                    strPutMoney += str1 + persLink + str2 + val + str3;
                }
            }

            var str4 = '<tr><td colspan="2" class="wb"><a target="_blank" ' +
                    'style="text-decoration: none; font-weight: bold; color: ' +
                    '#004400;" href="http://www.ganjawars.ru/search.php?key=',
                strDismissedSynd = '',
                strTakenSynd = '';

            for (i = 0; i < main.dismissedSynd.length; i++) {
                pers = main.dismissedSynd[i][0];
                strDismissedSynd += str4 + pers + '">' + pers + '</a>, ' +
                    main.dismissedSynd[i][1] + str3;
            }

            for (i = 0; i < main.takenSynd.length; i++) {
                pers = main.takenSynd[i][0];
                strTakenSynd += str4 + pers + '">' + pers + '</a>, ' +
                    main.takenSynd[i][1] + str3;
            }

            var title = '<tr><td colspan="2" style="background: #D0EED0; ' +
                'text-align: center; font-weight: bold;">',
                r = main.realEstate;

            this.mainTable.innerHTML = title + 'Нападающие [' +
                'нападений: <span style="color: #FF0000;">' + main.allAttaks +
                '</span>, защит: <span style="color: #0000FF;">' +
                main.allProtect + '</span>, всего боев: <span style="color: ' +
                '#990000;">' + (main.allAttaks + main.allProtect) + '</span>]' +
                str3 + strAttaks +

                this.getRealEstateStr(r.es, 'Электростанции',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.uran, 'Урановые рудники',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.bars, 'Бары',
                        title, str1, str2, str3) +
                this.getRealEstateStr(r.another, 'Другая недвижимость',
                        title, str1, str2, str3) +

                title + 'Счет синдиката [$<span style="color: #990000;">' +
                setPoints(main.allPut - main.allTake, '\'', true) +
                '</span>]' + str3 + str1 + '<span style="font-weight: bold; ' +
                'color: #FF0000;">Взяли со счета</span> (всего)' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(main.allTake, '\'', false) + '</span>' + str3 +
                strTakeMoney + str1 + '<span style="font-weight: bold; ' +
                'color: #0000FF;">Положили на счет</span> (всего)' + str2 +
                '<span style="font-weight: bold;">$' +
                setPoints(main.allPut, '\'', false) + '</span>' + str3 +
                strPutMoney + title + 'Состав' + str3 + '<tr><td colspan="2" ' +
                'class="wb"><span style="font-weight: bold; color: #FF0000;">' +
                'Вышли из синдиката</span> (всего ' +
                main.dismissedSynd.length + ')' + str3 + strDismissedSynd +
                '<tr><td colspan="2" class="wb"><span style="font-weight: ' +
                'bold; color: #0000FF;">Приняты в синдикат</span> (всего ' +
                main.takenSynd.length + ')' + str3 + strTakenSynd;
        };

        /**
         * @method sortPers
         */
        this.sortPers = function () {
            this.mainData.pers.sort(function (a, b) {
                var ret;

                if (a.attaks < b.attaks) {
                    ret = 1;
                } else if (a.attaks > b.attaks) {
                    ret = -1;
                } else {
                    ret = 0;
                }

                return ret;
            });
        };

        /**
         * @method parseSyndProtocols
         * @param   {int}   ind
         */
        this.parseSyndProtocols = function (ind) {
            general.$('syndAnalyseCounter').innerHTML = ind;
            var url = 'http://www.ganjawars.ru/syndicate.log.php?id=' +
                    this.syndId + '&page_id=' + ind,
                _this = this;

            new AjaxQuery().init(url, function (xml) {
                var spanContent = general.doc.createElement('span');
                spanContent.innerHTML = xml.responseText;

                var lines = spanContent.
                        querySelectorAll('nobr>font[color="green"]');

                if (!lines.length) {
                    _this.showRezult();
                    return;
                }

                var getTimestamp = new GetTimestamp().init,
                    typeLine,
                    take,
                    pers,
                    time,
                    str,
                    tmp,
                    i;

                for (i = 0; i < lines.length; i++) {
                    time = getTimestamp(lines[i].innerHTML);
                    if (time > _this.to) {
                        continue;
                    }

                    if (time < _this.from) {
                        _this.showRezult();
                        return;
                    }

                    // noinspection JSUnresolvedVariable
                    str = lines[i].parentNode.nextElementSibling.innerHTML;
                    typeLine = _this.getTypeLine(str);

                    if (!typeLine) {
                        continue;
                    }

                    //перс положил или взял со счета
                    take = typeLine.takeOff || typeLine.takeOn;
                    if (take) {
                        pers = _this.getPers(_this.getPersLink(lines[i]));
                        if (typeLine.takeOff) {
                            pers.takeMoney += take;
                            _this.mainData.allTake += take;
                        } else {
                            pers.putMoney += take;
                            _this.mainData.allPut += take;
                        }

                        continue;
                    }

                    str = str.replace(/,/g, '');
                    switch (typeLine) {
                    case 1:
                        _this.getPers(_this.getPersLink(lines[i])).attaks++;
                        _this.mainData.allAttaks++;
                        break;
                    case 2:
                        _this.mainData.allProtect++;
                        break;
                    case 3:
                        _this.parseLine(str, _this.mainData.realEstate.es);
                        break;
                    case 4:
                        _this.parseLine(str, _this.mainData.realEstate.uran);
                        break;
                    case 5:
                        _this.parseLine(str, _this.mainData.realEstate.another);
                        break;
                    case 6:
                        _this.mainData.takenSynd.
                            push([_this.getPersLink(lines[i]).
                                    firstElementChild.innerHTML,
                                lines[i].innerHTML]);
                        break;
                    case 7:
                        _this.mainData.dismissedSynd.
                            push([_this.getPersLink(lines[i]).
                                    firstElementChild.innerHTML,
                                lines[i].innerHTML]);
                        break;
                    case 8:
                        _this.parseLine(str, _this.mainData.realEstate.bars);
                        break;
                    case 9:
                        // выгнали
                        tmp = /^(.*) покинул синдикат( \(.*\))/.exec(str);
                        if (tmp) {
                            _this.mainData.dismissedSynd.push([tmp[1],
                                lines[i].innerHTML + tmp[2]]);
                        }

                        break;
                    default:
                        break;
                    }
                }

                general.root.setTimeout(function () {
                    ind++;
                    _this.parseSyndProtocols(ind);
                }, _this.tm);
            }, function () {
                general.root.setTimeout(function () {
                    _this.parseSyndProtocols(ind);
                }, _this.tm);
            });

        };

        /**
         * @method init
         */
        this.init = function () {
            var target = general.doc.
                    querySelector('td[colspan="3"]>a[href*="&ptslog=1"]').
                        parentNode;

            if (target.lastElementChild.nodeName === 'BR') {
                target.removeChild(target.lastElementChild);
            }

            var butShowAnalysePanel = general.doc.createElement('a');
            butShowAnalysePanel.innerHTML = 'Анализ активности';
            butShowAnalysePanel.setAttribute('style', 'cursor: pointer');
            // noinspection JSCheckFunctionSignatures
            target.appendChild(general.doc.createTextNode(' | '));
            target.appendChild(butShowAnalysePanel);

            var _this = this;
            butShowAnalysePanel.addEventListener('click', function () {
                if (general.$('inpDateFrom')) {
                    return;
                }

                _this.mainTable.setAttribute('class', 'wb');
                _this.mainTable.removeAttribute('style');

                var getStrDateNow = new GetStrDateNow().init;
                _this.mainTable.innerHTML = '<tr><td>' +
                    'Введите даты в формате дд.мм.гг<br>' +
                    'с: <input id="inpDateFrom" maxlength="8" ' +
                    'value="" style="width: 70px;" disabled> до: ' +
                    '<input id="inpDateTo" maxlength="8" value="' +
                    getStrDateNow()  + '" style="width: 70px;" disabled> ' +
                    '<input type="button" id="goSAnalyse" value=">>" ' +
                    'disabled><span id="syndAnalysePreloader" ' +
                    'style="margin-left: 10px;"><img src="' + general.imgPath +
                    'preloader.gif" /><span id="syndAnalyseCounter" ' +
                    'style="color: #0000FF; margin-left: 10px;">2/0</span>' +
                    '</span></td></tr>';

                _this.getLastDate('');

                general.$('inpDateFrom').
                    addEventListener('keypress', _this.enterPress, false);
                general.$('inpDateTo').
                    addEventListener('keypress', _this.enterPress, false);

                var getTimestamp = new GetTimestamp().init;
                general.$('goSAnalyse').addEventListener('click', function () {
                    _this.from = getTimestamp(general.$('inpDateFrom').value);
                    _this.to = getTimestamp(general.$('inpDateTo').value);

                    var dateStrNow = getStrDateNow();
                    if (!_this.from || !_this.to ||
                            _this.from < getTimestamp(_this.lastDate) ||
                                _this.to > getTimestamp(dateStrNow) ||
                                    _this.from > _this.to) {
                        alert('Не верно введена дата !!!\n' +
                            'Первая запись в протоколе: ' + _this.lastDate +
                            '\nСегодня: ' + dateStrNow);
                        return;
                    }

                    general.$('syndAnalysePreloader').style.display = '';
                    general.$('inpDateFrom').disabled = true;
                    general.$('inpDateTo').disabled = true;
                    general.$('goSAnalyse').disabled = true;

                    _this.mainData = new MainData();
                    _this.parseSyndProtocols(0);
                }, false);
            }, false);
        };
    };

    new SyndAnalyser().init();

}());

