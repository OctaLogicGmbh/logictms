import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

import { AUTH_COOKIE } from '@/lib/auth';
import { User } from '@/models/auth';
import { encodeBase64 } from '@/utils/common';

type SetUserCookiesProps = {
  username: string;
} & Omit<User, 'username'>;

export const setUserCookies = (
  c: Context,
  token: string,
  { username, active, claims }: SetUserCookiesProps,
) => {
  const user = { username, active, claims };

  const cookie = encodeBase64(JSON.stringify(user));

  const expires = new Date(claims.exp * 1000);

  setCookie(c, AUTH_COOKIE.ACCESS_TOKEN, token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires,
  });

  setCookie(c, AUTH_COOKIE.USER, cookie, {
    path: '/',
    httpOnly: false, // need to read this from the client
    secure: true,
    sameSite: 'strict',
    expires,
  });

  return user;
};
