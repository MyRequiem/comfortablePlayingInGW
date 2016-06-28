#! /usr/bin/env python3
# -*- coding: utf-8 -*-

"""
docstring
"""


def get_str_indent(indent):
    """
    docstring
    """
    return ' ' * indent


def get_indent_size(filename):
    """
    docstring
    """
    return (69 - len(filename)) // 2


def get_mname(name):
    """
    docstring
    """
    return name.replace('.user.', '.meta.')


def get_zname(name):
    """
    docstring
    """
    return name + '.zip'


def get_meta_value(line):
    """
    docstring
    """
    # line:
    # '// @description    some text'
    # '// @version        some text'
    spl = line.split()
    if len(spl) > 2:
        return ' '.join(spl[2:]).strip()
    else:
        return ''
