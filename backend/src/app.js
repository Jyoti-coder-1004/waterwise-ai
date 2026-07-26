import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import waterRoutes from './routes/water.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import aiRoutes from './routes/ai.routes.js';
import communityRoutes from './routes/community.routes.js';
import notificationRoutes from './routes/notification.routes.js';

// Import Middlewares
import { notFound, errorHandler } from './middlewares/error.middleware.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Security Middlewares
app.use(helmet());
//app.use(cors({
  //origin: process.env.CLIENT_URL || 'http://localhost:5173',
  //credentials: true,
//}));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://waterwise-bcc8qvgek-jyoti20.vercel.app",
    "https://waterwise-ai-omega.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rate Limiting
app.use('/api', apiLimiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/notifications', notificationRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to WaterWise AI API' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
