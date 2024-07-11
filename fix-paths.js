import fs from 'fs/promises';
import path from 'path';

async function fixServerPath() {
  const serverPath = path.resolve('dist/src/server.js');
  const targetPath = path.resolve('dist/server.js');

  try {
    await fs.copyFile(serverPath, targetPath);
    console.log('Server file path adjusted.');
  } catch (err) {
    console.error(`Server file not found: ${serverPath}`, err);
  }
}

fixServerPath();
