const db = require('../config/db');

// 📌 Student submits a claim
exports.claimItem = (req, res) => {
  const { item_id, student_name, student_contact, message } = req.body;

  if (!item_id || !student_name || !student_contact || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // First insert into claims table
  const insertSql = `
    INSERT INTO claims (item_id, student_name, student_contact, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertSql, [item_id, student_name, student_contact, message], (err) => {
    if (err) return res.status(500).json(err);

    // ✅ Then update the item's status to "Claimed"
    const updateSql = 'UPDATE items SET status = "Claimed" WHERE id = ?';
    db.query(updateSql, [item_id], (updateErr) => {
      if (updateErr) return res.status(500).json(updateErr);

      res.json({ message: 'Claim submitted successfully. Item marked as Claimed.' });
    });
  });
};

// 📌 Admin fetches all claims
exports.getAllClaims = (req, res) => {
  const sql = `
    SELECT c.*, i.name AS item_name
    FROM claims c
    JOIN items i ON c.item_id = i.id
    ORDER BY c.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// 📌 Admin updates claim status (Pending, Approved, Rejected)
exports.updateClaimStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  db.query('UPDATE claims SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: `Claim marked as ${status}` });
  });
};
