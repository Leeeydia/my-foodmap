"use client";

import { KakaoLoginButton } from "@/components/authUI/KakaoLoginButton";
import { LogoutButton } from "@/auth/components/LogoutButton";
import { useKakaoAuth } from "@/hooks/useKakaoAuth";

export default function LoginPage() {
  const { user: session } = useKakaoAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p>환영합니다, {session.email || session.nickname || "사용자"}님!</p>
          <LogoutButton />
        </div>
      ) : (
        <KakaoLoginButton />
      )}
    </div>
  );
}
