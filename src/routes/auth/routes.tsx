import { RouteObject } from 'react-router-dom';

import { signInRoute } from './signin/route';
import { signOutRoute } from './signout/route';

export const authRoutes: RouteObject[] = [signInRoute, signOutRoute];
