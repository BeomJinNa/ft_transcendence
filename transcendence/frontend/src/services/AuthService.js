// frontend/src/services/AuthService.js

/*
  이 파일은 인증 관련 API 요청을 처리하는 함수들을 정의한 서비스 파일입니다.
  register 함수와 login 함수가 있으며, 각각 회원가입과 로그인 요청을 서버로 보내는 역할을 합니다.
*/

const BASE_URL = 'http://localhost:8000/api/auth'; // 백엔드 API의 기본 URL

/*
  회원가입 요청을 처리하는 함수
  이메일과 비밀번호를 받아서 POST 요청을 보내고, 서버의 응답을 JSON 형태로 반환합니다.
*/
export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 요청 본문의 데이터 타입을 JSON으로 설정
    },
    body: JSON.stringify({ email, password }), // 요청 본문에 이메일과 비밀번호를 JSON 형태로 포함
  });
  return response.json(); // 서버의 응답을 JSON 형태로 반환
};

/*
  로그인 요청을 처리하는 함수
  이메일과 비밀번호를 받아서 POST 요청을 보내고, 서버의 응답을 JSON 형태로 반환합니다.
*/
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 요청 본문의 데이터 타입을 JSON으로 설정
    },
    body: JSON.stringify({ email, password }), // 요청 본문에 이메일과 비밀번호를 JSON 형태로 포함
  });
  return response.json(); // 서버의 응답을 JSON 형태로 반환
};
