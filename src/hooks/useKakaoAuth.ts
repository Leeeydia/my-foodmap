"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/auth";

interface KakaoUser {
  id: number;
  kakao_account: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

interface KakaoError {
  error: string;
  error_description: string;
}

export const useKakaoAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 카카오 SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (kakaoKey && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }
      }
    };

    // 카카오 SDK 로드
    if (typeof window !== "undefined") {
      if (window.Kakao) {
        initKakao();
      } else {
        const script = document.createElement("script");
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
        script.integrity =
          "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
        script.crossOrigin = "anonymous";
        script.onload = initKakao;
        document.head.appendChild(script);
      }
    }
  }, []);

  const loginWithKakao = async () => {
    if (!window.Kakao?.Auth) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    setIsLoading(true);

    window.Kakao.Auth.login({
      success: async () => {
        try {
          // 카카오 사용자 정보 가져오기
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: async (userInfo: KakaoUser) => {
              // 카카오 정보로 직접 세션 생성 (Supabase OAuth 대신)
              const userSession: User = {
                id: userInfo.id.toString(),
                email: userInfo.kakao_account.email || "",
                nickname: userInfo.kakao_account.profile?.nickname || "",
                profile_image:
                  userInfo.kakao_account.profile?.profile_image_url || "",
                provider: "kakao",
              };

              // 로컬 스토리지에 사용자 정보 저장
              localStorage.setItem("user", JSON.stringify(userSession));
              setUser(userSession);
            },
            fail: (error: KakaoError) => {
              console.error("카카오 사용자 정보 요청 실패:", error);
              alert("사용자 정보를 가져오는데 실패했습니다.");
            },
          });
        } catch (error) {
          console.error("로그인 처리 중 오류:", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      },
      fail: (err: KakaoError) => {
        console.error("카카오 로그인 실패:", err);
        alert("카카오 로그인에 실패했습니다.");
        setIsLoading(false);
      },
      scope: "profile_nickname,account_email",
    });
  };

  const logout = async () => {
    try {
      // 카카오 로그아웃
      if (window.Kakao?.Auth) {
        window.Kakao.Auth.logout();
      }

      // Supabase 로그아웃
      await supabase.auth.signOut();

      // 로컬 스토리지 정리
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  // 저장된 사용자 정보 확인
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return {
    user,
    isLoading,
    loginWithKakao,
    logout,
  };
};
