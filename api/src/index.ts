import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import './firebase'; // Initialize Firebase Admin
import authRouter from './routes/auth';
import jobsRouter from './routes/jobs';

const app = express();

// Middlewares
const defaultAllowedOrigins = [
  'http://localhost:32100', // Vite dev (app)
  'http://localhost:3000', // Next.js dev (web)
  'capacitor://localhost', // iOS/Android Capacitor
  'http://localhost',
  'https://localhost',
  'https://neeiz-app.lslly.com', // Production App
  'https://neeiz-web.lslly.com', // Production Web (if any)
];

const allowedOrigins = (process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
  : defaultAllowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Neeiz API is running!' 
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 API Server is listening on port ${PORT}`);
});

