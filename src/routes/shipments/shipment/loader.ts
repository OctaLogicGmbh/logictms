import { InferRequestType, InferResponseType } from 'hono/client';
import { LoaderFunctionArgs } from 'react-router-dom';

import { api } from '@/api/client';

const getShipment = api.shipment[':shipment_id'].$get;

export const shipmentLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.shipment_id) throw new Error('Missing shipment_id');

  const response = await getShipment({ param: { shipment_id: params.shipment_id } });

  if (!response.ok) {
    throw new Error('Failed to load shipment');
  }

  const json = await response.json();

  return json;
};

export type ShipmentRequest = InferRequestType<typeof getShipment>;
export type ShipmentResponse = InferResponseType<typeof getShipment>;
