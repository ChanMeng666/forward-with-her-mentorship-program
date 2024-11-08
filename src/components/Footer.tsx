import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full py-6 bg-white/80 backdrop-blur-md border-t border-[#ffd9b3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
                    <p className="text-center">
                        © 2024 <span className="font-semibold">Forward with Her</span>. All rights reserved.
                    </p>
                    <p className="text-center flex items-center gap-1">
                        Code & Crafted with
                        <span className="text-yellow-500" aria-label="love">💛</span>
                        by{' '}
                        <Link
                            href="https://github.com/ChanMeng666/3d-model-viewer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#ff9933] hover:text-[#ff8000] transition-colors"
                        >
                            Chan Meng
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
