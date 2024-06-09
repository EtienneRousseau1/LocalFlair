import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtisanProfile from '../components/ArtisanProfile';  // Adjust path as necessary
import ProductListing from '../components/ProductListing';  // Adjust path as necessary
import { Artisan } from '../interface/Artisan';

const Marketplace: React.FC = () => {
    const [artisans, setArtisans] = useState<Artisan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await axios.get<{ data: Artisan[] }>(`${process.env.REACT_APP_BACKEND_URL}/artisans`);
                setArtisans(response.data.data);
            } catch (err) {
                setError('Failed to fetch artisans');
                console.error('Error fetching artisans:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtisans();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
