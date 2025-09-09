"use client";

import { useEffect, useRef, useState } from "react";

type MapProps = {
  lat: number;
  lng: number;
  level: number;
};

const Map = ({ lat, lng, level }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;

    if (!(window as any).kakao?.maps) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        // @ts-expect-error kakao 전역 타입은 d.ts에서 선언됨
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level,
          };
          // @ts-expect-error
          const createdMap = new window.kakao.maps.Map(mapRef.current, options);
          setMap(createdMap);
          // @ts-expect-error
          new window.kakao.maps.Marker({
            position: options.center,
            map: createdMap,
          });
        });
      };
      document.head.appendChild(script);
      return;
    }

    // @ts-expect-error
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level,
    };
    // @ts-expect-error
    const createdMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(createdMap);
    // @ts-expect-error
    new window.kakao.maps.Marker({ position: options.center, map: createdMap });
  }, [lat, lng, level]);

  return <div ref={mapRef} className="h-[420px] w-full rounded-xl border" />;
};

export default Map;
