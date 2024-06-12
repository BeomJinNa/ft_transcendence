import React from 'react';
import { Link } from 'react-router-dom';

/*
  이 파일은 React 애플리케이션의 Home 컴포넌트를 정의합니다.
  Home 컴포넌트는 메인 페이지를 렌더링하며, 로그인 상태에 따라 게임 시작, 로그아웃, 로그인, 회원가입 버튼을 표시합니다.
*/

function Home({ isLoggedIn, handleLogout }) {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p>Please select an option below:</p>
            {isLoggedIn ? (
                <>
                    {/* 로그인 상태일 때: 게임 시작과 로그아웃 버튼 */}
                    <Link to="/game">
                        <button style={{ padding: '10px 20px', margin: '10px' }}>Start Game</button>
                    </Link>
                    <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>Logout</button>
                </>
            ) : (
                <>
                    {/* 비로그인 상태일 때: 로그인과 회원가입 버튼 */}
                    <Link to="/login">
                        <button style={{ padding: '10px 20px', margin: '10px' }}>Login</button>
                    </Link>
                    <Link to="/register">
                        <button style={{ padding: '10px 20px', margin: '10px' }}>Register</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default Home;
