// "use client"
//
// import React, { useEffect, useRef, useState } from 'react';
// import Navigation from '@/components/Navigation';
// import { useLanguage } from '@/contexts/LanguageContext';
// import AutoScrollGallery from '@/components/AutoScrollGallery';
// import dynamic from 'next/dynamic';
//
// // 动态导入 AnimatedThreeScene 组件，并禁用 SSR
// const AnimatedThreeScene = dynamic(
//     () => import('@/components/AnimatedThreeScene'),
//     { ssr: false }
// );
//
// type SectionKey = 'introduction' | 'gallery' | 'schedule' | 'requirements';
//
// export default function Home() {
//     const { t } = useLanguage();
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [scrollY, setScrollY] = useState(0);
//     const [containerHeight, setContainerHeight] = useState(0);
//     const [currentSection, setCurrentSection] = useState<SectionKey>('introduction');
//     const [isMounted, setIsMounted] = useState(false);
//
//     useEffect(() => {
//         setIsMounted(true);
//
//         const handleScroll = () => {
//             setScrollY(window.scrollY);
//             const sections: SectionKey[] = ['introduction', 'gallery', 'schedule', 'requirements'];
//             for (const section of sections) {
//                 const element = document.getElementById(section);
//                 if (element) {
//                     const rect = element.getBoundingClientRect();
//                     if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
//                         setCurrentSection(section);
//                         break;
//                     }
//                 }
//             }
//         };
//
//         const updateContainerHeight = () => {
//             if (containerRef.current) {
//                 setContainerHeight(containerRef.current.scrollHeight);
//             }
//         };
//
//         window.addEventListener('scroll', handleScroll);
//         window.addEventListener('resize', updateContainerHeight);
//         updateContainerHeight();
//
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             window.removeEventListener('resize', updateContainerHeight);
//         };
//     }, []);
//
//     return (
//         <>
//             <Navigation currentSection={currentSection} />
//             <div ref={containerRef} className="min-h-screen bg-[#fff5e6] pt-16">
//                 {isMounted && (
//                     <AnimatedThreeScene
//                         scrollY={scrollY}
//                         containerHeight={containerHeight}
//                         currentSection={currentSection}
//                     />
//                 )}
//
//                 <div className="w-1/2 ml-auto">
//                     <section id="introduction" className="h-screen flex items-center p-10">
//                         <div>
//                             <div className="mb-8">
//                                 <h2 className="text-xl mb-2 text-[#ff9933] font-bold">
//                                     {t('intro.season')}
//                                 </h2>
//                                 <h1 className="text-5xl font-bold mb-6 text-[#333]">
//                                     {t('intro.title')}
//                                 </h1>
//                             </div>
//                             <div className="space-y-4 text-[#666]">
//                                 <p className="text-lg">{t('intro.description1')}</p>
//                                 <p className="text-lg">{t('intro.description2')}</p>
//                             </div>
//                             <button
//                                 className="mt-8 bg-[#ff9933] text-white px-8 py-3 rounded-full text-lg hover:bg-[#ff8000] transition-colors">
//                                 {t('intro.button')}
//                             </button>
//                         </div>
//                     </section>
//
//                     <section id="gallery" className="h-screen flex items-center bg-[#fff]">
//                         <div className="w-full">
//                             <AutoScrollGallery/>
//                         </div>
//                     </section>
//
//                     <section id="schedule" className="h-screen flex items-center bg-[#fff] p-10">
//                         <div>
//                             <h2 className="text-4xl font-bold mb-8 text-[#333]">
//                                 {t('schedule.title')}
//                             </h2>
//                             <div className="space-y-6 text-[#666]">
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
//                                         {t('schedule.prep.title')}
//                                     </h3>
//                                     <p>{t('schedule.prep.desc')}</p>
//                                 </div>
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
//                                         {t('schedule.qa.title')}
//                                     </h3>
//                                     <p>{t('schedule.qa.desc')}</p>
//                                 </div>
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
//                                         {t('schedule.oneone.title')}
//                                     </h3>
//                                     <p>{t('schedule.oneone.desc')}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//
//                     <section id="requirements" className="h-screen flex items-center p-10">
//                         <div>
//                             <h2 className="text-4xl font-bold mb-8 text-[#333]">
//                                 {t('requirements.title')}
//                             </h2>
//                             <div className="space-y-4 text-[#666]">
//                                 <p className="text-lg">{t('requirements.exp')}</p>
//                                 <p className="text-lg">{t('requirements.share')}</p>
//                                 <p className="text-lg">{t('requirements.time')}</p>
//                                 <p className="text-lg">{t('requirements.value')}</p>
//                             </div>
//                             <div className="mt-12 space-y-4">
//                                 <h3 className="text-2xl font-bold text-[#ff9933]">
//                                     {t('contact.title')}
//                                 </h3>
//                                 <p className="text-[#666]">{t('contact.email')}</p>
//                                 <p className="text-[#666]">{t('contact.wechat')}</p>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// }



