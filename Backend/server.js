import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoute from './routes/jobRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Allow Vite frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/api/jobs', jobRoute);

// 404 handler
app.use((_, res) => res.status(404).json({ message: 'Not found' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// made by manav