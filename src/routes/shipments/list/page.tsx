import { Trash2Icon } from 'lucide-react';
import { Form, Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useShipmentListRouteData } from './route';

export default function ShipmentsListPage() {
  const data = useShipmentListRouteData();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3>Shipments</h3>

      {data.length === 0 && <p className="text-sm text-slate-400">No shipments available</p>}

      <Form>
        <ul className="flex w-80 flex-col divide-y">
          {data.map((shipment, index) => (
            <li
              key={`shipment-${index}-${shipment.shipment_id}`}
              className="flex justify-between p-1"
            >
              <Link to={`/shipment/${shipment.shipment_id}`} className="hover:underline">
                Shipment - {shipment.shipment_ref}
              </Link>

              <div className="inline-flex gap-2">
                <Button
                  variant="primary"
                  size="icon"
                  className="size-5"
                  formMethod="DELETE"
                  formAction={`/shipments/${shipment.shipment_id}`}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Form>

      <Form method="POST" className="flex justify-end">
        <Button>Create New Shipment</Button>
      </Form>
    </div>
  );
}