"use client"

import React, { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import AutoScrollGallery from '@/components/AutoScrollGallery';
import dynamic from 'next/dynamic';

const AnimatedThreeScene = dynamic(
    () => import('@/components/AnimatedThreeScene'),
    { ssr: false }
);

type SectionKey = 'introduction' | 'gallery' | 'schedule' | 'requirements';

export default function Home() {
    const { t } = useLanguage();
    const [scrollY, setScrollY] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [currentSection, setCurrentSection] = useState<SectionKey>('introduction');
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
            const sections: SectionKey[] = ['introduction', 'gallery', 'schedule', 'requirements'];
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
            <Navigation currentSection={currentSection} />
            <div ref={containerRef} className="min-h-screen bg-[#fff5e6] pt-16">
                {/* 3D Scene - 在桌面端显示在左侧，移动端显示在顶部 */}
                <div className="lg:fixed lg:left-0 lg:top-0 lg:w-1/2 lg:h-screen h-[40vh] w-full relative">
                    {isMounted && (
                        <AnimatedThreeScene
                            scrollY={scrollY}
                            containerHeight={containerHeight}
                            currentSection={currentSection}
                        />
                    )}
                </div>

                {/* 内容区域 - 在桌面端显示在右侧，移动端显示在下方 */}
                <div className="lg:w-1/2 lg:ml-auto w-full px-4 lg:px-0 relative">
                    <section id="introduction" className="min-h-screen flex items-center py-10 lg:p-10 mt-[40vh] lg:mt-0">
                        <div className="w-full">
                            <div className="mb-8">
                                <h2 className="text-lg lg:text-xl mb-2 text-[#ff9933] font-bold">
                                    {t('intro.season')}
                                </h2>
                                <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-[#333]">
                                    {t('intro.title')}
                                </h1>
                            </div>
                            <div className="space-y-4 text-[#666]">
                                <p className="text-base lg:text-lg">{t('intro.description1')}</p>
                                <p className="text-base lg:text-lg">{t('intro.description2')}</p>
                            </div>
                            <button className="mt-8 bg-[#ff9933] text-white px-6 lg:px-8 py-3 rounded-full text-base lg:text-lg hover:bg-[#ff8000] transition-colors">
                                {t('intro.button')}
                            </button>
                        </div>
                    </section>

                    <section id="gallery" className="min-h-screen flex items-center bg-[#fff] w-full overflow-hidden">
                        <div className="w-full">
                            <AutoScrollGallery/>
                        </div>
                    </section>

                    <section id="schedule" className="min-h-screen flex items-center bg-[#fff] p-4 lg:p-10">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[#333]">
                                {t('schedule.title')}
                            </h2>
                            <div className="space-y-4 lg:space-y-6 text-[#666]">
                                {['prep', 'qa', 'oneone'].map((item) => (
                                    <div key={item} className="bg-[#fff5e6] p-4 lg:p-6 rounded-lg">
                                        <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-[#ff9933]">
                                            {t(`schedule.${item}.title`)}
                                        </h3>
                                        <p className="text-sm lg:text-base">
                                            {t(`schedule.${item}.desc`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="requirements" className="min-h-screen flex items-center p-4 lg:p-10">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[#333]">
                                {t('requirements.title')}
                            </h2>
                            <div className="space-y-3 lg:space-y-4 text-[#666]">
                                <p className="text-sm lg:text-lg">{t('requirements.exp')}</p>
                                <p className="text-sm lg:text-lg">{t('requirements.share')}</p>
                                <p className="text-sm lg:text-lg">{t('requirements.time')}</p>
                                <p className="text-sm lg:text-lg">{t('requirements.value')}</p>
                            </div>
                            <div className="mt-8 lg:mt-12 space-y-3 lg:space-y-4">
                                <h3 className="text-xl lg:text-2xl font-bold text-[#ff9933]">
                                    {t('contact.title')}
                                </h3>
                                <p className="text-sm lg:text-base text-[#666]">{t('contact.email')}</p>
                                <p className="text-sm lg:text-base text-[#666]">{t('contact.wechat')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
