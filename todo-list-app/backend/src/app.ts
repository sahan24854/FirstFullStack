import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', taskRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Taskly API Server',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/api/health',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     Taskly API Server                  ║
║     Running on port ${PORT}               ║
║     Environment: ${process.env.NODE_ENV || 'development'}        ║
║                                        ║
║     http://localhost:${PORT}             ║
║                                        ║
║     Frontend: http://localhost:3000    ║
╚════════════════════════════════════════╝
  `);
});

export default app;
