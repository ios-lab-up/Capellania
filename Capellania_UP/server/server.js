const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./config/database');  // Configuración de la base de datos
const { authenticateToken, authorizeCapellan } = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API corriendo');
});

// Login - Autenticación
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    if (user.role !== 'capellan') {
      return res.status(403).json({ error: 'Acceso denegado. No eres un capellán.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: `Error al iniciar sesión: ${error.message}` });
  }
});

// Rutas protegidas para capellanes

// Crear una nueva misa con tipo
app.post('/api/masses', authenticateToken, authorizeCapellan, async (req, res) => {
  const { date, time, description, type } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO masses (date, time, description, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [date, time, description, type]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear la misa:', error);
    res.status(500).json({ error: `Error al crear la misa: ${error.message}` });
  }
});

// Crear un nuevo evento con tipo
app.post('/api/events', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, date, description, type } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, description, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, description, type]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: `Error al crear el evento: ${error.message}` });
  }
});

// Crear un nuevo aviso
app.post('/api/notices', authenticateToken, authorizeCapellan, async (req, res) => {
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

// Crear un nuevo newsletter con imagen
app.post('/api/newsletters', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, imageUrl, content } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO newsletters (title, image_url, content) VALUES ($1, $2, $3) RETURNING *',
      [title, imageUrl, content]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el newsletter:', error);
    res.status(500).json({ error: `Error al crear el newsletter: ${error.message}` });
  }
});

// Rutas públicas para obtener datos

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

// Rutas protegidas para eliminar datos

// Eliminar una misa
app.delete('/api/masses/:id', authenticateToken, authorizeCapellan, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM masses WHERE id = $1', [id]);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error al eliminar la misa:', error);
    res.status(500).json({ error: 'Error al eliminar la misa' });
  }
});

// Eliminar un evento
app.delete('/api/events/:id', authenticateToken, authorizeCapellan, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

// Eliminar un aviso
app.delete('/api/notices/:id', authenticateToken, authorizeCapellan, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM notices WHERE id = $1', [id]);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error al eliminar el aviso:', error);
    res.status(500).json({ error: 'Error al eliminar el aviso' });
  }
});

// Eliminar un newsletter
app.delete('/api/newsletters/:id', authenticateToken, authorizeCapellan, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM newsletters WHERE id = $1', [id]);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error al eliminar el newsletter:', error);
    res.status(500).json({ error: 'Error al eliminar el newsletter' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
