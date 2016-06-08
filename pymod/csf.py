#! /usr/bin/env python3
# -*- coding: utf-8 -*-


"""
docstring
"""

import zipfile
from fnmatch import fnmatch
from re import search
from os import (
    listdir,
    getcwd,
    chdir,
    path
)

from pymod.strs import getstrings


class CreateServiceFiles(object):
    """
    docstring
    """
    def __init__(self):

        self.meta = {
            'dname': '',
            'sname': '',
            'mname': '',
            'zname': '',
            'desc': '',
            'ver': '',
            'sdwnld': '',
            'zdwnld': '',
            'readme': 'README.md',
            'sdir': 'separatedScripts'
        }

        self.root = getcwd()
        self.strs = getstrings()
        self.list_all_scripts = []
        self.colors = {
            'RED': '\x1b[31m',
            'GREEN': '\x1b[1;32m',
            'YELLOW': '\x1b[33m',
            'LYELLOW': '\x1b[1;33m',
            'BLUE': '\x1b[1;34m',
            'CYAN': '\x1b[1;36m',
            'GREY': '\x1b[37m',
            'ENDC': '\x1b[0m'
        }

        self.color_templ = '{0} {1}{2}{3}'

    def run(self):
        """
        docstring
        """
        sep_cripts_dir = self.meta['sdir']

        for d in sorted(listdir(sep_cripts_dir)):
            d_path = path.join(sep_cripts_dir, d, '')
            if path.isdir(d_path):
                self.meta['dname'] = d
                self.meta['sname'] = d[:1].lower() + d[1:] + '.user.js'
                self.meta['mname'] = self.get_mname(self.meta['sname'])
                self.meta['zname'] = self.get_zname(self.meta['sname'])

                print('\n./{0}'.format(d_path))

                if not path.isfile(d_path + self.meta['sname']):
                    print((self.get_indent(8) + '{0}Script {1}{2}{0} does not '
                           'exist{3}').format(self.colors['RED'],
                                              self.colors['GREY'],
                                              self.meta['sname'],
                                              self.colors['ENDC']), end='\n\n')
                    raise SystemExit

                chdir(d_path)
                self.create_zip()
                self.create_meta()
                self.create_readme()
                self.list_all_scripts.append({
                    'dname': self.meta['dname'],
                    'sdwnld': self.meta['sdwnld'],
                    'zdwnld': self.meta['zdwnld'],
                    'ver': self.meta['ver']
                })

                chdir(self.root)

        self.meta['sname'] = '_comfortablePlayingInGW.user.js'
        self.meta['mname'] = self.get_mname(self.meta['sname'])
        self.meta['zname'] = self.get_zname(self.meta['sname'])
        self.create_service_files_for_main_script()

    def get_creating_string(self, count=8):
        """
        docstring
        """
        return (self.get_indent(count) +
                '{0}creating{1}').format(self.colors['GREEN'],
                                         self.colors['ENDC'])

    @staticmethod
    def get_indent(count):
        """
        docstring
        """
        return ' ' * count

    @staticmethod
    def get_mname(name):
        """
        docstring
        """
        return name.replace('.user.', '.meta.')

    @staticmethod
    def get_zname(name):
        """
        docstring
        """
        return name + '.zip'

    def create_zip(self, count=8):
        """
        docstring
        """
        zname = self.meta['zname']
        vert, end = '', ''
        if count != 8:
            vert = '+'
            end = ((' ' * (78 - count - 9 - len(zname))) +
                   self.colors['LYELLOW'] +
                   '+' +
                   self.colors['ENDC'])

        print(vert + self.color_templ.format(self.get_creating_string(count),
                                             self.colors['YELLOW'],
                                             zname,
                                             self.colors['ENDC']) + end)

        '''
        class zipfile.ZipFile(file, mode='r', compression=ZIP_STORED)

        Compression ratio:
        ------------------
        zipfile.ZIP_STORED    = 0
        zipfile.ZIP_DEFLATED  = 8  (requires the zlib module)
        zipfile.ZIP_BZIP2     = 12 (requires the bz2 module)
        zipfile.ZIP_LZMA      = 14 (requires the lzma module)
        '''
        zip_file = zipfile.ZipFile(zname, 'w', compression=zipfile.ZIP_LZMA)
        zip_file.write(self.meta['sname'])
        zip_file.close()

    def create_meta(self, count=8):
        """
        docstring
        """
        mname = self.meta['mname']
        vert, end = '', ''
        if count != 8:
            vert = '+'
            end = ((' ' * (78 - count - 9 - len(mname))) +
                   self.colors['LYELLOW'] +
                   '+' +
                   self.colors['ENDC'])
        print(vert + self.color_templ.format(self.get_creating_string(count),
                                             self.colors['CYAN'],
                                             mname,
                                             self.colors['ENDC']) + end)

        mfile = open(mname, 'w')
        with open(self.meta['sname']) as sfile:
            for line in iter(sfile.readline, '\n'):
                print(line, end='', file=mfile)
                desc = search('^// @description\s+(.*?)\n', line)
                if desc:
                    self.meta['desc'] = desc.group(1)

                ver = search('^// @version\s+(.*?)\n', line)
                if ver:
                    self.meta['ver'] = ver.group(1)

        if not sfile.closed:
            sfile.close()
        mfile.close()

    def create_readme(self):
        """
        docstring
        """
        readme = self.meta['readme']
        print(self.color_templ.format(self.get_creating_string(),
                                      self.colors['BLUE'],
                                      readme,
                                      self.colors['ENDC']))

        raw = path.join(self.strs['raw'], self.meta['dname'], '')
        self.meta['sdwnld'] = raw + self.meta['sname']
        self.meta['zdwnld'] = raw + self.meta['zname']

        rfile = open(readme, 'w')
        readme_templ = self.strs['readme']
        print(readme_templ[0].format(self.meta['desc'],
                                     self.meta['ver'],
                                     self.meta['sdwnld'],
                                     self.meta['zdwnld']), end='', file=rfile)

        imgs_path = path.join(self.root, 'imgs/', self.meta['dname'])
        if path.isdir(imgs_path):
            for img in sorted(listdir(imgs_path)):
                if fnmatch(img, 'screen*.png'):
                    print(readme_templ[1].format(self.meta['dname'],
                                                 raw.replace(self.meta['sdir'],
                                                             'imgs'),
                                                 img), end='', file=rfile)

        rfile.close()

    def print_line(self, color=''):
        """
        docstring
        """
        clr = self.colors[color] if color and color in self.colors else ''
        print(clr + '+' + ('=' * 78) + '+' + self.colors['ENDC'])

    def create_service_files_for_main_script(self):
        """
        docstring
        """
        print()
        self.print_line('LYELLOW')

        indent = (78 - 9 - len(self.meta['zname'])) // 2
        self.create_zip(indent)
        self.create_meta(indent)

        readme = self.meta['readme']
        end = ((' ' * (78 - indent - 9 - len(readme))) +
               self.colors['LYELLOW'] +
               '+' +
               self.colors['ENDC'])
        print(self.colors['LYELLOW'] + '+' + self.colors['ENDC'] +
              self.color_templ.format(self.get_creating_string(indent),
                                      self.colors['BLUE'],
                                      readme,
                                      self.colors['ENDC']) + end)

        raw = self.strs['raw'].replace(self.meta['sdir'] + '/', '')
        tree = self.strs['tree']
        templ = self.strs['mainreadme']

        rfile = open(readme, 'w')
        print(templ[0].format(self.meta['ver'], raw, tree), end='', file=rfile)

        for s in self.list_all_scripts:
            print(templ[1].format(s['dname'],
                                  s['ver'],
                                  s['sdwnld'],
                                  s['zdwnld'],
                                  tree + s['dname']), end='', file=rfile)

        rfile.close()

        self.print_line('LYELLOW')
        print()
