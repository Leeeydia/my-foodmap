"use client";

import { useKakaoAuth } from "@/hooks/useKakaoAuth";

export const LogoutButton = () => {
  const { logout } = useKakaoAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-300 rounded text-black"
    >
      로그아웃
    </button>
  );
};
