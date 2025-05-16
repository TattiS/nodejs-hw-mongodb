import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvValue } from './utils/getEnvValue.js';
import { router } from './routes/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = parseInt(getEnvValue('PORT', 3000));

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', router);
  app.get('/', (req, res) => {
    res.json('Hello from the server!');
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};
