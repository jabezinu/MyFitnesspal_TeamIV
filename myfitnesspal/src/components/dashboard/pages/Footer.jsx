import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold text-white">SofiFitness</h2>
            <p className="mt-4 text-gray-400 text-sm">
              Your trusted platform for fitness, health, and lifestyle guidance.  
              Stay consistent, stay strong, stay motivated!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400 transition">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition">About Us</a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-400 transition">Services</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 text-2xl">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 text-2xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 text-2xl">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-100 text-2xl">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SofiFitness. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
