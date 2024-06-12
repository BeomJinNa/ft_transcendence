"""
ASGI config for src project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

# 이 파일은 ASGI (Asynchronous Server Gateway Interface) 설정 파일입니다.
# Django 프로젝트를 비동기 서버와 연결하기 위한 설정을 담고 있습니다.

import os
from django.core.asgi import get_asgi_application

# 'src.settings' 모듈을 기본 Django 설정 모듈로 설정합니다.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

# ASGI 애플리케이션 객체를 생성합니다.
application = get_asgi_application()
