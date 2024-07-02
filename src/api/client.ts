import { hc } from 'hono/client';

import type { AppType } from '../entry.server';

const { api } = hc<AppType>('/', {
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
