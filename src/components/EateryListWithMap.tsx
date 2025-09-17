"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Kakao Maps 타입이 없다면 안전하게 any 선언
// (프로젝트에 kakao.maps 타입 선언이 이미 있다면 아래 줄은 제거해도 됩니다)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const kakao: any;

// ---- 더미 데이터 ----
export type Eatery = {
  id: string;
  name: string;
  category: "한식" | "카페" | "분식" | "양식" | "중식" | "일식" | "기타";
  rating: number; // 0 ~ 5
  price: "₩" | "₩₩" | "₩₩₩";
  openNow: boolean;
  address: string;
  lat: number;
  lng: number;
};

const DUMMY_EATERIES: Eatery[] = [
  {
    id: "e1",
    name: "성수김밥 클럽",
    category: "분식",
    rating: 4.6,
    price: "₩",
    openNow: true,
    address: "서울 성동구 성수동1가 123-4",
    lat: 37.544579,
    lng: 127.055699,
  },
  {
    id: "e2",
    name: "프릳츠 도화",
    category: "카페",
    rating: 4.8,
    price: "₩₩",
    openNow: true,
    address: "서울 마포구 도화동 179-3",
    lat: 37.540611,
    lng: 126.9459,
  },
  {
    id: "e3",
    name: "을밀대 본점",
    category: "한식",
    rating: 4.4,
    price: "₩₩",
    openNow: false,
    address: "서울 마포구 염리동 164-14",
    lat: 37.54192,
    lng: 126.94787,
  },
  {
    id: "e4",
    name: "더미 파스타바",
    category: "양식",
    rating: 4.2,
    price: "₩₩",
    openNow: true,
    address: "서울 강남구 역삼동 644-3",
    lat: 37.49991,
    lng: 127.03637,
  },
  {
    id: "e5",
    name: "스시 하루",
    category: "일식",
    rating: 4.7,
    price: "₩₩₩",
    openNow: true,
    address: "서울 송파구 잠실동 19-1",
    lat: 37.5112,
    lng: 127.098,
  },
];

