import React, { createContext, useState, ReactNode, useContext } from 'react';

// Interface for Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  artisan_id: number;
}

// Interface for LocalFlairProps
interface LocalFlairProps {
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addSelectedProduct: (product: Product) => boolean;
  removeSelectedProduct: (id: number) => void;
  selectedProducts: Product[];
  selectedProduct: Product | undefined;
  user: any;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  clearAllProducts: () => void;
}

// Creating Context
const LocalFlairContext = createContext<LocalFlairProps | undefined>(undefined);

// Provider component
export const LocalFlair: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const addSelectedProduct = (product: Product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
    return true;
  };

  const removeSelectedProduct = (id: number) => {
    setSelectedProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };

  const clearAllProducts = () => {
    setSelectedProducts([]);
  };

  return (
    <LocalFlairContext.Provider value={{
      selectedProducts,
      user,
      setUser,
      setUserId,
      userId,
      selectedProduct,
      setSelectedProduct,
      setSelectedProducts,
      addSelectedProduct,
      removeSelectedProduct,
      clearAllProducts,
    }}>
      {children}
    </LocalFlairContext.Provider>
  );
};

// Custom hook to use the LocalFlairContext
export const useLocalFlairContext = (): LocalFlairProps => {
  const context = useContext(LocalFlairContext);
  if (!context) {
    throw new Error('useLocalFlairContext must be used within a LocalFlair provider');
  }
  return context;
};
