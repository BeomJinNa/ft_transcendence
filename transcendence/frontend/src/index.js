// frontend/src/index.js

/*
  이 파일은 React 애플리케이션의 진입점(entry point) 파일입니다.
  React 애플리케이션을 브라우저에 렌더링하는 역할을 합니다.
*/

import React from 'react'; // React 라이브러리 임포트
import ReactDOM from 'react-dom'; // ReactDOM 라이브러리 임포트
import { BrowserRouter as Router } from 'react-router-dom'; // React Router의 BrowserRouter 컴포넌트를 Router라는 이름으로 임포트
import App from './App'; // App 컴포넌트 임포트

/*
  ReactDOM.render는 React 애플리케이션을 실제 DOM에 렌더링하는 함수입니다.
  여기서는 <Router> 컴포넌트로 App 컴포넌트를 감싸서 브라우저의 URL 변화를 관리할 수 있게 합니다.
  'root'라는 id를 가진 DOM 요소에 렌더링합니다.
*/
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root') // index.html 파일에서 'root' id를 가진 요소에 렌더링
);
