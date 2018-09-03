#! /bin/bash

EXT="png"
NEW_NAMES="0_new_names"

for NEW_NAME in $(cat ${NEW_NAMES}); do
    echo "Checking ${NEW_NAME} ..."
    if ! ls "./${NEW_NAME}.${EXT}" &>/dev/null; then
        for IMG in $(find . -type f -name "*.${EXT}" | sort); do
            NAME="$(basename "${IMG}" .${EXT})"
            if ! /bin/grep -q ^"${NAME}"$ ${NEW_NAMES} 2>/dev/null; then
                echo "move ${NAME}.${EXT} --> ${NEW_NAME}.${EXT}"
                mv "${NAME}.${EXT}"  "${NEW_NAME}.${EXT}"
                break
            fi
        done
    fi
done
