import React from 'react';
import ArtisanProfile from './components/ArtisanProfile';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import Marketplace from './pages/MarketPlace';

const App: React.FC = () => {
  
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
        <div>
            <Header />
            <Marketplace artisans={artisans} />
        </div>
    );
};

export default App;
