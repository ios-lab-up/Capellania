// server/routes/readings.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Reading = require('../models/Reading');

const router = express.Router();

router.get('/', async (req, res) => {
  const news = await News.findAll();
  res.json(news);
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, content } = req.body;
  const newNews = await News.create({ title, content });
  res.json(newNews);
});

module.exports = router;
