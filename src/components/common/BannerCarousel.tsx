import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const banners = [
  {
    id: 1,
    title: '여름 휴가 얼리버드 할인',
    description: '8월 휴가 상품 예약 시 최대 30% 할인',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    buttonText: '할인 상품 보기',
    buttonLink: '/promo/summer',
  },
  {
    id: 2,
    title: '유럽 인기 여행지 특가',
    description: '파리, 로마, 바르셀로나를 한 번에',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    buttonText: '유럽 여행 보기',
    buttonLink: '/destinations/europe',
  },
  {
    id: 3,
    title: '제주도 힐링 여행',
    description: '일상에서 벗어나 제주에서 휴식을',
    imageUrl:
      'https://images.unsplash.com/photo-1599922407641-d20388f17918?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: '제주 여행 보기',
    buttonLink: '/destinations/jeju',
  },
];

const BannerCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-[400px] w-full">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-10">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {banner.title}
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  {banner.description}
                </p>
                <div>
                  <Button variant="default" size="lg" asChild>
                    <a href={banner.buttonLink}>{banner.buttonText}</a>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </div>
    </Carousel>
  );
};

export default BannerCarousel;
