import { Form, useActionData } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const ShipmentWorkStepsManager = () => {
  const actionData = useActionData() as { errors: { message: string }[] } | undefined;

  return (
    <div className="flex flex-col gap-4">
      <h3>Create New WorkStep</h3>

      <Form method="post" replace className="flex w-60 flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Stage Key</span>
          <select name="stage_key">
            <option value="default_initial">default_initial</option>
            <option value="import_customs_clearance">import_customs_clearance</option>
            <option value="default_final">default_final</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Stage Name</span>
          <input name="stage_name" />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Step Key</span>

          <select name="step_key">
            <option value="shipment_create">shipment_create</option>
            <option value="free_traffic">free_traffic</option>
            <option value="close_shipment">close_shipment</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Step Name</span>
          <input name="step_name" />
        </label>

        <Button type="submit" className="w-40">
          Create
        </Button>

        {actionData && actionData.errors && (
          <pre className="text-sm text-rose-600">
            {JSON.stringify(actionData.errors, null, '\t')}{' '}
          </pre>
        )}
      </Form>
    </div>
  );
};

export default ShipmentWorkStepsManager;
