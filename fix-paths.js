import fs from 'fs/promises';
import path from 'path';

async function fixServerPath() {
  const serverPath = path.resolve('dist/src/server.js');

  try {
    await fs.access(serverPath);
    console.log('Server file path is correct.');
  } catch (err) {
    console.error(`Server file not found: ${serverPath}`, err);
  }
}

fixServerPath();
