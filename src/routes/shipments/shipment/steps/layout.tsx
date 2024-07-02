import { Outlet } from 'react-router-dom';

import { useShipmentContext } from '../context';

const ShipmentStepPage = () => {
  const { shipment_id, work_step_key, sub_step_key, updated_at } = useShipmentContext();

  return (
    <>
      <div
        key={`${updated_at.toISOString()}`}
        className="flex w-full flex-col gap-4 rounded p-4 shadow-md ring-1 ring-slate-200"
      >
        <Outlet />
      </div>

      <div className="bg-slate-100 p-4 text-sm text-slate-400 shadow ring-slate-300">
        {[shipment_id, work_step_key, sub_step_key].filter(Boolean).join(' > ')}
      </div>
    </>
  );
};

export default ShipmentStepPage;
