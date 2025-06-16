import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoute from './routes/jobRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Allow both localhost and deployed Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://job-portel-qknq.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Routes
app.use('/api/jobs', jobRoute);

// ✅ 404 fallback
app.use((_, res) => res.status(404).json({ message: 'Not found' }));

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// made by manav
