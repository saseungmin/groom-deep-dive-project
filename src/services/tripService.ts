import type { Trip } from '@/types/trip';

// 임시 데이터
const mockTrips: Trip[] = [
  {
    id: '1',
    title: '제주도 4일 힐링 여행',
    location: '제주도, 대한민국',
    description: '아름다운 제주의 해변과 오름을 탐험하는 4일 코스',
    price: 450000,
    discount: 10,
    imageUrl:
      'https://images.unsplash.com/photo-1599922407641-d20388f17918?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galleryImages: [
      'https://images.unsplash.com/photo-1701678638937-7d538a9f0211?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1543503430-244aace16cbd?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1714569858851-7006933b6869?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    rating: 4.7,
    reviewCount: 128,
    tags: ['힐링', '자연', '해변'],
    duration: 4,
    maxPeople: 15,
    packageIncludes: ['숙박', '조식', '렌터카', '일부 관광지 입장권'],
    itinerary: [
      {
        day: 1,
        title: '제주 도착 & 동부 탐방',
        description: '제주 공항 도착 후 렌터카 픽업, 성산일출봉, 우도 방문',
        meals: {
          breakfast: false,
          lunch: true,
          dinner: true,
        },
        accommodation: '제주시 호텔',
      },
      {
        day: 2,
        title: '서부 해안 탐방',
        description: '협재 해변, 카페 투어, 오설록 티 뮤지엄 방문',
        meals: {
          breakfast: true,
          lunch: false,
          dinner: true,
        },
        accommodation: '서귀포시 호텔',
      },
    ],
  },
  {
    id: '2',
    title: '방콕 & 파타야 5일',
    location: '태국',
    description: '방콕의 활기찬 도시 풍경과 파타야의 해변을 즐기는 5일 코스',
    price: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
    rating: 4.5,
    reviewCount: 95,
    tags: ['도시', '해변', '쇼핑'],
    duration: 5,
    maxPeople: 20,
  },
  {
    id: '3',
    title: '후쿠오카 벚꽃 여행',
    location: '일본',
    description: '봄에 만나는 환상적인 일본 벚꽃 명소 투어',
    price: 720000,
    discount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951',
    rating: 4.8,
    reviewCount: 154,
    tags: ['벚꽃', '봄', '문화'],
    duration: 3,
    maxPeople: 12,
  },
  {
    id: '4',
    title: '다낭 & 호이안 4박 6일',
    location: '베트남',
    description: '베트남의 아름다운 해변과 역사적인 도시를 탐험하세요',
    price: 650000,
    discount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b',
    rating: 4.6,
    reviewCount: 87,
    tags: ['문화', '해변', '힐링'],
    duration: 6,
    maxPeople: 16,
  },
];

// 인기 여행 상품 가져오기
export const fetchPopularTrips = (): Promise<Trip[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrips.sort((a, b) => b.reviewCount - a.reviewCount));
    }, 500);
  });
};

// 추천 여행 상품 가져오기
export const fetchRecommendedTrips = (): Promise<Trip[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrips.sort((a, b) => b.rating - a.rating));
    }, 500);
  });
};

// 특정 여행 상품 가져오기
export const fetchTripById = (id: string): Promise<Trip | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrips.find((trip) => trip.id === id));
    }, 300);
  });
};

// 여행 상품 검색하기
export const searchTrips = (query: string): Promise<Trip[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      const results = mockTrips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(lowercaseQuery) ||
          trip.location.toLowerCase().includes(lowercaseQuery) ||
          trip.description.toLowerCase().includes(lowercaseQuery) ||
          trip.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
      );
      resolve(results);
    }, 500);
  });
};
