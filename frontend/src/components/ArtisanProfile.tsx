import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Artisan } from '../interface/Artisan';
import BasicImage from "../image/BasicImage.png";

interface ArtisanProfileProps {
    artisan: Artisan;
}

const ArtisanProfile: React.FC<ArtisanProfileProps> = ({ artisan }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/artisan/${artisan.id}`);
    };

    return (
        <div >
            <br />
        <div 
            className="artisan-profile flex flex-col  items-center p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={handleClick}
        >
            <img 
                src={artisan.picture } // Use artisan.imageUrl or fallback to BasicImage if not provided
                alt={`${artisan.name}'s profile`}
                className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold">{artisan.name}</h2>
            <p className="text-gray-600">{artisan.biography}</p>
            <p className="text-gray-600">{artisan.location}</p>
        </div>
        </div>
    );
};

export default ArtisanProfile;
