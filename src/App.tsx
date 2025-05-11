import { BrowserRouter, Route, Routes } from 'react-router';

import MainPage from '@/pages/Main/MainPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
