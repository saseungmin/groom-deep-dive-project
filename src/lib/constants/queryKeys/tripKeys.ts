const baseKey = ['trip'];

const tripKeys = {
  all: baseKey,
  popularTrips: [...baseKey, 'popular'],
  recommendedTrips: [...baseKey, 'recommended'],
  tripDetail: (id: string) => [...baseKey, id],
  searchTrips: (keyword: string) => [...baseKey, 'search', keyword],
};

export default tripKeys;
