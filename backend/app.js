const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminRoutes = require('./routes/adminRoutes');
const claimRoutes = require('./routes/claimRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));
app.use('/api/items', itemRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/claims', claimRoutes);


app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
