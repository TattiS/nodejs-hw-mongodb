import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvValue } from './utils/getEnvValue.js';
//import { getContacts, getContactById } from './controllers/contacts.js';
import { router } from './routes/contacts.js';

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

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
    next();
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};
