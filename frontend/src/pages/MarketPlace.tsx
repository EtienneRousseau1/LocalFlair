import React from 'react';
import ArtisanProfile from '../components/ArtisanProfile'; // Import the ArtisanProfile component
import ProductListing from '../components/ProductListing'; // Import the ProductListing component

interface Artisan {
    id: number;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface MarketplaceProps {
    artisan: Artisan;
    products: Product[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ artisan, products }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4">
                    <ArtisanProfile artisan={artisan} />
                </div>
                <div className="w-full md:w-2/3 px-4">
                    <ProductListing products={products} />
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
