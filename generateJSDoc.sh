#! /bin/sh

# if jsdoc not installed
if ! which jsdoc 1>/dev/null 2>&1; then
    echo "jsdoc: command not found"
    echo "You need to install jsdoc:"
    echo "$ npm install jsdoc"
    exit 1
fi

PROJECTNAME=comfortablePlayingInGW
SCRIPTNAME=_${PROJECTNAME}.user.js
NEWSCRIPTNAME=$(echo ${SCRIPTNAME} | cut -d _ -f 2-)

if [ -d ./.git ] && [ "$(basename "$(pwd)")" == ${PROJECTNAME} ]; then
    cp ${SCRIPTNAME} "${NEWSCRIPTNAME}"
    jsdoc --verbose --destination ./jsdoc "${NEWSCRIPTNAME}"
    rm -f "${NEWSCRIPTNAME}"
else
    echo "Not a git repository \"comfortablePlayingInGW\""
fi
