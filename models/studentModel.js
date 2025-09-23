const pool = require("../config/db");

const addStudent = async (student) => {
  const { name, college, field, year, skills, location, sector } = student;
  const query = `
    INSERT INTO students(name, college, field, year, skills, location, sector)
    VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const values = [name, college, field, year, skills, location, sector];
  const res = await pool.query(query, values);
  return res.rows[0];
};

module.exports = { addStudent };