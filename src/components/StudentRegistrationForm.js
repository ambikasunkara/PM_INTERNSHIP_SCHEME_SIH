import React, { useState } from "react";

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentRegistrationForm;