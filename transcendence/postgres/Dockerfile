# postgres/Dockerfile 파일은 PostgreSQL 데이터베이스 컨테이너의 빌드 설정을 정의합니다.
# 이 파일을 통해 데이터베이스 컨테이너를 빌드할 때 필요한 초기화 스크립트를 포함시킵니다.

# 최신 버전의 PostgreSQL 이미지를 기반 이미지로 설정합니다.
FROM postgres:latest

# init.sql 파일을 컨테이너의 /docker-entrypoint-initdb.d/ 디렉토리에 복사합니다.
# 이 스크립트는 컨테이너가 처음 시작될 때 실행되어 초기화 작업을 수행합니다.
COPY init.sql /docker-entrypoint-initdb.d/
