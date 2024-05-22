import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Market from './pages/MarketPlace';
import ArtisanPage from './pages/ArtisanPage';
import Header from './components/Header';
const App = () => {


const artisans = [
    {
        id: 1,
        name: "John Doe",
        location: "New York, NY",
        description: "Experienced artisan specializing in handmade crafts.",
        imageUrl: "https://via.placeholder.com/150",
        products: [
            {
                id: 1,
                name: "Handmade Vase",
                description: "Beautifully crafted vase perfect for any home.",
                price: 29.99
            },
            {
                id: 2,
                name: "Decorative Pillow",
                description: "Brings color and comfort to your living space.",
                price: 19.99
            }
        ]
    },
    {
        id: 2,
        name: "Jane Smith",
        location: "San Francisco, CA",
        description: "Artisan specializing in sustainable materials.",
        imageUrl: "https://via.placeholder.com/150",
        products: [
            {
                id: 3,
                name: "Recycled Clock",
                description: "Eco-friendly clock made from recycled materials.",
                price: 45.00
            }
        ]
    }
];

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/market" />} />
        <Route path="/market" element={<Market  artisans={artisans} />} />
        <Route path="/artisan/:id" element={<ArtisanPage artisans={artisans} />} />
      </Routes>
    </Router>
  );
};

export default App;
