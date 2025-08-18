import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import './firebase';
import authRouter from './routes/auth';
import jobsRouter from './routes/jobs';
import seekersRouter from './routes/seekers';
import uploadsRouter from './routes/uploads';
import imagesRouter from './routes/images';

const app = express();

const defaultAllowedOrigins = [
  'http://localhost:32100',
  'http://localhost:3000',
  'capacitor://localhost',
  'http://localhost',
  'https://localhost',
  'https://neeiz-app.lslly.com',
  'https://neeiz-web.lslly.com',
  'https://neeiz-01.web.app',
  'https://neeiz-01.firebaseapp.com',
  'https://www.neeiz.com',
  'https://neeiz.com',
];

const allowedOrigins = (process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
  : defaultAllowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/.test(origin);
      if (allowedOrigins.includes(origin) || isLocalhost) return callback(null, true);
      return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  })
);

// Apply JSON parser only for non-multipart requests so it won't consume multipart bodies
app.use((req, res, next) => {
  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (contentType.startsWith('multipart/form-data')) {
    return next();
  }
  return express.json()(req, res, next);
});

// Routers
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/seekers', seekersRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/images', imagesRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Neeiz API is running!' });
});

export default app;


