This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

배우고자하는게 뭔지
package관리자를 써본다
기본 component를 어떤걸만들어서 사용해본다
backend api 연동을 직접 해본다
ajax
어디까지 할건지

🍽️ 맛집 프로젝트 전체 진행 틀 (단계별 계획)
1단계. 기본 뼈대 & 더미데이터

프로젝트 구조 세팅 (app, features, components, lib)

지도 컴포넌트 (Map.tsx) 만들기

맛집 더미데이터 만들기

맛집 리스트 + 카드 UI (RestaurantList, RestaurantCard) 완성
→ 지금까지 여기까지 끝난 상태

2단계. 리스트 ↔ 지도 상호작용

리스트 클릭 시 → 지도 중심 이동 (panTo)

마커 표시 & 기존 마커 관리

선택된 카드 하이라이트 스타일 주기
→ 사용자 입장에서 제일 눈에 보이는 핵심 기능

3단계. 북마크 기능 (UI → 상태 → DB)

BookmarkButton 만들기 (하트 토글 버튼)

useState로 북마크 임시 상태 관리

Supabase 연결 → bookmarks 테이블에 저장/불러오기

북마크된 맛집 리스트는 마이페이지에서 확인 가능하게 확장

4단계. 상세 정보 & 리뷰

맛집 클릭 시 상세 모달 or /restaurants/[id] 페이지 이동

상세 정보 (이름, 주소, 별점, 지도 위치 등) 표시

리뷰 작성/조회 기능 (ReviewForm, reviews 테이블) 추가

5단계. 사용자 인증 & 개인화

Supabase Auth 연동 → 로그인/회원가입

로그인 상태에 따라 북마크/리뷰 가능

마이페이지(mypage/)에서 내 북마크, 내 리뷰 모아보기

6단계. 디자인/최적화

Tailwind로 전체 UI 정리 (Header, Modal, Layout)

API 실제 데이터 붙이기 (ex. Kakao API, 외부 맛집 API)

반응형/최적화 (모바일 대응)
