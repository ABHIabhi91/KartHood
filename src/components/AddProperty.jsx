import React, { useState } from 'react';
import { ArrowLeft, Save, Lightbulb } from 'lucide-react';
import './AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: 'apartment',
    bhkConfiguration: '3bhk',
    builtUpArea: '',
    carpetArea: '',
    tower: '',
    floor: '',
    flatNumber: '',
    facing: 'east',
    parkingIncluded: 'yes-covered',
    salePrice: '',
    monthlyMaintenance: '',
    registrationCharges: 'include',
    status: 'ready-to-move',
    possessionDate: ''
  });

  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : value
    }));
    if (isDraftSaved) setIsDraftSaved(false);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('propertyDraft', JSON.stringify({
      ...formData,
      savedAt: new Date().toISOString(),
      status: 'draft'
    }));
    setIsDraftSaved(true);
    alert('Draft saved successfully!');
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handlePublish = () => {
    // you should add validation and replace with API POST here
    localStorage.removeItem('propertyDraft');
    alert('Property published successfully!');
  };

  React.useEffect(() => {
    const savedDraft = localStorage.getItem('propertyDraft');
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      if (window.confirm('You have a saved draft. Load it?')) {
        setFormData(draftData);
      }
    }
  }, []);

  return (
    <div className="add-property-container">
      {/* Top Navigation */}
      <div className="nav-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h2 className="page-title">Add New Property</h2>
        <button
          className={`save-draft-btn ${isDraftSaved ? 'saved' : ''}`}
          onClick={handleSaveDraft}
        >
          <Save size={16} />
          {isDraftSaved ? 'Draft Saved ✓' : 'Save Draft'}
        </button>
      </div>

      {/* Main Form */}
      <div className="form-container">
        <div className="form-section">

          {/* Basic Info */}
          <div className="section-header">
            <span className="section-icon">📋</span>
            <h3>Basic Property Information</h3>
          </div>
          <div className="form-group">
            <label htmlFor="propertyTitle" className="form-label">
              Property Title *
            </label>
            <input
              type="text"
              id="propertyTitle"
              name="propertyTitle"
              className="form-input"
              placeholder='e.g., "Spacious 3BHK with Garden View in Tower A"'
              value={formData.propertyTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Property Type & Configuration</label>
            <div className="dual-select-container">
              <div className="select-group">
                <label htmlFor="propertyType" className="sub-label">Property Type:</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="form-select"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
              <div className="select-group">
                <label htmlFor="bhkConfiguration" className="sub-label">BHK Configuration:</label>
                <select
                  id="bhkConfiguration"
                  name="bhkConfiguration"
                  className="form-select"
                  value={formData.bhkConfiguration}
                  onChange={handleInputChange}
                >
                  <option value="1bhk">1BHK</option>
                  <option value="2bhk">2BHK</option>
                  <option value="3bhk">3BHK</option>
                  <option value="4bhk">4BHK+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Area Details */}
          <div className="section-divider">
            <div className="section-header">
              <span className="section-icon">📐</span>
              <h3>Area Details</h3>
            </div>
            <div className="dual-input-container">
              <div className="input-group">
                <label htmlFor="builtUpArea" className="sub-label">Built-up Area:</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    id="builtUpArea"
                    name="builtUpArea"
                    className="form-input-small"
                    placeholder="1,200"
                    value={formData.builtUpArea}
                    onChange={handleInputChange}
                  />
                  <span className="unit">sq.ft</span>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="carpetArea" className="sub-label">Carpet Area:</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    id="carpetArea"
                    name="carpetArea"
                    className="form-input-small"
                    placeholder="1,050"
                    value={formData.carpetArea}
                    onChange={handleInputChange}
                  />
                  <span className="unit">sq.ft</span>
                </div>
              </div>
            </div>
            <div className="tip-box">
              <Lightbulb size={16} className="tip-icon" />
              <span>Tip: Built-up area includes walls, carpet area is usable space</span>
            </div>
          </div>

          {/* Location in Community */}
          <div className="section-divider">
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h3>Location in Community</h3>
            </div>
            <div className="quad-input-container">
              <div className="input-group">
                <label htmlFor="tower" className="sub-label">Tower:</label>
                <select
                  id="tower"
                  name="tower"
                  className="form-select-small"
                  value={formData.tower}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="floor" className="sub-label">Floor:</label>
                <input
                  type="number"
                  id="floor"
                  name="floor"
                  className="form-input-small"
                  placeholder="5"
                  value={formData.floor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="flatNumber" className="sub-label">Flat Number:</label>
                <input
                  type="text"
                  id="flatNumber"
                  name="flatNumber"
                  className="form-input-small"
                  placeholder="501"
                  value={formData.flatNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="facing" className="sub-label">Facing:</label>
                <select
                  id="facing"
                  name="facing"
                  className="form-select-small"
                  value={formData.facing}
                  onChange={handleInputChange}
                >
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                </select>
              </div>
            </div>
            <div className="parking-section">
              <label className="form-label">Parking Included:</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="parkingIncluded"
                    value="yes-covered"
                    checked={formData.parkingIncluded === 'yes-covered'}
                    onChange={handleInputChange}
                  /> Yes, Covered
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="parkingIncluded"
                    value="yes-open"
                    checked={formData.parkingIncluded === 'yes-open'}
                    onChange={handleInputChange}
                  /> Yes, Open
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="parkingIncluded"
                    value="no"
                    checked={formData.parkingIncluded === 'no'}
                    onChange={handleInputChange}
                  /> No Parking
                </label>
              </div>
            </div>
          </div>

          {/* Pricing & Additional Costs */}
          <div className="section-divider">
            <div className="section-header">
              <span className="section-icon">💰</span>
              <h3>Pricing & Availability</h3>
            </div>
            {/* Sale price */}
            <div className="form-group">
              <label htmlFor="salePrice" className="form-label">Sale Price *</label>
              <div className="price-input-container">
                <span className="currency-symbol">₹</span>
                <input
                  type="text"
                  id="salePrice"
                  name="salePrice"
                  className="form-input price-input"
                  placeholder="85,00,000"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="market-rate-tip">
                <Lightbulb size={14} className="tip-icon" />
                <span>Market rate for similar properties: ₹75L - ₹90L</span>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="additional-costs">
              <h4>Additional Costs</h4>
              <div className="dual-input-container">
                <div className="input-group">
                  <label htmlFor="monthlyMaintenance" className="sub-label">
                    Monthly Maintenance:
                  </label>
                  <div className="input-with-unit">
                    <span className="currency-symbol">₹</span>
                    <input
                      type="number"
                      id="monthlyMaintenance"
                      name="monthlyMaintenance"
                      className="form-input-small"
                      placeholder="3,500"
                      value={formData.monthlyMaintenance}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="registrationCharges" className="sub-label">
                    Registration Charges:
                  </label>
                  <select
                    id="registrationCharges"
                    name="registrationCharges"
                    className="form-select-small"
                    value={formData.registrationCharges}
                    onChange={handleInputChange}
                  >
                    <option value="include">Include in price</option>
                    <option value="exclude">Exclude from price</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="availability-section">
              <h4>Availability</h4>
              <div className="dual-input-container">
                <div className="input-group">
                  <label htmlFor="status" className="sub-label">Status:</label>
                  <select
                    id="status"
                    name="status"
                    className="form-select-small"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="ready-to-move">Ready to Move</option>
                    <option value="under-construction">Under Construction</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="possessionDate" className="sub-label">
                    Possession Date:
                  </label>
                  <input
                    type="date"
                    id="possessionDate"
                    name="possessionDate"
                    className="form-input-small date-input"
                    value={formData.possessionDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="status-options">
                <small>Options:</small>
                <ul>
                  <li>• Ready to Move</li>
                  <li>• Under Construction</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Publish Button */}
          <div className="publish-section">
            <div className="publish-container">
              <h3>Ready to List Your Property?</h3>
              <button className="publish-btn-final" onClick={handlePublish}>
                🚀 Publish Property Now
              </button>
              <small className="publish-note">
                * Your property will be visible to potential buyers immediately after publishing
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
