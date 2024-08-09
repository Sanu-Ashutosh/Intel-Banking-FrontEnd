// src/components/AccountForm.jsx
import React, { useState, useEffect } from 'react';
import '../index.css'; // Ensure this is the path to your CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { BankingService } from '../services/BankingService';

export const AccountForm = () => {
  const [formData, setFormData] = useState({
    bankAcNo: '',
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    nationality: '',
    residentialAddress: '',
    currentAddress: '',
    phoneNumber: '',
    emailAddress: '',
    governmentIdType: '',
    governmentId: '',
    adhar: '',
    accountType: '',
    initialDepositAmount: '1001',
    maritalStatus: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate =useNavigate();

  useEffect(() => {
    // Assuming email is stored in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const emailID = user.emailID;
    if (emailID) {
      setFormData(prevData => ({ ...prevData, emailAddress: emailID }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age || formData.age < 21) newErrors.age = 'Age must be 21 or above';
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (formData.initialDepositAmount <= 1000) newErrors.initialDepositAmount = 'Initial deposit must be above 1000';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const { success, data, error } = await BankingService.createAccount(formData);
      if (success) {
        setResponseMessage("Account successfully created with account number : "+data);
        setSubmitted(true);
        console.log('API Response:', data);
        // localStorage.setItem('accno',data);
        setTimeout(() => navigate('/home'), 4000);
      } else {
        setResponseMessage(error);
        setSubmitted(true);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container auth-container1">
        <div className="auth-box auth-box1">
          <h2 className="auth-title">Account Form</h2>
          {submitted && <div className={`auth-message ${responseMessage.includes('successfully') ? 'auth-success' : 'auth-error'}`}>{responseMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="auth-group">
              <input
                type="hidden"
                name="bankAcNo"
                placeholder="Bank Account Number"
                value={formData.bankAcNo}
                readOnly
              />
            </div>
            <div className="auth-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="auth-error">{errors.fullName}</div>}
            </div>
            <div className="auth-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <div className="auth-error">{errors.age}</div>}
            </div>
            <div className="auth-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="auth-group">
              <label>Nationality</label>
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Residential Address</label>
              <input
                type="text"
                name="residentialAddress"
                placeholder="Residential Address"
                value={formData.residentialAddress}
                onChange={handleChange}
              />
              <div>
                <label>Same as Current Address</label>
                <input
                  type="checkbox"
                  name="currentAddressCheck"
                  checked={formData.residentialAddress === formData.currentAddress}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prevData => ({ ...prevData, residentialAddress: prevData.currentAddress }));
                    }
                  }}
                />
              </div>
            </div>
            <div className="auth-group">
              <label>Current Address</label>
              <input
                type="text"
                name="currentAddress"
                placeholder="Current Address"
                value={formData.currentAddress}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <div className="auth-error">{errors.phoneNumber}</div>}
            </div>
            <div className="auth-group">
              <label>Email Address</label>
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                value={formData.emailAddress}
                readOnly
              />
            </div>
            <div className="auth-group">
              <label>Government ID Type</label>
              <select name="governmentIdType" value={formData.governmentIdType} onChange={handleChange}>
                <option value="">Select ID Type</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div className="auth-group">
              <label>Government ID</label>
              <input
                type="text"
                name="governmentId"
                placeholder="Government ID"
                value={formData.governmentId}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Aadhaar</label>
              <input
                type="text"
                name="adhar"
                placeholder="Aadhaar"
                value={formData.adhar}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Account Type</label>
              <select name="accountType" value={formData.accountType} onChange={handleChange}>
                <option value="">Select Account Type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
                <option value="Salaried">Salaried</option>
              </select>
            </div>
            <div className="auth-group">
              <label>Initial Deposit Amount</label>
              <input
                type="number"
                name="initialDepositAmount"
                placeholder="Initial Deposit Amount"
                value={1001}
                onChange={handleChange}
              />
              {errors.initialDepositAmount && <div className="auth-error">{errors.initialDepositAmount}</div>}
            </div>
            <div className="auth-group">
              <label>Marital Status</label>
              <input
                type="text"
                name="maritalStatus"
                placeholder="Marital Status"
                value={formData.maritalStatus}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Security Question</label>
              <input
                type="text"
                name="securityQuestion"
                placeholder="Security Question"
                value={formData.securityQuestion}
                onChange={handleChange}
              />
            </div>
            <div className="auth-group">
              <label>Security Answer</label>
              <input
                type="text"
                name="securityAnswer"
                placeholder="Security Answer"
                value={formData.securityAnswer}
                onChange={handleChange}
              />
            </div>
            <div className="auth-buttons">
              <button type="submit" className="auth-button">Submit</button>
              <button type="button" className="auth-button" onClick={() => setFormData({})}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
