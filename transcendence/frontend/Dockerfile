# frontend/Dockerfile
# 이 파일은 프론트엔드 애플리케이션을 위한 Dockerfile입니다.
# Node.js 환경에서 애플리케이션을 빌드하고 실행합니다.

# Node.js 16 버전의 Alpine Linux 이미지를 사용합니다.
FROM node:16-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json과 package-lock.json 파일을 작업 디렉토리로 복사합니다.
COPY package*.json ./

# 애플리케이션의 의존성을 설치합니다.
RUN npm install && npm list

# 나머지 애플리케이션 코드를 작업 디렉토리로 복사합니다.
COPY . .

# 컨테이너에서 사용할 포트를 노출합니다.
EXPOSE 3000

# 애플리케이션을 시작하는 명령어를 설정합니다.
CMD ["npm", "start"]
