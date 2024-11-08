'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

interface AnimatedThreeSceneProps {
    scrollY: number;
    containerHeight: number;
    currentSection: string;
}

// interface AnimationState {
//     rotationSpeed: number;
//     swayAmount: number;
//     swaySpeed: number;
// }

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
    const controlsRef = useRef<OrbitControls | null>(null);
    const animationFrameRef = useRef<number>();
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const timeRef = useRef(0);

    // Move sectionAnimations into useMemo to prevent unnecessary re-renders
    const sectionAnimations = useMemo(() => ({
        'introduction': {
            rotation: new THREE.Euler(0, Math.PI * 1.5, -Math.PI * 0.1),
            animation: {
                rotationSpeed: 0.001,
                swayAmount: 0.1,
                swaySpeed: 0.001
            }
        },
        'gallery': {
            rotation: new THREE.Euler(0, Math.PI * 0.5, Math.PI * 0.2),
            animation: {
                rotationSpeed: 0.002,
                swayAmount: 0.15,
                swaySpeed: 0.002
            }
        },
        'schedule': {
            rotation: new THREE.Euler(0, -Math.PI * 0.9, Math.PI * 0.1),
            animation: {
                rotationSpeed: 0.0015,
                swayAmount: 0.12,
                swaySpeed: 0.0015
            }
        },
        'requirements': {
            rotation: new THREE.Euler(0, Math.PI * 0.1, -Math.PI * 0.1),
            animation: {
                rotationSpeed: 0.001,
                swayAmount: 0.08,
                swaySpeed: 0.001
            }
        }
    }), []); // 空依赖数组，因为这些值是常量

    // 初始化场景
    useEffect(() => {
        if (!containerRef.current) return;

        const currentContainer = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const bgColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--background').trim();
        scene.background = new THREE.Color(bgColor);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / 2 / window.innerHeight,
            1,
            10000
        );
        camera.position.set(1000, 200, 1500);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Lighting setup
        const setupLights = () => {
            const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
            scene.add(ambientLight);

            const mainLight = new THREE.DirectionalLight(0xffffff, 3);
            mainLight.position.set(500, 500, 500);
            mainLight.castShadow = true;
            mainLight.shadow.bias = -0.001;
            mainLight.shadow.mapSize.width = 2048;
            mainLight.shadow.mapSize.height = 2048;
            scene.add(mainLight);

            const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
            frontLight.position.set(0, 0, 1000);
            scene.add(frontLight);

            const sideLight = new THREE.DirectionalLight(0xffffff, 1.5);
            sideLight.position.set(-1000, 0, 0);
            scene.add(sideLight);

            const backLight = new THREE.DirectionalLight(0xffffff, 1);
            backLight.position.set(0, 0, -1000);
            scene.add(backLight);

            const pointLights = [
                { position: [200, 200, 200], intensity: 0.5 },
                { position: [-200, -200, -200], intensity: 0.5 }
            ];

            pointLights.forEach(({ position, intensity }) => {
                const light = new THREE.PointLight(0xffffff, intensity);
                light.position.set(...position);
                scene.add(light);
            });
        };

        setupLights();

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
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

        // Controls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.maxPolarAngle = Math.PI / 1.5;
        controls.minPolarAngle = Math.PI / 3;
        controls.enableZoom = false;
        controls.enablePan = false;
        controlsRef.current = controls;

        // Load 3D Model
        const loader = new SplineLoader();
        loader.load(
            'https://prod.spline.design/fRVrMRfgbapSGkG2/scene.splinecode',
            (splineScene) => {
                splineScene.scale.set(2, 2, 2);
                splineScene.position.set(0, 0, 0);

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

                if (modelRef.current) {
                    scene.remove(modelRef.current);
                }

                modelRef.current = splineScene;
                scene.add(splineScene);
                setIsModelLoaded(true);
            }
        );

        // Window resize handler
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / 2 / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width / 2, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rendererRef.current && currentContainer) {
                currentContainer.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (controlsRef.current) {
                controlsRef.current.dispose();
            }
        };
    }, []);

    // 动画循环
    useEffect(() => {
        if (!isModelLoaded || !modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;

        const animate = () => {
            if (!modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current || !controlsRef.current) return;

            // 更新时间
            timeRef.current += 0.01;

            // 获取当前部分的动画参数
            const currentAnim = sectionAnimations[currentSection] || sectionAnimations['introduction'];
            const { rotation, animation } = currentAnim;

            // 计算目标旋转
            const targetRotation = new THREE.Euler(
                rotation.x,
                rotation.y + Math.sin(timeRef.current * animation.swaySpeed) * animation.swayAmount,
                rotation.z
            );

            // 平滑插值当前旋转到目标旋转
            modelRef.current.rotation.x += (targetRotation.x - modelRef.current.rotation.x) * 0.03;
            modelRef.current.rotation.y += (targetRotation.y - modelRef.current.rotation.y) * 0.03;
            modelRef.current.rotation.z += (targetRotation.z - modelRef.current.rotation.z) * 0.03;

            // 添加持续旋转
            modelRef.current.rotation.y += animation.rotationSpeed;

            // 计算滚动位移
            const maxScroll = containerHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
            modelRef.current.position.y = -scrollProgress * 10;

            // 添加上下浮动
            modelRef.current.position.y += Math.sin(timeRef.current) * 5;

            // 更新控制器和渲染场景
            controlsRef.current.update();
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [currentSection, scrollY, containerHeight, isModelLoaded, sectionAnimations]);

    return (
        <div
            ref={containerRef}
            className="fixed left-0 top-0 w-1/2 h-screen"
            style={{
                willChange: 'transform',
                transform: `translateY(${Math.min(scrollY * 0.1, window.innerHeight * 0.1)}px)`,
            }}
        />
    );
}



// 'use client';
//
// import { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import SplineLoader from '@splinetool/loader';
//
// interface AnimatedThreeSceneProps {
//     scrollY: number;
//     containerHeight: number;
//     currentSection: string;
// }
//
// export default function AnimatedThreeScene({
//                                                scrollY,
//                                                containerHeight,
//                                                currentSection
//                                            }: AnimatedThreeSceneProps) {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//     const sceneRef = useRef<THREE.Scene | null>(null);
//     const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//     const modelRef = useRef<THREE.Group | null>(null);
//     const controlsRef = useRef<OrbitControls | null>(null);
//     const animationFrameRef = useRef<number>();
//     const [isModelLoaded, setIsModelLoaded] = useState(false);
//     const floatingOffset = useRef(0);
//
//     // 定义每个部分的目标旋转角度
//     const sectionRotations = {
//         'introduction': new THREE.Euler(0, Math.PI * 1.5, -Math.PI * 0.1),
//         'gallery': new THREE.Euler(0, Math.PI * 0.5, Math.PI * 0.2),
//         'schedule': new THREE.Euler(0, -Math.PI * 0.9, Math.PI * 0.1),
//         'requirements': new THREE.Euler(0, Math.PI * 0.1, -Math.PI * 0.1)
//     };
//
//     // 初始化场景
//     useEffect(() => {
//         if (!containerRef.current) return;
//
//         // Scene
//         const scene = new THREE.Scene();
//         sceneRef.current = scene;
//
//         const bgColor = getComputedStyle(document.documentElement)
//             .getPropertyValue('--background').trim();
//         scene.background = new THREE.Color(bgColor);
//
//         // Camera
//         const camera = new THREE.PerspectiveCamera(
//             45,
//             window.innerWidth / 2 / window.innerHeight,
//             1,
//             10000
//         );
//         camera.position.set(1000, 200, 1500);
//         camera.lookAt(0, 0, 0);
//         cameraRef.current = camera;
//
//         // Lighting
//         const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
//         scene.add(ambientLight);
//
//         const mainLight = new THREE.DirectionalLight(0xffffff, 3);
//         mainLight.position.set(500, 500, 500);
//         mainLight.castShadow = true;
//
//         // 调整阴影参数
//         mainLight.shadow.bias = -0.001;
//         mainLight.shadow.mapSize.width = 2048;
//         mainLight.shadow.mapSize.height = 2048;
//
//         scene.add(mainLight);
//
//
//
//         // 前补光 - 照亮正面
//         const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
//         frontLight.position.set(0, 0, 1000);
//         scene.add(frontLight);
//
//         // 侧面补光 - 增加立体感
//         const sideLight = new THREE.DirectionalLight(0xffffff, 1.5);
//         sideLight.position.set(-1000, 0, 0);
//         scene.add(sideLight);
//
//         // 柔和的后光 - 勾勒轮廓
//         const backLight = new THREE.DirectionalLight(0xffffff, 1);
//         backLight.position.set(0, 0, -1000);
//         scene.add(backLight);
//
//         // 点光源 - 增加局部高光
//         const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
//         pointLight1.position.set(200, 200, 200);
//         scene.add(pointLight1);
//
//         const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
//         pointLight2.position.set(-200, -200, -200);
//         scene.add(pointLight2);
//
//
//
//
//         const fillLight = new THREE.DirectionalLight(0xffffff, 2);
//         fillLight.position.set(-500, -200, -500);
//         scene.add(fillLight);
//
//
//         // Renderer
//         const renderer = new THREE.WebGLRenderer({
//             antialias: true,
//             alpha: true,
//             preserveDrawingBuffer: true
//         });
//         renderer.setSize(window.innerWidth / 2, window.innerHeight);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.physicallyCorrectLights = true;
//         renderer.outputEncoding = THREE.sRGBEncoding;
//         renderer.toneMapping = THREE.ACESFilmicToneMapping;
//         renderer.toneMappingExposure = 1.5;
//         renderer.shadowMap.enabled = true;
//         renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//         containerRef.current.appendChild(renderer.domElement);
//         rendererRef.current = renderer;
//
//         // 添加 OrbitControls
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.rotateSpeed = 0.5;
//         controls.maxPolarAngle = Math.PI / 1.5;
//         controls.minPolarAngle = Math.PI / 3;
//         controls.enableZoom = false;
//         controls.enablePan = false;
//         controlsRef.current = controls;
//
//         // Load Model
//         const loader = new SplineLoader();
//         loader.load(
//             'https://prod.spline.design/fRVrMRfgbapSGkG2/scene.splinecode',
//             (splineScene) => {
//                 splineScene.scale.set(2, 2, 2);
//                 splineScene.position.set(0, 0, 0);
//
//                 const initialRotation = sectionRotations['introduction'];
//                 splineScene.setRotationFromEuler(initialRotation);
//
//                 splineScene.traverse((object) => {
//                     if (object instanceof THREE.Mesh) {
//                         object.castShadow = true;
//                         object.receiveShadow = true;
//                         if (object.material) {
//                             object.material.roughness = 0.5;
//                             object.material.metalness = 0.5;
//                             object.material.envMapIntensity = 1.5;
//                         }
//                     }
//                 });
//
//                 if (modelRef.current) {
//                     scene.remove(modelRef.current);
//                 }
//
//                 modelRef.current = splineScene;
//                 scene.add(splineScene);
//                 setIsModelLoaded(true);
//             }
//         );
//
//         // Handle window resize
//         const handleResize = () => {
//             if (!cameraRef.current || !rendererRef.current) return;
//
//             const width = window.innerWidth;
//             const height = window.innerHeight;
//
//             camera.aspect = width / 2 / height;
//             camera.updateProjectionMatrix();
//             renderer.setSize(width / 2, height);
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             if (rendererRef.current && containerRef.current) {
//                 containerRef.current.removeChild(rendererRef.current.domElement);
//                 rendererRef.current.dispose();
//             }
//             if (animationFrameRef.current) {
//                 cancelAnimationFrame(animationFrameRef.current);
//             }
//             if (controlsRef.current) {
//                 controlsRef.current.dispose();
//             }
//         };
//     }, []);
//
//     // 动画循环
//     useEffect(() => {
//         if (!isModelLoaded || !modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;
//
//         const animate = () => {
//             if (!modelRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current || !controlsRef.current) return;
//
//             // 更新 controls
//             controlsRef.current.update();
//
//             // 获取目标旋转
//             const targetRotation = sectionRotations[currentSection as keyof typeof sectionRotations] || sectionRotations['introduction'];
//
//             // 仅在没有用户交互时才应用自动旋转
//             if (!controlsRef.current.enableDamping) {
//                 const currentRotation = modelRef.current.rotation;
//                 currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
//                 currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;
//                 currentRotation.z += (targetRotation.z - currentRotation.z) * 0.03;
//             }
//
//             // 计算悬浮动画
//             floatingOffset.current += 0.03;
//             const floatingY = Math.sin(floatingOffset.current) * 20;
//
//             // 计算滚动位移
//             const maxScroll = containerHeight - window.innerHeight;
//             const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
//             const scrollOffset = -scrollProgress * 10;
//
//             // 组合悬浮和滚动效果
//             modelRef.current.position.y = scrollOffset + floatingY;
//
//             rendererRef.current.render(sceneRef.current, cameraRef.current);
//             animationFrameRef.current = requestAnimationFrame(animate);
//         };
//
//         animate();
//
//         // 添加交互事件监听
//         const handleInteractionStart = () => {
//             if (controlsRef.current) {
//                 controlsRef.current.enableDamping = true;
//             }
//         };
//
//         const handleInteractionEnd = () => {
//             if (controlsRef.current) {
//                 controlsRef.current.enableDamping = false;
//             }
//         };
//
//         const container = containerRef.current;
//         if (container) {
//             container.addEventListener('mousedown', handleInteractionStart);
//             container.addEventListener('touchstart', handleInteractionStart);
//             container.addEventListener('mouseup', handleInteractionEnd);
//             container.addEventListener('touchend', handleInteractionEnd);
//         }
//
//         return () => {
//             if (animationFrameRef.current) {
//                 cancelAnimationFrame(animationFrameRef.current);
//             }
//             if (container) {
//                 container.removeEventListener('mousedown', handleInteractionStart);
//                 container.removeEventListener('touchstart', handleInteractionStart);
//                 container.removeEventListener('mouseup', handleInteractionEnd);
//                 container.removeEventListener('touchend', handleInteractionEnd);
//             }
//         };
//     }, [currentSection, scrollY, containerHeight, isModelLoaded]);
//
//     return (
//         <div
//             ref={containerRef}
//             className="fixed left-0 top-0 w-1/2 h-screen"
//             style={{
//                 willChange: 'transform',
//                 transform: `translateY(${Math.min(scrollY * 0.1, window.innerHeight * 0.1)}px)`,
//             }}
//         />
//     );
// }
