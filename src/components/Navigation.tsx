// import { useLanguage } from '@/contexts/LanguageContext';
// import LanguageSwitcher from './LanguageSwitcher';
//
// interface NavigationProps {
//     currentSection: string;
// }
//
// export default function Navigation({ currentSection }: NavigationProps) {
//     const { t } = useLanguage();
//
//     const scrollToSection = (id: string) => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
//
//     const sections = [
//         { id: 'introduction', name: t('nav.intro') },
//         { id: 'gallery', name: t('nav.gallery') },
//         { id: 'schedule', name: t('nav.schedule') },
//         { id: 'requirements', name: t('nav.requirements') }
//     ];
//
//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ffd9b3]">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <span className="text-[#ff9933] font-bold text-xl">
//                             {t('nav.title')}
//                         </span>
//                     </div>
//                     <div className="flex items-center space-x-8">
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
//                         <LanguageSwitcher />
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }


import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
    currentSection: string;
}

export default function Navigation({ currentSection }: NavigationProps) {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
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
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-[#ff9933] font-bold text-xl">
                            {t('nav.title')}
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-[#ff9933]"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden ${
                        isMenuOpen ? 'block' : 'hidden'
                    } pb-4 transition-all duration-300`}
                >
                    <div className="flex flex-col space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    currentSection === section.id
                                        ? 'bg-[#ff9933] text-white'
                                        : 'text-gray-700 hover:bg-[#fff5e6] hover:text-[#ff9933]'
                                }`}
                            >
                                {section.name}
                            </button>
                        ))}
                        <div className="px-3 py-2">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
