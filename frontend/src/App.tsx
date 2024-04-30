import React from 'react';
import ArtisanProfile from './components/ArtisanProfile';
import ProductListing from './components/ProductListing';

const App: React.FC = () => {
    const sampleArtisan = {
        id: 1,
        name: 'John Doe',
        location: 'City, Country',
        description: 'Description here...'
    };

    const sampleProducts = [
        { id: 1, name: 'Product 1', description: 'Description here...', price: 25 },
        { id: 2, name: 'Product 2', description: 'Description here...', price: 45 }
    ];

    return (
        <div>
            <ArtisanProfile artisan={sampleArtisan} />
            <ProductListing products={sampleProducts} />
        </div>
    );
};

export default App;
