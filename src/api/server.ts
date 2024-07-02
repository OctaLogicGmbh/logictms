import { Hono } from 'hono';

import authRoutes from './auth';
import { shipmentRoutes, shipmentsRoutes } from './shipments';

// Always register routes in an index.ts file.
// Must use chaining syntax, otherwise `hc` will lose types.
const api = new Hono() //
  .route('/auth', authRoutes)
  .route('/shipments', shipmentsRoutes)
  .route('/shipment', shipmentRoutes);

export default api;
