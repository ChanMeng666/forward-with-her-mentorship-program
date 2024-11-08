import type { Metadata } from "next";
import { LanguageProvider } from '@/contexts/LanguageContext';
import DynamicHead from '@/components/DynamicHead';
import "./globals.css";
import { metadata as siteMetadata } from '@/config/metadata';

export const metadata: Metadata = {
    title: siteMetadata.en.title,
    description: siteMetadata.en.description,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="antialiased">
        <LanguageProvider>
            <DynamicHead />
            {children}
        </LanguageProvider>
        </body>
        </html>
    );
}
