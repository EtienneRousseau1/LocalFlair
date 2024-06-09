import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Market from './pages/MarketPlace';
import ArtisanPage from './pages/ArtisanPage';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import Login from "./pages/LogIn"
import { LocalFlair } from './context/LocalFlairContext';
import EditPage from './pages/EditPage';
const App = () => {
  return (
    <Router>
      <LocalFlair> 
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/market" />} />
        <Route path="/market" element={<Market   />} />
        <Route path="/artisan/:id" element={<ArtisanPage  />} />
        <Route path = "/cart" element={<CartPage />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/edit" element={<EditPage />} />
      </Routes>
      </LocalFlair>
    </Router>
  );
};

export default App;
