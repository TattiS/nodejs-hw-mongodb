import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    initMongoConnection();
    startServer();
  } catch (error) {
    console.error('Error during bootstrap');
    throw new Error(error.message);
  }
};

bootstrap();
