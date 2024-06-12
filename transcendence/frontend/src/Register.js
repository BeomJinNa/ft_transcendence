import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/*
  이 파일은 React 애플리케이션의 Register 컴포넌트를 정의합니다.
  Register 컴포넌트는 사용자 회원가입을 처리하는 역할을 합니다.
  사용자가 회원가입 양식을 작성하고 제출하면, 입력된 데이터가 백엔드 서버의 회원가입 엔드포인트로 전송됩니다.
*/

function Register() {
    // 컴포넌트 상태 정의
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL; // 백엔드 API URL

    // 회원가입 처리 함수
    const handleRegister = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        const response = await fetch(`${apiUrl}/api/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }), // 입력된 데이터를 JSON 형식으로 변환하여 전송
        });

        if (response.ok) {
            // 회원가입 성공 시
            alert('Registration successful');
            navigate('/login'); // 로그인 페이지로 이동
        } else {
            // 회원가입 실패 시
            const data = await response.json();
            alert(`Registration failed: ${JSON.stringify(data)}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{ padding: '10px', margin: '10px', width: '200px' }}
                />
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{ padding: '10px', margin: '10px', width: '200px' }}
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ padding: '10px', margin: '10px', width: '200px' }}
                />
                <br />
                <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>Register</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ padding: '10px', display: 'inline-block' }}>Already have an account? Login</Link>
                <Link to="/" style={{ padding: '10px', display: 'inline-block' }}>Home</Link>
            </div>
        </div>
    );
}

export default Register;
