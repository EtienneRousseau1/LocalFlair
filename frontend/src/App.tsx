import React from 'react';
import ArtisanProfile from './components/ArtisanProfile';
import ProductListing from './components/ProductListing';
import Header from './components/Header';

const App: React.FC = () => {
    const sampleArtisan = {
        id: 1,
        name: 'John Doe',
        location: 'City, Country',
        description: 'Description here...',
        imageUrl: "image",
    };

    const sampleProducts = [
        { id: 1, name: 'Product 1', description: 'Description here...', price: 25 },
        { id: 2, name: 'Product 2', description: 'Description here...', price: 45 }
    ];

    return (
        <div>
            <Header />
            <ArtisanProfile artisan={sampleArtisan} />
            <ProductListing products={sampleProducts} />
        </div>
    );
};

export default App;
