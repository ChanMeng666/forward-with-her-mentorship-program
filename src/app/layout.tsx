import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "她行 2024冬季 Mentor招募",
  description: "她行ForwardwithHer - 科技女性成长计划",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="zh-CN">
      <body className="antialiased">
      {children}
      </body>
      </html>
  );
}
