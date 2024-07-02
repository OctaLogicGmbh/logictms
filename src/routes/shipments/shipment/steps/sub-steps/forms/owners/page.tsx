import { Form, useLoaderData } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ShipmentSubStepOwners } from '@/models/shipments/substeps';

import { SubStepActionData } from '../../components/SubStepActionData';
import { SubStepBaseFields } from '../../components/SubStepBaseFields';

const useSubStepData = () => {
  return useLoaderData() as ShipmentSubStepOwners;
};

const SubStepOwnersPage = () => {
  const { status, sub_step_key, sub_step_name } = useSubStepData();

  return (
    <Form method="PUT" className="flex w-60 flex-col gap-4">
      <SubStepBaseFields
        sub_step_key={sub_step_key}
        sub_step_name={sub_step_name}
        status={status}
      />

      {/* <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Country Loading</span>
          <input name="country_loading" value={country_loading} />
        </label> */}

      <Button type="submit" className="w-40">
        Save
      </Button>

      <SubStepActionData />
    </Form>
  );
};

export default SubStepOwnersPage;
