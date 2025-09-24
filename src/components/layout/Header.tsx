"use client";
import Link from "next/link";
import Image from "next/image";
import { useKakaoAuth } from "@/hooks/useKakaoAuth";

const Headers = () => {
  const { user, logout } = useKakaoAuth();

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
          {user ? (
            <>
              <div className="flex items-center gap-2">
                {user.profile_image && (
                  <Image
                    src={user.profile_image}
                    alt="프로필"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-gray-700">
                  {user.nickname || user.email}
                </span>
              </div>
              <Link href="/mypage" className="hover:underline">
                마이페이지
              </Link>
              <button
                onClick={logout}
                className="hover:underline text-gray-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Headers;
