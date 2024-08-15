// server/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Asegúrate de que DATABASE_URL esté definida en .env
});

module.exports = pool;
