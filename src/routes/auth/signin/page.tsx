import { Form, useActionData, useLocation, useNavigation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { errors: { message: string }[] } | undefined;

  return (
    <div className="flex flex-col gap-4">
      {from === '/' ? null : (
        <p className="text-rose-600">
          You must log in to view the page at <b>{from}</b>
        </p>
      )}

      <Form method="post" replace className="flex w-60 flex-col gap-4">
        <input type="hidden" name="redirectTo" value={from} />

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Username</span>
          <input name="username" />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Password</span>
          <input type="password" name="password" />
        </label>

        <Button type="submit" disabled={isLoggingIn} className="w-40">
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>

        {actionData && actionData.errors ? (
          <ul>
            {actionData.errors.map((error, index) => (
              <p key={`signin-error-${index}+`} className="text-rose-600">
                {error.message}
              </p>
            ))}
          </ul>
        ) : null}
      </Form>
    </div>
  );
}
