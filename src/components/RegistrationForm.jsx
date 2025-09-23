import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
  });
  const [resume, setResume] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("resume", resume);

    try {
      const res = await axios.post("http://localhost:5000/api/students/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting registration");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="college" placeholder="College/University" onChange={handleChange} required />
      <input name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required />
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;