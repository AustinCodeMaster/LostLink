const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json(err);

    const sql = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hash], (err, result) => {
      if (err) return res.status(500).json({ message: 'Email may already be used', error: err });
      res.json({ message: 'Admin registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      res.json({ message: 'Login successful', token });
    });
  });
};
