import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import router from './routes/authRoutes.js';
import connectDB from './config/connect.js';

const PORT = process.env.PORT || 4000;

const app = express();

const allowedOrigins = [
  'http://localhost:5173',               // local React dev
  'https://your-frontend-domain.com'     // production frontend
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router);

// Simple root route so Render detects the service
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });
