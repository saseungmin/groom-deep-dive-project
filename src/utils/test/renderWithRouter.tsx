import { MemoryRouter } from 'react-router';

import { render } from '@testing-library/react';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MemoryRouter });
};

export default renderWithRouter;
