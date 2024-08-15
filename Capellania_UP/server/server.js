// server/server.js
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
      console.error('Error al crear la misa:', error);  // Agregar log de error más detallado
      res.status(500).json({ error: `Error al crear la misa: ${error.message}` });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
