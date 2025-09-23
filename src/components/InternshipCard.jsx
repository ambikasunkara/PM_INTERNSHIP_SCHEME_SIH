import React from "react";

export default function InternshipCard({ title, companyName, location, score }) {
  return (
    <div className="border p-4 rounded mb-4 bg-white shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{companyName} • {location}</p>
      <p className="text-green-600 font-bold">Match Score: {score}</p>
    </div>
  );
}