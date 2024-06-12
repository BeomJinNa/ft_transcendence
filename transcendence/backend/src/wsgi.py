"""
WSGI config for src project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

# 이 파일은 Django 프로젝트의 WSGI(Web Server Gateway Interface) 설정을 정의합니다.
# WSGI는 웹 서버와 Django 애플리케이션 간의 인터페이스 역할을 합니다.

import os
from django.core.wsgi import get_wsgi_application

# Django 설정 모듈을 지정합니다. 'src.settings'는 프로젝트의 설정 파일을 가리킵니다.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

# WSGI 애플리케이션 객체를 생성합니다. 이 객체가 웹 서버와 Django 애플리케이션 간의 요청과 응답을 처리합니다.
application = get_wsgi_application()
