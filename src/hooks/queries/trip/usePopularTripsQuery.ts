import { useSuspenseQuery } from '@tanstack/react-query';

import { tripKeys } from '@/lib/constants/queryKeys';
import { fetchPopularTrips } from '@/services/tripService';

function usePopularTripsQuery() {
  const query = useSuspenseQuery({
    queryKey: tripKeys.popularTrips,
    queryFn: fetchPopularTrips,
  });

  return query;
}

export default usePopularTripsQuery;
