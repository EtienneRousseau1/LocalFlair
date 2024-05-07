import React from 'react';

interface Artisan {
    id: number;
    name: string;
    location: string;
    description: string;
    imageUrl: string  // Assuming a new field for the avatar image URL
}

const ArtisanProfile: React.FC<{ artisan: Artisan }> = ({ artisan }) => {
    return (
        <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
            <img src={artisan.imageUrl} alt={`Avatar`} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold">{artisan.name}</h2>
            <p className="text-gray-600">{artisan.location}</p>
            <p className="text-gray-800">{artisan.description}</p>
        </div>
    );
};

export default ArtisanProfile;