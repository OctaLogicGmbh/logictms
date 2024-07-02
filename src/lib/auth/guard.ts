import { LoaderFunctionArgs, redirect } from 'react-router-dom';

import { authProvider } from '.';

/**
 * @description Guard loader function that checks if the user is authenticated.
 * If the user is not logged in and tries to access route that uses this guard as a loader, we redirect
 * them to `/auth/signin` with a `from` parameter that allows login to redirect back to this page upon successful authentication
 */
export function guardLoader({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/auth/signin?' + params.toString());
  }
  return null;
}
