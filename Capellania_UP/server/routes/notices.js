// server/routes/notices.js
const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const Notice = require('../models/Notice');

const router = express.Router();

router.get('/', async (req, res) => {
  const notices = await Notice.findAll();
  res.json(notices);
});

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { title, content } = req.body;
  const newNotice = await Notice.create({ title, content });
  res.json(newNotice);
});

module.exports = router;
