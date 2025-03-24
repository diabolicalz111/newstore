"use client";

import React, { useState } from 'react';
import NavigationTabs from "../components/NavigationTabs";
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const serviceId = 'service_fwvyriy'; // Correct service ID
      const templateId = 'template_fzczq69'; // Correct template ID
      const userId = 'Od9xOlVe062ELS4O-'; // Correct user ID

      await emailjs.send(serviceId, templateId, formData, userId);
      setSuccessMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <NavigationTabs />
      <div className="contact-content">
        <div className="contact-left">
          <h1 className="contact-title">Contact Me</h1>
          <p className="contact-description">
            Feel free to reach out for any inquiries about our exclusive jewelry collection.
          </p>
        </div>
        
        <div className="contact-right">
          <h2 className="message-title">Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="contact-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="contact-textarea"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'SUBMIT'}
            </button>
          </form>
          {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
