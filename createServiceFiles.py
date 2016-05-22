#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import re
import fnmatch
from zipfile import ZipFile


class SortKey:
    def __init__(self, *attribute_names):
        self.attribute_names = attribute_names

    def __call__(self, instance):
        values = []
        for attribute_name in self.attribute_names:
            values.append(getattr(instance, attribute_name))
        return values


class CreateServiceFiles:
    __rawLink = 'https://raw.githubusercontent.com/MyRequiem/\
comfortablePlayingInGW/master/separatedScripts/'
    __creating = '\033[1;32mcreating\033[1;m'
    __colorTempl = '{cr:>30} {name}\033[1;m'
    __readme = 'README.md'
    __listScript = []

    def __init__(self, d=None, p=None):
        if d is None:
            self.scriptName = '_comfortablePlayingInGW.user.js'
            self.metaName = '_comfortablePlayingInGW.meta.js'
            self.zipName = '_comfortablePlayingInGW.user.js.zip'
            CreateServiceFiles.createMainREADME(self)
            return

        self.dirName = d
        self.scriptName = d[:1].lower() + d[1:] + '.user.js'
        self.metaName = self.scriptName.replace('user.js', 'meta.js')
        self.zipName = self.scriptName + '.zip'
        self.dirFullPath = os.path.join(p, d) + '/'

        print('./{}'.format(self.dirFullPath))
        if not os.path.isfile(self.dirFullPath + self.scriptName):
            print('\033[1;31mScript {} does not exist\033[1;m'.
                  format(self.scriptName))
            print('')
            return

        ret = os.getcwd()
        os.chdir(self.dirFullPath)

        CreateServiceFiles.createZip(self)
        CreateServiceFiles.createMeta(self)
        CreateServiceFiles.createREADME(self)
        CreateServiceFiles.__listScript.append(self)

        os.chdir(ret)

    def createZip(self):
        print(CreateServiceFiles.__colorTempl.
              format(cr=CreateServiceFiles.__creating,
                     name='\033[1;33m' + self.zipName))

        zf = ZipFile(self.zipName, 'w')
        zf.write(self.scriptName)
        zf.close()

    def createMeta(self):
        print(CreateServiceFiles.__colorTempl.
              format(cr=CreateServiceFiles.__creating,
                     name='\033[1;36m' + self.metaName))

        s = open(self.scriptName, 'r')
        m = open(self.metaName, 'w')
        for line in s:
            if line == '\n':
                break
            m.write(line)
            desc = re.search('@description\s+(.*?)\n', line)
            if desc:
                self.descr = desc.group(1)

            version = re.search('@version\s+(.*?)\n', line)
            if version:
                self.ver = version.group(1)

        s.close()
        m.close()

    def createREADME(self):
        print(CreateServiceFiles.__colorTempl.
              format(cr=CreateServiceFiles.__creating,
                     name='\033[1;34m' + CreateServiceFiles.__readme))
        r = open(CreateServiceFiles.__readme, 'w')
        raw = CreateServiceFiles.__rawLink + self.dirName + '/'
        self.dwnld = raw + self.scriptName
        self.dwnldZip = raw + self.zipName
        r.write("""{0}
<br>
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3})
<br>
<br>
""".format(self.descr, self.ver, self.dwnld, self.dwnldZip))

        mask = 'screen*.png'
        imgsPath = '../../' +\
            self.dirFullPath.replace('separatedScripts', 'imgs')
        if os.path.isdir(imgsPath):
            for f in os.listdir(imgsPath):
                if fnmatch.fnmatch(f, mask):
                    r.write("""![{0}]({1}{2})
<br>
""".format(self.dirName, raw.replace('separatedScripts', 'imgs'), f))

        r.close()

    def createMainREADME(self):
        print('----------------------------------------------')
        CreateServiceFiles.createZip(self)
        CreateServiceFiles.createMeta(self)
        print(CreateServiceFiles.__colorTempl.
              format(cr=CreateServiceFiles.__creating,
                     name='\033[1;34m' + CreateServiceFiles.__readme))

        raw = CreateServiceFiles.__rawLink.replace('separatedScripts/', '')
        tree = 'https://github.com/MyRequiem/comfortablePlayingInGW/tree\
/master/separatedScripts/'
        r = open(CreateServiceFiles.__readme, 'w')
        r.write("""![Ganjawars.ru](http://images.ganjawars.ru/img/apple144.png)

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

""".format(self.ver, raw, tree))

        CreateServiceFiles.__listScript.sort(key=SortKey('dirName'))
        for s in CreateServiceFiles.__listScript:
            r.write("""**{0}**
<br>
Версия: {1}
<br>
[[Установить]]({2}) [[Скачать zip-архив]]({3}) [[Описание]]({4})
<br>

""".format(s.dirName, s.ver, s.dwnld, s.dwnldZip, tree + s.dirName))

        r.close()
        print('----------------------------------------------')


def createServiceFiles():
    path = 'separatedScripts/'
    for scrDir in os.listdir(path):
        CreateServiceFiles(scrDir, path)

    CreateServiceFiles()

createServiceFiles()
