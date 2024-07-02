import { Trash2Icon } from 'lucide-react';
import { Form, Link } from 'react-router-dom';

import { Button, buttonVariants } from '@/components/ui/button';

import { useShipmentContext } from '../../context';

const ShipmentWorkStepsManager = () => {
  const { shipment_id, work_steps } = useShipmentContext();

  return (
    <div className="flex flex-col gap-4">
      <h3>Shipment WorkSteps Manager</h3>

      {work_steps.length === 0 && <p className="text-sm text-slate-400">No work steps available</p>}

      <Form>
        <ul className="flex w-80 flex-col divide-y">
          {work_steps.map((work_step, index) => (
            <li
              key={`workstep-${index}-${work_step.step_key}`}
              className="flex justify-between p-1"
            >
              <Link to={work_step.step_key} className="hover:underline">
                {work_step.step_name}
              </Link>

              <div className="inline-flex gap-2">
                <Button
                  variant="primary"
                  size="icon"
                  className="size-5"
                  formMethod="DELETE"
                  formAction={`/shipment/${shipment_id}/workstep/${work_step.step_key}`}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Form>

      <div className="flex justify-end">
        <Link to="workstep" className={buttonVariants()}>
          Create New WorkStep
        </Link>
      </div>
    </div>
  );
};

export default ShipmentWorkStepsManager;
