import { useQuery } from '@tanstack/react-query';

import { tripKeys } from '@/lib/constants/queryKeys';
import { fetchRecommendedTrips } from '@/services/tripService';

function useRecommendedTripsQuery() {
  const query = useQuery({
    queryKey: tripKeys.recommendedTrips,
    queryFn: fetchRecommendedTrips,
  });

  return query;
}

export default useRecommendedTripsQuery;
