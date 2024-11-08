// import { useEffect, useState } from 'react';
//
// interface NavigationProps {
//     onSectionChange: (section: string) => void;
//     currentSection: string;
// }
//
// export default function Navigation({ onSectionChange, currentSection }: NavigationProps) {
//     const scrollToSection = (id: string) => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
//
//     const sections = [
//         { id: 'introduction', name: '项目介绍' },
//         { id: 'schedule', name: '活动安排' },
//         { id: 'requirements', name: '申请要求' }
//     ];
//
//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ffd9b3]">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <span className="text-[#ff9933] font-bold text-xl">她行 Forward with Her</span>
//                     </div>
//                     <div className="flex space-x-8">
//                         {sections.map((section) => (
//                             <button
//                                 key={section.id}
//                                 onClick={() => scrollToSection(section.id)}
//                                 className={`px-3 py-2 text-sm font-medium transition-colors ${
//                                     currentSection === section.id
//                                         ? 'text-[#ff9933] border-b-2 border-[#ff9933]'
//                                         : 'text-gray-700 hover:text-[#ff9933]'
//                                 }`}
//                             >
//                                 {section.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }


import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
    onSectionChange: (section: string) => void;
    currentSection: string;
}

export default function Navigation({ onSectionChange, currentSection }: NavigationProps) {
    const { t } = useLanguage();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sections = [
        { id: 'introduction', name: t('nav.intro') },
        { id: 'gallery', name: t('nav.gallery') },
        { id: 'schedule', name: t('nav.schedule') },
        { id: 'requirements', name: t('nav.requirements') }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ffd9b3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-[#ff9933] font-bold text-xl">
                            {t('nav.title')}
                        </span>
                    </div>
                    <div className="flex items-center space-x-8">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${
                                    currentSection === section.id
                                        ? 'text-[#ff9933] border-b-2 border-[#ff9933]'
                                        : 'text-gray-700 hover:text-[#ff9933]'
                                }`}
                            >
                                {section.name}
                            </button>
                        ))}
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}
