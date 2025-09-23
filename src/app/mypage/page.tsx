"use client";

export default function MyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <p className="text-gray-600 mt-2">사용자 정보 및 설정을 관리할 수 있습니다.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 사용자 정보 카드 */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">프로필 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">이름</label>
              <p className="text-gray-900">사용자</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">이메일</label>
              <p className="text-gray-900">user@example.com</p>
            </div>
          </div>
        </div>

        {/* 즐겨찾기 맛집 */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">즐겨찾기 맛집</h2>
          <div className="space-y-2">
            <p className="text-gray-600">아직 즐겨찾기한 맛집이 없습니다.</p>
            <button className="text-blue-600 hover:underline text-sm">
              맛집 둘러보기
            </button>
          </div>
        </div>
      </div>

      {/* 설정 메뉴 */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">설정</h2>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded hover:bg-gray-50 border">
            알림 설정
          </button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-50 border">
            개인정보 수정
          </button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-50 border text-red-600">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
