"use client";

import { useKakaoAuth } from "@/hooks/useKakaoAuth";

export const KakaoLoginButton = () => {
  const { loginWithKakao, isLoading } = useKakaoAuth();

  const handleLogin = async () => {
    await loginWithKakao();
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="px-4 py-2 bg-yellow-400 rounded text-black disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "로그인 중..." : "카카오로 로그인"}
    </button>
  );
};
