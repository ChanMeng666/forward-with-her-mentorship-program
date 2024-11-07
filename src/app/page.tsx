'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedThreeScene from '@/components/AnimatedThreeScene';
import Navigation from '@/components/Navigation';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [currentSection, setCurrentSection] = useState('coca-cola');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // 检测当前部分
            const sections = ['coca-cola', 'iconic-design', 'sustainability'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setCurrentSection(section);
                        break;
                    }
                }
            }
        };

        const updateContainerHeight = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.scrollHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateContainerHeight);
        updateContainerHeight();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateContainerHeight);
        };
    }, []);

    return (
        <>
            <Navigation
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
            />
            <div ref={containerRef} className="min-h-screen bg-[#fad6bf] pt-16">
                {/* 3D Model */}
                <AnimatedThreeScene
                    scrollY={scrollY}
                    containerHeight={containerHeight}
                    currentSection={currentSection}
                />

                {/* Content Sections */}
                <div className="w-1/2 ml-auto">
                    <section id="coca-cola" className="h-screen flex items-center p-10">
                        <div>
                            <h1 className="text-6xl font-bold mb-6">Coca Cola</h1>
                            <p className="text-xl mb-8">
                                Experience the refreshing taste of the most popular beverage.
                            </p>
                            <button className="bg-red-600 text-white px-8 py-3 rounded-full text-lg hover:bg-red-700 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </section>

                    <section id="iconic-design" className="h-screen flex items-center bg-red-600 text-white p-10">
                        <div>
                            <h2 className="text-5xl font-bold mb-6">Iconic Design</h2>
                            <p className="text-xl mb-8">
                                The Coca-Cola can design has become a symbol recognized worldwide,
                                representing refreshment and enjoyment.
                            </p>
                        </div>
                    </section>

                    <section id="sustainability" className="h-screen flex items-center p-10">
                        <div>
                            <h2 className="text-5xl font-bold mb-6">Sustainability</h2>
                            <p className="text-xl mb-8">
                                Our commitment to environmental responsibility includes using
                                recyclable materials and reducing our carbon footprint.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
