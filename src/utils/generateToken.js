import { randomBytes } from 'crypto';

export const generateAccessToken = () => {
  return randomBytes(30).toString('base64');
};
export const generateRefreshToken = () => {
  return randomBytes(30).toString('base64');
};
