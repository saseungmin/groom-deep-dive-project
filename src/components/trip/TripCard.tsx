import { useState } from 'react';
import { Link } from 'react-router';

import { Heart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Trip } from '@/types/trip';

type TripCardProps = Pick<
  Trip,
  | 'id'
  | 'title'
  | 'location'
  | 'price'
  | 'discount'
  | 'imageUrl'
  | 'rating'
  | 'tags'
>;

const TripCard = ({
  id,
  title,
  location,
  price,
  discount = 0,
  imageUrl,
  rating,
  tags = [],
}: TripCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = price - (price * discount) / 100;

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative">
        <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>

        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            {discount}% 할인
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{location}</p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          {discount > 0 && (
            <span className="text-sm line-through text-muted-foreground mr-2">
              {price.toLocaleString()}원
            </span>
          )}
          <span className="text-lg font-bold">
            {finalPrice.toLocaleString()}원
          </span>
        </div>
        <Link to={`/trip/${id}`}>
          <Button size="sm">자세히 보기</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
