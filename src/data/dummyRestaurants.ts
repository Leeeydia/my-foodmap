import { Restaurant } from "@/types/restaurant";

export const dummyRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "맛있는 한식당",
    address: "서울특별시 강남구 테헤란로 123",
    category: "한식",
    imageUrl: "/images/restaurant1.jpg",
  },
  {
    id: 2,
    name: "이탈리안 파스타",
    address: "서울특별시 서초구 강남대로 456",
    category: "양식",
    imageUrl: "/images/restaurant2.jpg",
  },
  {
    id: 3,
    name: "커피와 디저트",
    address: "서울특별시 마포구 홍대입구 789",
    category: "카페",
    imageUrl: "/images/restaurant3.jpg",
  },
];
