const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.reportLostItem = (req, res) => {
  const {
    student_name, student_contact,
    item_name, description, location, date_lost
  } = req.body;

  const image = req.files?.image;

  if (!student_name || !student_contact || !item_name || !description || !location || !date_lost) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let filename = null;

  if (image) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    filename = `${Date.now()}-${image.name}`;
    image.mv(path.join(uploadPath, filename), (err) => {
      if (err) return res.status(500).json(err);
    });
  }

  const sql = `
    INSERT INTO lost_reports
    (student_name, student_contact, item_name, description, location, date_lost, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    student_name, student_contact, item_name,
    description, location, date_lost, filename
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Lost item reported successfully' });
  });
};
