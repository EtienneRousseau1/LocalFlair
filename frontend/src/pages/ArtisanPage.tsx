import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtisanProfile from '../components/ArtisanProfile';  // Adjust path as necessary
import ProductListing from '../components/ProductListing';  // Adjust path as necessary
import axios from 'axios';
import { Artisan } from '../interface/Artisan';

const ArtisanPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtisan = async () => {
            try {
                setLoading(true);
                setError(null);  // Reset error state before making a new request
                console.log(`Fetching artisan data for ID: ${id}`);
                const response = await axios.get<{ data: Artisan }>(`${process.env.REACT_APP_BACKEND_URL}/artisans/${id}`);
                console.log('Response data:', response.data.data);
                setArtisan(response.data.data);
            } catch (err) {
                setError('Failed to fetch artisan data');
                console.error('Error fetching artisan data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArtisan();
        }
    }, [id]);

    useEffect(() => {
        if (artisan) {
            console.log('Artisan state updated:', artisan);
        }
    }, [artisan]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!artisan) {
        return <div>Artisan not found</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <ArtisanProfile artisan={artisan} />
            </div>
            <div className="mb-8">
                <ProductListing products={artisan.products || []} />
            </div>
        </div>
    );
};

export default ArtisanPage;
