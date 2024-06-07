import React from 'react';
import ArtisanProfile from '../components/ArtisanProfile';  // Adjust path as necessary
import ProductListing from '../components/ProductListing';  // Adjust path as necessary
import { useLocalFlairContext } from '../context/LocalFlairContext';
const CartPage: React.FC= ({ }) => {
    const { selectedProducts } = useLocalFlairContext();
    return (
        <div>
        <h2>Your Cart</h2>
        <ul>
          {selectedProducts.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default CartPage;
