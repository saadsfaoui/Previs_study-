import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import React Router

const HeaderLd = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex justify-between items-center py-2 px-6 md:px-10">
        {/* Logo as a circle */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <h1 className="text-lg font-bold">UserCentral</h1>
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden md:block">
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

        {/* Buttons for larger screens */}
        <div className="hidden md:flex space-x-3">
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

        {/* Hamburger menu for smaller screens */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 shadow-lg">
          <nav>
            <ul className="flex flex-col space-y-2 p-4">
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
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLd;
