import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import axios from 'axios';

import router from './routes/authRoutes.js';
import connectDB from './config/connect.js';

const PORT = process.env.PORT || 4000;

// Connect to DB
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',                 // local React dev
  'https://your-frontend-domain.com'       // production frontend
];

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', router);

// Start server
app.listen(PORT, () => {
  console.log('Server started on PORT', PORT);

  const url = `https://anandutsav-backend.onrender.com`;
  const interval = 3000000; // 30 seconds

  setInterval(() => {
    axios
      .get(url)
      .then(() => console.log('Website reloaded'))
      .catch((err) => console.error('Error:', err.message));
  }, interval);
});
