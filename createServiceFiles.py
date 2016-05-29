#!/usr/bin/env python3
# -*- coding: utf-8 -*-


"""
docstring
"""


def main():
    """
    docstring
    """
    from os import listdir
    from pymod.csf import CreateServiceFiles

    path = 'separatedScripts/'
    for scrDir in listdir(path):
        CreateServiceFiles(scrDir, path)

    CreateServiceFiles()

if __name__ == '__main__':
    from sys import exit
    exit(main())
