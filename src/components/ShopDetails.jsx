import React from 'react';

const menuItems = [
  { name: 'Margherita Pizza', price: 8.99 },
  { name: 'Veggie Burger', price: 6.99 },
  { name: 'Caesar Salad', price: 5.99 },
];

export default function ShopDetails() {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      {/* Banner Image */}
      <img
        src="https://your-shop-banner.jpg" // Replace with your image
        alt="Tasty Bites"
        className="w-full h-64 object-cover"
      />

      {/* Shop Info */}
      <div className="p-4">
        <h2 className="text-2xl font-bold">Tasty Bites</h2>
        <p className="text-sm text-gray-600">⭐ 4.5</p>

        {/* Actions */}
        <div className="mt-4 flex gap-4">
          <button className="bg-gray-200 px-4 py-2 rounded">Call</button>
          <button className="bg-black text-white px-4 py-2 rounded">
            Book Appointment
          </button>
        </div>

        {/* Menu */}
        <h3 className="mt-6 text-xl font-semibold">Menu</h3>
        <ul className="mt-2">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between py-2 border-b border-gray-100"
            >
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
