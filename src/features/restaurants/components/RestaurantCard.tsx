// src/features/restaurants/components/RestaurantCard.tsx
import { Restaurant } from "../types";

type Props = Restaurant & {
  onClick?: () => void;
};

export default function RestaurantCard({
  name,
  category,
  rating,
  address,
  onClick,
}: Props) {
  return (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-sm text-yellow-600">⭐ {rating}</p>
      <p className="text-xs text-gray-500">{address}</p>
    </div>
  );
}
