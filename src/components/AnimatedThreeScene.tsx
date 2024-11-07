'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

interface AnimatedThreeSceneProps {
    scrollY: number;
    containerHeight: number;
    currentSection: string;
}

export default function AnimatedThreeScene({
                                               scrollY,
                                               containerHeight,
                                               currentSection
                                           }: AnimatedThreeSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const modelRef = useRef<THREE.Group | null>(null);
    const animationFrameRef = useRef<number>();
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    // 定义每个部分的目标旋转角度
    const sectionRotations = {
        'coca-cola': new THREE.Euler(0, Math.PI * 0.45, -Math.PI * 0.1), // 左倾斜
        'iconic-design': new THREE.Euler(0, -Math.PI * 0.45, Math.PI * 0.1), // 右倾斜
        'sustainability': new THREE.Euler(0, Math.PI * 0.45, -Math.PI * 0.1) // 左倾斜
    };

    // 初始化场景
    useEffect(() => {
        if (!containerRef.current) return;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / 2 / window.innerHeight,
            1,
            10000
        );
        camera.position.set(1000, 200, 1500);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 2);
        mainLight.position.set(500, 500, 500);
        mainLight.castShadow = true;
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 1);
        fillLight.position.set(-500, -200, -500);
        scene.add(fillLight);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true // 防止闪烁
        });
        renderer.setSize(window.innerWidth / 2, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.physicallyCorrectLights = true;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Load Model
        const loader = new SplineLoader();
        loader.load(
            'https://prod.spline.design/ZXvtjC9mcADlah4z/scene.splinecode',
            (splineScene) => {
                // 设置模型初始位置和比例
                splineScene.scale.set(1.2, 1.2, 1.2);
                splineScene.position.set(0, 0, 0);

                // 应用初始旋转
                const initialRotation = sectionRotations['coca-cola'];
                splineScene.setRotationFromEuler(initialRotation);

                splineScene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                        if (object.material) {
                            object.material.roughness = 0.5;
                            object.material.metalness = 0.5;
                            object.material.envMapIntensity = 1.5;
                        }
                    }
                });

                // 清除旧模型（如果存在）
                if (modelRef.current) {
                    scene.remove(modelRef.current);
                }

                modelRef.current = splineScene;
                scene.add(splineScene);
                setIsModelLoaded(true);
            }
        );

        // Handle window resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // 动画循环
    useEffect(() => {
        if (!isModelLoaded || !modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

        const animate = () => {
            if (!modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

            // 获取目标旋转
            const targetRotation = sectionRotations[currentSection as keyof typeof sectionRotations];
            const currentRotation = modelRef.current.rotation;

            // 平滑插值旋转
            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;
            currentRotation.z += (targetRotation.z - currentRotation.z) * 0.03;

            // 计算有限的垂直位移
            const maxScroll = containerHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
            modelRef.current.position.y = -scrollProgress * 100; // 限制下降范围

            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [currentSection, scrollY, containerHeight, isModelLoaded]);

    return (
        <div
            ref={containerRef}
            className="fixed left-0 top-0 w-1/2 h-screen"
            style={{
                willChange: 'transform',
                transform: `translateY(${Math.min(scrollY * 0.2, window.innerHeight * 0.2)}px)`,
            }}
        />
    );
}
