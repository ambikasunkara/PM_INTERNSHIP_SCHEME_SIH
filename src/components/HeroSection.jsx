import React from "react";

const HeroSection = ({ setCurrentPage }) => {
  return (
    <section
      className="relative text-center flex flex-col items-center justify-center py-28 bg-gray-50 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://your-pm-photo-link-here.jpg')", // replace with your PM photo URL
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Bharat PM Internship
        </h1>
        <p className="text-xl italic text-gray-200 mb-8 drop-shadow-md">
          "Internships are stepping stones to your future. Learn, explore, and
          discover your true potential."
        </p>
        <button
          onClick={() => setCurrentPage("find")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Find Your Dream Internship
        </button>
      </div>
    </section>
  );
};

export default HeroSection;