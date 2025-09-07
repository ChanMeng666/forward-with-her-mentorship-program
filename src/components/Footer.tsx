'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="w-full bg-white/80 backdrop-blur-md border-t border-[#ffd9b3]">
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Brand Header */}
                <div className="flex flex-col items-center space-y-4 mb-16">
                    <Image
                        src="/images/logo.svg"
                        alt={t('footer.brand.title')}
                        width={80}
                        height={80}
                        className="w-20 h-20"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('footer.brand.title')}</h2>
                        <p className="text-gray-600 max-w-2xl leading-relaxed">
                            {t('footer.brand.description')}
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
                    {/* Developer */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/images/chan_logo.svg"
                                alt="Chan Meng"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <div>
                                <h4 className="text-lg font-semibold text-[#ff9933]">{t('footer.developer.name')}</h4>
                                <p className="text-gray-600 text-sm">{t('footer.developer.title')}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-center lg:text-left text-sm leading-relaxed">
                            {t('footer.developer.description')}
                        </p>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <h4 className="text-lg font-semibold text-gray-800">{t('footer.services.title')}</h4>
                        <ul className="space-y-2 text-gray-600 text-center lg:text-left text-sm">
                            <li className="flex items-center justify-center lg:justify-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full"></span>
                                <span>{t('footer.services.webdev')}</span>
                            </li>
                            <li className="flex items-center justify-center lg:justify-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full"></span>
                                <span>{t('footer.services.3d')}</span>
                            </li>
                            <li className="flex items-center justify-center lg:justify-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full"></span>
                                <span>{t('footer.services.design')}</span>
                            </li>
                            <li className="flex items-center justify-center lg:justify-start space-x-2">
                                <span className="w-1.5 h-1.5 bg-[#ff9933] rounded-full"></span>
                                <span>{t('footer.services.optimization')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <h4 className="text-lg font-semibold text-gray-800">{t('footer.contact.title')}</h4>
                        <div className="space-y-4 w-full">
                            <Link
                                href="mailto:chanmeng.dev@gmail.com"
                                className="group flex items-center justify-center lg:justify-start space-x-3 text-gray-600 hover:text-[#ff9933] transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#ff9933]/10 flex items-center justify-center transition-all duration-300">
                                    <span className="text-sm">✉</span>
                                </div>
                                <span className="text-sm font-medium">{t('footer.contact.email')}</span>
                            </Link>
                            <Link
                                href="https://github.com/ChanMeng666"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center lg:justify-start space-x-3 text-gray-600 hover:text-[#ff9933] transition-all duration-300"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#ff9933]/10 flex items-center justify-center transition-all duration-300">
                                    <span className="text-sm">⚡</span>
                                </div>
                                <span className="text-sm font-medium">{t('footer.contact.portfolio')}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-[#ffd9b3]/30">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>© {currentYear} <span className="font-semibold">{t('footer.brand.title')}</span> · {t('footer.copyright')}</span>
                            <span className="hidden sm:inline">•</span>
                            <Link
                                href="https://github.com/ChanMeng666/forward-with-her-mentorship-program"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#ff9933] transition-colors"
                            >
                                {t('footer.opensource')}
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{t('footer.crafted')}</span>
                            <span className="text-[#ff9933] animate-pulse">❤</span>
                            <span>{t('footer.using')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
