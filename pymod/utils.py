#! /usr/bin/env python3
# -*- coding: utf-8 -*-


def get_str_indent(indent):
    return ' ' * indent


def get_indent_size(filename):
    return (69 - len(filename)) // 2


def get_mname(name):
    return name.replace('.user.', '.meta.')


def get_zname(name):
    return name + '.zip'
