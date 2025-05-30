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
  duration: number;
  availableDates?: string[];
  packageIncludes?: string[];
  itinerary?: TripDay[];
  maxPeople?: number;
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
