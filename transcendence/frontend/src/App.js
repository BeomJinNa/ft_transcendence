import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Game from './Game';

/*
  이 파일은 React 애플리케이션의 진입점인 App 컴포넌트를 정의합니다.
  App 컴포넌트는 로그인 상태 관리, 라우팅 설정, 네비게이션 링크 등을 포함합니다.
  각 페이지 컴포넌트(Login, Register, Game, Home)를 불러와서 라우팅 설정을 통해 페이지 이동을 관리합니다.
*/

function App() {
    // isLoggedIn 상태를 통해 사용자의 로그인 상태를 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 토큰을 가져와 로그인 상태를 설정
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // 로그아웃 핸들러 함수
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Routes>
                {/* 라우팅 설정 */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game" element={<Game handleLogout={handleLogout} />} />
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
            </Routes>
        </div>
    );
}

// 홈 컴포넌트 정의
function Home({ isLoggedIn, handleLogout }) {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p>Please select an option below:</p>
            <nav>
                {/* 로그인 상태에 따라 다른 네비게이션 버튼을 표시 */}
                {isLoggedIn ? (
                    <>
                        <Link to="/game">
                            <button style={{ padding: '10px 20px', margin: '10px' }}>Start Game</button>
                        </Link>
                        <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
                        </Link>
                        <Link to="/register">
                            <button style={{ padding: '10px 20px', margin: '10px' }}>Register</button>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
}

export default App;
