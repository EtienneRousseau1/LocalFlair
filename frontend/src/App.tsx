import React from 'react';
import ArtisanProfile from './components/ArtisanProfile';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import Marketplace from './pages/MarketPlace';

const App: React.FC = () => {
  // Sample data for an artisan
const artisan = {
    id: 1,
    name: "John Doe",
    location: "New York, NY",
    description: "Experienced artisan specializing in handmade crafts.",
    imageUrl: "https://via.placeholder.com/150"
};

// Sample data for products
const products = [
    {
        id: 1,
        name: "Handmade Vase",
        description: "Beautifully crafted vase perfect for any home.",
        price: 29.99
    },
    {
        id: 2,
        name: "Decorative Pillow",
        description: "A decorative pillow that brings color and comfort to your living space.",
        price: 19.99
    },
    {
        id: 3,
        name: "Wooden Clock",
        description: "A rustic wooden clock to add a timeless piece to your decor.",
        price: 34.99
    }
];

    return (
        <div>
            <Header />
            <Marketplace artisan={artisan} products={products} />
        </div>
    );
};

export default App;
