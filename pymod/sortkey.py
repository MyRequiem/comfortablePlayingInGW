#! /usr/bin/env python3
# -*- coding: utf-8 -*-


"""
docstring
"""


class SortKey:
    """
    docstring
    """
    def __init__(self, *attribute_names):
        """
        docstring
        """
        self.attribute_names = attribute_names

    def __call__(self, instance):
        """
        docstring
        """
        values = []
        for attribute_name in self.attribute_names:
            values.append(getattr(instance, attribute_name))
        return values
