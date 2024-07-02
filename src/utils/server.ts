import path from 'node:path';

export const getMockStoragePath = (folder: string) => path.resolve(process.cwd(), '.mock', folder);
