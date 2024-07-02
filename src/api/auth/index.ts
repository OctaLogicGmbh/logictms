import { ConsoleLogger } from 'aws-amplify/utils';
import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { AUTH_COOKIE } from '@/lib/auth';
import { signinSchema, User } from '@/models/auth';
import { zValidator } from '@hono/zod-validator';

import { setUserCookies } from './helpers';

const logger = new ConsoleLogger('AuthLogger', 'DEBUG');

type TokenResponse =
  | {
      access_token: string;
    }
  | {
      error: string;
    };

const { AUTH_ORIGIN } = process.env;

if (!AUTH_ORIGIN) {
  throw new Error('AUTH_ORIGIN is not defined');
}
//aa
console.log('AUTH_ORIGIN:', AUTH_ORIGIN);
logger.debug('AUTH_ORIGIN2:', AUTH_ORIGIN);

//const tokenEndpoint = `${AUTH_ORIGIN}/login`;
const tokenEndpoint = `https://7qk9m2xvu2.us-west-2.awsapprunner.com/v1/auth/login`;
const validateEndpoint = `${AUTH_ORIGIN}/validate`;

console.log('tokenEndpoint:', tokenEndpoint);
logger.info('tokenEndpoint2:', tokenEndpoint);

const auth = new Hono()
  .post('/:tenant_id/signin', zValidator('json', signinSchema), async (c) => {
    console.log('Handling signin for tenant:', c.req.param('tenant_id'));
    //logger.debug('Handling signin for tenant2:', c.req.param('tenant_id'));
    
    const data = c.req.valid('json');
    const { tenant_id } = c.req.param();

    console.log('Token Endpoint:', tokenEndpoint);

    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-tenantid': 'SchryverPruebas' },
      body: JSON.stringify({
        username: 'OMMEX',
        password: 'Hemo+9807',
      }),
      //redirect: 'follow' // follow redirects
    });

    console.log('Token Response:', tokenResponse.status, tokenResponse.statusText);
    logger.debug('Token Response2:', tokenResponse.status, tokenResponse.statusText);

    const token = (await tokenResponse.json()) as TokenResponse;
    
    if ('error' in token) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, { message: token.error });
    }

    const validateResponse = await fetch(validateEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenantid': tenant_id,
      },
      body: JSON.stringify({ token: token.access_token }),
    });

    console.log('Token Response:', tokenResponse.status, tokenResponse.statusText, token.access_token);
    logger.debug('Token Response2:', tokenResponse.status, tokenResponse.statusText, token.access_token);

    const payload = (await validateResponse.json()) as Omit<User, 'username'>;

    if (!payload.active) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, { message: 'Invalid token' });
    }

    const user = setUserCookies(c, token.access_token, {
      username: data.username,
      ...payload,
    });

    return c.json(user);
  })

  .post('/signout', async (c) => {
    deleteCookie(c, AUTH_COOKIE.ACCESS_TOKEN);
    deleteCookie(c, AUTH_COOKIE.USER);
    return c.json({ status: 'ok' });
  });

export default auth;
