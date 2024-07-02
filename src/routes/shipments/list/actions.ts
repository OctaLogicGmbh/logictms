import { redirect } from 'react-router-dom';

import { api } from '@/api/client';

export async function shipmentCreateAction() {
  const request = await api.shipments.$post();

  const shipment = await request.json();

  return redirect(`/shipment/${shipment.shipment_id}`);
}

export async function shipmentRemoveAction(shipment_id?: string) {
  if (!shipment_id) return;

  if (!window.confirm('Are you sure you want to remove this shipment?')) return;

  await api.shipment[':shipment_id'].$delete({ param: { shipment_id } });

  return redirect('/shipments');
}
