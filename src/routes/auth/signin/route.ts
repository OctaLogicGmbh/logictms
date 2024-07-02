import { RouteObject } from 'react-router-dom';

import { signinAction } from './actions';
import { signinLoader } from './loader';
import SigninPage from './page';

export const signInRoute: RouteObject = {
  path: 'signin',
  action: signinAction,
  loader: signinLoader,
  Component: SigninPage,
};
