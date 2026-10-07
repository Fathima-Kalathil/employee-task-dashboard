require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// Reuse the DB connection (important for serverless on Vercel)
let connection;
app.use(async (req, res, next) => {
  try {
    if (!connection) connection = mongoose.connect(process.env.MONGO_URI);
    await connection;
    next();
  } catch (err) {
    connection = null;
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', auth, require('./routes/employees'));
app.use('/api/tasks', auth, require('./routes/tasks'));
app.use('/api/stats', auth, require('./routes/stats'));

app.use((err, req, res, next) => {
  if (err.code === 11000) return res.status(400).json({ message: 'Email already exists' });
  if (err.name === 'ValidationError')
    return res.status(400).json({ message: Object.values(err.errors)[0].message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' });
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}

module.exports = app;
