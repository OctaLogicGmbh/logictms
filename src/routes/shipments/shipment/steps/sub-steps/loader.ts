import { LoaderFunction } from 'react-router-dom';

import { api } from '@/api/client';

const getSubStep =
  api.shipment[':shipment_id'].worksteps[':work_step_key'].substeps[':sub_step_key'].$get;

export const loader: (key: string) => LoaderFunction = (sub_step_key) => {
  return async ({ params }) => {
    const { shipment_id, work_step_key } = params as { shipment_id: string; work_step_key: string };

    const response = await getSubStep({
      param: {
        shipment_id: shipment_id,
        work_step_key: work_step_key,
        sub_step_key: sub_step_key,
      },
    });

    if (!response.ok) {
      return {
        errors: await response.json(),
      };
    }

    return await response.json();
  };
};
