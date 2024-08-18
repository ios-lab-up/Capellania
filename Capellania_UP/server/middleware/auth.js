const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user;
    next();
  });
};

const authorizeCapellan = (req, res, next) => {
  if (req.user.role !== 'capellan') {
    return res.sendStatus(403); // Forbidden, not a capellan
  }
  next();
};

module.exports = { authenticateToken, authorizeCapellan };
