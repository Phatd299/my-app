const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('🌍 Welcome to My Node API!');
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'UP', time: new Date() });
});

// Sample data route
router.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  res.json(users);
});

module.exports = router;
