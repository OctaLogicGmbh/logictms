import { RouteObject, useRouteLoaderData } from 'react-router-dom';

import { shipmentCreateAction, shipmentRemoveAction } from './actions';
import { ShipmentsListResponse, shipmentsLoader } from './loader';
import ShipmentsListPage from './page';

const shipmentsListRoute: WithID<RouteObject> = {
  index: true,
  id: 'shipments-list',
  action: shipmentCreateAction,
  loader: shipmentsLoader,
  Component: ShipmentsListPage,
};

export const shipmentsRoutes: RouteObject[] = [
  shipmentsListRoute,
  {
    path: ':shipment_id',
    action: ({ params, request }) => {
      if (request.method === 'DELETE') {
        return shipmentRemoveAction(params.shipment_id);
      }

      return null;
    },
  },
];

export const useShipmentListRouteData = () => {
  return useRouteLoaderData(shipmentsListRoute.id) as ShipmentsListResponse;
};
