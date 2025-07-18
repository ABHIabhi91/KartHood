// SellerDashboard.jsx
import React from "react";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Seller Panel</h2>
        <a href="#">Dashboard</a>
        <a href="#">My Properties</a>
        <a href="#">Add Property</a>
        <a href="#">Leads</a>
        <a href="#">Messages</a>
        <a href="#">Settings</a>
      </aside>

      <main className="main">
        <header className="topbar">
          <h3>Welcome, Abhishek</h3>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="profile" />
            <span>Seller</span>
          </div>
        </header>

        <div className="content">
          <div className="stats">
            <div className="card">
              <h2>12</h2>
              <p>Properties Listed</p>
            </div>
            <div className="card">
              <h2>4</h2>
              <p>Active Enquiries</p>
            </div>
            <div className="card">
              <h2>3</h2>
              <p>Sold Properties</p>
            </div>
          </div>

          <a href="#" className="add-property-btn">
            + Add New Property
          </a>

          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Status</th>
                <th>Views</th>
                <th>Enquiries</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2BHK Tower A</td>
                <td>Active</td>
                <td>134</td>
                <td>12</td>
                <td className="actions">
                  <button className="btn-view">View</button>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
              <tr>
                <td>3BHK Tower B</td>
                <td>Inactive</td>
                <td>89</td>
                <td>4</td>
                <td className="actions">
                  <button className="btn-view">View</button>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
