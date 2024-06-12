# backend/src/urls.py
# 이 파일은 Django 프로젝트의 URL 라우팅을 설정합니다.
# 여기서는 관리자(admin) 인터페이스와 인증(authentication) 관련 URL 패턴을 정의합니다.

from django.contrib import admin
from django.urls import path, include

# URL 패턴을 정의합니다.
urlpatterns = [
    # '/admin/' 경로로 접근하면 관리자 사이트로 라우팅됩니다.
    path('admin/', admin.site.urls),

    # '/api/auth/' 경로로 접근하면 src.authentication 앱의 URL로 라우팅됩니다.
    path('api/auth/', include('src.authentication.urls')),
]
