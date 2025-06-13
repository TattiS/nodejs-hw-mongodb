import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvValue } from './getEnvValue.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvValue(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvValue(CLOUDINARY.API_KEY),
  api_secret: getEnvValue(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
