# ft_transcendence

## 1. 프로젝트 소개

### 프로젝트 개요
이 프로젝트는 웹 개발을 처음 접하는 사람들을 위해 Django와 React를 사용하여 간단한 Pong 게임을 구축하는 예제입니다. 이 프로젝트를 통해 프론트엔드와 백엔드가 어떻게 상호작용하는지, Docker를 사용하여 개발 환경을 설정하고 애플리케이션을 배포하는 방법을 학습할 수 있습니다.

### 주요 기능 소개
- **사용자 인증**: 사용자 등록, 로그인, 로그아웃 기능을 제공합니다.
- **게임 플레이**: 간단한 Pong 게임을 구현하여 두 명의 플레이어가 경쟁할 수 있습니다.
- **API 통신**: 프론트엔드와 백엔드가 REST API를 통해 데이터를 주고받습니다.
- **Docker 환경**: Docker를 사용하여 개발 환경을 손쉽게 설정하고 관리할 수 있습니다.

### 사용 기술 스택
- **프론트엔드**: React, React Router
- **백엔드**: Django, Django REST Framework
- **데이터베이스**: PostgreSQL
- **기타**: Docker, Docker Compose

이 프로젝트는 위의 기술 스택을 사용하여 웹 애플리케이션을 구축하는 과정을 단계별로 설명합니다. 각 기술의 역할과 사용법을 이해하는 데 도움이 될 것입니다.

## 2. 프로젝트 준비

### 프로젝트 클론
먼저, 이 프로젝트의 소스 코드를 로컬 머신에 클론해야 합니다. 터미널을 열고 다음 명령어를 입력하세요:

```sh
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

위 명령어는 프로젝트를 클론하고 해당 디렉토리로 이동합니다.

### 필수 소프트웨어 설치
이 프로젝트를 실행하려면 다음 소프트웨어가 설치되어 있어야 합니다:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

Docker와 Docker Compose가 이미 설치되어 있다면, 다음 단계로 넘어가세요.

### Docker 설정 확인
Docker가 제대로 설치되었는지 확인하려면, 터미널에서 다음 명령어를 입력하세요:

```sh
docker --version
docker-compose --version
```

이 명령어들은 Docker와 Docker Compose의 버전을 출력합니다. 버전이 출력되면 설치가 제대로 된 것입니다.

### 환경 변수 설정
프로젝트에서 사용하는 환경 변수는 `docker-compose.yml` 파일에서 설정됩니다. 이 파일에는 데이터베이스와 애플리케이션을 위한 환경 변수가 포함되어 있습니다.

환경 변수 예시:
```yaml
services:
  db:
    environment:
      POSTGRES_DB: pong_db
      POSTGRES_USER: pong_user
      POSTGRES_PASSWORD: pong_password
  backend:
    environment:
      DATABASE_HOST: db
      DATABASE_NAME: pong_db
      DATABASE_USER: pong_user
      DATABASE_PASSWORD: pong_password
      DATABASE_PORT: 5432
  frontend:
    environment:
      REACT_APP_API_URL: http://localhost:8000
```

이 변수들은 각 서비스가 시작될 때 사용됩니다. 필요에 따라 값을 수정할 수 있습니다.

## 3. 프로젝트 실행

이 파트에서는 도커를 사용하여 프론트엔드와 백엔드 서비스를 실행하는 방법을 설명합니다. 도커는 애플리케이션을 독립적인 환경에서 실행할 수 있게 해주는 도구로, 설치된 패키지나 환경 설정의 영향을 받지 않고 일관된 환경을 제공합니다.

### Docker Compose 설정

Docker Compose를 사용하여 여러 개의 도커 컨테이너를 한꺼번에 설정하고 실행할 수 있습니다. `docker-compose.yml` 파일은 이러한 설정을 정의하는 파일입니다.

#### Docker Compose 파일 설명

`docker-compose.yml` 파일은 다음과 같은 서비스들을 정의합니다:

- **db**: PostgreSQL 데이터베이스 서비스
- **backend**: Django 백엔드 서비스
- **frontend**: React 프론트엔드 서비스

각 서비스는 이미지, 환경 변수, 포트 매핑, 의존성 등을 정의합니다.

```yaml
version: '3.8'

services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_DB: pong_db
      POSTGRES_USER: pong_user
      POSTGRES_PASSWORD: pong_password
    ports:
      - "5432:5432"
    volumes:
      - transcendence-db-data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DATABASE_HOST: db
      DATABASE_NAME: pong_db
      DATABASE_USER: pong_user
      DATABASE_PASSWORD: pong_password
      DATABASE_PORT: 5432
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:8000
    networks:
      - app-network

volumes:
  transcendence-db-data:

networks:
  app-network:
    driver: bridge
