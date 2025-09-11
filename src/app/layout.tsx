// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

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
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold text-lg">
              🍜 My Food Map
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/login" className="hover:underline">
                로그인
              </Link>
              <Link href="/mypage" className="hover:underline">
                마이페이지
              </Link>
            </div>
          </nav>
        </header>

        {/* 각 페이지가 여기로 들어옴 */}
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
