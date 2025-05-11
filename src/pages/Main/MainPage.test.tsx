import { render } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  const renderMainPage = () => render(<MainPage />);

  it('should render MainPage', () => {
    const { container } = renderMainPage();

    expect(container).toHaveTextContent('MainPage');
  });
});
