"use client";
import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";

type Props = { item: Restaurant; onClick?: () => void };

const RestaurantCard = ({ item, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl shadow p-3 hover:shadow-md transition"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-3">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
      </div>
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-500">
        {item.category} · {item.address}
      </p>
    </button>
  );
};

export default RestaurantCard;
