import React from "react";

const companies = [
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Deloitte_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Walmart_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.png",
];

const PartnerCompanies = () => {
  return (
    <section className="py-12 bg-white">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Our Partner Industries
      </h3>
      <div className="flex space-x-6 overflow-x-auto px-6 py-4">
        {companies.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Company ${i}`}
            className="h-16 w-auto flex-shrink-0 transition transform hover:scale-110"
          />
        ))}
      </div>
    </section>
  );
};

export default PartnerCompanies;