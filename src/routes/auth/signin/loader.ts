import { redirect } from 'react-router-dom';

import { authProvider } from '@/lib/auth';

export async function signinLoader() {
  if (authProvider.isAuthenticated) {
    const q = window.location.search;
    const from = new URLSearchParams(q).get('from');

    return redirect(from || '/');
  }
  return null;
}
