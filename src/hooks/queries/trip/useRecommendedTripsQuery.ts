import { useSuspenseQuery } from '@tanstack/react-query';

import { tripKeys } from '@/lib/constants/queryKeys';
import { fetchRecommendedTrips } from '@/services/tripService';

function useRecommendedTripsQuery() {
  const query = useSuspenseQuery({
    queryKey: tripKeys.recommendedTrips,
    queryFn: fetchRecommendedTrips,
  });

  return query;
}

export default useRecommendedTripsQuery;
