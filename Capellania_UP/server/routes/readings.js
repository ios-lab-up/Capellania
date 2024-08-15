// server/routes/readings.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Reading = require('../models/Reading');

const router = express.Router();

router.get('/', async (req, res) => {
  const readings = await Reading.findAll();
  res.json(readings);
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, content } = req.body;
  const newReading = await Reading.create({ title, content });
  res.json(newReading);
});

module.exports = router;
