import React from 'react';
import { Link } from 'react-router-dom';

/*
  이 파일은 React 애플리케이션의 NavBar 컴포넌트를 정의합니다.
  NavBar 컴포넌트는 사용자의 로그인 상태에 따라 다른 네비게이션 옵션을 제공합니다.
  로그인 상태일 때는 게임 시작과 로그아웃 버튼을, 비로그인 상태일 때는 로그인과 회원가입 버튼을 표시합니다.
*/

function NavBar({ isLoggedIn, handleLogout }) {
    return (
        <nav>
            {isLoggedIn ? (
                // 사용자가 로그인 상태일 때
                <>
                    <Link to="/game">
                        <button style={{ padding: '10px 20px', margin: '10px' }}>Start Game</button>
                    </Link>
                    <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>Logout</button>
                </>
            ) : (
                // 사용자가 비로그인 상태일 때
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
    );
}

export default NavBar;
