"use client";

import { useEffect, useRef, useState } from "react";

type MapProps = {
  lat: number;
  lng: number;
  level?: number;
};

export default function Map({ lat, lng, level = 3 }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;
    if (!apiKey) return;

    // 이미 SDK 로드된 경우
    if (typeof window !== "undefined" && (window as any).kakao?.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      // @ts-expect-error kakao 전역은 d.ts로 선언
      window.kakao.maps.load(() => setLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    // @ts-expect-error kakao 전역은 d.ts로 선언
    const center = new window.kakao.maps.LatLng(lat, lng);
    // @ts-expect-error kakao 전역은 d.ts로 선언
    const map = new window.kakao.maps.Map(mapRef.current, { center, level });
    // @ts-expect-error kakao 전역은 d.ts로 선언
    new window.kakao.maps.Marker({ position: center, map });
  }, [loaded, lat, lng, level]);

  return <div ref={mapRef} className="h-[420px] w-full rounded-xl border" />;
}
