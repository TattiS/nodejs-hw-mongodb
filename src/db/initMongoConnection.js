import mongoose from 'mongoose';
import { getEnvValue } from '../utils/getEnvValue.js';

export const initMongoConnection = async () => {
  try {
    const { user, pwd, url, db } = {
      user: getEnvValue('MONGODB_USER'),
      pwd: getEnvValue('MONGODB_PASSWORD'),
      url: getEnvValue('MONGODB_URL'),
      db: getEnvValue('MONGODB_DB'),
    };
    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
    await mongoose.connect(connectionString);
    console.log('The Mongodb connection is established successfully');
  } catch (error) {
    console.error('Error initializing MongoDB connection:', error);
    throw new Error(
      'Failed to initialize MongoDB connection: ' + error.message,
    );
  }
};
