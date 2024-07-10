import { promises as fs } from 'fs';
import path from 'path';

async function fixServerPath() {
  const serverPath = path.join('dist', 'src', 'server.js');
  const newPath = path.join('dist', 'server.js');

  try {
    await fs.copyFile(serverPath, newPath);
    console.log('Server file path adjusted.');
  } catch (err) {
    console.error(`Error adjusting server file path: ${err}`);
  }
}

fixServerPath();
