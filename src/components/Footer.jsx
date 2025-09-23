import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-10 text-center text-white">
      <div className="flex flex-col items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/0/0f/Smart_India_Hackathon_Logo.png"
          alt="SIH Logo"
          className="w-20 mb-4 animate-bounce"
        />
        <h3 className="text-2xl font-bold">Smart India Hackathon</h3>
        <p className="mt-2 text-gray-200">
          Empowering Innovation • Driving Nation Building
        </p>
      </div>
    </footer>
  );
};

export default Footer;