// "use client"
//
// import React, { useEffect, useRef, useState } from 'react';
// import AnimatedThreeScene from '@/components/AnimatedThreeScene';
// import Navigation from '@/components/Navigation';
//
// export default function Home() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [scrollY, setScrollY] = useState(0);
//     const [containerHeight, setContainerHeight] = useState(0);
//     const [currentSection, setCurrentSection] = useState('introduction');
//
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrollY(window.scrollY);
//             const sections = ['introduction', 'schedule', 'requirements'];
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
//             <Navigation
//                 currentSection={currentSection}
//                 onSectionChange={setCurrentSection}
//             />
//             <div ref={containerRef} className="min-h-screen bg-[#fff5e6] pt-16">
//                 {/* 3D Model */}
//                 <AnimatedThreeScene
//                     scrollY={scrollY}
//                     containerHeight={containerHeight}
//                     currentSection={currentSection}
//                 />
//
//                 {/* Content Sections */}
//                 <div className="w-1/2 ml-auto">
//                     <section id="introduction" className="h-screen flex items-center p-10">
//                         <div>
//                             <div className="mb-8">
//                                 <h2 className="text-xl mb-2 text-[#ff9933] font-bold">2024冬季</h2>
//                                 <h1 className="text-5xl font-bold mb-6 text-[#333]">「她行」Mentor招募</h1>
//                             </div>
//                             <div className="space-y-4 text-[#666]">
//                                 <p className="text-lg">
//                                     「她行ForwardwithHer」是一个致力于帮助中国科技领域的女性大学生或职场新人的Mentorship项目。
//                                 </p>
//                                 <p className="text-lg">
//                                     2021年获得联合国妇女署的支持，截止2024年4月，已有超过800位Mentee，360余位Mentor参与过我们的项目。
//                                 </p>
//                             </div>
//                             <button className="mt-8 bg-[#ff9933] text-white px-8 py-3 rounded-full text-lg hover:bg-[#ff8000] transition-colors">
//                                 加入我们
//                             </button>
//                         </div>
//                     </section>
//
//                     <section id="schedule" className="h-screen flex items-center bg-[#fff] p-10">
//                         <div>
//                             <h2 className="text-4xl font-bold mb-8 text-[#333]">活动安排</h2>
//                             <div className="space-y-6 text-[#666]">
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">前期准备</h3>
//                                     <p>Mentor培训与破冰活动，帮助您更好地了解项目并认识其他优秀的女性导师。</p>
//                                 </div>
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">导师组答疑</h3>
//                                     <p>以小组形式进行集体答疑，sharing您的经验与见解。</p>
//                                 </div>
//                                 <div className="bg-[#fff5e6] p-6 rounded-lg">
//                                     <h3 className="text-xl font-bold mb-3 text-[#ff9933]">一对一交流</h3>
//                                     <p>与匹配的Mentee进行4次深度交流，帮助她们在职业发展道路上更有方向。</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//
//                     <section id="requirements" className="h-screen flex items-center p-10">
//                         <div>
//                             <h2 className="text-4xl font-bold mb-8 text-[#333]">申请要求</h2>
//                             <div className="space-y-4 text-[#666]">
//                                 <p className="text-lg">• 科技行业从业者，有2年以上工作经验</p>
//                                 <p className="text-lg">• 愿意分享经验，帮助更多女性在STEM领域发展</p>
//                                 <p className="text-lg">• 能按时参与活动，对mentee负责</p>
//                                 <p className="text-lg">• 认同项目理念，乐于互助交流</p>
//                             </div>
//                             <div className="mt-12 space-y-4">
//                                 <h3 className="text-2xl font-bold text-[#ff9933]">联系我们</h3>
//                                 <p className="text-[#666]">邮箱：taxingFWH@163.com</p>
//                                 <p className="text-[#666]">关注我们：微信公众号「她行Mentorship」</p>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// // export default Home;



// src/app/page.tsx
"use client"

import React, { useEffect, useRef, useState } from 'react';
import AnimatedThreeScene from '@/components/AnimatedThreeScene';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [currentSection, setCurrentSection] = useState('introduction');

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            const sections = ['introduction', 'schedule', 'requirements'];
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
            <div ref={containerRef} className="min-h-screen bg-[#fff5e6] pt-16">
                <AnimatedThreeScene
                    scrollY={scrollY}
                    containerHeight={containerHeight}
                    currentSection={currentSection}
                />

                <div className="w-1/2 ml-auto">
                    <section id="introduction" className="h-screen flex items-center p-10">
                        <div>
                            <div className="mb-8">
                                <h2 className="text-xl mb-2 text-[#ff9933] font-bold">
                                    {t('intro.season')}
                                </h2>
                                <h1 className="text-5xl font-bold mb-6 text-[#333]">
                                    {t('intro.title')}
                                </h1>
                            </div>
                            <div className="space-y-4 text-[#666]">
                                <p className="text-lg">{t('intro.description1')}</p>
                                <p className="text-lg">{t('intro.description2')}</p>
                            </div>
                            <button className="mt-8 bg-[#ff9933] text-white px-8 py-3 rounded-full text-lg hover:bg-[#ff8000] transition-colors">
                                {t('intro.button')}
                            </button>
                        </div>
                    </section>

                    <section id="schedule" className="h-screen flex items-center bg-[#fff] p-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-8 text-[#333]">
                                {t('schedule.title')}
                            </h2>
                            <div className="space-y-6 text-[#666]">
                                <div className="bg-[#fff5e6] p-6 rounded-lg">
                                    <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
                                        {t('schedule.prep.title')}
                                    </h3>
                                    <p>{t('schedule.prep.desc')}</p>
                                </div>
                                <div className="bg-[#fff5e6] p-6 rounded-lg">
                                    <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
                                        {t('schedule.qa.title')}
                                    </h3>
                                    <p>{t('schedule.qa.desc')}</p>
                                </div>
                                <div className="bg-[#fff5e6] p-6 rounded-lg">
                                    <h3 className="text-xl font-bold mb-3 text-[#ff9933]">
                                        {t('schedule.oneone.title')}
                                    </h3>
                                    <p>{t('schedule.oneone.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="requirements" className="h-screen flex items-center p-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-8 text-[#333]">
                                {t('requirements.title')}
                            </h2>
                            <div className="space-y-4 text-[#666]">
                                <p className="text-lg">{t('requirements.exp')}</p>
                                <p className="text-lg">{t('requirements.share')}</p>
                                <p className="text-lg">{t('requirements.time')}</p>
                                <p className="text-lg">{t('requirements.value')}</p>
                            </div>
                            <div className="mt-12 space-y-4">
                                <h3 className="text-2xl font-bold text-[#ff9933]">
                                    {t('contact.title')}
                                </h3>
                                <p className="text-[#666]">{t('contact.email')}</p>
                                <p className="text-[#666]">{t('contact.wechat')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
