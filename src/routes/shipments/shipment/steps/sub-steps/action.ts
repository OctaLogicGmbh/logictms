import { ActionFunction } from 'react-router-dom';

import { api } from '@/api/client';
import { shipmentSubStepSchemas } from '@/models/shipments/substeps';

const putSubStep =
  api.shipment[':shipment_id'].worksteps[':work_step_key'].substeps[':sub_step_key'].$put;

export const action: ActionFunction = async ({ request, params }) => {
  const { shipment_id, work_step_key } = params as { shipment_id: string; work_step_key: string };

  const formData = await request.formData();

  const form = shipmentSubStepSchemas.safeParse(Object.fromEntries(formData));

  if (!form.success) {
    return {
      errors: form.error.errors,
    };
  }

  const { sub_step_key } = form.data;

  const response = await putSubStep({
    param: {
      shipment_id,
      work_step_key,
      sub_step_key,
    },
    json: form.data,
  });

  if (!response.ok) {
    return {
      errors: await response.json(),
    };
  }

  return null;
};
