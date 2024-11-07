'use client';

import { useEffect, useState } from 'react';

interface NavigationProps {
    onSectionChange: (section: string) => void;
    currentSection: string;
}

export default function Navigation({ onSectionChange, currentSection }: NavigationProps) {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16">
                    <div className="flex space-x-8">
                        {['coca-cola', 'iconic-design', 'sustainability'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${
                                    currentSection === section
                                        ? 'text-red-600'
                                        : 'text-gray-700 hover:text-red-600'
                                }`}
                            >
                                {section.split('-').map(word =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
