// server/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

// Rutas API
app.get('/api/contents', async (req, res) => {
  try {
    const contents = await pool.query('SELECT * FROM contents');
    res.json(contents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/api/contents', async (req, res) => {
  try {
    const { title, body } = req.body;
    const newContent = await pool.query(
      'INSERT INTO contents (title, body) VALUES($1, $2) RETURNING *',
      [title, body]
    );
    res.json(newContent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
