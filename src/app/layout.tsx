import type { Metadata } from "next";
import { LanguageProvider } from '@/contexts/LanguageContext';
import DynamicHead from '@/components/DynamicHead';
import "./globals.css";
import { metadata as siteMetadata } from '@/config/metadata';

export const metadata: Metadata = {
    metadataBase: new URL("https://forward-with-her-mentorship-program.pages.dev"),
    title: siteMetadata.en.title,
    description: siteMetadata.en.description,
    icons: {
        icon: [
            { url: '/images/logo.svg' }
        ],
        shortcut: ['/images/logo.svg'],
        apple: [
            { url: '/images/logo.svg' }
        ]
    },
    openGraph: {
        title: "Forward with Her",
        description: "A growth program connecting women in tech with mentors.",
        type: "website",
        siteName: "Forward with Her",
        images: [
            {
                url: "/og-cover.png",
                width: 1200,
                height: 630,
                alt: "Forward with Her — a growth program connecting women in tech with mentors",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Forward with Her",
        description: "A growth program connecting women in tech with mentors.",
        images: ["/og-cover.png"],
    },
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
