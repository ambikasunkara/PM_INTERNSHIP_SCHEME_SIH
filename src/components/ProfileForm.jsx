import React, { useState } from "react";

export default function ProfileForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    college: "",
    skills: "",
    location: "",
    sector: "",
    pastParticipation: 0
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <form
      className="bg-white p-6 rounded-xl shadow-lg w-full md:w-96 flex-shrink-0"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <h3 className="text-xl font-bold mb-4">Personal & Academic Details</h3>
      <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="contact" placeholder="Contact Info" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="college" placeholder="College/University" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      
      <h3 className="text-xl font-bold mt-4 mb-2">Skills & Preferences</h3>
      <input name="skills" placeholder="Skills (Python, ML, etc.)" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="location" placeholder="Preferred Location" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="sector" placeholder="Sector of Interest" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="number" name="pastParticipation" placeholder="Past participation count" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>

      <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded mt-4">Find Internships</button>
    </form>
  );
}