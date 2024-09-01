import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// Optional: for additional custom styling

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t  border-gray-300 py-6 my-2">
      {/* Social Media Links */}
      <div className="flex justify-center space-x-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-green-700"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-green-700"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-green-700"
        >
          <FaInstagram size={24} />
        </a>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} AgriSite. All rights reserved.
      </div>
    </footer>
  );
}
