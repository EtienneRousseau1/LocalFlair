import React from 'react';
import { useParams } from 'react-router-dom';
import ArtisanProfile from '../components/ArtisanProfile';  // Adjust path as necessary
import ProductListing from '../components/ProductListing';  // Adjust path as necessary

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Artisan {
    id: number;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    products: Product[];
}

interface ArtisanPageProps {
    artisans: Artisan[];
}

const ArtisanPage: React.FC<ArtisanPageProps> = ({ artisans }) => {
    const { id } = useParams<{ id: string }>();
    const artisan = artisans.find(a => a.id === parseInt(id || ""));

    if (!artisan) {
        return <div>Artisan not found</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <ArtisanProfile artisan={artisan} />
            </div>
            <div className="mb-8">
                <ProductListing products={artisan.products} />
            </div>
        </div>
    );
};

export default ArtisanPage;
