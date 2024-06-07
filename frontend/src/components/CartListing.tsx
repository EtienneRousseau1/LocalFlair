import React from 'react';
import { useLocalFlairContext } from '../context/LocalFlairContext';
import {Product} from "../interface/Product"

const CartListing: React.FC = () => {
    const {selectedProducts, removeSelectedProduct} = useLocalFlairContext()
   
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProducts.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="mt-auto">
                            <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
                            <button
                                className={`mt-4 text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700`}
                                onClick={() => removeSelectedProduct(product.id)}
                            >
                                Remove
              </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartListing;