import { fireEvent, screen } from '@testing-library/react';

import { ToastProvider } from '@/contexts/ToastContext';
import renderWithRouter from '@/utils/test/renderWithRouter';

import TripCard, { type TripCardProps } from './TripCard';

const mockProps = {
  id: '123',
  title: '제주도 4일 힐링 여행',
  location: '제주도, 대한민국',
  price: 450000,
  imageUrl: 'https://example.com/image.jpg',
  rating: 4.7,
  tags: ['힐링', '자연', '해변'],
};

describe('TripCard', () => {
  const renderTripCard = (props: TripCardProps) =>
    renderWithRouter(
      <ToastProvider>
        <TripCard {...props} />
      </ToastProvider>,
    );

  it('title이 보여야만 한다', () => {
    renderTripCard(mockProps);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
  });

  it('할인이 적용된 경우 할인 뱃지와 가격 표시에 할인 가격이 보여야만 한다', () => {
    const discountProps = {
      ...mockProps,
      discount: 10,
    };
    const finalPrice = mockProps.price - (mockProps.price * 10) / 100;

    renderTripCard(discountProps);

    expect(screen.getByText('10% 할인')).toBeInTheDocument();
    expect(
      screen.getByText(`${finalPrice.toLocaleString()}원`),
    ).toBeInTheDocument();
  });

  it('할인이 없는 경우 할인 뱃지가 표시되지 않는지 확인', () => {
    renderTripCard(mockProps);

    expect(screen.queryByText(/할인/)).not.toBeInTheDocument();
  });

  it('좋아요 버튼 클릭 시 토글 상태가 변경되어야만 한다', () => {
    renderTripCard(mockProps);

    const buttons = screen.getAllByRole('button');

    const heartButton = buttons.find((button) => {
      return button.querySelector('.lucide-heart');
    });

    expect(heartButton).toBeDefined();

    const heartIcon = heartButton?.querySelector('svg');
    expect(heartIcon).not.toHaveClass('fill-red-500');

    if (heartButton) {
      fireEvent.click(heartButton);

      expect(heartIcon).toHaveClass('fill-red-500');

      fireEvent.click(heartButton);

      expect(heartIcon).not.toHaveClass('fill-red-500');
    }
  });

  it('태그가 없을 경우 태그가 렌더링되지 않아야만 한다', () => {
    const propsWithoutTags = {
      ...mockProps,
      tags: undefined,
    };

    renderTripCard(propsWithoutTags);

    mockProps.tags.forEach((tag) => {
      expect(screen.queryByText(tag)).not.toBeInTheDocument();
    });
  });
});
