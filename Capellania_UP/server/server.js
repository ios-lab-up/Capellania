const express = require('express');
const cors = require('cors');
const pool = require('./config/database');  
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API corriendo');
});

// Obtener todas las misas
app.get('/api/masses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM masses');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las misas:', error);
    res.status(500).json({ error: 'Error al obtener las misas' });
  }
});

// Crear una nueva misa
app.post('/api/masses', async (req, res) => {
  const { date, time, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO masses (date, time, description) VALUES ($1, $2, $3) RETURNING *',
      [date, time, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear la misa:', error);
    res.status(500).json({ error: `Error al crear la misa: ${error.message}` });
  }
});

// Obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

// Crear un nuevo evento
app.post('/api/events', async (req, res) => {
  const { title, date, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, description) VALUES ($1, $2, $3) RETURNING *',
      [title, date, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: `Error al crear el evento: ${error.message}` });
  }
});

// Obtener todos los avisos
app.get('/api/notices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notices');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los avisos:', error);
    res.status(500).json({ error: 'Error al obtener los avisos' });
  }
});

// Crear un nuevo aviso
app.post('/api/notices', async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO notices (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el aviso:', error);
    res.status(500).json({ error: `Error al crear el aviso: ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
