import React from 'react';
import ArtisanProfile from './components/ArtisanProfile';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import Marketplace from './pages/MarketPlace';
import AppRouter from './AppRouter';  

const App: React.FC = () => {
  
    return (
        <div>
            <Header />
            <AppRouter />
        </div>
    );
};

export default App;
