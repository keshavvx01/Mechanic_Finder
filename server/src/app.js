import cors from 'cors';
import express from 'express';
import mechanicsRoutes from './routes/mechanics.routes.js';
import requestsRoutes from './routes/requests.routes.js';

const app = express();
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'pitstop-pulse-api',
    now: new Date().toISOString(),
  });
});

app.use('/api/mechanics', mechanicsRoutes);
app.use('/api/assistance-requests', requestsRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.statusCode || 500).json({
    error: error.message || 'Internal server error',
  });
});

export { app };
