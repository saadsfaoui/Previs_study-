import React from 'react';
import { Link } from 'react-router-dom'; // Import React Router

const HeaderLd = () => {
  return (
    <header className="bg-gray-100  shadow-md fixed top-0 left-0 w-full z-50">
      <div className=" mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo as a circle */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <h1 className="text-lg font-bold">Innovative Platform</h1>
        </div>

        {/* Navigation */}
        <nav className="ml-auto mr-5">
          <ul className="flex space-x-4">
            <li>
              <a href="#home" className="text-gray-700 hover:text-blue-500 text-sm">Home</a>
            </li>
            <li>
              <a href="#about" className="text-gray-700 hover:text-blue-500 text-sm">About Us</a>
            </li>
            <li>
              <a href="#features" className="text-gray-700 hover:text-blue-500 text-sm">Services</a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-blue-500 text-sm">Contact Us</a>
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-3">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 text-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderLd;
