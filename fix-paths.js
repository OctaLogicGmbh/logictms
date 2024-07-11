import fs from 'fs/promises';
import path from 'path';

async function fixServerPath() {
  const serverPath = path.resolve('dist/src/server.js');
  const targetPath = path.resolve('dist/src/server.js'); // Ajusta esta línea según tu estructura

  try {
    await fs.access(serverPath);
    console.log(`Server file not found: ${serverPath} ${targetPath} `);
  } catch (err) {
    console.error(`Server file not found: ${serverPath}`, err);
  }
}

fixServerPath();
