import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload, Home, DollarSign, Settings, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import axios from '../utils/axiosInstance';
import './AddProperty.css';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [, setUser] = useState(null);

  // Initialize user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    if (!token || userType !== 'Service Provider') {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      propertyType: '',
      bhkConfiguration: '',
      builtUpArea: '',
      carpetArea: '',
      tower: '',
      floorNumber: '',
      flatNumber: '',
      facing: '',
      parkingType: ''
    },
    pricingInfo: {
      salePrice: '',
      monthlyMaintenance: '',
      registrationCharges: 'INCLUDED',
      availabilityStatus: '',
      possessionDate: ''
    },
    features: {
      interiorFeatures: [],
      buildingAmenities: [],
      connectivity: []
    },
    description: '',
    images: [],
    contactPreferences: {
      primaryContact: '',
      alternativeContact: '',
      emailForInquiries: '',
      showPhoneNumber: 'FULL',
      preferredContactHours: {
        startTime: '',
        endTime: ''
      },
      availableDays: [],
      specialInstructions: ''
    },
    termsAccepted: false,
    status: 'DRAFT'
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: Home },
    { id: 2, title: 'Pricing', icon: DollarSign },
    { id: 3, title: 'Features', icon: Settings },
    { id: 4, title: 'Description & Images', icon: Upload },
    { id: 5, title: 'Contact', icon: Phone },
    { id: 6, title: 'Review', icon: CheckCircle }
  ];

  const propertyTypes = ['APARTMENT', 'VILLA', 'PLOT'];
  const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '4BHK+'];
  const facingOptions = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
  const parkingTypes = ['COVERED', 'OPEN', 'NONE'];
  const availabilityStatuses = ['READY_TO_MOVE', 'UNDER_CONSTRUCTION', 'IMMEDIATE_POSSESSION'];
  
  const interiorFeatures = [
    'MODULAR_KITCHEN', 'AIR_CONDITIONED', 'FULLY_FURNISHED',
    'WOODEN_FLOORING', 'FALSE_CEILING', 'BUILT_IN_WARDROBES',
    'STUDY_ROOM', 'BALCONY', 'SERVANT_QUARTER'
  ];
  
  const buildingAmenities = [
    'ELEVATOR', 'SECURITY_GUARD', 'CCTV_SURVEILLANCE',
    'GYM_FITNESS_CENTER', 'SWIMMING_POOL', 'CHILDRENS_PLAY_AREA',
    'POWER_BACKUP', 'WATER_SUPPLY', 'COMMUNITY_HALL',
    'GARDEN_LANDSCAPING', 'INTERCOM', 'VISITOR_PARKING'
  ];
  
  const connectivityFeatures = ['BROADBAND_READY', 'DTH_CONNECTION', 'VIDEO_DOOR_PHONE'];
  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, nestedField, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...prev[section][nestedField],
          [field]: value
        }
      }
    }));
  };

  const handleArrayToggle = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter(item => item !== value)
          : [...prev[section][field], value]
      }
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    // Basic Info validation
    if (!formData.basicInfo.title?.trim()) errors.push('Title is required');
    if (!formData.basicInfo.propertyType) errors.push('Property type is required');
    if (!formData.basicInfo.bhkConfiguration) errors.push('BHK configuration is required');
    if (!formData.basicInfo.builtUpArea || parseFloat(formData.basicInfo.builtUpArea) <= 0) {
      errors.push('Valid built-up area is required');
    }
    if (!formData.basicInfo.carpetArea || parseFloat(formData.basicInfo.carpetArea) <= 0) {
      errors.push('Valid carpet area is required');
    }
    if (!formData.basicInfo.tower?.trim()) errors.push('Tower is required');
    if (!formData.basicInfo.floorNumber || parseInt(formData.basicInfo.floorNumber) <= 0) {
      errors.push('Valid floor number is required');
    }
    if (!formData.basicInfo.flatNumber?.trim()) errors.push('Flat number is required');
    if (!formData.basicInfo.facing) errors.push('Facing is required');
    
    // Pricing validation
    if (!formData.pricingInfo.salePrice || parseInt(formData.pricingInfo.salePrice) <= 0) {
      errors.push('Valid sale price is required');
    }
    if (!formData.pricingInfo.availabilityStatus) errors.push('Availability status is required');
    
    // Contact validation
    if (!formData.contactPreferences.primaryContact?.trim()) errors.push('Primary contact is required');
    
    // Phone validation
    const phoneRegex = /^[+]?[0-9]{1,4}[-]?[0-9]{10,12}$/;
    if (formData.contactPreferences.primaryContact && 
        !phoneRegex.test(formData.contactPreferences.primaryContact.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    // Email validation
    if (formData.contactPreferences.emailForInquiries) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactPreferences.emailForInquiries)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    // Description validation
    if (!formData.description?.trim()) errors.push('Description is required');
    if (formData.description.length > 1000) errors.push('Description cannot exceed 1000 characters');
    
    if (!formData.termsAccepted) errors.push('Please accept the terms and conditions');
    
    if (errors.length > 0) {
      setSubmitError('Please fix the following errors: ' + errors.join(', '));
      return false;
    }
    
    setSubmitError('');
    return true;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      // Debug JWT token
      const token = localStorage.getItem('token');
      const userType = localStorage.getItem('userType');
      
      console.log('Token exists:', !!token);
      console.log('User Type:', userType);
      
      if (!token) {
        setSubmitError('Please login first');
        navigate('/login');
        return;
      }

      if (userType !== 'Service Provider') {
        setSubmitError('Only Service Providers can add properties');
        return;
      }

      // Debug token payload
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('JWT Payload:', payload);
          console.log('Roles:', payload.roles || payload.authorities);
        } catch (e) {
          console.error('Invalid token format');
        }
      }

      // Clean the form data before sending
      const cleanedFormData = {
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          builtUpArea: parseFloat(formData.basicInfo.builtUpArea) || 0,
          carpetArea: parseFloat(formData.basicInfo.carpetArea) || 0,
          floorNumber: parseInt(formData.basicInfo.floorNumber) || 0,
        },
        pricingInfo: {
          ...formData.pricingInfo,
          salePrice: parseInt(formData.pricingInfo.salePrice) || 0,
          monthlyMaintenance: parseInt(formData.pricingInfo.monthlyMaintenance) || 0,
        }
      };

      console.log('Sending form data:', cleanedFormData);

      // Fixed API endpoint - removed /api prefix since it's already in axios baseURL
      const response = await axios.post('/service-provider/properties', cleanedFormData);
      
      if (response.data && response.data.success) {
        alert('Property created successfully! 🎉');
        navigate('/service/dashboard', { 
          state: { message: 'Property created successfully!' },
          replace: true 
        });
      } else {
        setSubmitError('Failed to create property. Please try again.');
      }
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      
      if (error.response?.status === 401) {
        setSubmitError('Session expired. Please login again.');
        localStorage.clear();
        navigate('/login');
      } else if (error.response?.status === 403) {
        setSubmitError('Access denied. Please ensure you are logged in as a Service Provider with proper permissions.');
      } else if (error.response?.data?.message) {
        setSubmitError(error.response.data.message);
      } else if (error.message === 'Network Error') {
        setSubmitError('Network error. Please check if the server is running.');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Basic Property Information</h3>
            <p className="property-form-description-text">
              Provide essential details about your property to help buyers understand what you're offering.
            </p>
            
            <div className="property-form-input-grid">
              <div className="property-form-field-group property-form-full-width">
                <label className="property-form-field-label">Property Title *</label>
                <input
                  type="text"
                  value={formData.basicInfo.title}
                  onChange={(e) => handleInputChange('basicInfo', 'title', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., Luxurious 3BHK Apartment with Modern Amenities"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Property Type *</label>
                <select
                  value={formData.basicInfo.propertyType}
                  onChange={(e) => handleInputChange('basicInfo', 'propertyType', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">BHK Configuration *</label>
                <select
                  value={formData.basicInfo.bhkConfiguration}
                  onChange={(e) => handleInputChange('basicInfo', 'bhkConfiguration', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="">Select BHK</option>
                  {bhkOptions.map(bhk => (
                    <option key={bhk} value={bhk}>{bhk}</option>
                  ))}
                </select>
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Built-up Area (sq ft) *</label>
                <input
                  type="number"
                  value={formData.basicInfo.builtUpArea}
                  onChange={(e) => handleInputChange('basicInfo', 'builtUpArea', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 1200"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Carpet Area (sq ft) *</label>
                <input
                  type="number"
                  value={formData.basicInfo.carpetArea}
                  onChange={(e) => handleInputChange('basicInfo', 'carpetArea', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Tower/Building *</label>
                <input
                  type="text"
                  value={formData.basicInfo.tower}
                  onChange={(e) => handleInputChange('basicInfo', 'tower', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., Tower A"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Floor Number *</label>
                <input
                  type="number"
                  value={formData.basicInfo.floorNumber}
                  onChange={(e) => handleInputChange('basicInfo', 'floorNumber', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 5"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Flat Number *</label>
                <input
                  type="text"
                  value={formData.basicInfo.flatNumber}
                  onChange={(e) => handleInputChange('basicInfo', 'flatNumber', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 501"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Facing *</label>
                <select
                  value={formData.basicInfo.facing}
                  onChange={(e) => handleInputChange('basicInfo', 'facing', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="">Select Facing</option>
                  {facingOptions.map(facing => (
                    <option key={facing} value={facing}>{facing}</option>
                  ))}
                </select>
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Parking Type</label>
                <select
                  value={formData.basicInfo.parkingType}
                  onChange={(e) => handleInputChange('basicInfo', 'parkingType', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="">Select Parking</option>
                  {parkingTypes.map(parking => (
                    <option key={parking} value={parking}>{parking}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Pricing Information</h3>
            <p className="property-form-description-text">
              Set competitive pricing and availability details to attract potential buyers.
            </p>
            
            <div className="property-form-input-grid">
              <div className="property-form-field-group">
                <label className="property-form-field-label">Sale Price (₹) *</label>
                <input
                  type="number"
                  value={formData.pricingInfo.salePrice}
                  onChange={(e) => handleInputChange('pricingInfo', 'salePrice', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 5000000"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Monthly Maintenance (₹)</label>
                <input
                  type="number"
                  value={formData.pricingInfo.monthlyMaintenance}
                  onChange={(e) => handleInputChange('pricingInfo', 'monthlyMaintenance', e.target.value)}
                  className="property-form-text-input"
                  placeholder="e.g., 3000"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Registration Charges</label>
                <select
                  value={formData.pricingInfo.registrationCharges}
                  onChange={(e) => handleInputChange('pricingInfo', 'registrationCharges', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="INCLUDED">Included in Price</option>
                  <option value="EXCLUDED">Excluded from Price</option>
                </select>
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Availability Status *</label>
                <select
                  value={formData.pricingInfo.availabilityStatus}
                  onChange={(e) => handleInputChange('pricingInfo', 'availabilityStatus', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="">Select Status</option>
                  {availabilityStatuses.map(status => (
                    <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>

              <div className="property-form-field-group property-form-full-width">
                <label className="property-form-field-label">Possession Date</label>
                <input
                  type="date"
                  value={formData.pricingInfo.possessionDate}
                  onChange={(e) => handleInputChange('pricingInfo', 'possessionDate', e.target.value)}
                  className="property-form-text-input"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Property Features</h3>
            <p className="property-form-description-text">
              Select the features and amenities that make your property stand out.
            </p>
            
            <div className="property-features-container">
              <h4 className="property-features-category-title">Interior Features</h4>
              <div className="property-features-checkbox-grid">
                {interiorFeatures.map(feature => (
                  <label key={feature} className="property-features-checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.features.interiorFeatures.includes(feature)}
                      onChange={() => handleArrayToggle('features', 'interiorFeatures', feature)}
                      className="property-features-checkbox-input"
                    />
                    <span className="property-features-checkbox-label">{feature.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="property-features-container">
              <h4 className="property-features-category-title">Building Amenities</h4>
              <div className="property-features-checkbox-grid">
                {buildingAmenities.map(amenity => (
                  <label key={amenity} className="property-features-checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.features.buildingAmenities.includes(amenity)}
                      onChange={() => handleArrayToggle('features', 'buildingAmenities', amenity)}
                      className="property-features-checkbox-input"
                    />
                    <span className="property-features-checkbox-label">{amenity.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="property-features-container">
              <h4 className="property-features-category-title">Connectivity Features</h4>
              <div className="property-features-checkbox-grid">
                {connectivityFeatures.map(feature => (
                  <label key={feature} className="property-features-checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.features.connectivity.includes(feature)}
                      onChange={() => handleArrayToggle('features', 'connectivity', feature)}
                      className="property-features-checkbox-input"
                    />
                    <span className="property-features-checkbox-label">{feature.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Description & Images</h3>
            <p className="property-form-description-text">
              Provide a detailed description and upload high-quality images to showcase your property.
            </p>
            
            <div className="property-form-field-group">
              <label className="property-form-field-label">Property Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="property-form-textarea-input"
                placeholder="Describe your property in detail. Include location benefits, nearby amenities, unique features, etc."
              />
              <p className="property-form-character-count">Characters: {formData.description.length}/1000</p>
            </div>

            <div className="property-form-field-group">
              <label className="property-form-field-label">Property Images</label>
              <div className="property-image-upload-area">
                <Upload className="property-image-upload-icon" />
                <p className="property-image-upload-text">Drag and drop images here, or click to browse</p>
                <p className="property-image-upload-description">
                  Upload up to 10 high-quality images (JPG, PNG, max 5MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="property-image-upload-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="property-image-upload-button">
                  Choose Images
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Contact Preferences</h3>
            <p className="property-form-description-text">
              Set your contact preferences so interested buyers can reach you easily.
            </p>
            
            <div className="property-form-input-grid">
              <div className="property-form-field-group">
                <label className="property-form-field-label">Primary Contact *</label>
                <input
                  type="tel"
                  value={formData.contactPreferences.primaryContact}
                  onChange={(e) => handleInputChange('contactPreferences', 'primaryContact', e.target.value)}
                  className="property-form-text-input"
                  placeholder="+91-9876543210"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Alternative Contact</label>
                <input
                  type="tel"
                  value={formData.contactPreferences.alternativeContact}
                  onChange={(e) => handleInputChange('contactPreferences', 'alternativeContact', e.target.value)}
                  className="property-form-text-input"
                  placeholder="+91-9876543210"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Email for Inquiries</label>
                <input
                  type="email"
                  value={formData.contactPreferences.emailForInquiries}
                  onChange={(e) => handleInputChange('contactPreferences', 'emailForInquiries', e.target.value)}
                  className="property-form-text-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Phone Number Display</label>
                <select
                  value={formData.contactPreferences.showPhoneNumber}
                  onChange={(e) => handleInputChange('contactPreferences', 'showPhoneNumber', e.target.value)}
                  className="property-form-select-input"
                >
                  <option value="FULL">Show Full Number</option>
                  <option value="MASKED">Show Masked Number</option>
                  <option value="HIDDEN">Hide Number</option>
                </select>
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Preferred Contact Start Time</label>
                <input
                  type="time"
                  value={formData.contactPreferences.preferredContactHours.startTime}
                  onChange={(e) => handleNestedInputChange('contactPreferences', 'preferredContactHours', 'startTime', e.target.value)}
                  className="property-form-text-input"
                />
              </div>

              <div className="property-form-field-group">
                <label className="property-form-field-label">Preferred Contact End Time</label>
                <input
                  type="time"
                  value={formData.contactPreferences.preferredContactHours.endTime}
                  onChange={(e) => handleNestedInputChange('contactPreferences', 'preferredContactHours', 'endTime', e.target.value)}
                  className="property-form-text-input"
                />
              </div>

              <div className="property-form-field-group property-form-full-width">
                <label className="property-form-field-label">Available Days</label>
                <div className="property-contact-days-grid">
                  {daysOfWeek.map(day => (
                    <label key={day} className="property-contact-day-item">
                      <input
                        type="checkbox"
                        checked={formData.contactPreferences.availableDays.includes(day)}
                        onChange={() => handleArrayToggle('contactPreferences', 'availableDays', day)}
                        className="property-contact-day-checkbox"
                      />
                      <span className="property-contact-day-label">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="property-form-field-group property-form-full-width">
                <label className="property-form-field-label">Special Instructions</label>
                <textarea
                  value={formData.contactPreferences.specialInstructions}
                  onChange={(e) => handleInputChange('contactPreferences', 'specialInstructions', e.target.value)}
                  rows={3}
                  className="property-form-textarea-input"
                  placeholder="Any special instructions for potential buyers..."
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="property-form-step-content">
            <h3 className="property-form-section-heading">Review & Submit</h3>
            <p className="property-form-description-text">
              Please review all the information before submitting your property listing.
            </p>
            
            <div className="property-review-summary-container">
              <h4 className="property-review-summary-title">Property Summary</h4>
              <div className="property-review-summary-grid">
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Title:</span> 
                  <span>{formData.basicInfo.title || 'Not specified'}</span>
                </div>
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Type:</span> 
                  <span>{formData.basicInfo.propertyType || 'Not specified'}</span>
                </div>
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Configuration:</span> 
                  <span>{formData.basicInfo.bhkConfiguration || 'Not specified'}</span>
                </div>
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Area:</span> 
                  <span>{formData.basicInfo.builtUpArea ? `${formData.basicInfo.builtUpArea} sq ft` : 'Not specified'}</span>
                </div>
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Price:</span> 
                  <span>{formData.pricingInfo.salePrice ? `₹${parseInt(formData.pricingInfo.salePrice).toLocaleString()}` : 'Not specified'}</span>
                </div>
                <div className="property-review-summary-item">
                  <span className="property-review-summary-label">Status:</span> 
                  <span>{formData.pricingInfo.availabilityStatus?.replace(/_/g, ' ') || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="property-form-error-message" role="alert">
                {submitError}
              </div>
            )}

            <div className="property-terms-acceptance-container">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                className="property-terms-acceptance-checkbox"
                id="terms-checkbox"
              />
              <label htmlFor="terms-checkbox" className="property-terms-acceptance-text">
                I accept the <span className="property-terms-acceptance-link">Terms and Conditions</span> and confirm that all information provided is accurate. I understand that providing false information may result in the removal of my listing.
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="property-page-main-container">
      {/* Back Button */}
      <button
        onClick={() => navigate('/service/dashboard')}
        className="property-page-back-button"
        aria-label="Back to Dashboard"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header */}
      <div className="property-page-header-section">
        <div className="property-page-header-content">
          <div className="property-page-header-inner">
            <h1 className="property-page-main-title">Add New Property</h1>
            <div className="property-page-step-indicator">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="property-progress-wrapper">
        <div className="property-progress-content">
          <div className="property-progress-steps-container">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="property-progress-step-item">
                    <div className={`property-progress-step-icon ${
                      isActive ? 'property-progress-active' : isCompleted ? 'property-progress-completed' : 'property-progress-inactive'
                    }`}>
                      <Icon />
                    </div>
                    <div className="property-progress-step-label-wrapper">
                      <p className={`property-progress-step-label ${
                        isActive ? 'property-progress-active' : isCompleted ? 'property-progress-completed' : 'property-progress-inactive'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`property-progress-step-separator ${
                      isCompleted ? 'property-progress-completed' : 'property-progress-inactive'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="property-page-main-content">
        <div className="property-page-form-wrapper">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="property-navigation-controls">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`property-nav-button property-nav-previous ${currentStep === 1 ? 'property-nav-disabled' : ''}`}
            >
              <ChevronLeft />
              Previous
            </button>
            
            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted || isLoading}
                className={`property-nav-button property-nav-submit ${(!formData.termsAccepted || isLoading) ? 'property-nav-disabled' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="property-loading-spinner" />
                    Creating Property...
                  </>
                ) : (
                  <>
                    Submit Property
                    <CheckCircle />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="property-nav-button property-nav-next"
              >
                Next
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
