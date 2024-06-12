import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function Game() {
    const navigate = useNavigate();
    const mountRef = useRef(null);
    const paddleRef = useRef(null);
    const ballRef = useRef(null);
    const ballDirectionRef = useRef({ x: 0.05, y: 0.05 });
    const scoreRef = useRef(0);
    const [score, setScore] = useState(0);
    const requestRef = useRef(null); // 애니메이션 프레임 요청 참조
    const moveLeftRef = useRef(false); // 왼쪽 이동 플래그
    const moveRightRef = useRef(false); // 오른쪽 이동 플래그

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const resetBall = useCallback((ball, paddle) => {
        ball.position.set(0, paddle.position.y + 0.2, 0);
        ballDirectionRef.current = { x: 0.05, y: 0.05 };
    }, []);

    useEffect(() => {
        const currentMount = mountRef.current;

        // Three.js 기본 설정
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(800, 600); // 고정된 크기로 설정
        currentMount.appendChild(renderer.domElement);

        // 조명 추가
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        // 바닥 생성
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.y = -3.2;
        scene.add(floorMesh);

        // 패들 생성
        const paddleGeometry = new THREE.BoxGeometry(1, 0.2, 0.2);
        const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const paddleMesh = new THREE.Mesh(paddleGeometry, paddleMaterial);
        paddleMesh.position.y = -3;
        scene.add(paddleMesh);
        paddleRef.current = paddleMesh;

        // 공 생성
        const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
        ballMesh.position.set(0, paddleMesh.position.y + 0.2, 0);
        scene.add(ballMesh);
        ballRef.current = ballMesh;

        // 카메라 위치 설정
        camera.position.z = 7;
        camera.position.y = 1;

        const animate = () => {
            const ball = ballRef.current;
            const paddle = paddleRef.current;
            const ballDirection = ballDirectionRef.current;

            // 패들 움직임 처리
            if (moveLeftRef.current && paddle.position.x > -3.5) {
                paddle.position.x -= 0.1;
            } else if (moveRightRef.current && paddle.position.x < 3.5) {
                paddle.position.x += 0.1;
            }

            // 공 움직임
            ball.position.x += ballDirection.x;
            ball.position.y += ballDirection.y;

            // 공이 벽에 부딪히는 로직
            if (ball.position.x <= -4 || ball.position.x >= 4) {
                ballDirectionRef.current.x = -ballDirection.x;
            }
            if (ball.position.y >= 4.5) {
                ballDirectionRef.current.y = -ballDirection.y;
            }

            // 공이 패들에 부딪히는 로직
            if (
                ball.position.y <= paddle.position.y + 0.1 &&
                ball.position.y >= paddle.position.y - 0.1 &&
                ball.position.x >= paddle.position.x - 0.5 &&
                ball.position.x <= paddle.position.x + 0.5
            ) {
                ballDirectionRef.current.y = -ballDirection.y;
                scoreRef.current += 1;
                setScore(scoreRef.current); // 상태 업데이트
                // 공 속도 증가
                ballDirectionRef.current.x *= 1.05;
                ballDirectionRef.current.y *= 1.05;
            }

            // 공이 화면 아래로 떨어지는 로직
            if (ball.position.y <= -5) {
                alert(`Game Over! Your score: ${scoreRef.current}`);
                scoreRef.current = 0;
                setScore(scoreRef.current); // 상태 업데이트
                resetBall(ball, paddle);
            }

            renderer.render(scene, camera);

            requestRef.current = requestAnimationFrame(animate); // 애니메이션 프레임 요청 참조 업데이트
        };

        requestRef.current = requestAnimationFrame(animate); // 애니메이션 프레임 요청 시작

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                moveLeftRef.current = true;
            } else if (event.key === 'ArrowRight') {
                moveRightRef.current = true;
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'ArrowLeft') {
                moveLeftRef.current = false;
            } else if (event.key === 'ArrowRight') {
                moveRightRef.current = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            cancelAnimationFrame(requestRef.current); // 애니메이션 프레임 요청 취소
            currentMount.removeChild(renderer.domElement);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

            // Three.js 자원 해제
            renderer.dispose();
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) object.material.dispose();
            });
        };
    }, [resetBall]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Game Page</h1>
            <div>
                <button onClick={handleGoHome} style={{ padding: '10px 20px', margin: '10px' }}>Home</button>
                <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>Logout</button>
            </div>
            <div>
                <p>Score: {score}</p>
            </div>
            <div id="game-container" style={{ marginTop: '50px', margin: '0 auto', width: '800px', height: '600px', border: '1px solid black' }} ref={mountRef}></div>
        </div>
    );
}

export default Game;
