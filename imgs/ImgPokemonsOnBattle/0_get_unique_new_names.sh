#! /bin/bash

### Usage:
#   Add lines from http://www.gwars.ru/war.php to ./0_new_names like this:
#
#   ....
#   Amdub
#   Ankarep
#   Argekanu
#   ....
#   ....
#   ....
#   Mebeked [Elite], Penaping [Superb], Pedegaden [Superb], Muromumd [Superb]...
#   Pagoddo [Superb], Saagsund [Superb], Regaravir [Superb]...
#   Zattop [Superb], Skubruk [Superb], Haergok [Superb], Vevpuks [Superb]....
#
# and then run this script. As a result, names will be added to the list,
# sorted alphabetically and only unique. After that, run ./0_rename_old_names.sh
# script which will replace the old Pokemon names with new ones.

TMP="tmp"
LISTNAMES="0_new_names"
COMMANDS="0_vim_commands"

cp "${LISTNAMES}" "${TMP}"
vim "${TMP}" -s "${COMMANDS}"
cat "${TMP}" | sort | uniq > "${LISTNAMES}"
rm -f "${TMP}"
