# backend/wait_for_db.py
# 이 스크립트는 PostgreSQL 데이터베이스가 준비될 때까지 기다린 후 Django 마이그레이션을 적용하고 서버를 실행합니다.
# 컨테이너가 시작될 때 데이터베이스의 준비 상태를 확인하고, 데이터베이스가 준비되지 않으면 일정 시간 대기합니다.

import time
import psycopg2
from psycopg2 import OperationalError
import os

def wait_for_db():
    while True:
        try:
            # 데이터베이스 연결을 시도합니다.
            conn = psycopg2.connect(
                dbname=os.environ.get('DATABASE_NAME'),   # 환경 변수에서 데이터베이스 이름을 가져옵니다.
                user=os.environ.get('DATABASE_USER'),     # 환경 변수에서 데이터베이스 사용자 이름을 가져옵니다.
                password=os.environ.get('DATABASE_PASSWORD'), # 환경 변수에서 데이터베이스 비밀번호를 가져옵니다.
                host=os.environ.get('DATABASE_HOST'),     # 환경 변수에서 데이터베이스 호스트를 가져옵니다.
                port=os.environ.get('DATABASE_PORT')      # 환경 변수에서 데이터베이스 포트를 가져옵니다.
            )
            conn.close()  # 연결이 성공하면 연결을 닫고 루프를 종료합니다.
            break
        except OperationalError:
            # 데이터베이스에 연결할 수 없는 경우, 5초 동안 대기한 후 다시 시도합니다.
            print("Waiting for db:5432...")
            time.sleep(5)

wait_for_db()

# 데이터베이스가 준비되면 Django 마이그레이션을 적용하고 서버를 실행합니다.
os.system("python manage.py migrate && python manage.py runserver 0.0.0.0:8000")
