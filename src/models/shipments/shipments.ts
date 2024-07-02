import { z } from 'zod';

export const shipmentSchema = z.object({
  shipment_id: z.string(),
  shipment_ref: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  work_steps: z.array(z.string()).default([]),
});
