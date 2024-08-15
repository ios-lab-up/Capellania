// server/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const massesRoutes = require('./routes/masses');
const eventsRoutes = require('./routes/events');
const readingsRoutes = require('./routes/readings');
const noticesRoutes = require('./routes/notices');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/masses', massesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/readings', readingsRoutes);
app.use('/api/notices', noticesRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
  });
});
