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

        // 确保 favicon 始终存在
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (!existingFavicon) {
            const favicon = document.createElement('link');
            favicon.rel = 'icon';
            favicon.href = '/images/logo.jpg';
            document.head.appendChild(favicon);
        }

    }, [language]);

    return null;
}
