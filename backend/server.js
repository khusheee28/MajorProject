const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const campaignRoutes = require('./routes/campaigns');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection and Sync
sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => console.log('Database connected and synced'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/campaigns', campaignRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 