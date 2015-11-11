#!/bin/sh

find . -type f -a ! \( -name "*.gpg" -o -name "$(basename $0)" \)

