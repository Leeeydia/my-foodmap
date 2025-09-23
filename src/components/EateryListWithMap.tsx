"use client";
import dynamic from "next/dynamic";
import RestaurantList from "./ui/RestaurantList";

// 맵 경로는 프로젝트에 맞춰 주세요.
// 이전 스샷 기준: "@/features/map/components/map"
const Map = dynamic(() => import("@/features/map/components/map"), {
  ssr: false,
});

export default function EateryListWithMap() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="h-[420px] md:h-[calc(100vh-200px)] rounded-2xl overflow-hidden shadow">
        <Map lat={37.5665} lng={126.978} level={5} />
      </div>
      <div className="min-h-[420px]">
        <RestaurantList />
      </div>
    </div>
  );
}
