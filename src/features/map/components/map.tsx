"use client";

import { useEffect, useRef } from "react";

type MapProps = {
  lat: number;
  lng: number;
  level: number;
};

const Map = ({ lat, lng, level }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;

    if (!window.kakao?.maps) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level,
          };
          const createdMap = new window.kakao.maps.Map(
            mapRef.current!,
            options
          );
          new window.kakao.maps.Marker({
            position: options.center,
            map: createdMap,
          });
        });
      };
      document.head.appendChild(script);
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level,
    };
    const createdMap = new window.kakao.maps.Map(mapRef.current!, options);
    new window.kakao.maps.Marker({ position: options.center, map: createdMap });
  }, [lat, lng, level]);

  return <div ref={mapRef} className="h-[420px] w-full rounded-xl border" />;
};

export default Map;
