import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(url, { recursive: true });
      console.log(`[createDirIfNotExists] Created: ${url}`);
    } else {
      console.log(`[createDirIfNotExists] Other error:`, error);
    }
  }
};
