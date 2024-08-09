import React from 'react';
import Navbar from './Navbar';

export const About = () => {
  return (<>
    <Navbar />
    <div className="container mt-4  ">
      <div className='about'>
        <h1>About Us</h1>
        <p className='home-text'>
          Welcome to our <span>Intel-banking</span> application. We are committed to providing you with the best banking experience with a focus on security, usability, and customer satisfaction.
          <br />

          Our team is dedicated to creating a user-friendly platform where you can manage your finances effortlessly. Whether you're looking to open a new account, track your transactions, or get detailed information about your account, our application is designed with you in mind.
          <br />
          Thank you for choosing our services. If you have any questions or need assistance, feel free to reach out to our support team.

          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, alias? Debitis, esse! Sed eveniet accusamus assumenda sequi saepe culpa qui quas repudiandae explicabo laudantium nihil, neque cupiditate veniam sunt quidem? Exercitationem praesentium ex dolore voluptas nam explicabo a impedit? Soluta quibusdam molestiae nesciunt nihil beatae nam, tenetur earum nulla recusandae.</p>
      </div>
    </div>
  </>
  );
};


