// server/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Sincroniza la base de datos y crea un usuario de ejemplo
sequelize.sync().then(async () => {
  const hashedPassword = bcrypt.hashSync('adminpass', 10);
  await User.findOrCreate({ where: { username: 'admin' }, defaults: { password: hashedPassword, role: 'admin' } });
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Credenciales incorrectas' });
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware de autorización para admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403); // Forbidden
  }
  next();
};

// Ruta protegida del dashboard (solo para admin)
app.get('/api/dashboard', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: 'Bienvenido al dashboard de admin' });
});

// Ruta pública
app.get('/api/public', (req, res) => {
  res.json({ message: 'Esta es una página pública' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
