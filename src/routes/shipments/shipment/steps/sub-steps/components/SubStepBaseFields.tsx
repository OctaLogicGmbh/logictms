import { FC } from 'react';

import { ShipmentSubStep } from '@/models/shipments';
import { shipmentSubStepStatus } from '@/models/shipments/enums';

export const SubStepBaseFields: FC<ShipmentSubStep> = ({ status, sub_step_key, sub_step_name }) => {
  return (
    <>
      <p className="rounded bg-slate-200 p-1 text-sm text-slate-400 ring-1">{sub_step_key}</p>

      <input type="hidden" name="sub_step_key" defaultValue={sub_step_key} />

      <label className="flex flex-col gap-1">
        <span className="text-sm text-neutral-700">Sub Step Status</span>
        <select name="status" defaultValue={status}>
          {shipmentSubStepStatus.options.map((option) => (
            <option key={`substep-status-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-neutral-700">Sub Step Name</span>
        <input name="sub_step_name" defaultValue={sub_step_name} />
      </label>
    </>
  ); 
};
