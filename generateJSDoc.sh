#! /bin/sh

JSDOCPATH=/home/myrequiem/projects/git/jsdoc
PROJECTPATH=/home/myrequiem/projects/git/gw/comfortablePlayingInGW
SCRIPTNAME=_comfortablePlayingInGW.user.js
NEWSCRIPTNAME=$(echo ${SCRIPTNAME} | cut -d _ -f 2-)

if [ "${PROJECTPATH}" != "$(pwd)" ]; then
    echo "Not a git repository \"comfortablePlayingInGW\""
    exit
fi

cd ${JSDOCPATH} || exit 1
cp ${PROJECTPATH}/${SCRIPTNAME} "${NEWSCRIPTNAME}"
./jsdoc.js --verbose --destination ${PROJECTPATH}/jsdoc "${NEWSCRIPTNAME}"
rm -f "${NEWSCRIPTNAME}"
