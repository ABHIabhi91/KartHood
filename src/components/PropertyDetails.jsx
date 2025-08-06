// src/components/PropertyDetails.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

export default function PropertyDetails() {
  const [saved, setSaved] = useState(false);
  const { propertyId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // Complete properties data with amenities - this is the source of truth
  const propertiesData = [
    {
      id: 1,
      name: "Sunrise Apartments",
      rating: 4.5,
      desc: "2BHK luxury apartments",
      fullDesc: "A beautifully maintained flat with abundant natural light, Italian marble flooring and smart-home controls. Residents enjoy power-backup, concierge desk and a 25-metre sky-pool.",
      amenities: [
        "Modular Kitchen",
        "Reserved Parking",
        "Balconies: 2",
        "Fully Furnished / Unfurnished",
        "Air Conditioned",
        "Gym Access, Pool"
      ],
      status: "Available",
      logo: "property1.jpeg",
      tower: "A",
      bhk: 2,
      price: 7500000,
      agentPhone: "9876543210",
      agentName: "Rohit Arora",
      agentEmail: "rohit@example.com",
      agentRating: 4.2,
      agentListings: 6
    },
    {
      id: 2,
      name: "Green Valley Homes",
      rating: 4.3,
      desc: "3BHK independent houses",
      fullDesc: "Independent duplex homes surrounded by lush greenery. Private lawns, solar rooftop panels and an exclusive clubhouse included.",
      amenities: [
        "Private Lawn",
        "Solar Rooftop",
        "Covered Car Park",
        "3 Balconies",
        "Smart Lock",
        "Jogging Track"
      ],
      status: "Sold",
      logo: "property2.jpeg",
      tower: "Villa",
      bhk: 3,
      price: 12000000,
      agentPhone: "9876543211",
      agentName: "Meera Shah",
      agentEmail: "meera@example.com",
      agentRating: 4.7,
      agentListings: 12
    },
    {
      id: 3,
      name: "Skyline Towers",
      rating: 4.6,
      desc: "High-rise apartments",
      fullDesc: "Modern high-rise living with panoramic city views. Premium finishes and world-class amenities make this the perfect urban retreat.",
      amenities: [
        "City View",
        "Premium Kitchen",
        "Parking Space",
        "Multiple Balconies",
        "Central AC",
        "Swimming Pool",
        "24/7 Security"
      ],
      status: "Available",
      logo: "property3.jpeg",
      tower: "B",
      bhk: 3,
      price: 9500000,
      agentPhone: "9876543212",
      agentName: "Amit Kumar",
      agentEmail: "amit@example.com",
      agentRating: 4.5,
      agentListings: 8
    },
    {
      id: 4,
      name: "Royal Residency",
      rating: 4.4,
      desc: "Premium villas with pool",
      fullDesc: "Luxurious villas with private swimming pools, landscaped gardens, and premium interior finishes. Perfect for families seeking upscale living.",
      amenities: [
        "Private Swimming Pool",
        "Landscaped Garden",
        "Premium Interiors",
        "4 Bedrooms",
        "Covered Parking for 2 Cars",
        "Security System",
        "Clubhouse Access"
      ],
      status: "Available",
      logo: "property4.jpeg",
      tower: "Villa",
      bhk: 4,
      price: 15000000,
      agentPhone: "9876543213",
      agentName: "Priya Patel",
      agentEmail: "priya@example.com",
      agentRating: 4.6,
      agentListings: 4
    },
    {
      id: 5,
      name: "Orchid Heights",
      rating: 4.7,
      desc: "Spacious 2BHK flats",
      fullDesc: "Thoughtfully designed 2BHK apartments with spacious layouts, modern amenities, and excellent connectivity to major city landmarks.",
      amenities: [
        "Spacious Layout",
        "Modern Kitchen",
        "Reserved Parking",
        "2 Balconies",
        "Elevator Access",
        "Garden View",
        "Community Hall"
      ],
      status: "Available",
      logo: "property5.jpeg",
      tower: "A",
      bhk: 2,
      price: 8000000,
      agentPhone: "9876543214",
      agentName: "Raj Singh",
      agentEmail: "raj@example.com",
      agentRating: 4.3,
      agentListings: 9
    },
    {
      id: 6,
      name: "Metropolis Lofts",
      rating: 4.2,
      desc: "Modern 1BHK studios",
      fullDesc: "Contemporary studio apartments perfect for young professionals. Open-plan design with modern fixtures and excellent city connectivity.",
      amenities: [
        "Open-Plan Design",
        "Modern Fixtures",
        "Compact Kitchen",
        "1 Balcony",
        "High-Speed Internet Ready",
        "Gym Access",
        "Rooftop Terrace"
      ],
      status: "Available",
      logo: "property6.jpeg",
      tower: "C",
      bhk: 1,
      price: 5000000,
      agentPhone: "9876543215",
      agentName: "Anita Sharma",
      agentEmail: "anita@example.com",
      agentRating: 4.1,
      agentListings: 7
    }
  ];

  // ALWAYS use local data first - this ensures amenities are present
  const property = propertiesData.find((p) => p.id === Number(propertyId));

  // If not found in local data, property will be undefined
  if (!property) {
    return (
      <div className="property-details" style={{ textAlign: "center", padding: "2rem" }}>
        <h2>❌ Property not found</h2>
        <p>Property ID: {propertyId}</p>
        <p>Available properties: {propertiesData.map(p => p.id).join(", ")}</p>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/services/properties")}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          ⬅️ Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="property-details">
      <button 
        className="back-link" 
        onClick={() => navigate("/services/properties")}
        style={{ 
          background: "none", 
          border: "1px solid #ddd", 
          padding: "0.5rem 1rem", 
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem"
        }}
      >
        ⬅️ Back to Properties
      </button>

      <h1 style={{ color: "#333", marginBottom: "1rem" }}>{property.name}</h1>
      
      <div className="property-meta" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <span style={{ background: "#f0f8ff", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
          ⭐ {property.rating}
        </span>
        <span 
          className={`status ${property.status.toLowerCase()}`}
          style={{ 
            padding: "0.25rem 0.5rem", 
            borderRadius: "4px",
            background: property.status === "Available" ? "#e8f5e8" : "#ffe8e8",
            color: property.status === "Available" ? "#2d5a2d" : "#8b0000"
          }}
        >
          {property.status}
        </span>
      </div>

      <img
        className="property-img"
        src={`/images/${property.logo}`}
        alt={property.name}
        style={{ 
          width: "100%", 
          maxWidth: "500px", 
          height: "300px", 
          objectFit: "cover", 
          borderRadius: "8px",
          marginBottom: "1rem"
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/500x300/EFEFEF/AAAAAA?text=Property+Image";
        }}
      />

      <div 
        className="info-grid" 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "1rem",
          marginBottom: "2rem",
          padding: "1rem",
          background: "#f9f9f9",
          borderRadius: "8px"
        }}
      >
        <div><strong>🏢 Tower:</strong> {property.tower}</div>
        <div><strong>🛏️ BHK:</strong> {property.bhk}</div>
        <div><strong>💰 Price:</strong> ₹{property.price.toLocaleString("en-IN")}</div>
        <div><strong>📞 Agent:</strong> {property.agentPhone}</div>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#333", borderBottom: "2px solid #ddd", paddingBottom: "0.5rem" }}>
          About this property
        </h2>
        <p style={{ lineHeight: "1.6", color: "#666", margin: "1rem 0" }}>
          {property.fullDesc || property.desc || "No description available."}
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#333", marginBottom: "1rem" }}>✨ Amenities</h3>
        
        {/* Force display amenities */}
        <ul 
          className="amenity-list"
          style={{ 
            listStyle: "none", 
            padding: 0, 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "0.5rem"
          }}
        >
          {property.amenities.map((amenity, index) => (
            <li 
              key={index}
              style={{ 
                padding: "0.5rem", 
                background: "#f0f8f0", 
                borderRadius: "4px",
                border: "1px solid #d4edda"
              }}
            >
              ✅ {amenity}
            </li>
          ))}
        </ul>
      </section>

      <div 
        className="map-widget" 
        style={{ 
          background: "#f5f5f5", 
          padding: "2rem", 
          textAlign: "center", 
          borderRadius: "8px",
          marginBottom: "2rem"
        }}
      >
        <span>📍 Interactive map coming soon...</span>
      </div>

      <div 
        className="action-row" 
        style={{ 
          display: "flex", 
          gap: "1rem", 
          flexWrap: "wrap", 
          marginBottom: "2rem" 
        }}
      >
        <button
          className="btn btn-primary"
          disabled={property.status === "Sold"}
          onClick={() => window.open(`tel:${property.agentPhone}`, "_self")}
          style={{ 
            padding: "0.75rem 1.5rem", 
            background: property.status === "Sold" ? "#ccc" : "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: property.status === "Sold" ? "not-allowed" : "pointer"
          }}
        >
          📞 Contact Seller
        </button>
        
        <button
          className="btn btn-primary"
          disabled={property.status === "Sold"}
          onClick={() => alert("Scheduling feature coming soon!")}
          style={{ 
            padding: "0.75rem 1.5rem", 
            background: property.status === "Sold" ? "#ccc" : "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: property.status === "Sold" ? "not-allowed" : "pointer"
          }}
        >
          🗓️ Schedule Visit
        </button>
        
        <button
          className={`btn ${saved ? "btn-saved" : "btn-secondary"}`}
          onClick={() => setSaved(!saved)}
          style={{ 
            padding: "0.75rem 1.5rem", 
            background: saved ? "#dc3545" : "#6c757d", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {saved ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>

      <div 
        className="seller-card"
        style={{ 
          background: "#f8f9fa", 
          padding: "1.5rem", 
          borderRadius: "8px", 
          border: "1px solid #ddd",
          marginBottom: "2rem"
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#333" }}>👨‍💼 Agent Details</h3>
        <div style={{ lineHeight: "1.8" }}>
          <p><strong>Name:</strong> {property.agentName}</p>
          <p><strong>Phone:</strong> {property.agentPhone}</p>
          <p><strong>Email:</strong> {property.agentEmail}</p>
          <p><strong>Rating:</strong> {"⭐".repeat(Math.round(property.agentRating))} ({property.agentRating})</p>
          <p><strong>Active Listings:</strong> {property.agentListings}</p>
        </div>
        
        <button
          onClick={() => alert(`Viewing ${property.agentListings} other listings from ${property.agentName}...`)}
          style={{ 
            marginTop: "1rem",
            padding: "0.5rem 1rem", 
            background: "#6c757d", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          View Other Listings ({property.agentListings})
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => navigate("/services/properties")}
          style={{ 
            padding: "0.75rem 2rem", 
            background: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          🏘️ Back to All Properties
        </button>
      </div>
    </div>
  );
}
