import { Restaurant } from "@/features/restaurants/types";

export const dummyRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "맛있는 한식당",
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    website: "https://example.com",
    image: "/images/restaurant1.jpg",
    category: "한식",
    rating: 4.5,
  },
  {
    id: "2", 
    name: "이탈리안 파스타",
    address: "서울특별시 서초구 강남대로 456",
    phone: "02-2345-6789",
    website: "https://example2.com",
    image: "/images/restaurant2.jpg",
    category: "양식",
    rating: 4.2,
  },
  {
    id: "3",
    name: "커피와 디저트",
    address: "서울특별시 마포구 홍대입구 789",
    phone: "02-3456-7890", 
    website: "https://example3.com",
    image: "/images/restaurant3.jpg",
    category: "카페",
    rating: 4.8,
  },
];

