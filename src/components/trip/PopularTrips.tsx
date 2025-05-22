import TripCard from '@/components/trip/TripCard';
import usePopularTripsSuspenseQuery from '@/hooks/queries/trip/usePopularTripsQuery';

function PopularTrips() {
  const { data: popularTrips } = usePopularTripsSuspenseQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {popularTrips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  );
}

export default PopularTrips;
