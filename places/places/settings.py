import sys

try: 
    from places.settings_module.local_settings import *
except ImportError:
    print('''
    copy
        <root>/places/settings_module/local_settings.examplepy
    into 
        <root>/places/settings_module/local_settings.py
    ...
    ''')
    sys.exit()