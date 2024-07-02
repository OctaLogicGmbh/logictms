import { z } from 'zod';

import { shipmentSubStepStatus, subStepKeyEnum } from './enums';


export const shipmentSubStepSchema = z.object({
  sub_step_name: z.string().min(1, { message: 'Sub step name is required' }),
  status: shipmentSubStepStatus.default('not_started'),
  sub_step_key: subStepKeyEnum,
});

export type ShipmentSubStep = z.infer<typeof shipmentSubStepSchema>;

const headerDataSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.header_data),
  country_loading: z.string().min(1, { message: 'Country loading is required' }),
});

export type ShipmentSubStepHeaderData = z.infer<typeof headerDataSchema>;

const ownersSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.owners),
});

export type ShipmentSubStepOwners = z.infer<typeof ownersSchema>;

const involvedPartiesSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.involved_parties),
});

export type ShipmentSubStepInvolvedParties = z.infer<typeof involvedPartiesSchema>;

const freeTrafficHeadersSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.free_traffic_headers),
});

export type ShipmentSubStepFreeTrafficHeaders = z.infer<typeof freeTrafficHeadersSchema>;

const freeTrafficSenderSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.free_traffic_sender),
});

export type ShipmentSubStepFreeTrafficSender = z.infer<typeof freeTrafficSenderSchema>;

const freeTrafficReceiverSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.free_traffic_receiver),
});

export type ShipmentSubStepFreeTrafficReceiver = z.infer<typeof freeTrafficReceiverSchema>;

const checkCostsSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.check_costs),
});

export type ShipmentSubStepCheckCosts = z.infer<typeof checkCostsSchema>;

const closeShipmentSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.close_shipment),
});

export type ShipmentSubStepCloseShipment = z.infer<typeof closeShipmentSchema>;

// GENERAL INFO SCHEMA
const generalInfoSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.general_info),
  operation_type: z.string().min(1, { message: 'Operation type is required' }),
  transport_mode: z.string().min(1, { message: 'Transport mode is required' }),
  shipment_type: z.string().min(1, { message: 'Shipment type is required' }),
  incoterm: z.string().min(1, { message: 'Incoterm is required' }),
  operations_executive: z.string().min(1, { message: 'Operations executive is required' }),
  sales_executive: z.string().min(1, { message: 'Sales executive is required' }),
});
// GENERAL INFO TYPES
export type ShipmentSubStepGeneralInfo = z.infer<typeof generalInfoSchema>;


// BASIC SCHEMA
const basicSchema = shipmentSubStepSchema.extend({
  sub_step_key: z.literal(subStepKeyEnum.Values.basic),
  sub_step_name: z.string().min(1, { message: 'Substep name type is required' }),
});
// BASIC TYPES
export type ShipmentSubStepBasic = z.infer<typeof basicSchema>;


export const shipmentSubStepSchemas = z.discriminatedUnion('sub_step_key', [
  headerDataSchema,
  ownersSchema,
  involvedPartiesSchema,
  freeTrafficHeadersSchema,
  freeTrafficSenderSchema,
  freeTrafficReceiverSchema,
  checkCostsSchema,
  closeShipmentSchema,
  generalInfoSchema,
  basicSchema,
]);