```

### Docker Compose를 사용한 프로젝트 실행

이제 `docker-compose` 명령어를 사용하여 모든 서비스를 한 번에 시작할 수 있습니다. 다음 명령어를 터미널에 입력하세요:

```sh
docker-compose up --build
```

이 명령어는 다음 작업을 수행합니다:
1. 정의된 이미지를 빌드하고 컨테이너를 시작합니다.
2. 각 서비스의 로그를 터미널에 출력합니다.

### 서비스 확인

모든 서비스가 정상적으로 시작되면, 다음 주소에서 각각의 서비스를 확인할 수 있습니다:

- 프론트엔드 (React): [http://localhost:3000](http://localhost:3000)
- 백엔드 (Django): [http://localhost:8000](http://localhost:8000)

### 파일 구조 및 역할

프로젝트의 주요 파일과 디렉토리 구조는 다음과 같습니다:

```
.
├── backend
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   ├── src
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── authentication
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── tests.py
│   │   │   ├── urls.py
│   │   │   └── views.py
│   └── wait_for_db.py
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── Game.js
│       ├── Home.js
│       ├── Login.js
│       ├── NavBar.js
│       ├── Register.js
│       ├── index.css
│       ├── index.js
│       └── services
│           └── AuthService.js
└── postgres
    ├── Dockerfile
    └── init.sql
```

#### 백엔드 (Django)

`backend` 디렉토리는 Django 프로젝트의 핵심 파일과 디렉토리를 포함합니다.

- `manage.py`: Django 프로젝트 관리 스크립트.
- `requirements.txt`: 프로젝트의 파이썬 의존성을 정의하는 파일.
- `src/`: Django 프로젝트의 설정 및 애플리케이션 모듈을 포함하는 디렉토리.
  - `settings.py`: Django 프로젝트의 설정 파일.
  - `urls.py`: URL 라우팅을 정의하는 파일.
  - `wsgi.py`와 `asgi.py`: 각각 WSGI와 ASGI 애플리케이션 설정 파일.
  - `authentication/`: 사용자 인증 관련 애플리케이션 모듈.
    - `models.py`: 데이터베이스 모델 정의.
    - `serializers.py`: 데이터 직렬화 및 역직렬화 클래스.
    - `views.py`: HTTP 요청을 처리하는 클래스.
    - `urls.py`: authentication 앱의 URL 라우팅 정의.

#### 프론트엔드 (React)

`frontend` 디렉토리는 React 애플리케이션의 핵심 파일과 디렉토리를 포함합니다.

- `public/index.html`: React 애플리케이션의 HTML 템플릿.
- `src/`: React 컴포넌트와 서비스 파일을 포함하는 디렉토리.
  - `index.js`: React 진입점 파일로, 최상위 컴포넌트를 렌더링.
  - `App.js`: 최상위 컴포넌트로, 라우팅 및 전역 상태 관리.
  - `Game.js`, `Home.js`, `Login.js`, `Register.js`: 각 페이지별 컴포넌트.
  - `NavBar.js`: 내비게이션 바 컴포넌트.
  - `services/AuthService.js`: 인증 관련 API 요청을 처리하는 서비스.

## 4. 프론트엔드 상세 설명

### 4.1 React 소개 및 역할

#### 4.1.1 React란 무엇인가?
React는 Facebook에서 개발한 오픈 소스 자바스크립트 라이브러리로, 주로 싱글 페이지 애플리케이션(SPA)과 모바일 애플리케이션의 사용자 인터페이스(UI)를 구축하기 위해 사용됩니다. 컴포넌트 기반의 아키텍처를 통해 복잡한 UI를 효율적으로 관리하고, 재사용 가능한 컴포넌트를 통해 개발 생산성을 높일 수 있습니다.

#### 4.1.2 React의 주요 개념
##### 컴포넌트
컴포넌트는 React 애플리케이션의 기본 단위로, 독립적이고 재사용 가능한 코드 블록입니다. 각 컴포넌트는 JSX(JavaScript XML)를 사용하여 UI를 정의하고, 필요한 데이터를 props를 통해 전달받습니다.

##### 상태와 속성
- **상태(State)**: 컴포넌트 내에서 관리되는 동적인 데이터입니다. 상태가 변경되면 컴포넌트는 자동으로 다시 렌더링됩니다.
- **속성(Props)**: 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터입니다. 속성은 읽기 전용이며, 자식 컴포넌트에서 변경할 수 없습니다.

##### 생명주기 메서드
React 컴포넌트는 생성, 업데이트, 제거 등의 생명주기 메서드를 가지고 있습니다. 이 메서드를 사용하여 특정 시점에 실행할 코드를 정의할 수 있습니다.

##### 이벤트 핸들링
React에서는 JSX를 통해 이벤트를 처리할 수 있습니다. 이벤트 핸들러는 일반적으로 컴포넌트의 메서드로 정의되며, 특정 이벤트가 발생할 때 호출됩니다.

### 4.2 프로젝트 구조

#### 4.2.1 디렉토리 및 파일 구조
```
frontend/
├── Dockerfile
├── package.json
├── package-lock.json
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── Game.js
│   ├── Home.js
│   ├── Login.js
│   ├── NavBar.js
│   ├── Register.js
│   ├── index.css
│   ├── index.js
│   └── services/
│       └── AuthService.js
```

#### 4.2.2 각 파일의 역할
- **Dockerfile**: 프론트엔드 애플리케이션을 도커 컨테이너로 빌드하고 실행하기 위한 설정 파일입니다.
- **package.json**: 프로젝트 메타데이터 및 종속성 목록을 포함한 파일입니다.
- **package-lock.json**: 종속성 트리를 정확하게 기록하여 동일한 종속성을 설치할 수 있도록 하는 파일입니다.
- **public/index.html**: React 애플리케이션의 루트 HTML 파일로, 모든 React 컴포넌트는 이 파일 내의 `div#root`에 렌더링됩니다.
- **src/App.js**: 애플리케이션의 루트 컴포넌트로, 라우팅과 상위 레벨 상태 관리를 담당합니다.
- **src/Game.js**: 게임 페이지를 렌더링하는 컴포넌트입니다.
- **src/Home.js**: 홈 페이지를 렌더링하는 컴포넌트입니다.
- **src/Login.js**: 로그인 페이지를 렌더링하고 로그인 로직을 처리하는 컴포넌트입니다.
- **src/NavBar.js**: 네비게이션 바를 렌더링하는 컴포넌트입니다.
- **src/Register.js**: 회원가입 페이지를 렌더링하고 회원가입 로직을 처리하는 컴포넌트입니다.
- **src/index.css**: 전역 스타일을 정의하는 CSS 파일입니다.
- **src/index.js**: 애플리케이션의 진입점 파일로, ReactDOM을 통해 `App` 컴포넌트를 `div#root`에 렌더링합니다.
- **src/services/AuthService.js**: 인증 관련 API 요청을 처리하는 서비스 파일입니다.

