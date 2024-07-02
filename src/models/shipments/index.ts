import { z } from 'zod';

import { shipmentSchema } from './shipments';
import { shipmentSubStepSchema } from './substeps';
import { shipmentWorkStepSchema } from './worksteps';

// .refine((data) => data.password === data.password_confirm, {
//   message: 'Passwords do not match',
//   path: ['password_confirm'],
// });

export { shipmentSchema, shipmentWorkStepSchema, shipmentSubStepSchema };

export type Shipment = z.infer<typeof shipmentSchema>;
export type ShipmentWorkStep = z.infer<typeof shipmentWorkStepSchema>;
export type ShipmentSubStep = z.infer<typeof shipmentSubStepSchema>;
