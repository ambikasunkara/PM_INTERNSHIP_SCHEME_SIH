// Example: src/components/Navbar.jsx
import React from "react";

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Bharat Internship</h1>
      <div className="space-x-6">
        <button onClick={() => setCurrentPage("home")} className="hover:text-gray-300">Home</button>
        <button onClick={() => setCurrentPage("find")} className="hover:text-gray-300">Find Internship</button>
        <button className="hover:text-gray-300">For Industries</button>
        <button className="bg-white text-blue-900 px-4 py-2 rounded">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;