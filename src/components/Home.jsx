// src/components/Home.js
import React, { useEffect, useState } from 'react';
import '../index.css'; // Ensure this is the path to your CSS file
import Navbar from './Navbar';

export const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIURL = 'http://localhost:3030/XXIntelBankingProject/Intel-Banking';

  const user = JSON.parse(localStorage.getItem('user'));
  const uid = user ? user.regID : null;

  useEffect(() => {
    if (!uid) {
      setError(new Error('User not found in local storage. Please sign in again.'));
      setLoading(false);
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${APIURL}/All-accounts/${uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [uid]);

  const handleAccountSelect = (bankAcNo) => {
    localStorage.setItem('accno', JSON.stringify(bankAcNo));
    // Redirect to the desired page or perform any operation with the selected account
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-box">
          <h1 className="home-title">Welcome to the Banking App</h1>
          <p className="home-text">You have successfully signed in!</p>
          {accounts.length > 0 ? (
            <>
              <h2 className="home-subtitle">Your Accounts</h2>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Account Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{account.bankAcNo}</td>
                      <td>
                        <button 
                          className="btn btn-primary" 
                          onClick={() => handleAccountSelect(account.bankAcNo)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="home-text">Please create an account.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
