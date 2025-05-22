import TripCard from '@/components/trip/TripCard';
import useRecommendedTripsSuspenseQuery from '@/hooks/queries/trip/useRecommendedTripsQuery';

function RecommendedTrips() {
  const { data: recommendedTrips } = useRecommendedTripsSuspenseQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendedTrips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  );
}

export default RecommendedTrips;
