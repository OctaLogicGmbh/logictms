import { ShipIcon } from 'lucide-react';
import { Link, Outlet, useRouteLoaderData } from 'react-router-dom';

import ShipmentRevalidator from './components/ShipmentRevalidator';
import ShipmentStatusBar from './components/ShipmentStatusBar';
import ShipmentTree from './components/ShipmentTree';
import ShipmentContext from './context';
import { ShipmentResponse } from './loader';
import { shipmentRoute } from './route';

const useShipmentListRouteData = () => {
  return useRouteLoaderData(shipmentRoute.id) as ShipmentResponse;
};

export default function ShipmentPage() {
  const data = useShipmentListRouteData();

  return (
    <ShipmentContext.Provider value={data}>
      <div className="flex flex-col">
        <nav className="flex justify-between gap-x-4 p-4 shadow">
          <Link
            to={`/shipment/${data.shipment_id}`}
            className="text-slate-400 hover:text-slate-900"
          >
            <ShipIcon className="h-6 w-6" />
          </Link>

          <a href="#" className="text-slate-400 hover:text-slate-900">
            Pre-Arrival Preparation
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900">
            Arrival of Goods
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900">
            Customs Clearance
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900">
            Transportation to Final Destination
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900">
            Final Delivery and Receipt
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900">
            Post-Import Procedures
          </a>
        </nav>

        <section className="flex flex-1 flex-shrink-0 flex-row flex-nowrap gap-x-4 p-4">
          <ShipmentRevalidator />
          <ShipmentTree />

          <div className="flex flex-1 flex-col gap-4">
            <ShipmentStatusBar />
            <Outlet />
          </div>
        </section>
      </div>
    </ShipmentContext.Provider>
  );
}
