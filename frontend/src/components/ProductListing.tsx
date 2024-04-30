import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const ProductListing: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </li>
            ))}
        </ul>
    );
};

export default ProductListing;
