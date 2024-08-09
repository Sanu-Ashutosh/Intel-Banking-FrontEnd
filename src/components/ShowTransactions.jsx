// src/components/ShowTransactions.jsx
import React, { useEffect, useState } from 'react';
import '../index.css'; // Import your CSS file for styling
import Navbar from './Navbar';

export const ShowTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIURL = 'http://localhost:3030/XXIntelBankingProject/Intel-Banking';

  const accno = JSON.parse(localStorage.getItem('accno'));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${APIURL}/all-transactions/${accno}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accno]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Transaction History</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Transaction ID</th>
              {/* <th scope="col">Sender Account</th> */}
              <th scope="col">Receiver Account</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{transaction.transactionId}</td>
                {/* <td>{transaction.accountNumber}</td> */}
                <td>{transaction.reciverAccNo}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.transactionAmount}</td>
                <td>{transaction.transactionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowTransactions;
