import React from 'react';
import CartListing from '../components/CartListing'
import { useLocalFlairContext } from '../context/LocalFlairContext';
const CartPage: React.FC= ({ }) => {
    const { selectedProducts } = useLocalFlairContext();
    return (
        <div>
        <h2>Your Cart</h2>
        <div className="w-full md:w-2/3 px-4">
            <CartListing  />
        </div>
      </div>
    );
};

export default CartPage;
