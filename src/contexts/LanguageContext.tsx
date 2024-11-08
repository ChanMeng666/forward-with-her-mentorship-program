'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

export const translations = {
    en: {
        // Navigation
        'nav.intro': 'Introduction',
        'nav.gallery': 'Gallery',
        'nav.schedule': 'Schedule',
        'nav.requirements': 'Requirements',
        'nav.title': 'Forward with Her',

        // Introduction Section
        'intro.season': 'Winter 2024',
        'intro.title': 'Mentor Recruitment',
        'intro.description1': 'Forward with Her is a Mentorship program dedicated to helping female university students and early-career professionals in China\'s tech industry.',
        'intro.description2': 'Supported by UN Women in 2021, we have had over 800 Mentees and 360 Mentors participating in our program as of April 2024.',
        'intro.button': 'Join Us',

        // Gallery Section
        'gallery.title': 'Poster Gallery',

        // Schedule Section
        'schedule.title': 'Program Schedule',
        'schedule.prep.title': 'Preparation',
        'schedule.prep.desc': 'Mentor training and ice-breaking activities to help you better understand the program and meet other outstanding female mentors.',
        'schedule.qa.title': 'Group Q&A',
        'schedule.qa.desc': 'Conduct group Q&A sessions to share your experiences and insights.',
        'schedule.oneone.title': 'One-on-One Sessions',
        'schedule.oneone.desc': 'Have 4 in-depth conversations with matched Mentees to help guide their career development.',

        // Requirements Section
        'requirements.title': 'Application Requirements',
        'requirements.exp': '• Tech industry professional with 2+ years of experience',
        'requirements.share': '• Willing to share experiences and help women develop in STEM',
        'requirements.time': '• Can participate in activities on time and be responsible for mentees',
        'requirements.value': '• Agree with project values and enjoy mutual assistance',
        'contact.title': 'Contact Us',
        'contact.email': 'Email: taxingFWH@163.com',
        'contact.wechat': 'Follow us: WeChat Official Account "Forward with Her Mentorship"'
    },
    zh: {
        // Navigation
        'nav.intro': '项目介绍',
        'nav.gallery': '海报剪影',
        'nav.schedule': '活动安排',
        'nav.requirements': '申请要求',
        'nav.title': '她行 Forward with Her',

        // Introduction Section
        'intro.season': '2024冬季',
        'intro.title': '「她行」Mentor招募',
        'intro.description1': '「她行ForwardwithHer」是一个致力于帮助中国科技领域的女性大学生或职场新人的Mentorship项目。',
        'intro.description2': '2021年获得联合国妇女署的支持，截止2024年4月，已有超过800位Mentee，360余位Mentor参与过我们的项目。',
        'intro.button': '加入我们',

        // Gallery Section
        'gallery.title': '海报剪影',

        // Schedule Section
        'schedule.title': '活动安排',
        'schedule.prep.title': '前期准备',
        'schedule.prep.desc': 'Mentor培训与破冰活动，帮助您更好地了解项目并认识其他优秀的女性导师。',
        'schedule.qa.title': '导师组答疑',
        'schedule.qa.desc': '以小组形式进行集体答疑，sharing您的经验与见解。',
        'schedule.oneone.title': '一对一交流',
        'schedule.oneone.desc': '与匹配的Mentee进行4次深度交流，帮助她们在职业发展道路上更有方向。',

        // Requirements Section
        'requirements.title': '申请要求',
        'requirements.exp': '• 科技行业从业者，有2年以上工作经验',
        'requirements.share': '• 愿意分享经验，帮助更多女性在STEM领域发展',
        'requirements.time': '• 能按时参与活动，对mentee负责',
        'requirements.value': '• 认同项目理念，乐于互助交流',
        'contact.title': '联系我们',
        'contact.email': '邮箱：taxingFWH@163.com',
        'contact.wechat': '关注我们：微信公众号「她行Mentorship」'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['en']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
