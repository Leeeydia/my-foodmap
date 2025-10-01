import { KakaoLoginButton } from "@/components/authUI/KakaoLoginButton";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-2 text-sm text-gray-600">
            음식지도에 가입하여 나만의 맛집을 기록해보세요
          </p>
        </div>
        <KakaoLoginButton />
      </div>
    </div>
  );
}
