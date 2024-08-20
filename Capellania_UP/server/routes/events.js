// server/routes/events.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, date, description } = req.body;
  const newEvent = await Event.create({ title, date, description, type });
  res.json(newEvent);
});

module.exports = router;
