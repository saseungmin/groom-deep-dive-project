import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import dayjs from 'dayjs';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchTripById } from '@/services/tripService';
import type { CartItem, Trip } from '@/types/trip';

// 임시 장바구니 데이터
const mockCartItems: (Omit<CartItem, 'trip'> & { trip?: Trip })[] = [
  {
    tripId: '1',
    quantity: 1,
    startDate: '2024-07-15',
    people: 2,
    totalPrice: 810000,
  },
  {
    tripId: '3',
    quantity: 1,
    startDate: '2024-08-10',
    people: 1,
    totalPrice: 684000,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      setIsLoading(true);
      try {
        // 실제 구현에서는 장바구니 API를 호출하고 각 상품의 최신 정보를 가져옵니다
        const itemsWithTrips = await Promise.all(
          mockCartItems.map(async (item) => {
            const trip = await fetchTripById(item.tripId);
            return { ...item, trip: trip! };
          }),
        );

        // 모든 상품 정보가 제대로 로드된 항목만 필터링
        const validItems = itemsWithTrips.filter(
          (item): item is CartItem => !!item.trip,
        ) as CartItem[];
        setCartItems(validItems);
      } catch (error) {
        console.error('Failed to load cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const handleUpdateQuantity = (index: number, newPeople: number) => {
    if (newPeople < 1) return;

    const item = cartItems[index];
    if (!item) return;

    const maxPeople = item.trip.maxPeople || 10;
    if (newPeople > maxPeople) return;

    const newItems = [...cartItems];
    const basePrice = item.trip.price;
    const discountedPrice = item.trip.discount
      ? basePrice - (basePrice * item.trip.discount) / 100
      : basePrice;

    newItems[index] = {
      ...item,
      people: newPeople,
      totalPrice: discountedPrice * newPeople,
    };

    setCartItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">장바구니</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-100 h-32 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">장바구니</h1>
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">
            장바구니가 비어있습니다
          </h2>
          <p className="text-muted-foreground mb-6">
            여행 상품을 추가해 주세요
          </p>
          <Link to="/">
            <Button>여행 상품 보러가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">장바구니</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* 장바구니 항목 */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <Card key={item.tripId}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* 이미지 */}
                    <div className="w-full md:w-1/4">
                      <img
                        src={item.trip.imageUrl}
                        alt={item.trip.title}
                        className="rounded-md w-full h-32 object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <Link to={`/trip/${item.tripId}`}>
                        <h3 className="font-bold hover:text-blue-600 transition-colors">
                          {item.trip.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.trip.location} | {item.trip.duration}일
                      </p>

                      <div className="text-sm mb-3">
                        <span className="font-medium">출발일:</span>{' '}
                        {item.startDate
                          ? dayjs(item.startDate).format('YYYY년 MM월 DD일')
                          : '날짜 미정'}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* 수량 조절 */}
                        <div className="flex items-center">
                          <span className="text-sm mr-2">인원:</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(index, item.people - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.people}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(index, item.people + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* 가격 */}
                        <div className="flex items-baseline">
                          <span className="font-bold text-lg">
                            {item.totalPrice.toLocaleString()}원
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(index)}
                            className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 주문 요약 */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4">주문 요약</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>상품 금액</span>
                  <span>{calculateTotalPrice().toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>할인 금액</span>
                  <span>0원</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold">총 결제 금액</span>
                  <span className="font-bold text-xl">
                    {calculateTotalPrice().toLocaleString()}원
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full">결제하기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
