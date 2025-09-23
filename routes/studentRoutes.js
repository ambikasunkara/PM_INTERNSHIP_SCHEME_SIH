const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage config for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("resume"), (req, res) => {
  const { name, skills, location, category, past_participation } = req.body;

  const studentData = {
    name,
    skills: JSON.parse(skills), // since frontend sends JSON string
    resume: req.file ? req.file.filename : null,
    location,
    category,
    past_participation: past_participation === "true",
  };

  // TODO: Save studentData to database (MongoDB/MySQL etc.)
  console.log("New Student Registered:", studentData);

  res.json({ message: "Student registered successfully", student: studentData });
});

module.exports = router;
