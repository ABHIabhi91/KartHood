// App.jsx - FIXED VERSION
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";  // Remove BrowserRouter import
import LandingPagePage        from "./pages/LandingPagePage";
import ShopDetailsPage        from "./pages/ShopDetailsPage";
import RestaurantList         from "./components/RestaurantList";
import SalonList              from "./components/Salons";
import BakeryList             from "./components/BakeryList";
import BeautyParlourList      from "./components/BeautyParlourList";
import LoginPage              from "./components/LoginPage";
import PropertyList           from "./components/Propertypage";
import PropertyDetails        from "./components/PropertyDetails";   // NEW
import RegisterResident       from "./components/RegisterResident";
import RegisterService        from "./components/RegisterService";
import UserDashboard          from "./components/UserDashboard";
import { AuthProvider }       from "./context/AuthContext";
import ServicesPage from "./components/ServicesPage";
// Helper that blocks guests and sends them to /login
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      {/* NO <BrowserRouter> here - it's already in index.js */}
      <Routes>
        <Route path="/" element={<LandingPagePage />} />

        {/* Services */}
        <Route path="/services/restaurants"  element={<RestaurantList />} />
        <Route path="/services/shop/:shopId" element={<ShopDetailsPage />} />
        <Route path="/services/salons"       element={<SalonList />} />
        <Route path="/services/bakeries"     element={<BakeryList />} />
        <Route path="/services/beauty-parlours" element={<BeautyParlourList />} />
        <Route path="/services/properties"   element={<PropertyList />} />
        <Route path="/services"              element={<ServicesPage />} />
        {/* NEW: Protected property details route */}
        <Route
          path="/property/:propertyId"
          element={
            <PrivateRoute>
              <PropertyDetails />
            </PrivateRoute>
          }
        />

        {/* Auth & dashboards */}
        <Route path="/register-resident" element={<RegisterResident />} />
        <Route path="/register-service"  element={<RegisterService />} />
        <Route path="/login"             element={<LoginPage />} />
        <Route path="/resident/dashboard"    element={<UserDashboard />} />
      </Routes>
    </AuthProvider>
  );
}
