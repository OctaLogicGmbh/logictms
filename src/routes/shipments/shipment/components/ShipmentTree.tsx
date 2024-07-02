import { DotIcon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { navlink, subNavlink } from '@/views/utils';

import { useShipmentContext } from '../context';

const ShipmentTree = () => {
  const { work_steps, sub_step_key: sub_step_id } = useShipmentContext();

  if (work_steps.length === 0) {
    return (
      <div className="w-60">
        <p className="text-sm text-slate-400">No work steps available</p>
      </div>
    );
  }

  return (
    <div className="w-60">
      <ul className="flex flex-col gap-2">
        {work_steps.map((work_step, index) => {
          return (
            <li key={`workstep-${index}-${work_step.step_key}`} className="flex flex-col gap-1">
              <NavLink to={work_step.step_key} className={({ isActive }) => navlink(isActive)}>
                {work_step.step_name}
              </NavLink>

              {work_step.sub_steps.map((sub_step) => {
                const isActiveSubStep = sub_step_id === sub_step.sub_step_key;

                return (
                  <div
                    key={sub_step.sub_step_key}
                    className={cn(
                      subNavlink(isActiveSubStep),
                      'flex flex-row flex-nowrap items-center',
                    )}
                  >
                    <DotIcon className={isActiveSubStep ? 'visible' : 'invisible'} />

                    <Link to={`${work_step.step_key}/${sub_step.sub_step_key}`} className="w-full">
                      {sub_step.sub_step_name}
                    </Link>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShipmentTree;
