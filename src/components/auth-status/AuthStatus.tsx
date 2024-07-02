import { Link, useFetcher } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth';

export function AuthStatus() {
  const user = useUser();
  const fetcher = useFetcher();

  if (!user) {
    return (
      <Button asChild>
        <Link to="/auth/signin">Sign in</Link>
      </Button>
    );
  }

  const isLoggingOut = fetcher.formData != null;

  return (
    <div className="flex items-center gap-4">
      <Link to="/user" className="text-lg text-neutral-700 hover:underline">
        {user.username}
      </Link>

      <fetcher.Form method="post" action="/auth/signout">
        <Button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </fetcher.Form>
    </div>
  );
}
