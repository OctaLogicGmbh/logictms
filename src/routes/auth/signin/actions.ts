import { ActionFunctionArgs, redirect } from 'react-router-dom';

import { authProvider } from '@/lib/auth';
import { signinSchema } from '@/models/auth';

export async function signinAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const form = signinSchema.safeParse(Object.fromEntries(formData));

  if (!form.success) {
    return {
      errors: form.error.errors,
    };
  }

  const { username, password } = form.data;

  return await authProvider
    .signin(username, password)
    .then(() => {
      const redirectTo = formData.get('redirectTo') as string | null;
      return redirect(redirectTo || '/');
    })
    .catch((error) => {
      return {
        errors: [error],
      };
    });
}
