'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

export default function ThreeScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Camera
        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -2,
            window.innerWidth / 2,
            window.innerHeight / 2,
            window.innerHeight / -2,
            -50000,
            50000
        );
        camera.position.set(58.09, 999.17, 56.4);
        camera.quaternion.setFromEuler(new THREE.Euler(-1.55, 0, 0));

        // Scene
        const scene = new THREE.Scene();

        // Lighting Setup
        // 1. 环境光 - 提供基础环境照明
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        // 2. 主方向光 - 模拟太阳光
        const mainLight = new THREE.DirectionalLight(0xffffff, 2);
        mainLight.position.set(500, 500, 500);
        mainLight.castShadow = true;
        scene.add(mainLight);

        // 3. 填充光 - 减少阴影
        const fillLight = new THREE.DirectionalLight(0xffffff, 1);
        fillLight.position.set(-500, 0, -500);
        scene.add(fillLight);

        // 4. 背光 - 增加轮廓感
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        backLight.position.set(0, 0, -500);
        scene.add(backLight);

        // 5. 点光源 - 增加高光
        const pointLight1 = new THREE.PointLight(0xffffff, 1);
        pointLight1.position.set(200, 200, 200);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-200, -200, -200);
        scene.add(pointLight2);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.physicallyCorrectLights = true; // 使用物理正确的光照计算
        renderer.outputEncoding = THREE.sRGBEncoding; // 正确的颜色空间
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // 电影级别的色调映射
        renderer.toneMappingExposure = 1.5; // 增加曝光度
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 软阴影
        containerRef.current.appendChild(renderer.domElement);

        // Scene settings
        scene.background = new THREE.Color('#fad6bf');
        renderer.setClearAlpha(1);

        // Spline scene
        const loader = new SplineLoader();
        loader.load(
            'https://prod.spline.design/ZXvtjC9mcADlah4z/scene.splinecode',
            (splineScene) => {
                // 遍历场景中的所有对象，启用阴影
                splineScene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                        object.receiveShadow = true;

                        // 如果材质存在，增加其亮度和反射率
                        if (object.material) {
                            object.material.roughness = 0.5; // 降低粗糙度
                            object.material.metalness = 0.5; // 增加金属感
                            object.material.envMapIntensity = 1.5; // 增加环境反射强度
                        }
                    }
                });
                scene.add(splineScene);
            }
        );

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.125;

        // Handle window resize
        const handleResize = () => {
            camera.left = window.innerWidth / -2;
            camera.right = window.innerWidth / 2;
            camera.top = window.innerHeight / 2;
            camera.bottom = window.innerHeight / -2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-screen"
        />
    );
}

// https://prod.spline.design/ZXvtjC9mcADlah4z/scene.splinecode
