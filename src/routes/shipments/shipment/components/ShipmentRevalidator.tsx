import { useEffect } from 'react';
import { useRevalidator } from 'react-router-dom';
import { z } from 'zod';

import { api } from '@/api/client';

import { useShipmentContext } from '../context';

const revalidationStep = 1000;

const shipmentStateSchema = z.object({
  updated_at: z.coerce.date(),
});

export const ShipmentRevalidator = () => {
  const revalidator = useRevalidator();
  const { shipment_id, updated_at } = useShipmentContext();

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await api.shipment[':shipment_id'].state.$get({ param: { shipment_id } });

      const json = shipmentStateSchema.safeParse(await res.json());

      if (!json.success) {
        return;
      }

      const { data } = json;

      if (data.updated_at.getTime() > updated_at.getTime()) {
        revalidator.revalidate();
        console.log('Revalidating shipment', data);
      }
    }, revalidationStep);

    return () => {
      clearInterval(timer);
    };
  }, [revalidator, shipment_id, updated_at]);

  return null;
};

export default ShipmentRevalidator;
