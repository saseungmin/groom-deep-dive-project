import { Suspense } from 'react';

import BannerCarousel from '@/components/common/BannerCarousel';
import SectionTitle from '@/components/common/SectionTitle';
import PopularTrips from '@/components/trip/PopularTrips';
import RecommendedTrips from '@/components/trip/RecommendedTrips';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BannerCarousel />

      <section className="mt-12">
        <SectionTitle
          title="인기 여행"
          description="다른 여행객들이 많이 찾는 인기 여행 상품"
        />

        <Suspense fallback={<FallbackSkeleton />}>
          <PopularTrips />
        </Suspense>
      </section>

      <section className="mt-16">
        <SectionTitle
          title="당신을 위한 추천 여행"
          description="취향에 맞는 특별한 여행을 찾아보세요"
        />

        <Suspense fallback={<FallbackSkeleton />}>
          <RecommendedTrips />
        </Suspense>
      </section>
    </div>
  );
}

export default HomePage;

const FallbackSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-72 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
};
