"use client";

import { supabase } from "@/lib/supabaseClient";

export const KakaoLoginButton = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });

    if (error) console.error("Login error:", error);
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-yellow-400 rounded text-black"
    >
      카카오로 로그인
    </button>
  );
};
