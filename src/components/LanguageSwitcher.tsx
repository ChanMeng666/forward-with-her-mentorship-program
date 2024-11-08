import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="px-3 py-1 rounded-full border border-[#ff9933] text-[#ff9933]
                       hover:bg-[#ff9933] hover:text-white transition-colors duration-300
                       text-sm font-medium"
        >
            {language === 'en' ? '中文' : 'English'}
        </button>
    );
}
