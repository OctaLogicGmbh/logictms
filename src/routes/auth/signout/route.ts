import { redirect, RouteObject } from 'react-router-dom';

import { authProvider } from '@/lib/auth';

export const signOutRoute: RouteObject = {
  path: 'signout',
  async action() {
    await authProvider.signout();
    return redirect('/');
  },
};