### 4.3 파일 간의 연결 및 유기적 관계

#### 4.3.1 파일 간의 참조 흐름
- **index.html**: React 애플리케이션이 렌더링될 기본 HTML 구조를 제공합니다. 
- **index.js**: ReactDOM을 사용하여 `App` 컴포넌트를 `index.html`의 `div#root`에 렌더링합니다.
- **App.js**: 라우팅 설정과 상위 레벨 상태 관리를 담당하며, `Home`, `Login`, `Register`, `Game` 컴포넌트를 라우트에 따라 렌더링합니다.
- **AuthService.js**: 로그인 및 회원가입 요청을 처리하여 백엔드 API와 통신합니다.
- **각 페이지 컴포넌트**: `Login`, `Register`, `Game`, `Home` 컴포넌트는 `App` 컴포넌트에서 라우팅을 통해 호출됩니다.

#### 4.3.2 주요 컴포넌트 간의 상호작용
- **App 컴포넌트**: 최상위 컴포넌트로, 모든 페이지 컴포넌트를 라우팅하여 관리합니다. `isLoggedIn` 상태를 통해 로그인 여부를 관리하며, 로그아웃 시 상태를 업데이트합니다.
- **AuthService**: `Login` 및 `Register` 컴포넌트에서 호출되어 백엔드 API와 통신합니다.
- **각 페이지 컴포넌트**: 개별 페이지의 UI를 렌더링하고, 사용자의 입력을 처리하며, 필요시 `AuthService`를 호출하여 백엔드와 통신합니다.

### 4.4 주요 컴포넌트 설명

#### 4.4.1 App.js
- **역할 및 주요 기능**: 애플리케이션의 루트 컴포넌트로, 모든 라우팅을 관리합니다. `isLoggedIn` 상태를 통해 로그인 여부를 관리하며, 로그인 상태에 따라 다른 컴포넌트를 렌더링합니다.
- **상태 관리 및 라우팅**: `useState`와 `useEffect`를 사용하여 로그인 상태를 관리하고, `react-router-dom`의 `Routes`와 `Route`를 사용하여 라우팅을 설정합니다.

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Game from './Game';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game" element={<Game handleLogout={handleLogout} />} />
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
            </Routes>
        </div>
    );
}

function Home({ isLoggedIn, handleLogout }) {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p>Please select an option below:</p>
            <nav>
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
```

#### 4.4.2 Home.js
- **역할 및 주요 기능**: 홈 페이지를 렌더링하며, 로그인 여부에 따라 다른 링크를 제공합니다.

```javascript
import React from

 'react';
import { Link } from 'react-router-dom';

function Home({ isLoggedIn, handleLogout }) {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p>Please select an option below:</p>
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
        </div>
    );
}

