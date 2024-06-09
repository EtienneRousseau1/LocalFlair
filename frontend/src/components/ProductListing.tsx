import React from 'react';
import { useLocalFlairContext } from '../context/LocalFlairContext';
import { Product } from '../interface/Product';

const ProductListing: React.FC<{ products: Product[] }> = ({ products }) => {
    const { addSelectedProduct, selectedProducts } = useLocalFlairContext();

    const isProductSelected = (product: Product) => {
        return selectedProducts.some(selectedProduct => selectedProduct.id === product.id);
    };

    if (!products || products.length === 0) {
        return <div> <br />No products available</div>;
    }

    return (
        <div>
             <br /> 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="mt-auto">
                            <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                            <button
                                className={`mt-4 text-white font-bold py-2 px-4 rounded ${isProductSelected(product) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                                onClick={() => addSelectedProduct(product)}
                                disabled={isProductSelected(product)}
                            >
                                {isProductSelected(product) ? 'Added' : 'Add to Cart'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ProductListing;
