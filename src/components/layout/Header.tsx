"use client";
import Link from "next/link";

const Headers = () => {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 gap-6">
        {/* 로고 */}
        <Link href="/" className="font-semibold text-lg whitespace-nowrap">
          🍜 My Food Map
        </Link>

        {/* 검색창 */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="맛집 이름 검색..."
            className="w-full rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 메뉴 */}
        <div className="flex items-center gap-4 text-sm whitespace-nowrap">
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
          <Link href="/mypage" className="hover:underline">
            마이페이지
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
