import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import { Form, Link } from 'react-router-dom';

import { Button, buttonVariants } from '@/components/ui/button';

import { useShipmentContext } from '../../context';

const ShipmentSubStepsManager: FC = () => {
  const { shipment_id, current } = useShipmentContext();

  const { work_step } = current;

  if (!work_step) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>{work_step.step_name} SubSteps</h3>

      {work_step.sub_steps.length === 0 && (
        <p className="text-sm text-slate-400">No sub steps available</p>
      )}

      <Form>
        <ul className="flex w-80 flex-col divide-y">
          {work_step.sub_steps.map((sub_step, index) => (
            <li
              key={`substep-${index}-${sub_step.sub_step_key}`}
              className="flex justify-between p-1"
            >
              <Link to={sub_step.sub_step_key} className="hover:underline">
                {sub_step.sub_step_name}
              </Link>

              <div className="inline-flex gap-2">
                <Button
                  variant="primary"
                  size="icon"
                  className="size-5"
                  formMethod="DELETE"
                  formAction={`/shipment/${shipment_id}/${work_step.step_key}/substep/${sub_step.sub_step_key}`}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Form>

      <div className="flex justify-end">
        <Link to="substep" className={buttonVariants()}>
          Create New SubStep
        </Link>
      </div>
    </div>
  );
};

export default ShipmentSubStepsManager;
