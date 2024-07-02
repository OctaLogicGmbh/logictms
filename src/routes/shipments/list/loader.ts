import { InferResponseType } from 'hono/client';

import { api } from '@/api/client';

export type ShipmentsListResponse = InferResponseType<typeof api.shipments.$get>;

export const shipmentsLoader = async () => {
  const response = await api.shipments.$get();
  return response.json();
};
