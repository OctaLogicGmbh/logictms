import { z } from 'zod';

import { subStepKeyEnum } from './enums';
import { refineSubSteps } from './helpers';

const stageKeyEnum = z.enum(['default_initial', 'import_customs_clearance', 'default_final']);
const workStepKeyEnum = z.enum(['shipment_create', 'free_traffic', 'close_shipment']);

const baseSchema = z.object({
  stage_name: z.string().min(1, { message: 'Stage name is required' }),
  step_name: z.string().min(1, { message: 'Step name is required' }),

  prev: z.string().nullable().default(null),
  next: z.string().nullable().default(null),
});

const shipmentCreateSchema = baseSchema.extend({
  stage_key: z.literal(stageKeyEnum.Values.default_initial),
  step_key: z.literal(workStepKeyEnum.Values.shipment_create),
  sub_steps: z
    .array(z.string())
    .default([])
    .superRefine(
      refineSubSteps([
        subStepKeyEnum.Values.header_data,
        subStepKeyEnum.Values.owners,
        subStepKeyEnum.Values.involved_parties,
        subStepKeyEnum.Values.general_info,
        subStepKeyEnum.Values.basic,
      ]),
    ),
});

const freeTrafficSchema = baseSchema.extend({
  stage_key: z.literal(stageKeyEnum.Values.import_customs_clearance),
  step_key: z.literal(workStepKeyEnum.Values.free_traffic),
  sub_steps: z
    .array(z.string())
    .default([])
    .superRefine(
      refineSubSteps([
        subStepKeyEnum.Values.free_traffic_headers,
        subStepKeyEnum.Values.free_traffic_sender,
        subStepKeyEnum.Values.free_traffic_receiver,
      ]),
    ),
});

const closeShipmentSchema = baseSchema.extend({
  stage_key: z.literal(stageKeyEnum.Values.default_final),
  step_key: z.literal(workStepKeyEnum.Values.close_shipment),
  sub_steps: z
    .array(z.string())
    .default([])
    .superRefine(
      refineSubSteps([
        subStepKeyEnum.Values.check_costs,
        subStepKeyEnum.Values.owners,
        subStepKeyEnum.Values.close_shipment,
      ]),
    ),
});

export const shipmentWorkStepSchema = z.discriminatedUnion('step_key', [
  shipmentCreateSchema,
  freeTrafficSchema,
  closeShipmentSchema,
]);
