#! /usr/bin/env python3
# -*- coding: utf-8 -*-


from os import path, getcwd, chdir, listdir
from zipfile import ZipFile
from re import search
from fnmatch import fnmatch
from pymod.sortkey import SortKey
from pymod.strs import getstrings


class CreateServiceFiles:
    __rawLink = getstrings()['raw']
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
        self.dirFullPath = path.join(p, d) + '/'

        print('./{}'.format(self.dirFullPath))
        if not path.isfile(self.dirFullPath + self.scriptName):
            print('\033[1;31mScript {} does not exist\033[1;m'.
                  format(self.scriptName))
            print('')
            return

        ret = getcwd()
        chdir(self.dirFullPath)

        CreateServiceFiles.createZip(self)
        CreateServiceFiles.createMeta(self)
        CreateServiceFiles.createREADME(self)
        CreateServiceFiles.__listScript.append(self)

        chdir(ret)

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

        m = open(self.metaName, 'w')
        with open(self.scriptName, 'r') as s:
            for line in s:
                if line == '\n':
                    break
                m.write(line)
                desc = search('@description\s+(.*?)\n', line)
                if desc:
                    self.descr = desc.group(1)

                version = search('@version\s+(.*?)\n', line)
                if version:
                    self.ver = version.group(1)

        if not s.closed:
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

        strg = getstrings()['readme']
        r.write(strg[0].format(self.descr, self.ver, self.dwnld, self.dwnldZip))

        mask = 'screen*.png'
        imgsPath = '../../' +\
            self.dirFullPath.replace('separatedScripts', 'imgs')
        if path.isdir(imgsPath):
            for f in listdir(imgsPath):
                if fnmatch(f, mask):
                    r.write(strg[1].
                            format(self.dirName,
                                   raw.replace('separatedScripts', 'imgs'), f))

        r.close()

    def createMainREADME(self):
        print('----------------------------------------------')
        CreateServiceFiles.createZip(self)
        CreateServiceFiles.createMeta(self)
        print(CreateServiceFiles.__colorTempl.
              format(cr=CreateServiceFiles.__creating,
                     name='\033[1;34m' + CreateServiceFiles.__readme))

        raw = CreateServiceFiles.__rawLink.replace('separatedScripts/', '')
        tree = getstrings()['tree']
        r = open(CreateServiceFiles.__readme, 'w')

        strg = getstrings()['mainreadme']
        r.write(strg[0].format(self.ver, raw, tree))

        CreateServiceFiles.__listScript.sort(key=SortKey('dirName'))
        for s in CreateServiceFiles.__listScript:
            r.write(strg[1].
                    format(s.dirName, s.ver, s.dwnld, s.dwnldZip,
                           tree + s.dirName))

        r.close()
        print('----------------------------------------------')
