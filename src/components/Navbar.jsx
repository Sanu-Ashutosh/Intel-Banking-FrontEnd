// src/components/Navbar.js
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import '../index.css'; // Import your CSS file for styling

export const Navbar = () => {
  let navigate=useNavigate();

  let handelImage =()=>{
    navigate('/dashboard'); // Navigate to the Dashboard page
  }

  let handelSignOut=()=>{
    localStorage.removeItem('accno')
    localStorage.removeItem('user')
    navigate('/signin')
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">Intel-Banking</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li className="dropdown">
          <button className="dropbtn">Services</button>
          <div className="dropdown-content">
            <Link to="/create-account">Create Account</Link>
            <Link to="/all-transactions">Show Transactions</Link>
            <Link to="/send-money">Send Money</Link>
            <Link to="/debit-cards">Debit Cards</Link>
          </div>
        </li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
      </ul>
      <div className="navbar-right">
        <button className="signout-button" onClick={handelSignOut}>Sign Out</button>
        <img src="/path/to/user-logo.png" alt="User Logo" className="user-logo" onClick={handelImage} />
      </div>
    </nav>
  );
};

export default Navbar;
