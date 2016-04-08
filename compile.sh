#! /bin/bash

NAME=_comfortablePlayingInGW
SOURCE=${NAME}_src.user.js
META=${NAME}.meta.js
COMPILE=${NAME}.user.js
TMP=tmpc

/home/myrequiem/bin/closurecompiler/bin/ccjs ${SOURCE} > ${TMP}
cat ${META} > ${COMPILE}
echo "" >> ${COMPILE}
cat ${TMP} >> ${COMPILE}
rm -f ${TMP}

