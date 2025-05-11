import { useSuspenseQuery } from '@tanstack/react-query';

import { tripKeys } from '@/lib/constants/queryKeys';
import { fetchTripById } from '@/services/tripService';

function useTripDetailSuspenseQuery(id: string) {
  return useSuspenseQuery({
    queryKey: tripKeys.tripDetail(id),
    queryFn: () => fetchTripById(id),
  });
}

export default useTripDetailSuspenseQuery;
