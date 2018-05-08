#! /usr/bin/env python3
# -*- coding: utf-8 -*-


"""
docstring
"""

import zipfile
from fnmatch import fnmatch
from os import chdir, getcwd, listdir, path

from pymod.strs import getstrings
from pymod.utils import (get_indent_size, get_meta_value, get_mname,
                         get_str_indent, get_zname)


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
            'sdir': 'separatedScripts',
            'namemainscript': '_comfortablePlayingInGW.user.js'
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
        self.count_scripts = 0

    def run(self):
        """
        docstring
        """
        sep_scripts_dir = self.meta['sdir']

        for sepdir in sorted(listdir(sep_scripts_dir)):
            self.count_scripts += 1
            d_path = path.join(sep_scripts_dir, sepdir, '')
            if path.isdir(d_path):
                self.meta['dname'] = sepdir
                self.meta['sname'] = (sepdir[:1].lower() +
                                      sepdir[1:] + '.user.js')
                self.meta['mname'] = get_mname(self.meta['sname'])
                self.meta['zname'] = get_zname(self.meta['sname'])

                print('\n./{0}'.format(d_path))

                if not path.isfile(d_path + self.meta['sname']):
                    print((get_str_indent(8) +
                           '{0}Script {1}{2}{0} does not '
                           'exist{3}').format(self.colors['RED'],
                                              self.colors['GREY'],
                                              self.meta['sname'],
                                              self.colors['ENDC']), end='\n\n')
                    raise SystemExit

                chdir(d_path)
                self.set_str_actions(self.meta['zname'], self.colors['YELLOW'])
                self.create_zip()
                self.set_str_actions(self.meta['mname'], self.colors['CYAN'])
                self.create_meta()
                self.set_str_actions(self.meta['readme'], self.colors['BLUE'])
                self.create_readme()
                self.list_all_scripts.append({
                    'dname': self.meta['dname'],
                    'sdwnld': self.meta['sdwnld'],
                    'zdwnld': self.meta['zdwnld'],
                    'ver': self.meta['ver']
                })

                chdir(self.root)

        self.meta['sname'] = self.meta['namemainscript']
        self.meta['mname'] = get_mname(self.meta['sname'])
        self.meta['zname'] = get_zname(self.meta['sname'])
        self.csf_main_script()

    def get_creating_string(self, indent=8):
        """
        docstring
        """
        return (get_str_indent(indent) +
                '{0}creating{1}').format(self.colors['GREEN'],
                                         self.colors['ENDC'])

    def set_str_actions(self, name, color, indent=8):
        """
        docstring
        """
        vert, end = '', ''
        yellow = self.colors['LYELLOW']
        endc = self.colors['ENDC']
        if indent != 8:
            vert = yellow + '+' + endc
            end = (' ' * (78 - indent - 9 - len(name))) + yellow + '+' + endc

        print(vert + self.color_templ.format(self.get_creating_string(indent),
                                             color,
                                             name,
                                             endc) + end)

    def create_zip(self):
        """
        class zipfile.ZipFile(file, mode='r', compression=ZIP_STORED)

        Compression ratio:
        ------------------
        zipfile.ZIP_STORED    = 0
        zipfile.ZIP_DEFLATED  = 8  (requires the zlib module)
        zipfile.ZIP_BZIP2     = 12 (requires the bz2 module)
        zipfile.ZIP_LZMA      = 14 (requires the lzma module)
        """
        zip_file = zipfile.ZipFile(self.meta['zname'], 'w',
                                   compression=zipfile.ZIP_LZMA)
        zip_file.write(self.meta['sname'])
        zip_file.close()

    def create_meta(self):
        """
        docstring
        """
        mfile = open(self.meta['mname'], 'w')
        with open(self.meta['sname']) as sfile:
            for line in sfile:
                if line == '\n':
                    break
                print(line, end='', file=mfile)
                if line.startswith('// @description '):
                    self.meta['desc'] = get_meta_value(line)
                if line.startswith('// @version '):
                    self.meta['ver'] = get_meta_value(line)

        if not sfile.closed:
            sfile.close()
        mfile.close()

    def create_readme(self):
        """
        docstring
        """
        raw = path.join(self.strs['raw'], self.meta['dname'], '')
        self.meta['sdwnld'] = raw + self.meta['sname']
        self.meta['zdwnld'] = raw + self.meta['zname']

        rfile = open(self.meta['readme'], 'w')
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

    def print_line(self):
        """
        docstring
        """
        print((self.colors['LYELLOW'] + '+' + ('=' * 78) + '+' +
               self.colors['ENDC']))

    def csf_main_script(self):
        """
        docstring
        """
        print()
        self.print_line()

        zname = self.meta['zname']
        self.set_str_actions(zname, self.colors['YELLOW'],
                             get_indent_size(zname))
        self.create_zip()

        mname = self.meta['mname']
        self.set_str_actions(mname, self.colors['CYAN'],
                             get_indent_size(mname))
        self.create_meta()

        readme = self.meta['readme']
        self.set_str_actions(readme, self.colors['BLUE'],
                             get_indent_size(readme))

        raw = self.strs['raw'].replace(self.meta['sdir'] + '/', '')
        tree = self.strs['tree']
        templ = self.strs['mainreadme']

        rfile = open(readme, 'w')
        print(templ[0].format(self.meta['ver'],
                              raw,
                              tree,
                              self.count_scripts),
              end='', file=rfile)

        for script in self.list_all_scripts:
            print(templ[1].format(script['dname'],
                                  script['ver'],
                                  script['sdwnld'],
                                  script['zdwnld'],
                                  tree + script['dname']), end='', file=rfile)

        rfile.close()

        self.print_line()
        print()
