import Map from "@/features/map/components/Map";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">내 주변 맛집 지도</h1>
      <Map lat={37.5665} lng={126.978} level={4} />
    </section>
  );
}
