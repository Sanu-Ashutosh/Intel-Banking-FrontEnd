import React, { useState, useEffect } from 'react';
import '../index.css'; // Import your CSS file for styling
import Navbar from './Navbar';
import { FaEdit, FaSave } from 'react-icons/fa'; // For edit and save icons

export const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const APIURL = 'http://localhost:3030/XXIntelBankingProject/Intel-Banking';
  const accNo = JSON.parse(localStorage.getItem('accno'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${APIURL}/account-details?accNo=${accNo}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setUserData(data);
        setEditableData(data); // Initialize editable data with fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accNo, APIURL]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${APIURL}/update-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableData)
      });
      const result = await response.json();
      if (result.success) {
        setUserData(editableData);
        setIsEditing(false);
        alert('Changes saved successfully.');
      } else {
        alert('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  if (!userData) {
    return <div><Navbar /><div className="dashboard-loading">No User Found</div></div>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <h2>Dashboard</h2>
          <ul>
            <li><a href="#personal-details">Personal Details</a></li>
            <li><a href="#account-details">Account Details</a></li>
            <li><a href="#transactions">Transactions</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </div>
        <div className="dashboard-content">
          <div id="personal-details" className="dashboard-card">
            <h3>Personal Details</h3>
            <div className="dashboard-card-body">
              {isEditing ? (
                <>
                  <p><strong>Name :</strong> <input type="text" name="fullName" value={editableData.fullName} onChange={handleChange} /></p>
                  <p><strong>Email :</strong> {userData.emailAddress}</p> {/* Not editable */}
                  <p><strong>Date of Birth :</strong> <input type="date" name="dateOfBirth" value={editableData.dateOfBirth} onChange={handleChange} /></p>
                  <p><strong>Age :</strong> <input type="number" name="age" value={editableData.age} onChange={handleChange} /></p>
                  <p><strong>Gender :</strong> <input type="text" name="gender" value={editableData.gender} onChange={handleChange} /></p>
                  <p><strong>Phone Number :</strong> <input type="text" name="phoneNumber" value={editableData.phoneNumber} onChange={handleChange} /></p>
                  <p><strong>Address :</strong> <input type="text" name="currentAddress" value={editableData.currentAddress} onChange={handleChange} /></p>
                  <p><strong>Marital Status :</strong> <input type="text" name="maritalStatus" value={editableData.maritalStatus} onChange={handleChange} /></p>
                  <button className="btn btn-success" onClick={handleSave}><FaSave /> Save</button>
                </>
              ) : (
                <>
                  <p><strong>Name :</strong> {userData.fullName} <FaEdit onClick={handleEdit} style={{ cursor: 'pointer', color: '#007bff' }} /></p>
                  <p><strong>Email :</strong> {userData.emailAddress}</p> {/* Not editable */}
                  <p><strong>Date of Birth :</strong> {userData.dateOfBirth}</p>
                  <p><strong>Age :</strong> {userData.age}</p>
                  <p><strong>Gender :</strong> {userData.gender}</p>
                  <p><strong>Phone Number :</strong> {userData.phoneNumber}</p>
                  <p><strong>Address :</strong> {userData.currentAddress}</p>
                  <p><strong>Marital Status :</strong> {userData.maritalStatus}</p>
                </>
              )}
            </div>
          </div>
          <div id="account-details" className="dashboard-card">
            <h3>Account Details</h3>
            <div className="dashboard-card-body">
              <p><strong>Account Number :</strong> {userData.bankAcNo}</p>
              <p><strong>Account Type :</strong> {userData.accountType}</p>
              <p><strong>Balance :</strong> {userData.initialDepositAmount}</p>
            </div>
          </div>
          <div id="transactions" className="dashboard-card">
            <h3>Recent Transactions</h3>
            <div className="dashboard-card-body">
              {/* Render a list or table of recent transactions */}
            </div>
          </div>
          <div id="settings" className="dashboard-card">
            <h3>Settings</h3>
            <div className="dashboard-card-body">
              {/* Add settings options */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
