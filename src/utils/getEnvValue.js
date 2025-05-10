import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

export const getEnvValue = (key, defaultValue) => {
  const value = process.env[key];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing enviroment variable ${key}`);
};
