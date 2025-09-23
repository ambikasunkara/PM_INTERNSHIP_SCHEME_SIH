const { addStudent } = require("../models/studentModel");

const submitStudent = async (req, res) => {
  try {
    const student = await addStudent(req.body);
    res.status(201).json({ success: true, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { submitStudent };