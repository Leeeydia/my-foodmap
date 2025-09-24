export interface User {
  id: string;
  email: string;
  nickname: string;
  profile_image?: string;
  provider: "kakao" | "supabase";
}
