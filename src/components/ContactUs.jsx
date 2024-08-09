// src/components/ContactUs.jsx
import React, { useState } from 'react';
import '../index.css'; // Ensure this is the path to your CSS file
import Navbar from './Navbar';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Process form submission
    } else {
      setErrors(validationErrors);
    }
  };

  return (<>
  <Navbar />
    <div className="contact-us-container">
      <div className="contact-us-box">
        <h2 className="contact-us-title">Contact Us</h2>
        {submitted && <div className="contact-us-success">Your message has been sent successfully!</div>}
        <form onSubmit={handleSubmit}>
          <div className="contact-us-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="contact-us-error">{errors.name}</div>}
          </div>
          <div className="contact-us-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="contact-us-error">{errors.email}</div>}
          </div>
          <div className="contact-us-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <div className="contact-us-error">{errors.subject}</div>}
          </div>
          <div className="contact-us-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <div className="contact-us-error">{errors.message}</div>}
          </div>
          <div className="contact-us-buttons">
            <button type="submit" className="contact-us-button">Submit</button>
            <button type="button" className="contact-us-button" onClick={() => setFormData({})}>Reset</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
