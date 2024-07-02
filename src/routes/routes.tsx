import { createBrowserRouter, Outlet } from 'react-router-dom';

import { authProvider } from '@/lib/auth';
import { guardLoader } from '@/lib/auth/guard';
import ErrorPage from '@/routes/ErrorPage';
import MainLayout from '@/views/main-layout/MainLayout';
import ShipmentLayout from '@/views/shipment-layout/ShipmentLayout';
import UserLayout from '@/views/user-layout/UserLayout';

import { authRoutes } from './auth/routes';
import { homeRoutes } from './home/routes';
import { shipmentsRoutes } from './shipments/list/route';
import { shipmentRoute } from './shipments/shipment/route';
import { userRoutes } from './user/routes';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Outlet,
    errorElement: <ErrorPage />,
    loader: () => authProvider.resolveAuthLocalStorage()|| authProvider.resolveAuthCookies(),
    children: [
      {
        path: '',
        Component: MainLayout,
        children: homeRoutes,
      },
      {
        path: '/auth',
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: authRoutes,
      },
      {
        path: '/user',
        Component: UserLayout,
        loader: guardLoader,
        children: userRoutes,
      },
      {
        path: '/shipments',
        Component: ShipmentLayout,
        loader: guardLoader,
        children: shipmentsRoutes,
      },
      {
        path: '/shipment',
        Component: ShipmentLayout,
        loader: guardLoader,
        children: [shipmentRoute],
      },
    ],
  },
]);
