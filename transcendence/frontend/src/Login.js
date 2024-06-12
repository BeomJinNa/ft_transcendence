import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/*
  이 파일은 React 애플리케이션의 Login 컴포넌트를 정의합니다.
  Login 컴포넌트는 사용자가 로그인할 수 있는 양식을 제공합니다.
  로그인 성공 시, 사용자는 홈 페이지로 리디렉션됩니다.
  로그인 실패 시, 에러 메시지가 표시됩니다.
*/

function Login({ setIsLoggedIn }) {
    // email과 password 상태를 관리합니다.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    // 로그인 요청을 처리하는 함수입니다.
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // 토큰을 로컬 스토리지에 저장합니다.
            setIsLoggedIn(true); // 로그인 상태를 업데이트합니다.
            navigate('/'); // 홈 페이지로 리디렉션합니다.
        } else {
            const data = await response.json();
            alert(`Login failed: ${JSON.stringify(data)}`); // 로그인 실패 시, 에러 메시지를 표시합니다.
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                {/* 회원가입 페이지와 홈 페이지로 이동할 수 있는 링크를 제공합니다. */}
                <Link to="/register" style={{ padding: '10px', display: 'inline-block' }}>Don't have an account? Register</Link>
                <Link to="/" style={{ padding: '10px', display: 'inline-block' }}>Home</Link>
            </div>
        </div>
    );
}

export default Login;
