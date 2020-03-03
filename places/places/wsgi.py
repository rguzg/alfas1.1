"""
WSGI config for places project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
from dotenv import load_dotenv
from django.core.wsgi import get_wsgi_application
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, '.env'))

ENV_PATH = os.path.join(BASE_DIR, '.env')
if os.path.exists(ENV_PATH):
    load_dotenv(ENV_PATH)
else:
    print("copy <root>/.example.env <root>/.env")
    sys.exit()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'places.settings')

application = get_wsgi_application()
