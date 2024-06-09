import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalFlairContext } from '../context/LocalFlairContext';
import { Artisan } from '../interface/Artisan';
import { Product } from '../interface/Product';

const EditPage: React.FC = () => {
    const { user, userId} = useLocalFlairContext();
    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        artisan_id: parseInt(userId || "0")
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchArtisan = async () => {
            try {
                console.log("userId, ", userId)
                const response = await axios.get<{ data: Artisan }>(`${process.env.REACT_APP_BACKEND_URL}/artisans/${userId}`);
                const fetchedArtisan = response.data.data;
                if (fetchedArtisan.id !== parseInt(userId || "0")) {
                    setError('You are not authorized to edit this profile.');
                    return;
                }
                setArtisan(fetchedArtisan);
                setNewProduct(prev => ({ ...prev, artisan_id: fetchedArtisan.id }));
            } catch (err) {
                setError('Failed to fetch artisan data');
                console.error('Error fetching artisan data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtisan();
    }, [userId, user, navigate]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArtisan(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArtisan(prev => {
            if (prev) {
                const updatedProducts = prev.products.map((product, i) => (
                    i === index ? { ...product, [name]: value } : product
                ));
                return { ...prev, products: updatedProducts };
            }
            return null;
        });
    };

    const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (artisan) {
            try {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/artisans/${artisan.id}`, artisan);
                alert('Profile updated successfully');
            } catch (err) {
                console.error('Error updating profile:', err);
                alert('Failed to update profile');
            }
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (artisan) {
            try {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/artisans/${artisan.id}/products`, { products: artisan.products });
                alert('Products updated successfully');
            } catch (err) {
                console.error('Error updating products:', err);
                alert('Failed to update products');
            }
        }
    };

    const handleNewProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/artisans/${artisan?.id}/products`, newProduct);
            alert('New product created successfully');
            setNewProduct({ id: 0, name: '', description: '', price: 0, artisan_id: artisan?.id || 0 });
        } catch (err) {
            console.error('Error creating new product:', err);
            alert('Failed to create new product');
        }
    };

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
            <h1 className="text-2xl font-bold mb-4">Edit Artisan Profile</h1>
            <form onSubmit={handleProfileSubmit} className="mb-8">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={artisan.name} 
                        onChange={handleProfileChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={artisan.location} 
                        onChange={handleProfileChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={artisan.email} 
                        onChange={handleProfileChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Picture URL</label>
                    <input 
                        type="text" 
                        name="picture" 
                        value={artisan.picture} 
                        onChange={handleProfileChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Biography</label>
                    <input 
                        name="biography" 
                        value={artisan.biography} 
                        onChange={handleProfileChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button 
                    type="submit" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Save Profile
                </button>
            </form>

            <h1 className="text-2xl font-bold mb-4">Edit Products</h1>
            <form onSubmit={handleProductSubmit} className="mb-8">
                {artisan.products.map((product, index) => (
                    <div key={product.id} className="mb-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={product.name} 
                                onChange={(e) => handleProductChange(index, e)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input 
                                type="text" 
                                name="description" 
                                value={product.description} 
                                onChange={(e) => handleProductChange(index, e)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={product.price} 
                                onChange={(e) => handleProductChange(index, e)} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                ))}
                <button 
                    type="submit" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Save Products
                </button>
            </form>

            <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
            <form onSubmit={handleNewProductSubmit} className="mb-8">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={newProduct.name} 
                        onChange={handleNewProductChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={newProduct.description} 
                        onChange={handleNewProductChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={newProduct.price} 
                        onChange={handleNewProductChange} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button 
                    type="submit" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default EditPage;
