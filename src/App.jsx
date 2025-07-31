import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPagePage from './pages/LandingPagePage';
import ShopDetailsPage from './pages/ShopDetailsPage';
import RestaurantList from './components/RestaurantList';
import SalonList from './components/Salons';
import BakeryList from './components/BakeryList';
import BeautyParlourList from './components/BeautyParlourList';
import LoginPage from './components/LoginPage';
import PropertyList from './components/Propertypage';
import { AuthProvider } from './context/AuthContext';
import RegisterResident from './components/RegisterResident';
import RegisterService from './components/RegisterService';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPagePage />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/shop/tasty-bites" element={<ShopDetailsPage />} />
        <Route path="/salons" element={<SalonList/>}/>
        <Route path="/bakeries" element={<BakeryList />} />
        <Route path="/beauty-parlours" element={<BeautyParlourList />} />
        <Route path="/properties" element={<PropertyList/>}/>
        <Route path="/register-resident" element={<RegisterResident />} />
        <Route path="/register-service" element={<RegisterService />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;