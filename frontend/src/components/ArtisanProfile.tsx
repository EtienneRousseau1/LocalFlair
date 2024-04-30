import React from 'react';

interface Artisan {
    id: number;
    name: string;
    location: string;
    description: string;
}

const ArtisanProfile: React.FC<{ artisan: Artisan }> = ({ artisan }) => {
    return (
        <div>
            <h2>{artisan.name}</h2>
            <p>{artisan.location}</p>
            <p>{artisan.description}</p>
        </div>
    );
};

export default ArtisanProfile;