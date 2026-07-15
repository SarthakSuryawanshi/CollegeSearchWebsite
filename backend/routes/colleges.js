const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;
  const colleges = db.prepare('SELECT * FROM colleges LIMIT ? OFFSET ?').all(limit, offset);
  res.json(colleges);
});

router.get('/search', (req, res) => {
  const { q, city, course, type } = req.query;
  let query = 'SELECT * FROM colleges WHERE 1=1';
  const params = [];

  if (q) {
    query += ' AND name LIKE ?';
    params.push(`%${q}%`);
  }
  if (city) {
    query += ' AND city LIKE ?';
    params.push(`%${city}%`);
  }
  if (course) {
    query += ' AND courses LIKE ?';
    params.push(`%${course}%`);
  }
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }

  const results = db.prepare(query).all(...params);
  res.json(results);
});

router.get('/:id', (req, res) => {
  const college = db.prepare('SELECT * FROM colleges WHERE id = ?').get(req.params.id);
  if (!college) return res.status(404).json({ error: 'College not found' });
  res.json(college);
});

module.exports = router;
