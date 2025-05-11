import { useQuery } from '@tanstack/react-query';

import { tripKeys } from '@/lib/constants/queryKeys';
import { searchTrips } from '@/services/tripService';

function useSearchTripsQuery(keyword: string) {
  const query = useQuery({
    queryKey: tripKeys.searchTrips(keyword),
    queryFn: () => searchTrips(keyword),
    enabled: keyword.trim().length > 0,
  });

  return query;
}

export default useSearchTripsQuery;
