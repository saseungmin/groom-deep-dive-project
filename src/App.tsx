import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from '@/components/common/Layout';
import { Toaster } from '@/components/ui/sonner';
import { ToastProvider } from '@/contexts/ToastContext';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import CartPage from '@/pages/CartPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import TripDetailPage from '@/pages/TripDetailPage';
import TripSearchPage from '@/pages/TripSearchPage';
import { QueryProvider } from '@/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trip/:id" element={<TripDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<TripSearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
