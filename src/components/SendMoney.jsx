// src/components/SendMoney.jsx
import React, { useState } from 'react';
import '../index.css'; // Import your CSS file for styling
import Navbar from './Navbar';

export const SendMoney = () => {
   const accno = JSON.parse(localStorage.getItem('accno'));
//    console.log(typeof(accno));
   const [formData, setFormData] = useState({
    accountNumber: accno,
    reciverAccNo: '',
    transactionType: '',
    transactionDate: '',
    transactionAmount: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState('');

  const APIURL='http://localhost:3030/XXIntelBankingProject/Intel-Banking/send-money';
  const user = JSON.parse(localStorage.getItem('user'));
    const uid = user.regID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.transactionAmount || formData.transactionAmount <= 0) newErrors.transactionAmount = 'Transaction amount must be greater than 10';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      try {
        // http://localhost:3030/Intel-Banking/send-money?senderAccountNo=1234567890&receiverAccountNo=0987654321&amount=1000.00&uid=22

        const response = await fetch(`${APIURL}?senderAccountNo=${formData.accountNumber}&receiverAccountNo=${formData.reciverAccNo}&amount=${formData.transactionAmount}&uid=${uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.text();
        setSubmitted(result);
        console.log('Transaction successful:', result);
        
      } catch (error) {
        console.error('Error during transaction:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return ( <>
  <Navbar />
    <div className="auth-container">
      <div className="auth-box auth-box3">
        <h2 className="auth-title">Send Money</h2>
        {submitted && <div className="auth-success">{submitted}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Your Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Sender's Account Number"
              value={accno}
              disabled={true}
              onChange={handleChange}
            />
            {errors.accountNumber && <div className="auth-error">{errors.accountNumber}</div>}
          </div>
          <div className="auth-group">
            <label>Receiver's Account Number</label>
            <input
              type="text"
              name="reciverAccNo"
              placeholder="Receiver's Account Number"
              value={formData.reciverAccNo}
              onChange={handleChange}
            />
            {errors.reciverAccNo && <div className="auth-error">{errors.reciverAccNo}</div>}
          </div>
          <div className="auth-group">
            <label>Transaction Type</label>
            <input
              type="text"
              name="transactionType"
              placeholder="Transaction Type"
              value={formData.transactionType}
              onChange={handleChange}
            />
            {errors.transactionType && <div className="auth-error">{errors.transactionType}</div>}
          </div>
          <div className="auth-group">
            <label>Transaction Date</label>
            <input
              type="datetime-local"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
            />
            {errors.transactionDate && <div className="auth-error">{errors.transactionDate}</div>}
          </div>
          <div className="auth-group">
            <label>Transaction Amount</label>
            <input
              type="number"
              name="transactionAmount"
              placeholder="Transaction Amount"
              value={formData.transactionAmount}
              onChange={handleChange}
            />
            {errors.transactionAmount && <div className="auth-error">{errors.transactionAmount}</div>}
          </div>
          <div className="auth-buttons">
            <button type="submit" className="auth-button">Send</button>
          </div>
        </form>
      </div>
    </div></>
  );
};


