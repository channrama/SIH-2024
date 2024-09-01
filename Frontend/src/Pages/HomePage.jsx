// HomePage.jsx
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from "../Components/Layout";

const HomePage = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const token = localStorage.getItem('token');

  return (
    <Layout>
      <div className="container mx-auto px-4 w-screen py-6 flex flex-col md:flex-row bg-green-50">
        {/* Slider Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 relative">
          <Slider {...settings}>
          <div className="relative h-64 md:h-80">
              <img src="/images/agri5.jpeg" alt="Slide 1" className="w-full h-full object-cover rounded-lg shadow-lg" />
              {/* <div className="absolute inset-0 flex items-center justify-center text-green text-3xl font-bold p-4 rounded-lg">
                <span>Welcome to AgriSite</span>
              </div> */}
            </div>
            <div className="relative h-64 md:h-80">
              <img src="/images/agri2.jpg" alt="Slide 2" className="w-full h-full object-cover rounded-lg shadow-lg" />
              {/* <div className="absolute inset-0 flex items-center justify-center text-green text-3xl font-bold p-4 rounded-lg">
                <span>Welcome to AgriSite</span>
              </div> */}
            </div>
            <div className="relative h-64 md:h-80">
              <img src="/images/agri1.jpg" alt="Slide 3" className="w-full h-full object-cover rounded-lg shadow-lg" />
              {/* <div className="absolute inset-0 flex items-center justify-center text-green text-3xl font-bold p-4 rounded-lg">
                <span>Welcome to AgriSite</span>
              </div> */}
            </div>
          </Slider>
        </div>

        {/* Welcome Text Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <div className="text-center md:text-left px-4">
            <h2 className="text-4xl font-bold mb-4 text-green-800">Welcome to AgriSite</h2>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              AgriSite is your go-to platform for everything related to agriculture. Discover fresh produce, connect with farmers, and stay updated with real-time prices. Explore our site to learn more about the agricultural world and find the best deals.
            </p>
            <a href="/about" className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out mr-4">
              Learn More
            </a>
            {!token &&<a href="/create-account" className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
              Get Started
            </a>}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-12 bg-green-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-green-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-3 text-green-700">Farmers</h3>
              <p className="text-gray-600 mb-4">Connect with local farmers and discover fresh produce directly from the source.</p>
              <a href="/farmers" className="text-green-600 hover:underline">Learn More</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-3 text-green-700">Buyers</h3>
              <p className="text-gray-600 mb-4">Find and purchase the best agricultural products at competitive prices.</p>
              <a href="/contractors" className="text-green-600 hover:underline">Learn More</a>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-3 text-green-700">Real-Time Price</h3>
              <p className="text-gray-600 mb-4">Stay updated with the latest prices of agricultural products in real-time.</p>
              <a href="/realtimeprice" className="text-green-600 hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
