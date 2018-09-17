#! /usr/bin/env python3
# -*- coding: utf-8 -*-


"""
docstring
"""


def getstrings():
    """
    docstring
    """
    mainreadme1 = '''![GWars.ru](http://images.gwars.ru/img/\
apple144.png)

#### Many buns for a comfortable game in \
[GWars.ru](http://www.gwars.ru/index.php)
![OperaLogo]({1}imgs/operaLogo.png)
![FirefoxLogo]({1}imgs/firefoxLogo.png)
![ChromeLogo]({1}imgs/chromeLogo.png)
![YandexLogo]({1}imgs/yandexLogo.png)

Версия: {0}

Нашли ошибку? Пожалуйста, [сообщите](http://www.gwars.ru/\
sms-create.php?mailto=MyRequiem)

* [Установить]({1}_comfortablePlayingInGW.user.js)
* [Скачать zip-архив]({1}_comfortablePlayingInGW.user.js.zip)
* *Все скрипты отдельными файлами находятся в директории* \
[./separatedScripts]({2}) (Всего скриптов: {3})
* [Как устанавливать скрипты](http://gwscripts.ucoz.net/index/\
how_to_install/0-31)
* [История изменений]({1}ChangeLog.txt)

*Кликаем на листик, открываются настройки*:

![Screen1]({1}imgs/screen1.png)

*Включаем нужное, отключаем ненужное*:

![Screen2]({1}imgs/screen2.png)

*Сохранение/восстановление/сброс настроек, просмотр истории изменений*:

![Screen3]({1}imgs/screen3.png)

#### Модули отдельными скриптами

'''

    mainreadme2 = '''**{0}**
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3}) [[Описание]]({4})
<br>

'''

    readme1 = '''{0}
<br>
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3})
<br>
<br>
'''

    readme2 = '''![{0}]({1}{2})
<br>
'''

    raw = ('https://raw.githubusercontent.com/MyRequiem/'
           'comfortablePlayingInGW/master/separatedScripts/')

    tree = ('https://github.com/MyRequiem/comfortablePlayingInGW/'
            'tree/master/separatedScripts/')

    return {
        'mainreadme': (mainreadme1, mainreadme2),
        'readme': (readme1, readme2),
        'raw': raw,
        'tree': tree
    }
