import { Link, Outlet } from 'react-router-dom';

import { AuthStatus } from '@/components/auth-status/AuthStatus';

function ShipmentLayout() {
  return (
    <main className="flex max-h-screen min-h-screen flex-col">
      <section className="flex items-center justify-between px-4 pt-2">
        <Link to="/" className="text-2xl font-bold">
          logic.fyi
        </Link>

        <AuthStatus />
      </section>

      <Outlet />
    </main>
  );
}

export default ShipmentLayout;
