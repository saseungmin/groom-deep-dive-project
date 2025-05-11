import { supabase } from '@/lib/supabase';
import { mockTrips } from '@/services/fixtures';
import type { Trip } from '@/types/trip';

interface DbTrip {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  discount?: number;
  image_url: string;
  gallery_images?: string[];
  rating: number;
  review_count: number;
  tags?: string[];
  duration: number;
  available_dates?: string[];
  package_includes?: string[];
  max_people?: number;
}

interface DbItinerary {
  day: number;
  title: string;
  description: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  accommodation?: string;
  trip_id: string;
}

// 인기 여행 상품 가져오기
export const fetchPopularTrips = async (): Promise<Trip[]> => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('review_count', { ascending: false })
      .limit(10);

    if (error) {
      console.error('인기 여행 상품을 가져오는 데 실패했습니다:', error);
      return mockTrips.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return data.map(transformDbTrip);
  } catch (error) {
    console.error('인기 여행 상품을 가져오는 데 실패했습니다:', error);
    return mockTrips.sort((a, b) => b.reviewCount - a.reviewCount);
  }
};

// 추천 여행 상품 가져오기
export const fetchRecommendedTrips = async (): Promise<Trip[]> => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('rating', { ascending: false })
      .limit(10);

    if (error) {
      console.error('추천 여행 상품을 가져오는 데 실패했습니다:', error);
      return mockTrips.sort((a, b) => b.rating - a.rating);
    }

    return data.map(transformDbTrip);
  } catch (error) {
    console.error('추천 여행 상품을 가져오는 데 실패했습니다:', error);
    return mockTrips.sort((a, b) => b.rating - a.rating);
  }
};

// 특정 여행 상품 가져오기
export const fetchTripById = async (id: string): Promise<Trip | undefined> => {
  try {
    // 여행 기본 정보 가져오기
    const { data: tripData, error: tripError } = await supabase
      .from('trips')
      .select('*')
      .eq('id', id)
      .single();

    if (tripError) {
      console.error('여행 상품을 가져오는 데 실패했습니다:', tripError);
      return mockTrips.find((trip) => trip.id === id);
    }

    // 여행 일정 가져오기
    const { data: itineraryData, error: itineraryError } = await supabase
      .from('trip_itineraries')
      .select('*')
      .eq('trip_id', id)
      .order('day');

    if (itineraryError) {
      console.error('여행 일정을 가져오는 데 실패했습니다:', itineraryError);
    }

    const trip = transformDbTrip(tripData);

    if (itineraryData) {
      trip.itinerary = itineraryData.map(transformDbItinerary);
    }

    return trip;
  } catch (error) {
    console.error('여행 상품을 가져오는 데 실패했습니다:', error);

    return mockTrips.find((trip) => trip.id === id);
  }
};

// 여행 상품 검색하기
export const searchTrips = async (query: string): Promise<Trip[]> => {
  try {
    const lowercaseQuery = query.toLowerCase();

    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .or(
        `title.ilike.%${lowercaseQuery}%,location.ilike.%${lowercaseQuery}%,description.ilike.%${lowercaseQuery}%`,
      );

    if (error) {
      console.error('여행 상품 검색에 실패했습니다:', error);

      const results = mockTrips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(lowercaseQuery) ||
          trip.location.toLowerCase().includes(lowercaseQuery) ||
          trip.description.toLowerCase().includes(lowercaseQuery) ||
          trip.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
      );

      return results;
    }

    return data.map(transformDbTrip);
  } catch (error) {
    console.error('여행 상품 검색에 실패했습니다:', error);

    const lowercaseQuery = query.toLowerCase();
    const results = mockTrips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(lowercaseQuery) ||
        trip.location.toLowerCase().includes(lowercaseQuery) ||
        trip.description.toLowerCase().includes(lowercaseQuery) ||
        trip.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    );

    return results;
  }
};

const transformDbTrip = (dbTrip: DbTrip): Trip => {
  return {
    id: dbTrip.id,
    title: dbTrip.title,
    location: dbTrip.location,
    description: dbTrip.description,
    price: dbTrip.price,
    discount: dbTrip.discount,
    imageUrl: dbTrip.image_url,
    galleryImages: dbTrip.gallery_images,
    rating: dbTrip.rating,
    reviewCount: dbTrip.review_count,
    tags: dbTrip.tags,
    duration: dbTrip.duration,
    availableDates: dbTrip.available_dates,
    packageIncludes: dbTrip.package_includes,
    maxPeople: dbTrip.max_people,
  };
};

const transformDbItinerary = (dbItinerary: DbItinerary) => {
  return {
    day: dbItinerary.day,
    title: dbItinerary.title,
    description: dbItinerary.description,
    meals: dbItinerary.meals,
    accommodation: dbItinerary.accommodation,
  };
};
