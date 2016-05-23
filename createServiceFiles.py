#!/usr/bin/env python3
# -*- coding: utf-8 -*-


def main():
    from os import listdir
    from pymod.csf import CreateServiceFiles

    def init():
        path = 'separatedScripts/'
        for scrDir in listdir(path):
            CreateServiceFiles(scrDir, path)

        CreateServiceFiles()

    init()

if __name__ == "__main__":
    from sys import exit
    exit(main())
