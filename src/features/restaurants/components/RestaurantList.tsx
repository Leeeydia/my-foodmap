// src/features/restaurants/components/RestaurantList.tsx
"use client";

import { dummyRestaurants } from "@/data/dummyRestaurants";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList() {
  return (
    <div className="w-80 border-l border-gray-300 overflow-y-scroll">
      {dummyRestaurants.map((item) => (
        <RestaurantCard
          key={item.id}
          {...item}
          onClick={() => console.log(`${item.name} 클릭됨`)}
        />
      ))}
    </div>
  );
}