export default Home;
```

#### 4.4.3 Login.js
- **역할 및 주요 기능**: 로그인 페이지를 렌더링하고, 로그인 요청을 처리합니다.
- **로그인 처리 로직**: 사용자가 입력한 이메일과 비밀번호를 `AuthService`를 통해 백엔드로 전송하여 인증을 수행합니다.

```javascript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            navigate('/');
        } else {
            const data = await response.json();
            alert(`Login failed: ${JSON.stringify(data)}`);
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
                <Link to="/register" style={{ padding: '10px', display: 'inline-block' }}>Don't have an account? Register</Link>
                <Link to="/" style={{ padding: '10px', display: 'inline-block' }}>Home</Link>
            </div>
        </div>
    );
}

export default Login;
```

#### 4.4.4 Register.js
- **역할 및 주요 기능**: 회원가입 페이지를 렌더링하고, 회원가입 요청을 처리합니다.
- **회원가입 처리 로직**: 사용자가 입력한 사용자 이름, 이메일 및 비밀번호를 `AuthService`를 통해 백엔드로 전송하여 회원가입을 처리합니다.

```javascript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/api/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert('Registration successful');
            navigate('/login');
        } else {
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
```

#### 4.4.5 Game.js
- **역할 및 주요 기능**: 게임 페이지를 렌더링하고, 사용자가 게임을 할 수 있는 인터페이스를 제공합니다. 현재는 게임 로직이 구현되지 않았으며, 필요한 경우 이 부분에 새로운 게임 로직을 추가할 수 있습니다.

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Game Page</h1>
            <div>
                <button onClick={handleGoHome} style={{ padding: '10px 20px', margin: '10px' }}>Home</button>
                <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>Logout</button>
            </div>
            <div id="game-container" style={{ marginTop: '50px' }}>
                {/* 여기에 새로운 게임 로직을 추가하세요 */}
            </div>
        </div>
    );
}

export default Game;
```

#### 4.4.6 NavBar.js
- **역할 및 주요 기능**: 네비게이션 바를 렌더링하고, 로그인 여부에 따라 다른 링크를 제공합니다.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, handleLogout }) {
    return (
        <nav>
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
    );
}

export default NavBar;
```

### 4.5 서비스 및 유틸리티

#### 4.5.1 AuthService.js
- **역할 및 주요 기능**: 인증 관련 API 요청을 처리합니다. 회원가입 및 로그인 요청을 백엔드 API에 전송하고, 응답을 처리합니다.

```javascript
const BASE_URL = 'http://localhost:8000/api/auth';

export const register = async (email, password) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers

: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
```

### 4.6 스타일링

#### 4.6.1 index.css
- **역할 및 주요 기능**: 전역 스타일을 정의합니다. 버튼 스타일을 정의하여 일관된 디자인을 유지합니다.

```css
button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004494;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
```

## 5. Django 백엔드 상세 설명

이 파트에서는 Django 백엔드의 구조와 각 파일의 역할을 자세히 설명합니다. 백엔드 서버는 주로 사용자 인증 및 데이터 관리를 담당하며, REST API를 통해 프론트엔드와 상호작용합니다.

### 5.1 프로젝트 구조

Django 프로젝트의 기본 구조는 다음과 같습니다:

```
backend/
├── Dockerfile
├── manage.py
├── requirements.txt
└── src/
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    ├── wsgi.py
    └── authentication/
        ├── __init__.py
        ├── admin.py
        ├── apps.py
        ├── models.py
        ├── serializers.py
        ├── tests.py
        ├── urls.py
        └── views.py
```

- `backend/Dockerfile`: Django 애플리케이션을 Docker 컨테이너로 실행하기 위한 설정 파일입니다.
- `backend/manage.py`: Django 프로젝트 관리 명령을 실행하는 스크립트입니다.
- `backend/requirements.txt`: 프로젝트에서 필요한 Python 패키지 목록입니다.
- `backend/src/`: Django 프로젝트의 소스 디렉토리입니다.
- `backend/src/authentication/`: 사용자 인증 관련 모듈입니다.

### 5.2 파일 간의 연결고리 및 구조

Django는 MTV(Model-Template-View) 아키텍처를 따릅니다. 각 파일은 다음과 같은 역할을 합니다:

- `models.py`: 데이터베이스 모델을 정의합니다.
- `views.py`: HTTP 요청을 처리하고, 적절한 HTTP 응답을 반환합니다.
- `serializers.py`: 데이터베이스 모델 인스턴스를 JSON 등 다른 데이터 형식으로 변환합니다.
- `urls.py`: URL 패턴을 정의하여 요청을 적절한 뷰로 라우팅합니다.
- `admin.py`: Django 관리자 인터페이스에서 데이터베이스 모델을 관리할 수 있도록 설정합니다.
- `apps.py`: 애플리케이션 설정을 정의합니다.

### 5.3 각 파일별 설명

#### 5.3.1 settings.py
- **역할 및 주요 기능**: Django 프로젝트의 설정을 정의합니다. 데이터베이스 설정, 설치된 앱, 미들웨어, 템플릿 설정 등을 포함합니다.

```python
import os
from pathlib import Path

DEBUG = True

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'src.authentication',
    'rest_framework',
    'rest_framework.authtoken',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
}

