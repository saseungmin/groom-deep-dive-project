import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from '@/components/common/Layout';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import TripDetail from '@/pages/TripDetail';
import TripSearch from '@/pages/TripSearch';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trip/:id" element={<TripDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<TripSearch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
