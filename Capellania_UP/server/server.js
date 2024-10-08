const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, authorizeCapellan } = require('./middleware/auth');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

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
    const user = await prisma.users.findUnique({
      where: { email},
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

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
    const newMass = await prisma.masses.create({
      data: { date, time, description, type }
    });
    res.json(newMass);
  } catch (error) {
    console.error('Error al crear la misa:', error);
    res.status(500).json({ error: `Error al crear la misa: ${error.message}` });
  }
});

// Crear un nuevo evento con tipo
app.post('/api/events', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, date, description, type } = req.body;

  try {
    const newEvent = await prisma.events.create({
      data: { title, date, description, type }
    });
    res.json(newEvent);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: `Error al crear el evento: ${error.message}` });
  }
});

// Crear un nuevo aviso
app.post('/api/notices', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNotice = await prisma.notices.create({
      data: { title, content }
    });
    res.json(newNotice);
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    res.status(500).json({ error: `Error al crear la noticia: ${error.message}` });
  }
});



app.post('/api/readings', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newReading = await prisma.readings.create({
      data: { title, content }
    });
    res.json(newReading);
  } catch (error) {
    console.error('Error al crear la lectura:', error);
    res.status(500).json({ error: `Error al crear la lectura: ${error.message}` });
  }
});

app.post('/api/readings', authenticateToken, authorizeCapellan, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newReading = await prisma.newsletters.create({
      data: { title, content }
    });
    res.json(newReading);
  } catch (error) {
    console.error('Error al crear la lectura:', error);
    res.status(500).json({ error: `Error al crear la lectura: ${error.message}` });
  }
});


app.get('/api/masses', async (req, res) => {
  try {
    const masses = await prisma.masses.findMany();
    res.json(masses);
  } catch (error) {
    console.error('Error al obtener las misas:', error);
    res.status(500).json({ error: 'Error al obtener las misas' });
  }
});

// Obtener todos los eventos
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.events.findMany();
    res.json(events);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

// Obtener todos los avisos
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await prisma.notices.findMany();
    res.json(notices);
  } catch (error) {
    console.error('Error al obtener los avisos:', error);
    res.status(500).json({ error: 'Error al obtener los avisos' });
  }
});

app.get('/api/readings', async (req, res) => {
  try {
    const readings = await prisma.readings.findMany();
    res.json(readings);
  } catch (error) {
    console.error('Error al obtener las lecturas:', error);
    res.status(500).json({ error: 'Error al obtener las lecturas' });
  }
});


// Eliminar una misa
app.delete('/api/masses/:id', authenticateToken, authorizeCapellan, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.masses.delete({
      where: { id: parseInt(id) }
    });
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
    await prisma.events.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

// Eliminar un aviso
app.get('/api/notices/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.notices.get({
      where: { id: parseInt(id) }
    });
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
    await prisma.newsletters.delete({
      where: { id: parseInt(id) }
    });
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