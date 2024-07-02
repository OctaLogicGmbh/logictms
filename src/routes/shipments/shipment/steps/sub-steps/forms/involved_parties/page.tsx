import { Form, useLoaderData } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ShipmentSubStepInvolvedParties } from '@/models/shipments/substeps';

import { SubStepActionData } from '../../components/SubStepActionData';
import { SubStepBaseFields } from '../../components/SubStepBaseFields';

const useSubStepData = () => {
  return useLoaderData() as ShipmentSubStepInvolvedParties;
};

const SubStepInvolvedPartiesPage = () => {
  const { status, sub_step_key, sub_step_name } = useSubStepData();

  return (
    <Form method="PUT" className="flex w-60 flex-col gap-4">
      <SubStepBaseFields
        sub_step_key={sub_step_key}
        sub_step_name={sub_step_name}
        status={status}
      />

      <Button type="submit" className="w-40">
        Save
      </Button>

      <SubStepActionData />
    </Form>
  );
};

export default SubStepInvolvedPartiesPage;