ROOT_URLCONF = 'src.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'src.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DATABASE_NAME'),
        'USER': os.environ.get('DATABASE_USER'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
        'HOST': os.environ.get('DATABASE_HOST'),
        'PORT': os.environ.get('DATABASE_PORT'),
    }
}

ALLOWED_HOSTS = ['*']

SECRET_KEY = 'django-insecure-1n@a0*yzjv=)f+f%#c$0o5#6&pxu)y(-8d7^@$@z2&0(vw6g-v'

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

#### 5.3.2 asgi.py
- **역할 및 주요 기능**: ASGI(Asynchronous Server Gateway Interface) 설정을 정의하여 Django 프로젝트를 비동기적으로 실행할 수 있게 합니다.

```python
"""
ASGI config for src project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

application = get_asgi_application()
```

#### 5.3.3 urls.py
- **역할 및 주요 기능**: URL 라우팅을 정의합니다. 특정 URL 패턴이 요청되면 어떤 뷰가 호출될지 결정합니다.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('src.authentication.urls')),
]
```

#### 5.3.4 wsgi.py
- **역할 및 주요 기능**: WSGI(Web Server Gateway Interface) 설정을 정의하여 Django 프로젝트를 WSGI 서버에서 실행할 수 있게 합니다.

```python
"""
WSGI config for src project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

application = get_wsgi_application()
```

#### 5.3.5 admin.py
- **역할 및 주요 기능**: Django 관리자 사이트에서 관리할 모델을 등록합니다.

```python
from django.contrib import admin

# Register your models here.
```

#### 5.3.6 apps.py
- **역할 및 주요 기능**: Django 애플리케이션의 설정을 정의합니다.

```python
from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    name = 'src.authentication'
```

#### 5.3.7 models.py
- **역할 및 주요 기능**: 데이터베이스 모델을 정의합니다. 현재는 사용자 인증을 위해 기본 User 모델을 사용하므로 커스텀 모델은 없습니다.

```python
from django.db import models

# Create your models here.
```

#### 5.3.8 serializers.py
- **역할 및 주요 기능**: 모델 인스턴스를 JSON 등 다른 형식으로 변환하는 직렬화 도구를 정의합니다.

```python
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
```

#### 5.3.9 tests.py
- **역할 및 주요 기능**: 애플리케이션의 테스트 케이스를 정의합니다. 현재는 기본 템플릿으로 제공되는 테스트 파일입니다.

```python
from django.test import TestCase

# Create your tests here.
```

#### 5.3.10 urls.py (authentication 앱)
- **역할 및 주요 기능**: 사용자 인증과 관련된 URL 라우팅을 정의합니다.

```python
from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
```

#### 5.3.11 views.py
- **역할 및 주요 기능**: 사용자 요청을 처리하고 적절한 응답을 반환합니다. 회원가입과 로그인 기능을 제공합니다.

```python
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post

(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            username = user.username
            user = authenticate(username=username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
```

### 5.4 백엔드와 프론트엔드의 통합

- **역할 및 주요 기능**: Django 백엔드는 REST API를 제공하여 프론트엔드와 상호작용합니다. 인증 토큰을 사용하여 사용자 인증을 처리하고, 프론트엔드는 이 토큰을 이용하여 보호된 리소스에 접근합니다.
- **통합 예제**: 프론트엔드에서 로그인 요청을 보내면, 백엔드는 사용자를 인증하고 토큰을 반환합니다. 이후 프론트엔드는 이 토큰을 로컬 스토리지에 저장하고, 이후 요청에 이 토큰을 포함시켜 인증된 요청을 보냅니다.

## 6. 웹서버 처리 흐름 다이어그램

이 섹션에서는 브라우저에서의 요청이 서버로 전달되고, 응답이 돌아오는 과정을 한눈에 이해할 수 있도록 다이어그램으로 설명합니다. 이는 프론트엔드와 백엔드가 어떻게 상호작용하는지, 그리고 각각의 구성 요소가 어떤 역할을 하는지에 대해 명확히 이해하는 데 도움이 될 것입니다.

### 웹서버 처리 흐름 다이어그램

```plaintext
[브라우저 요청]
    |
    V
[index.html]
    |
    V
[index.js] ----> [ReactDOM.render(<App />)] ----> [App.js]
                                                       |
                                                       V
                                              [React Router 설정]
                                                       |
                                                       V
                                  -------------------------------------------------
                                 |                  |                |              |
                                 V                  V                V              V
                           [Home.js]          [Login.js]       [Register.js]   [Game.js]
                                 |
                                 V
                            [API 요청 (fetch)]
                                 |
                                 V
                      [REACT_APP_API_URL 설정]
                                 |
                                 V
[---------------- Django 백엔드 ------------------]
                                 |
                                 V
[요청 수신 (urls.py)]
                                 |
                                 V
[View 로직 처리 (views.py)]
                                 |
                                 V
[데이터 시리얼라이즈 (serializers.py)]
                                 |
                                 V
[모델과 상호작용 (models.py)]
                                 |
                                 V
[응답 생성 및 반환 (JSON)]
[-----------------------------------------------]
                                 |
                                 V
[React 상태 업데이트 (useState, useEffect)]
                                 |
                                 V
[UI 업데이트]
```

이 다이어그램은 다음과 같은 순서로 요청과 응답이 처리되는 과정을 보여줍니다:

1. 브라우저가 서버에 요청을 보냅니다.
2. 서버는 `index.html` 파일을 반환합니다.
3. `index.html` 파일이 로드되면서 `index.js`를 불러옵니다.
4. `index.js`는 `ReactDOM.render(<App />)`를 호출하여 React 애플리케이션을 초기화합니다.
5. `App.js`는 React Router를 설정하여 각 경로에 대해 적절한 컴포넌트를 렌더링합니다.
6. 사용자가 특정 경로로 이동하면 해당 경로에 맞는 컴포넌트가 렌더링됩니다. 예를 들어, 로그인 페이지로 이동하면 `Login.js`가 렌더링됩니다.
7. 컴포넌트는 필요에 따라 API 요청을 보냅니다. 예를 들어, 로그인 요청을 보낼 때 `fetch`를 사용하여 백엔드 서버에 요청을 보냅니다.
8. 백엔드 서버는 요청을 수신하고, URL 라우팅을 통해 적절한 View로 전달합니다.
9. View는 비즈니스 로직을 처리하고, 시리얼라이저를 통해 데이터를 변환하며, 모델과 상호작용합니다.
10. View는 처리된 데이터를 JSON 형태로 응답합니다.
11. 프론트엔드는 응답을 받아 React 상태를 업데이트하고, UI를 갱신합니다.

## 7. React와 Django 통합

이 섹션에서는 React 프론트엔드와 Django 백엔드를 어떻게 통합하여 전체 애플리케이션을 구성하는지 설명합니다. 이를 통해 사용자가 실제로 서비스를 사용할 수 있게 되는 과정을 이해할 수 있습니다.

### 7.1 React와 Django 통합의 개요

React는 프론트엔드 라이브러리로서 사용자 인터페이스를 구축하는 데 사용됩니다. Django는 백엔드 프레임워크로서 데이터베이스와 상호작용하고 비즈니스 로직을 처리하는 데 사용됩니다. 이 두 기술을 통합하여 전체적인 웹 애플리케이션을 구성할 수 있습니다.

### 7.2 통합을 위한 주요 단계

1. **프론트엔드 설정**:
    - React 애플리케이션은 `index.js` 파일에서 시작되며, 여기서 `App` 컴포넌트를 렌더링합니다.
    - `App` 컴포넌트는 React Router를 사용하여 다양한 페이지 컴포넌트를 관리합니다.
    - 각 페이지 컴포넌트(`Home.js`, `Login.js`, `Register.js`, `Game.js`)는 특정 경로에 매핑되어 있습니다.

2. **백엔드 설정**:
    - Django는 `urls.py` 파일에서 URL 라우팅을 관리합니다.
    - 각 URL은 적절한 뷰(View)로 연결되며, 뷰는 비즈니스 로직을 처리하고 응답을 반환합니다.
    - Django의 시리얼라이저는 데이터를 JSON 형식으로 변환하여 프론트엔드에 전달합니다.

3. **API 요청 처리**:
    - 프론트엔드는 사용자 동작에 따라 API 요청을 보냅니다.
    - 예를 들어, 로그인 폼 제출 시, `Login.js`에서 API 요청을 보내어 백엔드에서 인증을 처리합니다.
    - 백엔드는 요청을 받아 적절히 처리한 후, JSON 응답을 반환합니다.

### 7.3 구체적인 통합 방법

#### 7.3.1 프론트엔드에서 백엔드 API 호출

프론트엔드에서는 `fetch` 또는 `axios`와 같은 HTTP 클라이언트를 사용하여 백엔드 API를 호출합니다. 예를 들어, 사용자가 로그인 폼을 제출할 때 `Login.js`에서는 다음과 같이 API 요청을 보냅니다:

```javascript
const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/');
    } else {
        const data = await response.json();
        alert(`Login failed: ${JSON.stringify(data)}`);
    }
};
```

#### 7.3.2 백엔드에서 API 요청 처리

백엔드에서는 Django의 뷰(View)와 시리얼라이저를 사용하여 API 요청을 처리합니다. 예를 들어, 로그인 요청을 처리하는 뷰는 다음과 같습니다:

```python
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            username = user.username
            user = authenticate(username=username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
```

#### 7.3.3 응답 처리 및 상태 업데이트

프론트엔드는 백엔드의 응답을 받아 상태를 업데이트하고, 이를 통해 UI를 갱신합니다. 예를 들어, 로그인 성공 시 토큰을 로컬 스토리지에 저장하고, 로그인 상태를 업데이트합니다:

```javascript
if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setIsLoggedIn(true);
    navigate('/');
}
```

### 7.4 예제: 로그인 통합 과정

1. **사용자가 로그인 폼에 정보를 입력하고 제출 버튼을 클릭합니다.**
2. **`Login.js`는 API 요청을 보내어 백엔드의 로그인 뷰를 호출합니다.**
3. **백엔드는 사용자 인증을 처리하고, 성공 시 토큰을 생성하여 응답합니다.**
4. **프론트엔드는 응답을 받아 토큰을 저장하고, 로그인 상태를 업데이트합니다.**
5. **로그인 상태에 따라 UI가 갱신됩니다.**

## 8. 배포

배포는 개발한 애플리케이션을 실제 사용자가 접근할 수 있는 환경에 올리는 과정을 의미합니다. 이 프로젝트에서는 Docker와 Docker Compose를 사용하여 배포를 쉽게 관리할 수 있도록 구성하였습니다. 여기서는 Docker의 기본 개념, Docker Compose를 이용한 배포 과정, 그리고 환경 변수 설정 및 보안 관리를 다룹니다.

### 8.1 Docker 기본 개념

**Docker**는 컨테이너 기술을 이용해 애플리케이션을 신속하게 배포하고 확장할 수 있도록 도와주는 도구입니다. Docker는 애플리케이션과 그 의존성을 하나의 표준화된 유닛으로 패키징하여, 어디서나 동일한 환경에서 실행될 수 있게 합니다.

- **이미지(Image)**: 실행 가능한 애플리케이션의 상태를 가진 템플릿. Dockerfile을 통해 정의됩니다.
- **컨테이너(Container)**: 이미지를 기반으로 생성된 실행 환경. 애플리케이션이 실제로 실행되는 단위입니다.
- **레지스트리(Registry)**: 도커 이미지를 저장하고 배포하는 장소. Docker Hub가 대표적입니다.

### 8.2 Docker Compose를 이용한 배포

**Docker Compose**는 다중 컨테이너 도커 애플리케이션을 정의하고 실행하는 도구입니다. docker-compose.yml 파일을 통해 여러 컨테이너를 정의하고, `docker-compose up` 명령어로 손쉽게 모든 컨테이너를 시작할 수 있습니다.

1. **docker-compose.yml 파일 설명**

   ```yaml
   version: '3.8'

   services:
     db:
       image: postgres:latest
       environment:
         POSTGRES_DB: pong_db
         POSTGRES_USER: pong_user
         POSTGRES_PASSWORD: pong_password
       ports:
         - "5432:5432"
       volumes:
         - transcendence-db-data:/var/lib/postgresql/data
       networks:
         - app-network

     backend:
       build:
         context: ./backend
         dockerfile: Dockerfile
       volumes:
         - ./backend:/app
       ports:
         - "8000:8000"
       depends_on:
         - db
       environment:
         DATABASE_HOST: db
         DATABASE_NAME: pong_db
         DATABASE_USER: pong_user
         DATABASE_PASSWORD: pong_password
         DATABASE_PORT: 5432
       networks:
         - app-network

     frontend:
       build:
         context: ./frontend
         dockerfile: Dockerfile
       volumes:
         - ./frontend:/app
       ports:
         - "3000:3000"
       environment:
         REACT_APP_API_URL: http://localhost:8000
       networks:
         - app-network

   volumes:
     transcendence-db-data:

   networks:
     app-network:
       driver: bridge
   ```

2. **Docker Compose 명령어**

   - `docker-compose up`: 모든 컨테이너를 생성하고 시작합니다.
   - `docker-compose down`: 실행 중인 모든 컨테이너를 중지하고 제거합니다.
   - `docker-compose build`: 도커 이미지를 빌드합니다.

### 8.3 환경 변수 설정 및 보안 관리

환경 변수는 애플리케이션 설정 정보를 외부에서 관리할 수 있도록 도와줍니다. 이를 통해 코드 변경 없이 설정을 변경할 수 있으며, 보안이 중요한 정보를 코드에 직접 포함시키지 않을 수 있습니다.

1. **환경 변수 파일 (.env) 사용**

   .env 파일을 사용하여 환경 변수를 관리할 수 있습니다. 이 파일은 docker-compose.yml 파일에서 자동으로 로드됩니다.

   ```plaintext
   DATABASE_NAME=pong_db
   DATABASE_USER=pong_user
   DATABASE_PASSWORD=pong_password
   DATABASE_HOST=db
   DATABASE_PORT=5432
   REACT_APP_API_URL=http://localhost:8000
   ```

2. **Django의 settings.py에서 환경 변수 사용**

   Django 설정 파일에서 환경 변수를 불러와 사용합니다.

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'NAME': os.environ.get('DATABASE_NAME'),
           'USER': os.environ.get('DATABASE_USER'),
           'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
           'HOST': os.environ.get('DATABASE_HOST'),
           'PORT': os.environ.get('DATABASE_PORT'),
       }
   }

   SECRET_KEY = os.environ.get('SECRET_KEY', 'your-default-secret-key')
   ```

3. **React의 환경 변수 사용**

   React에서는 `process.env` 객체를 통해 환경 변수를 사용할 수 있습니다.

   ```javascript
   const apiUrl = process.env.REACT_APP_API_URL;

   fetch(`${apiUrl}/api/auth/login/`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password }),
   });
   ```

### 8.4 프로덕션 모드 설정

개발 환경과 프로덕션 환경은 설정이 다를 수 있습니다. 프로덕션 환경에서는 디버깅 정보를 최소화하고, 최적화된 설정을 사용해야 합니다.

1. **Django 설정**

   - DEBUG 모드를 False로 설정합니다.
   - ALLOWED_HOSTS에 실제 호스트 이름을 추가합니다.

   ```python
   DEBUG = False
   ALLOWED_HOSTS = ['your-production-domain.com']
   ```

2. **React 설정**

   - 환경 변수를 통해 프로덕션 모드로 빌드합니다.

   ```bash
   npm run build
   ```

   이 명령어는 `build` 폴더에 최적화된 정적 파일을 생성합니다. 이 파일들을 웹 서버에서 서빙하면 됩니다.

### 8.5 배포 요약

배포는 애플리케이션을 실제 사용자가 접근할 수 있는 환경에 올리는 과정입니다. Docker와 Docker Compose를 사용하면 복잡한 배포 과정을 단순화할 수 있으며, 환경 변수를 통해 설정을 유연하게 관리할 수 있습니다. 프로덕션 모드에서는 보안과 성능을 고려한 설정이 필요합니다.

## 9. 결론 및 추가 자료

### 9.1 프로젝트 요약

이번 프로젝트를 통해 React와 Django를 사용하여 웹 애플리케이션을 구축하고 Docker를 이용하여 컨테이너화 및 배포를 수행하는 방법을 배웠습니다. 주요 학습 포인트는 다음과 같습니다:

- **프론트엔드 개발**: React를 이용하여 사용자 인터페이스를 구축하고, React Router를 통해 클라이언트 사이드 라우팅을 구현하였습니다.
- **백엔드 개발**: Django REST Framework를 사용하여 API를 구축하고, 사용자 인증 및 데이터베이스 상호작용을 처리하였습니다.
- **컨테이너화**: Docker와 Docker Compose를 사용하여 애플리케이션을 컨테이너화하고, 개발 및 배포 환경을 표준화하였습니다.
- **환경 변수 관리**: .env 파일을 사용하여 중요한 설정 정보를 관리하고, 보안성을 높였습니다.

### 9.2 추가 학습 자료

더 깊이 있는 학습을 위해 다음 자료를 참고하면 좋습니다:

- **React 공식 문서**: [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Django 공식 문서**: [Django Documentation](https://docs.djangoproject.com/en/stable/)
- **Docker 공식 문서**: [Docker Documentation](https://docs.docker.com/)
- **Django REST Framework 공식 문서**: [DRF Documentation](https://www.django-rest-framework.org/)

### 9.3 프로젝트 개선 방안

이 프로젝트는 기본적인 웹 애플리케이션 구축과 배포를 다루었지만, 다음과 같은 추가 개선 사항을 고려할 수 있습니다:

- **테스트 강화**: 유닛 테스트 및 통합 테스트를 추가하여 애플리케이션의 신뢰성을 높입니다.
- **보안 강화**: HTTPS 설정, 보안 헤더 추가, CSRF 및 CORS 설정 강화 등 보안 측면을 강화합니다.
- **성능 최적화**: 데이터베이스 쿼리 최적화, 프론트엔드 코드 스플리팅 및 최적화, 캐싱 전략 등을 도입하여 성능을 개선합니다.
- **CI/CD 도입**: 지속적 통합 및 배포 파이프라인을 구축하여 개발 효율성을 높입니다.

### 9.4 커뮤니티 및 지원

프로젝트 개발 중에 도움이 필요하거나 질문이 있을 경우, 다음 커뮤니티에서 도움을 받을 수 있습니다:

- **Stack Overflow**: [Stack Overflow](https://stackoverflow.com/)
- **GitHub Discussions**: 프로젝트의 GitHub 저장소에 Discussions 기능을 사용하여 질문을 남길 수 있습니다.
- **Reddit**: [r/reactjs](https://www.reddit.com/r/reactjs/), [r/django](https://www.reddit.com/r/django/), [r/docker](https://www.reddit.com/r/docker/) 커뮤니티에서 논의할 수 있습니다.

### 9.5 마무리

이 프로젝트를 통해 웹 개발의 기본적인 흐름을 이해하고, 실제로 작동하는 애플리케이션을 만들 수 있었습니다. 앞으로도 계속해서 학습하고, 다양한 프로젝트를 통해 경험을 쌓길 바랍니다. 성공적인 개발 여정을 기원합니다!
