const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// Get all items (public, with optional search)
exports.getItems = (req, res) => {
  const search = req.query.search;
  let sql = 'SELECT * FROM items';
  let params = [];

  if (search) {
    sql += ' WHERE name LIKE ? OR category LIKE ?';
    const like = `%${search}%`;
    params.push(like, like);
  }

  sql += ' ORDER BY created_at DESC';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Add new found item (admin only)
exports.addItem = (req, res) => {
  const {
    name, description, category, location,
    date_lost // Owner is unknown at submission
  } = req.body;

  const image = req.files?.image;

  if (!name || !description || !category || !location || !date_lost || !image) {
    return res.status(400).json({ message: 'All fields and image are required' });
  }

  const filename = `${Date.now()}-${image.name}`;
  const uploadPath = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

  image.mv(path.join(uploadPath, filename), (err) => {
    if (err) return res.status(500).json(err);

    const sql = `
      INSERT INTO items (name, description, category, location, date_lost, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, description, category, location, date_lost, filename], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Item added successfully' });
    });
  });
};

// Mark item as found (admin only)
exports.updateStatus = (req, res) => {
  const id = req.params.id;
  db.query('UPDATE items SET status = "Found" WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Item marked as Found' });
  });
};

// Delete item (admin only)
exports.deleteItem = (req, res) => {
  const id = req.params.id;

  db.query('SELECT image FROM items WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Item not found' });

    const imagePath = path.join(__dirname, '..', 'uploads', results[0].image);

    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json(err);

      fs.unlink(imagePath, (fsErr) => {
        if (fsErr && fsErr.code !== 'ENOENT') {
          return res.status(500).json({ message: 'Item deleted, image failed to delete' });
        }

        res.json({ message: 'Item and image deleted successfully' });
      });
    });
  });
};
