const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer token

  if (!token) return res.status(403).json({ message: 'Token missing or invalid' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' });
  }
};
