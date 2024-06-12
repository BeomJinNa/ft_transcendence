#!/usr/bin/env python

# 이 파일은 Django 프로젝트의 관리 스크립트로, 서버를 실행하거나, 데이터베이스 마이그레이션을 적용하는 등의 명령을 처리합니다.

import os
import sys

def main():
    # 'DJANGO_SETTINGS_MODULE' 환경 변수를 'src.settings'로 설정하여 Django 설정 모듈을 지정합니다.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
    try:
        # Django의 명령줄 유틸리티 함수인 execute_from_command_line을 가져옵니다.
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Django를 가져올 수 없을 때 발생하는 예외를 처리합니다.
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # 명령줄 인수를 통해 받은 명령을 실행합니다.
    execute_from_command_line(sys.argv)

# 이 스크립트가 직접 실행될 때 main() 함수를 호출합니다.
if __name__ == '__main__':
    main()
