'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { metadata } from '@/config/metadata';
import { useEffect } from 'react';

export default function DynamicHead() {
    const { language } = useLanguage();

    useEffect(() => {
        // 更新文档标题
        document.title = metadata[language].title;

        // 更新描述元标签
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metadata[language].description);
        }

        // 更新语言属性
        document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    }, [language]);

    return null;
}
