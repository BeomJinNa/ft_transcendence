from django.urls import path
from .views import RegisterView, LoginView

# 이 파일은 인증 관련 URL 경로를 정의하는 파일입니다.
# 여기서는 회원가입과 로그인을 위한 URL 경로를 정의합니다.

urlpatterns = [
    # '/register/' 경로로 요청이 들어오면 RegisterView 클래스를 사용하여 요청을 처리합니다.
    path('register/', RegisterView.as_view(), name='register'),

    # '/login/' 경로로 요청이 들어오면 LoginView 클래스를 사용하여 요청을 처리합니다.
    path('login/', LoginView.as_view(), name='login'),
]
