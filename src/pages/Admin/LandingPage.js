import React from 'react';
import HeaderLd from '../../components/HeaderLd';
import Footer from '../../components/Footer';

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <HeaderLd />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/photoLanding.jpg')` }}
      >
        <div className="text-center text-white p-6 rounded-lg bg-black bg-opacity-50">
          <h1 className="text-5xl font-bold">Welcome to Innovative Platform</h1>
          <p className="mt-4 text-lg">
            Predict and improve your academic performance with intelligent tools.
          </p>
          <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Feature 1 */}
          <div className="text-center">
            <img
              src="/prev.jpg"
              alt="Predictions"
              className="rounded-lg shadow-md mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-bold">Analysis and Predictions</h3>
            <p className="text-gray-600 mt-2">
              Track your academic performance and anticipate your results with our predictive tools.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <img
              src="/recomm.png"
              alt="Recommendations"
              className="rounded-lg shadow-md mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-bold">Intelligent Recommendations</h3>
            <p className="text-gray-600 mt-2">
              Get personalized suggestions to optimize your time and improve your results.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <img
              src="/collab.jpg"
              alt="Collaboration"
              className="rounded-lg shadow-md mb-4 w-full h-64 object-cover"
            />
            <h3 className="text-xl font-bold">Collaborative Groups</h3>
            <p className="text-gray-600 mt-2">
              Join thematic groups and share resources to excel as a team.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">About the Application</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our platform is designed to help students predict their academic performance,
          improve their results with personalized recommendations, and join groups for effective collaboration.
        </p>
        <div className="flex justify-center mt-8">
          <img
            src="/But.jpg"
            alt="About"
            className="rounded-lg shadow-lg max-w-lg h-auto"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm text-center">
            <p className="italic text-gray-600">
              "This platform helped me better organize my time and achieve my academic goals."
            </p>
            <h4 className="mt-4 font-bold">- Computer Science Student</h4>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm text-center">
            <p className="italic text-gray-600">
              "The predictions are incredibly accurate. It changed the way I learn."
            </p>
            <h4 className="mt-4 font-bold">- Management Student</h4>
          </div>
        </div>
      </section>

      {/* Footer with Contact */}
      <Footer />
    </div>
  );
};

export default LandingPage;
