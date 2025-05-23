import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from '@/components/common/Layout';
import { Toaster } from '@/components/ui/sonner';
import { ToastProvider } from '@/contexts/ToastContext';
import CartPage from '@/pages/CartPage';
import GoogleAuthCallbackPage from '@/pages/GoogleAuthCallbackPage';
import HomePage from '@/pages/HomePage';
import KakaoAuthCallbackPage from '@/pages/KakaoAuthCallbackPage';
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
              <Route
                path="/auth/google/callback"
                element={<GoogleAuthCallbackPage />}
              />
              <Route
                path="/auth/kakao/callback"
                element={<KakaoAuthCallbackPage />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;
