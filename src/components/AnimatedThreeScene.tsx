'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

type SectionKey = 'introduction' | 'gallery' | 'schedule' | 'requirements';


interface AnimatedThreeSceneProps {
    scrollY: number;
    containerHeight: number;
    currentSection: string;
}

interface PointLightConfig {
    position: [number, number, number]; // Explicitly define as tuple type
    intensity: number;
}

interface AnimationConfig {
    rotationSpeed: number;
    swayAmount: number;
    swaySpeed: number;
}

interface SectionConfig {
    rotation: THREE.Euler;
    animation: AnimationConfig;
}

interface SectionAnimations {
    [key: string]: SectionConfig;
}

// interface SectionAnimations {
//     introduction: {
//         rotation: THREE.Euler;
//         animation: {
//             rotationSpeed: number;
//             swayAmount: number;
//             swaySpeed: number;
//         };
//     };
//     gallery: {
//         rotation: THREE.Euler;
//         animation: {
//             rotationSpeed: number;
//             swayAmount: number;
//             swaySpeed: number;
//         };
//     };
//     schedule: {
//         rotation: THREE.Euler;
//         animation: {
//             rotationSpeed: number;
//             swayAmount: number;
//             swaySpeed: number;
//         };
//     };
//     requirements: {
//         rotation: THREE.Euler;
//         animation: {
//             rotationSpeed: number;
//             swayAmount: number;
//             swaySpeed: number;
//         };
//     };
// }

// interface AnimatedThreeSceneProps {
//     scrollY: number;
//     containerHeight: number;
//     currentSection: string;
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


    // const modelRef = useRef<THREE.Group | null>(null);

    // Change the type to be more generic to accept any THREE.Object3D
    const modelRef = useRef<THREE.Object3D | null>(null);

    const controlsRef = useRef<OrbitControls | null>(null);
    const animationFrameRef = useRef<number>();
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const timeRef = useRef(0);

    // Move sectionAnimations into useMemo to prevent unnecessary re-renders
    // const sectionAnimations = useMemo(() => ({
    const sectionAnimations: SectionAnimations = useMemo(() => ({
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
        // if (!containerRef.current) return;
        // const currentContainer = containerRef.current;


        const container = containerRef.current;
        if (!container) return;


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

            // const pointLights = [
            //     { position: [200, 200, 200], intensity: 0.5 },
            //     { position: [-200, -200, -200], intensity: 0.5 }
            // ];

            const pointLights: PointLightConfig[] = [
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


        // containerRef.current.appendChild(renderer.domElement);

        container.appendChild(renderer.domElement);

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
            if (rendererRef.current && container) {
                container.removeChild(rendererRef.current.domElement);
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
            // const currentAnim = sectionAnimations[currentSection] || sectionAnimations['introduction'];

            const section = currentSection as keyof typeof sectionAnimations;
            const currentAnim = sectionAnimations[section] || sectionAnimations['introduction'];

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

        // animate();

        if (isModelLoaded) {
            animate();
        }

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

