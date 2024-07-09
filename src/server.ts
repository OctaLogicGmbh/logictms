import 'dotenv/config';

import { Hono } from 'hono';
import { readFile } from 'node:fs/promises';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { setUserCookies } from './api/auth/helpers';
import api from './api/server';
import { decodeBase64 } from './utils/common';

const isProd = process.env['NODE_ENV'] === 'production';

let html = await readFile(isProd ? 'build/index.html' : 'index.html', 'utf8');

if (!isProd) {
  const reactRefresh = `<head>
    <script type="module">
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script> 
    <script type="module" src="/@vite/client"></script>
`;

  html = html.replace('<head>', reactRefresh);
}

const app = new Hono()
  .use('*', async (c, next) => {
    c.res.headers.set('X-Powered-By', 'Hono');

    const accessToken = c.req.query('access_token');

    if (accessToken) {
      const claimsStr = accessToken.split('.')[1];

      if (!claimsStr) {
        return next();
      }

      const claims = JSON.parse(decodeBase64(claimsStr));

      setUserCookies(c, accessToken, {
        username: 'iframe',
        active: true,
        claims,
      });
    }

    return next();
  })
  .route('/api', api)
  //.use('/static/*', serveStatic({ root: isProd ? './build/' : './' }))
  .use('/assets/*', serveStatic({ root: isProd ? './build/' : './' }))
  .get('/*', (c) => c.html(html));

export type AppType = typeof app;
export default app;

if (isProd) {
  serve({ ...app, port: 8080 }, (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  });
}
