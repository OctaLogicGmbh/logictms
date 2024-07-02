import { Form, useActionData } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const ShipmentWorkStepsManager = () => {
  const actionData = useActionData() as { errors: { message: string }[] } | undefined;

  return (
    <div className="flex flex-col gap-4">
      <h3>Create New SubStep</h3>

      <Form method="post" replace className="flex w-60 flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Sub Step Key</span>

          <select name="sub_step_key">
            <option value="header_data">header_data</option>
            <option value="owners">owners</option>
            <option value="involved_parties">involved_parties</option>
            <option value="free_traffic_headers">free_traffic_headers</option>
            <option value="free_traffic_sender">free_traffic_sender</option>
            <option value="free_traffic_receiver">free_traffic_receiver</option>
            <option value="check_costs">check_costs</option>
            <option value="close_shipment">close_shipment</option>
            <option value="general_info">general_info</option>
            <option value="basic">basic</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-neutral-700">Sub Step Name</span>
          <input name="sub_step_name" />
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
