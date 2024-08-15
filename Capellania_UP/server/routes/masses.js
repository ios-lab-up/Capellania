// server/routes/masses.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Mass = require('../models/Mass');

const router = express.Router();

router.get('/', async (req, res) => {
  const masses = await Mass.findAll();
  res.json(masses);
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { date, time, description } = req.body;
  const newMass = await Mass.create({ date, time, description });
  res.json(newMass);
});

module.exports = router;
