import { useEffect, useState } from 'react';

import BannerCarousel from '@/components/common/BannerCarousel';
import SectionTitle from '@/components/common/SectionTitle';
import TripCard from '@/components/trip/TripCard';
import {
  fetchPopularTrips,
  fetchRecommendedTrips,
} from '@/services/tripService';
import type { Trip } from '@/types/trip';

const Home = () => {
  const [popularTrips, setPopularTrips] = useState<Trip[]>([]);
  const [recommendedTrips, setRecommendedTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [popular, recommended] = await Promise.all([
          fetchPopularTrips(),
          fetchRecommendedTrips(),
        ]);

        setPopularTrips(popular);
        setRecommendedTrips(recommended);
      } catch (error) {
        console.error('Failed to load trip data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <BannerCarousel />

      <section className="mt-12">
        <SectionTitle
          title="인기 여행"
          description="다른 여행객들이 많이 찾는 인기 여행 상품"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <SectionTitle
          title="당신을 위한 추천 여행"
          description="취향에 맞는 특별한 여행을 찾아보세요"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
