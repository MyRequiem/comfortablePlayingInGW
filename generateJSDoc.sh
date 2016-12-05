#! /bin/sh

# if jsdoc not installed
if [ "x$(which jsdoc 2>/dev/null)" == "x" ]; then
    echo "Command 'jsdoc' not found in your PATH."
    echo "Installing jsdoc:"
    echo "  $ cd ~/bin"
    echo "  $ npm install jsdoc"
    echo "  $ ln -s node_modules/jsdoc/jsdoc.js jsdoc"
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