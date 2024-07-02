import { RouteObject } from 'react-router-dom';

import { shipmentLoader } from './loader';
import ShipmentPage from './page';
import { shipmentStepsRoute } from './steps/route';

export const shipmentRoute: WithID<RouteObject> = {
  path: ':shipment_id',
  id: 'shipment',
  loader: shipmentLoader,
  Component: ShipmentPage,
  children: shipmentStepsRoute,
};
