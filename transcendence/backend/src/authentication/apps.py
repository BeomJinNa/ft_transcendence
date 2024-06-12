from django.apps import AppConfig

# 이 파일은 Django 애플리케이션의 설정을 정의하는 파일입니다.
# 여기에서는 'src.authentication' 애플리케이션의 설정을 정의하고 있습니다.

class AuthenticationConfig(AppConfig):
    # 'name' 속성은 애플리케이션의 전체 Python 경로를 나타냅니다.
    name = 'src.authentication'
