import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const ProductListing: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="mt-auto">
                            <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductListing;