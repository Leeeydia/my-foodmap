"use client";
import RestaurantCard from "./RestaurantCard";
import { dummyRestaurants } from "@/data/dummyRestaurants";

const RestaurantList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dummyRestaurants.map((item) => (
        <RestaurantCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default RestaurantList;
