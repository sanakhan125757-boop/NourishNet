const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const seedAdmin = require('./utils/seedAdmin');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
  // Seed Admin User
  seedAdmin();
});

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/*all', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'))
  );
} else {
  // Base route for development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
