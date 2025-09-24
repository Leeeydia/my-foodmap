# 환경 변수 설정 가이드

## 1. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Kakao
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key
NEXT_PUBLIC_KAKAO_REST_API_KEY=your_kakao_rest_api_key
```

## 2. Supabase 설정

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성하세요
2. 프로젝트 설정에서 API URL과 anon key를 확인하세요
3. 위의 환경 변수에 값을 입력하세요

## 3. 카카오 API 설정

1. [Kakao Developers](https://developers.kakao.com)에 가입하고 애플리케이션을 생성하세요
2. 애플리케이션 설정에서 JavaScript 키와 REST API 키를 확인하세요
3. 플랫폼 설정에서 Web 플랫폼을 추가하고 사이트 도메인을 등록하세요 (예: http://localhost:3000)
4. 카카오 로그인 활성화 및 Redirect URI 설정:
   - `http://localhost:3000/auth/callback`
5. 동의항목 설정에서 필요한 정보를 선택하세요:
   - 닉네임
   - 카카오계정(이메일)

## 4. 애플리케이션 실행

```bash
pnpm dev
```

이제 http://localhost:3000 에서 카카오 로그인을 테스트할 수 있습니다.
