import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-10 px-6 text-white">
      <div className="container mx-auto">
        {/* Logo and Newsletter */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold">Innovative Platform</h1>
          <p className="mt-2 text-gray-300">Subscribe to our newsletter</p>
          <form className="mt-4 flex justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Form */}
        <div id="contact" className="text-center mb-10">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <form className="max-w-md mx-auto">
            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              />
            </div>
            {/* Message */}
            <div className="mb-4">
              <textarea
                placeholder="Your message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
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
