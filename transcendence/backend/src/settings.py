# backend/src/settings.py
# 이 파일은 Django 프로젝트의 설정을 정의합니다. 데이터베이스 설정, 미들웨어, 애플리케이션 설치 등을 포함합니다.

import os
from pathlib import Path

# 디버그 모드 활성화 (개발 중에만 사용해야 함)
DEBUG = True

# 프로젝트의 기본 디렉토리를 설정
BASE_DIR = Path(__file__).resolve().parent.parent

# Django 애플리케이션 및 타사 애플리케이션을 설치 목록
INSTALLED_APPS = [
    'django.contrib.admin',  # 관리자 사이트
    'django.contrib.auth',  # 인증 프레임워크
    'django.contrib.contenttypes',  # 콘텐츠 유형 프레임워크
    'django.contrib.sessions',  # 세션 프레임워크
    'django.contrib.messages',  # 메시지 프레임워크
    'django.contrib.staticfiles',  # 정적 파일 관리
    'corsheaders',  # CORS 헤더 관리
    'src.authentication',  # 사용자 정의 인증 애플리케이션
    'rest_framework',  # Django REST framework
    'rest_framework.authtoken',  # REST framework의 토큰 인증
]

# 미들웨어 설정
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # CORS 미들웨어
    'django.middleware.common.CommonMiddleware',  # 공통 미들웨어
    'django.middleware.security.SecurityMiddleware',  # 보안 미들웨어
    'django.contrib.sessions.middleware.SessionMiddleware',  # 세션 미들웨어
    'django.middleware.common.CommonMiddleware',  # 공통 미들웨어 (중복)
    'django.middleware.csrf.CsrfViewMiddleware',  # CSRF 방지 미들웨어
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # 인증 미들웨어
    'django.contrib.messages.middleware.MessageMiddleware',  # 메시지 미들웨어
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # 클릭재킹 방지 미들웨어
]

# 모든 출처에서의 CORS 요청 허용 (개발 중에만 사용해야 함)
CORS_ALLOW_ALL_ORIGINS = True

# Django REST framework 설정
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',  # 토큰 인증 사용
    ),
}

# 프로젝트의 루트 URL 설정
ROOT_URLCONF = 'src.urls'

# 템플릿 설정
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # Django 템플릿 엔진 사용
        'DIRS': [],  # 추가 템플릿 디렉토리 없음
        'APP_DIRS': True,  # 애플리케이션의 템플릿 디렉토리 사용
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',  # 디버그 컨텍스트 프로세서
                'django.template.context_processors.request',  # 요청 컨텍스트 프로세서
                'django.contrib.auth.context_processors.auth',  # 인증 컨텍스트 프로세서
                'django.contrib.messages.context_processors.messages',  # 메시지 컨텍스트 프로세서
            ],
        },
    },
]

# WSGI 애플리케이션 설정
WSGI_APPLICATION = 'src.wsgi.application'

# 데이터베이스 설정 (PostgreSQL 사용)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',  # PostgreSQL 백엔드 사용
        'NAME': os.environ.get('DATABASE_NAME'),  # 데이터베이스 이름 (환경 변수에서 가져옴)
        'USER': os.environ.get('DATABASE_USER'),  # 데이터베이스 사용자 (환경 변수에서 가져옴)
        'PASSWORD': os.environ.get('DATABASE_PASSWORD'),  # 데이터베이스 비밀번호 (환경 변수에서 가져옴)
        'HOST': os.environ.get('DATABASE_HOST'),  # 데이터베이스 호스트 (환경 변수에서 가져옴)
        'PORT': os.environ.get('DATABASE_PORT'),  # 데이터베이스 포트 (환경 변수에서 가져옴)
    }
}

# 모든 호스트 허용 (개발 중에만 사용해야 함)
ALLOWED_HOSTS = ['*']

# Django 프로젝트의 비밀 키 (프로덕션 환경에서는 안전하게 관리해야 함)
SECRET_KEY = 'django-insecure-1n@a0*yzjv=)f+f%#c$0o5#6&pxu)y(-8d7^@$@z2&0(vw6g-v'

# 정적 파일 설정 (CSS, JavaScript, 이미지 등)
STATIC_URL = '/static/'

# 기본 자동 필드 설정
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
