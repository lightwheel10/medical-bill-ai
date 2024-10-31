import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { validateEnv } from '@/lib/env';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Validate environment variables during build/development
if (process.env.NODE_ENV !== 'production') {
  validateEnv();
}

export const metadata: Metadata = {
  title: "Medical Bill Analysis",
  description: "AI-powered medical bill analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
