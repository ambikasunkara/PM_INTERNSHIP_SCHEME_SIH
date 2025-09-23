const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bharat_internship",
  password: "yourpassword",
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB Connection Error", err));

module.exports = pool;