// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Signup } from './components/SignUp';
import { Signin } from './components/SignIn';
import { Home } from './components/Home';
// import { Navbar } from './components/Navbar'; // Import the Navbar
import { About } from './components/About'; // Import the Navbar
import { AccountForm } from './components/AccountForm';
import { ContactUs } from './components/ContactUs';
import { Dashboard } from './components/Dashboard';
import { SendMoney } from './components/SendMoney';
import { ShowTransactions } from './components/ShowTransactions';


const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/create-account" element={<AccountForm />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/all-transactions" element={<ShowTransactions />} />
        </Routes>
      </Router>
   
  );
};

export default App;
