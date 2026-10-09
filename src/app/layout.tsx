import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর",
  description: "প্রতিদিনের বাজার দর জানুন সবার আগে। সঠিক ও নির্ভুল তথ্য নিয়ে আমরা আছি আপনার পাশে।",
  icons: {
    icon: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#FAFCFA] text-[#1D271F] font-sans antialiased"
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1D271F",
              color: "#FAFCFA",
              fontFamily: "'Hind Siliguri', sans-serif",
              borderRadius: "8px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#1A9951",
                secondary: "#FAFCFA",
              },
            },
            error: {
              iconTheme: {
                primary: "#D03739",
                secondary: "#FAFCFA",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
