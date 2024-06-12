-- 이 파일은 PostgreSQL 데이터베이스와 사용자를 초기화하는 SQL 스크립트입니다.
-- 데이터베이스 컨테이너가 처음 시작될 때 실행되어 특정 데이터베이스와 사용자를 생성합니다.

-- PL/pgSQL 블록을 사용하여 'pong_db' 데이터베이스가 존재하지 않으면 생성합니다.
DO $$
BEGIN
    -- 'pong_db' 데이터베이스가 존재하지 않으면
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pong_db') THEN
        -- 'pong_db' 데이터베이스를 생성합니다.
        CREATE DATABASE pong_db;
    END IF;
END
$$;

-- PL/pgSQL 블록을 사용하여 'pong_user' 사용자가 존재하지 않으면 생성합니다.
DO $$
BEGIN
    -- 'pong_user' 사용자가 존재하지 않으면
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'pong_user') THEN
        -- 'pong_user' 사용자를 'pong_password' 비밀번호와 함께 생성합니다.
        CREATE USER pong_user WITH ENCRYPTED PASSWORD 'pong_password';
    END IF;
END
$$;
