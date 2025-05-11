-- Create the trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  discount INTEGER,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  rating NUMERIC(3, 1) NOT NULL,
  review_count INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  duration INTEGER NOT NULL,
  available_dates TEXT[] DEFAULT '{}',
  package_includes TEXT[] DEFAULT '{}',
  max_people INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the trip_itineraries table
CREATE TABLE IF NOT EXISTS trip_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  meals JSONB DEFAULT '{"breakfast": false, "lunch": false, "dinner": false}',
  accommodation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(trip_id, day)
);

-- Create the cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  start_date TEXT,
  people INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, trip_id, start_date)
);

-- Sample data for trips
INSERT INTO trips (
  title, 
  location, 
  description, 
  price, 
  discount, 
  image_url, 
  gallery_images, 
  rating, 
  review_count, 
  tags, 
  duration, 
  available_dates, 
  package_includes, 
  max_people
) VALUES 
(
  '제주도 4일 힐링 여행',
  '제주도, 대한민국',
  '아름다운 제주의 해변과 오름을 탐험하는 4일 코스',
  450000,
  10,
  'https://images.unsplash.com/photo-1599922407641-d20388f17918?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ARRAY[
    'https://images.unsplash.com/photo-1701678638937-7d538a9f0211?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1543503430-244aace16cbd?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1714569858851-7006933b6869?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  4.7,
  128,
  ARRAY['힐링', '자연', '해변'],
  4,
  ARRAY['2024-06-15', '2024-06-22', '2024-06-29', '2024-07-06', '2024-07-13'],
  ARRAY['숙박', '조식', '렌터카', '일부 관광지 입장권'],
  15
),
(
  '방콕 & 파타야 5일',
  '태국',
  '방콕의 활기찬 도시 풍경과 파타야의 해변을 즐기는 5일 코스',
  850000,
  NULL,
  'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
  NULL,
  4.5,
  95,
  ARRAY['도시', '해변', '쇼핑'],
  5,
  ARRAY['2024-06-10', '2024-06-17', '2024-06-24', '2024-07-01', '2024-07-08'],
  NULL,
  20
),
(
  '후쿠오카 벚꽃 여행',
  '일본',
  '봄에 만나는 환상적인 일본 벚꽃 명소 투어',
  720000,
  5,
  'https://images.unsplash.com/photo-1522383225653-ed111181a951',
  NULL,
  4.8,
  154,
  ARRAY['벚꽃', '봄', '문화'],
  3,
  ARRAY['2024-03-15', '2024-03-22', '2024-03-29', '2024-04-05', '2024-04-12'],
  NULL,
  12
),
(
  '다낭 & 호이안 4박 6일',
  '베트남',
  '베트남의 아름다운 해변과 역사적인 도시를 탐험하세요',
  650000,
  15,
  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b',
  NULL,
  4.6,
  87,
  ARRAY['문화', '해변', '힐링'],
  6,
  ARRAY['2024-05-10', '2024-05-17', '2024-05-24', '2024-05-31', '2024-06-07'],
  NULL,
  16
);

-- Sample data for trip_itineraries
INSERT INTO trip_itineraries (
  trip_id,
  day,
  title,
  description,
  meals,
  accommodation
) VALUES 
(
  (SELECT id FROM trips WHERE title = '제주도 4일 힐링 여행' LIMIT 1),
  1,
  '제주 도착 & 동부 탐방',
  '제주 공항 도착 후 렌터카 픽업, 성산일출봉, 우도 방문',
  '{"breakfast": false, "lunch": true, "dinner": true}',
  '제주시 호텔'
),
(
  (SELECT id FROM trips WHERE title = '제주도 4일 힐링 여행' LIMIT 1),
  2,
  '서부 해안 탐방',
  '협재 해변, 카페 투어, 오설록 티 뮤지엄 방문',
  '{"breakfast": true, "lunch": false, "dinner": true}',
  '서귀포시 호텔'
);

-- Create RLS policies
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Everyone can read trips and trip_itineraries
CREATE POLICY "Public trips are viewable by everyone" 
ON trips FOR SELECT USING (true);

CREATE POLICY "Public trip_itineraries are viewable by everyone" 
ON trip_itineraries FOR SELECT USING (true);

-- Only authenticated users can create/update/delete cart items
CREATE POLICY "Users can manage their own cart" 
ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_itineraries_updated_at
BEFORE UPDATE ON trip_itineraries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
