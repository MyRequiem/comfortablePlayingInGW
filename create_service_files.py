#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#    ______                ____           __        __    __
#   / ____/___  ____ ___  / __/___  _____/ /_____ _/ /_  / /__
#  / /   / __ \/ __ `__ \/ /_/ __ \/ ___/ __/ __ `/ __ \/ / _ \
# / /___/ /_/ / / / / / / __/ /_/ / /  / /_/ /_/ / /_/ / /  __/
# \____/\____/_/ /_/ /_/_/  \____/_/   \__/\__,_/_.___/_/\___/
#
#     ____  __            _                ____         _______       __
#    / __ \/ /___ ___  __(_)___  ____ _   /  _/___     / ____/ |     / /
#   / /_/ / / __ `/ / / / / __ \/ __ `/   / // __ \   / / __ | | /| / /
#  / ____/ / /_/ / /_/ / / / / / /_/ /  _/ // / / /  / /_/ / | |/ |/ /
# /_/   /_/\__,_/\__, /_/_/ /_/\__, /  /___/_/ /_/   \____/  |__/|__/
#               /____/        /____/

"""
Create service files
"""


def main():
    """
    main
    """
    from pymod.csf import CreateServiceFiles

    CreateServiceFiles().run()


if __name__ == '__main__':
    import sys
    sys.exit(main())
