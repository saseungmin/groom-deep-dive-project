import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { List, Map, Search, SlidersHorizontal, X } from 'lucide-react';

import TripCard from '@/components/trip/TripCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { searchTrips } from '@/services/tripService';
import type { Trip } from '@/types/trip';

const TripSearch = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // URL 쿼리 파라미터에서 검색어 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    if (query) {
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await searchTrips(query);
      setTrips(results);
    } catch (error) {
      console.error('Failed to search trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold mb-6">여행 검색</h1>

        {/* 검색 폼 */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="여행지, 명소, 테마 등 검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">검색</Button>
        </form>

        {/* 필터 및 뷰 모드 */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {}}
            >
              <SlidersHorizontal className="h-4 w-4" />
              필터
            </Button>

            {/* 필터 태그들 */}
            {['바다', '산', '도시', '문화', '힐링', '액티비티'].map(
              (filter) => (
                <Badge
                  key={filter}
                  variant={
                    activeFilters.includes(filter) ? 'default' : 'outline'
                  }
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ),
            )}

            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-muted-foreground"
                onClick={clearFilters}
              >
                <X className="h-3 w-3" />
                초기화
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Map className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-72 bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h2>
          <p className="text-muted-foreground mb-6">
            다른 검색어로 다시 시도해 보세요
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <Card key={trip.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-32 h-24">
                  <img
                    src={trip.imageUrl}
                    alt={trip.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{trip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {trip.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">{trip.rating}</span>
                    </div>
                    <div>
                      {trip.discount && trip.discount > 0 ? (
                        <>
                          <span className="text-sm line-through text-muted-foreground mr-2">
                            {trip.price.toLocaleString()}원
                          </span>
                          <span className="font-bold">
                            {(
                              trip.price -
                              (trip.price * trip.discount) / 100
                            ).toLocaleString()}
                            원
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">
                          {trip.price.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripSearch;
