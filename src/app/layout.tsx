// import type { Metadata } from "next";
// import "./globals.css";
//
// export const metadata: Metadata = {
//   title: "她行 2024冬季 Mentor招募",
//   description: "她行ForwardwithHer - 科技女性成长计划",
// };
//
// export default function RootLayout({
//                                      children,
//                                    }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//       <html lang="zh-CN">
//       <body className="antialiased">
//       {children}
//       </body>
//       </html>
//   );
// }



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
