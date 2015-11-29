#! /bin/sh

JSDOCPATH=~/projects/git/jsdoc
PROJECTPATH=~/projects/git/comfortablePlayingInGW
SCRIPTNAME=_comfortablePlayingInGW.user.js
NEWSCRIPTNAME=$(echo ${SCRIPTNAME} | cut -d _ -f 2)

(
    cd ${JSDOCPATH}
    rm -rf out/
    cp ${PROJECTPATH}/${SCRIPTNAME} ${NEWSCRIPTNAME}
    {
        ./jsdoc --verbose comfortablePlayingInGW.user.js && rm ${NEWSCRIPTNAME}
    } || exit
    cp -r out/ ${PROJECTPATH}/
)

rm -rf jsdoc/
mv out/ jsdoc/

