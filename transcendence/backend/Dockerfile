# 이 파일은 백엔드 서비스를 위한 Docker 이미지를 정의하는 Dockerfile입니다.
# Python 3.9 이미지를 기본 이미지로 사용합니다.
FROM python:3.9

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# requirements.txt 파일을 컨테이너의 /app/ 디렉토리에 복사합니다.
COPY requirements.txt /app/

# pip를 업그레이드하고 requirements.txt 파일에 정의된 Python 패키지를 설치합니다.
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# src 디렉토리를 컨테이너의 /app/src 디렉토리에 복사합니다.
COPY src /app/src

# manage.py 파일을 컨테이너의 /app/ 디렉토리에 복사합니다.
COPY manage.py /app/

# wait_for_db.py 파일을 컨테이너의 /app/ 디렉토리에 복사합니다.
COPY wait_for_db.py /app/

# 컨테이너가 시작될 때 wait_for_db.py 스크립트를 실행합니다.
CMD ["python", "wait_for_db.py"]
