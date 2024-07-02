import { StatusCodes } from 'http-status-codes';
import { Cookies } from 'react-cookie';
import { useRouteLoaderData } from 'react-router-dom';

import { api } from '@/api/client';
import { User } from '@/models/auth';
import { decodeBase64 } from '@/utils/common';

interface Auth {
  isAuthenticated: boolean;
  user: User | null;
  signin(username: string, password: string): Promise<void>;
  signout(): Promise<void>;
  resolveAuthCookies(): User | null;
  resolveAuthLocalStorage(): User | null;
  signOutFromLocalStorage(): void;
}

export const enum AUTH_COOKIE {
  ACCESS_TOKEN = 'l_access_token',
  USER = 'l_user',
}

export const authProvider: Auth = {
  isAuthenticated: false,
  user: null,

  async signin(username: string, password: string) {
    const response = await api.auth[':tenant_id'].signin.$post({
      param: { tenant_id: 'SchryverPruebas' },
      json: {
        username,
        password,
      },
    });

    if (response.status !== StatusCodes.OK) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    authProvider.isAuthenticated = true;
    authProvider.user = json;
  },

  async signout() {
    await api.auth.signout.$post();
    authProvider.isAuthenticated = false;
    authProvider.user = null;

    authProvider.signOutFromLocalStorage();
  },

  resolveAuthCookies() {
    const cookies = new Cookies();

    const cookie = cookies.get(AUTH_COOKIE.USER);

    if (!cookie) {
      return null;
    }

    const json: User = JSON.parse(decodeBase64(cookie));

    this.isAuthenticated = json.active;

    if (json.active) {
      this.user = json;
    } else {
      this.user = null;
    }

    return this.user;
  },

  resolveAuthLocalStorage() {
    const q = new URLSearchParams(window.location.search);

    const q_access_token = q.get('access_token');
    const l_access_token = localStorage.getItem('l_access_token');

    if (q_access_token) {
      localStorage.setItem('l_access_token', q_access_token);
    }

    const access_token = q_access_token || l_access_token;

    if (!access_token) {
      return null;
    }

    const claimsStr = access_token.split('.')[1];

    this.isAuthenticated = true;
    this.user = {
      username: 'iframe',
      active: true,
      claims: JSON.parse(decodeBase64(claimsStr)),
    };

    return this.user;
  },

  signOutFromLocalStorage() {
    localStorage.removeItem('l_access_token');
  },
};

export const useUser = () => {
  return useRouteLoaderData('root') as User | null;
};
