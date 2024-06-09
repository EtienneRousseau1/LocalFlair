import React from 'react';
import ArtisanProfile from '../components/ArtisanProfile';  // Adjust path as necessary
import ProductListing from '../components/ProductListing';  // Adjust path as necessary
import {Artisan} from "../interface/Artisan"



interface MarketplaceProps {
    artisans: Artisan[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ artisans }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {artisans.map(artisan => (
                <div key={artisan.id} className="mb-8">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/3 px-4">
                            <ArtisanProfile artisan={artisan} />
                        </div>
                        <div className="w-full md:w-2/3 px-4">
                            <ProductListing products={artisan.products} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Marketplace;