export default function EateryListWithMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjRef = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);
  const infoRef = useRef<any | null>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"전체" | Eatery["category"]>("전체");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(true);

  const filtered = useMemo(() => {
    return DUMMY_EATERIES.filter((e) => {
      const matchesQuery =
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.address.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "전체" ? true : e.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  useEffect(() => {
    // Kakao SDK 로더
    // 환경변수에 NEXT_PUBLIC_KAKAO_MAP_KEY 가 설정되어 있어야 합니다.
    const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    const ensureKakao = () =>
      new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined") return;
        // 이미 로드된 경우
        if ((window as any).kakao && (window as any).kakao.maps) {
          (window as any).kakao.maps.load(() => resolve());
          return;
        }
        const existing = document.querySelector<HTMLScriptElement>(
          'script[src^="https://dapi.kakao.com/v2/maps/sdk.js"]'
        );
        if (existing) {
          existing.addEventListener("load", () => (window as any).kakao.maps.load(() => resolve()));
          existing.addEventListener("error", () => reject(new Error("Kakao SDK load error")));
          return;
        }
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => (window as any).kakao.maps.load(() => resolve()));
        script.addEventListener("error", () => reject(new Error("Kakao SDK load error")));
        document.head.appendChild(script);
      });

    const init = async () => {
      try {
        await ensureKakao();
        if (!mapRef.current) return;
        const center = new kakao.maps.LatLng(DUMMY_EATERIES[0].lat, DUMMY_EATERIES[0].lng);
        const map = new kakao.maps.Map(mapRef.current, { center, level: 6 });
        mapObjRef.current = map;
        infoRef.current = new kakao.maps.InfoWindow({ zIndex: 3 });
        // 초기 마커 세팅
        resetMarkers(DUMMY_EATERIES);
        setIsLoadingMap(false);
      } catch (e) {
        console.error(e);
        setIsLoadingMap(false);
      }
    };

    init();

    return () => {
      // 정리
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      infoRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터가 바뀔 때마다 마커도 갱신
  useEffect(() => {
    if (!mapObjRef.current) return;
    resetMarkers(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  const resetMarkers = (rows: Eatery[]) => {
    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // bounds 재계산
    const bounds = new kakao.maps.LatLngBounds();

    rows.forEach((e) => {
      const pos = new kakao.maps.LatLng(e.lat, e.lng);
      const marker = new kakao.maps.Marker({ position: pos });
      marker.setMap(mapObjRef.current);
      markersRef.current.push(marker);
      bounds.extend(pos);

      kakao.maps.event.addListener(marker, "click", () => {
        setSelectedId(e.id);
        openInfo(e);
      });
    });

    if (rows.length > 0) {
      mapObjRef.current.setBounds(bounds);
    }
  };

  const openInfo = (e: Eatery) => {
    if (!infoRef.current || !mapObjRef.current) return;
    const pos = new kakao.maps.LatLng(e.lat, e.lng);
    const html = `
      <div style="padding:8px 12px;min-width:200px">
        <div style="font-weight:700;margin-bottom:4px">${e.name}</div>
        <div style="font-size:12px;color:#555">${e.address}</div>
        <div style="font-size:12px;margin-top:6px">${"★".repeat(Math.round(e.rating))} (${e.rating.toFixed(
          1
        )}) · ${e.category} · ${e.price}</div>
      </div>
    `;
    infoRef.current.setContent(html);
    infoRef.current.open(mapObjRef.current, findMarkerById(e.id));
    mapObjRef.current.panTo(pos);
  };

  const findMarkerById = (id: string) => {
    const idx = DUMMY_EATERIES.findIndex((r) => r.id === id);
    return markersRef.current[idx];
  };

  const handleItemClick = (e: Eatery) => {
    setSelectedId(e.id);
    openInfo(e);
  };

  const gotoMyLocation = () => {
    if (!navigator.geolocation || !mapObjRef.current) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const latlng = new kakao.maps.LatLng(latitude, longitude);
      mapObjRef.current?.panTo(latlng);
      // 내 위치 마커 간단히 추가
      const me = new kakao.maps.Marker({ position: latlng });
      me.setMap(mapObjRef.current);
      markersRef.current.push(me);
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full grid grid-rows-[auto,1fr] gap-3">
      {/* 상단 바 */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-xl font-semibold">맛집 지도</div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="가게명·주소 검색"
            className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="border rounded-xl px-3 py-2 text-sm"
          >
            <option value="전체">전체</option>
            <option value="한식">한식</option>
            <option value="카페">카페</option>
            <option value="분식">분식</option>
            <option value="양식">양식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="기타">기타</option>
          </select>
          <button onClick={gotoMyLocation} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            현재 위치로
          </button>
        </div>
      </div>

      {/* 본문 레이아웃: 좌측 리스트 / 우측 지도 */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-3 h-full">
        {/* 리스트 패널 */}
        <aside className="h-full overflow-hidden">
          <div className="h-full rounded-2xl border bg-white flex flex-col">
            <div className="px-4 pt-4 pb-3 border-b flex items-center justify-between">
              <div className="text-sm text-gray-500">총 {filtered.length}곳</div>
              <div className="text-xs text-gray-400">더미 데이터</div>
            </div>
            <div className="flex-1 overflow-auto px-2 py-2 space-y-2">
              {filtered.map((e) => (
                <button
                  key={e.id}
                  onClick={() => handleItemClick(e)}
                  className={`w-full text-left rounded-xl border p-3 hover:shadow-sm transition
                    ${selectedId === e.id ? "ring-2 ring-black/10 bg-gray-50" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-medium leading-6">{e.name}</div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{e.category}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{e.address}</div>
                  <div className="text-xs mt-1">{"★".repeat(Math.round(e.rating))} ({e.rating.toFixed(1)}) · {e.price}</div>
                  <div className="text-[11px] mt-1">
                    {e.openNow ? <span className="text-emerald-600">영업중</span> : <span className="text-gray-400">영업종료</span>}
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-gray-500 py-10 text-center">검색 결과가 없어요.</div>
              )}
            </div>
          </div>
        </aside>

        {/* 지도 패널 */}
        <section className="h-full">
          <div className="h-full rounded-2xl border overflow-hidden relative">
            {isLoadingMap && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">지도를 불러오는 중…</div>
            )}
            <div ref={mapRef} className="h-full w-full" />
          </div>
        </section>
      </div>
    </div>
  );
}
