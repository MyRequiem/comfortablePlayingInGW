#! /usr/bin/env python3
# -*- coding: utf-8 -*-


def getstrings():
    mainreadme = ("""![Ganjawars.ru](http://images.ganjawars.ru/img/\
apple144.png)

#### Many buns for a comfortable game in \
[Ganjawars.ru](http://www.ganjawars.ru/index.php)
![OperaLogo]({1}imgs/operaLogo.png)
![FirefoxLogo]({1}imgs/firefoxLogo.png)
![ChromeLogo]({1}imgs/chromeLogo.png)
![YandexLogo]({1}imgs/yandexLogo.png)
<br>
<br>
Версия: {0}
<br>
Нашли ошибку? Пожалуйста, [сообщите](http://www.ganjawars.ru\
/info.php?id=2095458)
* [Установить]({1}_comfortablePlayingInGW.user.js)
* [Скачать zip-архив]({1}_comfortablePlayingInGW.user.js.zip)
* *Все скрипты отдельными файлами находятся в директории* \
[./separatedScripts]({2})
* [Как устанавливать скрипты](http://gwscripts.ucoz.net/index/\
how_to_install/0-31)
* [История изменений]({1}ChangeLog.txt)
<br>
<br>
*Кликаем на листик, открываются настройки*:
<br>
![Screen1]({1}imgs/screen1.png)
<br>
<br>
*Включаем нужное, отключаем ненужное:*
![Screen2]({1}imgs/screen2.png)
<br>
<br>
*Сохранение/восстановление/сброс настроек:*
![Screen3]({1}imgs/screen3.png)
<br>
<br>

#### Модули отдельными скриптами

""", """**{0}**
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3}) [[Описание]]({4})
<br>

""")

    readme = ("""{0}
<br>
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3})
<br>
<br>
""", """![{0}]({1}{2})
<br>
""")

    raw = 'https://raw.githubusercontent.com/MyRequiem/\
comfortablePlayingInGW/master/separatedScripts/'

    tree = 'https://github.com/MyRequiem/comfortablePlayingInGW/tree\
/master/separatedScripts/'

    return {
        'mainreadme': mainreadme,
        'readme': readme,
        'raw': raw,
        'tree': tree
    }
