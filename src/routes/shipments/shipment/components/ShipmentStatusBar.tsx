import { useShipmentContext } from '../context';

const ShipmentStatusBar = () => {
  const { 
    shipment_ref,
  } = useShipmentContext();

  return (
    <div className="flex-row justify-between gap-4 rounded bg-slate-100 p-4">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col">
          <span className="text-sm text-slate-300">Ref.No</span>
          <span>{shipment_ref}</span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatusBar;
