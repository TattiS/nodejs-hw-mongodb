import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getEnvValue } from './utils/getEnvValue.js';
import router from './routes/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

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
  app.use(cookieParser());

  //app.use('/contacts', router);
  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};
