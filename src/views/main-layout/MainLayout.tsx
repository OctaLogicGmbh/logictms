import { Link, NavLink, Outlet } from 'react-router-dom';

import { AuthStatus } from '@/components/auth-status/AuthStatus';

import { navlink } from '../utils';

function MainLayout() {
  return (
    <main className="flex max-h-screen min-h-screen flex-col">
      <section className="flex items-center justify-between px-4 py-2 shadow">
        <Link to="/" className="text-2xl font-bold">
          logic.fyi
        </Link>

        <AuthStatus />
      </section>

      <section className="flex flex-1 flex-row flex-nowrap gap-4 p-4">
        <div className="w-60">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" className={({ isActive }) => navlink(isActive)}>
                Home Page
              </NavLink>
            </li>

            <li>
              <NavLink to="/shipments" className={({ isActive }) => navlink(isActive)}>
                Shipments
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet />
      </section>
    </main>
  );
}

export default MainLayout;
