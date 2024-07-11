import { promises as fs } from 'fs';
import path from 'path';

async function fixServerPath() {
  const serverFilePath = path.resolve('dist/src/server.js');
  const targetPath = path.resolve('dist/server.js');

  try {
    await fs.copyFile(serverFilePath, targetPath);
    console.log('Server file path adjusted.');
  } catch (error) {
    console.error(`Server file not found: ${serverFilePath}`, error);
  }
}

fixServerPath();
