#! /bin/sh

if ! [ $# = 1 ]; then
    echo -e "Usage: ./$(basename "$0") new_version"
    echo "New version format: x.xx-xxxxxx[-dev|-a|-b]"
    exit
fi

TMP=tmp
INFILE="
    _comfortablePlayingInGW.user.js
    _comfortablePlayingInGW.meta.js
"

for FILE in ${INFILE}; do
    sed "s/[0-9]\?[0-9]\.[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9]\
\(-dev\)\?\(-a\)\?\(-b\)\?/$1/g" "${FILE}" > ${TMP}
    if [ -s ${TMP} ]; then
        rm "${FILE}"
        mv ${TMP} "${FILE}"
    fi
done