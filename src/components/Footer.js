import React, { useState } from 'react';
import API from '../services/api'; // Importez votre service Axios pour les requêtes API

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Envoyer les données au backend
      await API.post('/contact', formData);

      // Afficher un message de succès et réinitialiser le formulaire
      setSuccessMessage('Votre message a été envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error.response || error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <footer className="bg-gray-800 py-10 px-6 text-white">
      <div className="mx-auto">
        {/* Contact Form */}
        <div id="contact" className="text-center mb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-500">Contact Us</h2>
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                required
              />
            </div>
            {/* Message */}
            <div className="mb-4">
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                required
              ></textarea>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>

        {/* Bottom Links */}
        <div className="text-center border-t border-gray-600 pt-4">
          <p className="text-sm text-gray-300">
            © 2024 Innovative Platform. All rights reserved. ·{' '}
            <a href="#privacy" className="hover:text-blue-500">Privacy</a> ·{' '}
            <a href="#terms" className="hover:text-blue-500">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
