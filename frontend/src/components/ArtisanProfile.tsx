import React, { useEffect } from 'react';
import { Artisan } from '../interface/Artisan';
import BasicImage from "../image/BasicImage.png";

interface ArtisanProfileProps {
    artisan: Artisan;
}

const ArtisanProfile: React.FC<ArtisanProfileProps> = ({ artisan }) => {
    useEffect(() => {
        console.log('Profile picture URL:', artisan.imageUrl);
    }, [artisan.imageUrl]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = BasicImage; // Fallback image URL from local assets
    };

    return (
        <div className="artisan-profile flex flex-col items-center">
            <img 
                src={artisan.imageUrl || BasicImage} // Use artisan.imageUrl or fallback to BasicImage if not provided
                alt={`${artisan.name}'s profile`}
                className="w-32 h-32 rounded-full mb-4"
                onError={handleImageError}
            />
            <h2 className="text-2xl font-bold">{artisan.name}</h2>
            <p className="text-gray-600">{artisan.biography}</p>
            <p className="text-gray-600">{artisan.location}</p>

        </div>
    );
};

export default ArtisanProfile;
