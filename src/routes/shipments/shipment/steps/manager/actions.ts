import { ActionFunctionArgs, redirect } from 'react-router-dom';

import { api } from '@/api/client';
import { shipmentSubStepSchema, shipmentWorkStepSchema } from '@/models/shipments';

type ShipmentParams = {
  shipment_id: string;
  work_step_key?: string;
  sub_step_key?: string;
};

const apiWorkSteps = api.shipment[':shipment_id'].worksteps;

export async function shipmentCreateWorkStepAction({ request, params }: ActionFunctionArgs) {
  const { shipment_id } = params as ShipmentParams;

  const formData = await request.formData();

  const form = shipmentWorkStepSchema.safeParse(Object.fromEntries(formData));

  if (!form.success) {
    return {
      errors: form.error.errors,
    };
  }

  const response = await apiWorkSteps.$post({
    param: { shipment_id },
    json: form.data,
  });

  const workStep = await response.json();

  return redirect(`/shipment/${shipment_id}/${workStep.step_key}`);
}

export async function shipmentDeleteWorkStepAction({ params }: ActionFunctionArgs) {
  const { shipment_id, work_step_key } = params as ShipmentParams;

  if (!work_step_key) return null;

  if (window.confirm('Are you sure you want to remove this work step?')) {
    await apiWorkSteps[':work_step_key'].$delete({
      param: { shipment_id, work_step_key },
    });
  }

  return redirect(`/shipment/${shipment_id}`);
}

const apiSubSteps = api.shipment[':shipment_id'].worksteps[':work_step_key'].substeps;

export async function shipmentCreateSubStepAction({ request, params }: ActionFunctionArgs) {
  const { shipment_id, work_step_key } = params as ShipmentParams;
  if (!work_step_key) return null;

  const formData = await request.formData();

  const form = shipmentSubStepSchema.safeParse(Object.fromEntries(formData));

  if (!form.success) {
    return {
      errors: form.error.errors,
    };
  }

  const response = await apiSubSteps.$post({
    param: {
      shipment_id,
      work_step_key,
    },
    json: form.data,
  });

  if (!response.ok) {
    return {
      errors: await response.json(),
    };
  }

  const subStep = await response.json();

  return redirect(`/shipment/${shipment_id}/${work_step_key}/${subStep.sub_step_key}`);
}

export async function shipmentDeleteSubStepAction({ params }: ActionFunctionArgs) {
  const { shipment_id, work_step_key, sub_step_key } = params as ShipmentParams;

  if (!work_step_key || !sub_step_key) return null;

  if (window.confirm('Are you sure you want to remove this sub step?')) {
    await apiSubSteps[':sub_step_key'].$delete({
      param: {
        shipment_id,
        work_step_key,
        sub_step_key,
      },
    });
  }

  return redirect(`/shipment/${shipment_id}/${work_step_key}`);
}
