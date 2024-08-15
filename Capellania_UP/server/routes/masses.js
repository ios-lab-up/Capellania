// server/routes/masses.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const pool = require('../config/db');

const router = express.Router();

// Obtener todas las misas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM masses');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las misas' });
  }
});

// Crear una nueva misa
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { date, time, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO masses (date, time, description) VALUES ($1, $2, $3) RETURNING *',
      [date, time, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la misa' });
  }
});

module.exports = router;
