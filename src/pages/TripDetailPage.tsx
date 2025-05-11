import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import dayjs from 'dayjs';
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/contexts/ToastContext';
import useTripDetailSuspenseQuery from '@/hooks/queries/trip/useTripDetailSuspenseQuery';

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: trip } = useTripDetailSuspenseQuery(id || '');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [people, setPeople] = useState(1);

  const { toast } = useToast();

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      tripId: trip?.id,
      startDate: selectedDate,
      people,
      totalPrice: calculateTotalPrice(),
    });

    toast.success('장바구니에 추가되었습니다.');
  };

  const calculateTotalPrice = () => {
    if (!trip) return 0;

    const basePrice = trip.price;
    const discountedPrice = trip.discount
      ? basePrice - (basePrice * trip.discount) / 100
      : basePrice;

    return discountedPrice * people;
  };

  useEffect(() => {
    if (
      trip?.availableDates &&
      trip.availableDates.length > 0 &&
      !selectedDate
    ) {
      setSelectedDate(trip.availableDates[0]);
    }
  }, [trip, selectedDate]);

  if (!trip) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">
            여행 상품을 찾을 수 없습니다.
          </h2>
          <p className="text-muted-foreground">
            요청하신 여행 상품 정보가 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* 갤러리 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg overflow-hidden">
          <img
            src={trip.galleryImages?.[0] || trip.imageUrl}
            alt={trip.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(trip.galleryImages || []).slice(1, 5).map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img
                src={img}
                alt={`${trip.title} ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 왼쪽 정보 */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {trip.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-2">{trip.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{trip.duration}일</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>최대 {trip.maxPeople || '무제한'}명</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium">{trip.rating}</span>
            <span className="text-muted-foreground ml-1">
              ({trip.reviewCount}개 리뷰)
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">여행 소개</h2>
            <p className="text-muted-foreground">{trip.description}</p>
          </div>

          {/* 포함 사항 */}
          {trip.packageIncludes && trip.packageIncludes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">포함 사항</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {trip.packageIncludes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 일정 */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">일정 안내</h2>
              <div className="space-y-4">
                {trip.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {day.description}
                      </p>

                      {day.meals && (
                        <div className="flex gap-3 text-sm">
                          <span
                            className={
                              day.meals.breakfast
                                ? 'text-green-600'
                                : 'text-muted-foreground'
                            }
                          >
                            아침{day.meals.breakfast ? ' ✓' : ' ✗'}
                          </span>
                          <span
                            className={
                              day.meals.lunch
                                ? 'text-green-600'
                                : 'text-muted-foreground'
                            }
                          >
                            점심{day.meals.lunch ? ' ✓' : ' ✗'}
                          </span>
                          <span
                            className={
                              day.meals.dinner
                                ? 'text-green-600'
                                : 'text-muted-foreground'
                            }
                          >
                            저녁{day.meals.dinner ? ' ✓' : ' ✗'}
                          </span>
                        </div>
                      )}

                      {day.accommodation && (
                        <div className="text-sm mt-2">
                          <span className="font-medium">숙소:</span>{' '}
                          {day.accommodation}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 예약 카드 */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="flex items-baseline mb-4">
                {trip.discount && trip.discount > 0 ? (
                  <>
                    <span className="text-2xl font-bold">
                      {(
                        trip.price -
                        (trip.price * trip.discount) / 100
                      ).toLocaleString()}
                      원
                    </span>
                    <span className="text-muted-foreground line-through ml-2">
                      {trip.price.toLocaleString()}원
                    </span>
                    <Badge className="ml-2 bg-red-500">
                      {trip.discount}% 할인
                    </Badge>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    {trip.price.toLocaleString()}원
                  </span>
                )}
                <span className="text-muted-foreground ml-1">/ 인</span>
              </div>

              {/* 날짜 선택 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  여행 시작일
                </label>
                <div className="flex items-center border rounded-md p-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <select
                    className="w-full bg-transparent focus:outline-none"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    {!trip.availableDates ||
                    trip.availableDates.length === 0 ? (
                      <option value="">날짜 선택 불가</option>
                    ) : (
                      trip.availableDates.map((date) => (
                        <option key={date} value={date}>
                          {dayjs(date).format('YYYY년 MM월 DD일')}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* 인원 선택 */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">인원</label>
                <div className="flex">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPeople(Math.max(1, people - 1))}
                  >
                    -
                  </Button>
                  <div className="flex-1 flex items-center justify-center">
                    {people}명
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setPeople(Math.min(trip.maxPeople || 10, people + 1))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* 총 가격 */}
              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">총 가격</span>
                  <span className="text-xl font-bold">
                    {calculateTotalPrice().toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 장바구니 버튼 */}
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedDate}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                장바구니에 담기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const TripDetailSkeleton = () => (
  <div className="container mx-auto p-4 animate-pulse">
    <div className="bg-gray-200 h-[400px] rounded-lg mb-6"></div>
    <div className="bg-gray-200 h-10 w-2/3 mb-4 rounded"></div>
    <div className="bg-gray-200 h-6 w-1/3 mb-8 rounded"></div>
  </div>
);

const TripDetailPage = () => {
  return (
    <Suspense fallback={<TripDetailSkeleton />}>
      <TripDetail />
    </Suspense>
  );
};

export default TripDetailPage;
