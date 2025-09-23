// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Headers from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "My Food Map",
  description: "Login + Kakao Map + Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-dvh bg-white text-gray-900">
        {/* 공통 Header */}
        <Headers />

        {/* 각 페이지가 여기로 들어옴 */}
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
