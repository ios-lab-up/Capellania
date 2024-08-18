const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeCapellan = (req, res, next) => {
  if (req.user.role !== 'capellan') {
    return res.status(403).json({ error: 'Acceso denegado. No tienes permisos suficientes.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeCapellan };
