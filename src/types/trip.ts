export type Trip = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
  galleryImages?: string[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  duration: number; // 일 수
  availableDates?: string[]; // ISO 형식의 날짜 문자열
  packageIncludes?: string[]; // 패키지에 포함된 항목들
  itinerary?: TripDay[];
  maxPeople?: number; // 최대 인원
};

export type TripDay = {
  day: number;
  title: string;
  description: string;
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  accommodation?: string;
};

export type CartItem = {
  tripId: string;
  quantity: number;
  startDate?: string;
  people: number;
  totalPrice: number;
  trip: Trip;
};
