.PHONY: up
up:
# 도커 컴포즈를 사용하여 서비스를 백그라운드 모드로 실행
	docker-compose -f transcendence/docker-compose.yml up -d

.PHONY: down
down:
# 실행 중인 서비스를 중지하고 컨테이너를 제거
	docker-compose -f transcendence/docker-compose.yml down

.PHONY: vdown
vdown:
# 서비스를 중지하고, 컨테이너를 완전히 제거
	docker-compose -f transcendence/docker-compose.yml down -v

.PHONY: build
build:
# 도커 컴포즈를 사용하여 서비스에 대한 이미지를 빌드
	docker-compose -f transcendence/docker-compose.yml build

.PHONY: iclean
iclean:
# 도커 이미지 제거
	docker rmi `docker images -aq` -f

.PHONY: vclean
vclean:
# PostgreSQL 볼륨 제거
	docker volume rm transcendence_transcendence-db-data

.PHONY: fclean
fclean:
# 모든 이미지, 컨테이너 전체 청소
	$(MAKE) vdown
	$(MAKE) iclean
	$(MAKE) vclean

.PHONY: re
re:
# 서비스 재시작: 전체 청소 후 다시 빌드 및 실행
	$(MAKE) vdown
	$(MAKE) build
	$(MAKE) up
