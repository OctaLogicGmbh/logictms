import { RouteObject } from 'react-router-dom';

import ShipmentStepLayout from './layout';
import {
  shipmentCreateSubStepAction,
  shipmentCreateWorkStepAction,
  shipmentDeleteSubStepAction,
  shipmentDeleteWorkStepAction,
} from './manager/actions';
import ShipmentSubStepsCreate from './manager/SubStepsCreate';
import ShipmentSubStepsManager from './manager/SubStepsManager';
import ShipmentWorkStepsCreate from './manager/WorkStepsCreate';
import ShipmentWorkStepsManager from './manager/WorkStepsManager';
import { shipmentSubStepsRoute } from './sub-steps/route';

export const shipmentStepsRoute: RouteObject[] = [
  {
    Component: ShipmentStepLayout,
    children: [
      // Shipmment WorkSteps Manager
      {
        index: true,
        Component: ShipmentWorkStepsManager,
      },
      // Shipments WorkSteps Actions
      {
        path: 'workstep',
        Component: ShipmentWorkStepsCreate,
        action: shipmentCreateWorkStepAction,
        children: [
          {
            path: ':work_step_key',
            action: async (args) => {
              if (args.request.method === 'DELETE') {
                return shipmentDeleteWorkStepAction(args);
              }

              return null;
            },
          },
        ],
      },
      // Shipments SubSteps Manager
      {
        path: ':work_step_key',
        Component: ShipmentSubStepsManager,
      },
      {
        path: ':work_step_key',
        children: [
          // Shipments SubSteps Forms
          ...shipmentSubStepsRoute,
          // Shipments SubSteps Actions
          {
            path: 'substep',
            Component: ShipmentSubStepsCreate,
            action: shipmentCreateSubStepAction,
            children: [
              {
                path: ':sub_step_key',
                action: (args) => {
                  if (args.request.method === 'DELETE') {
                    return shipmentDeleteSubStepAction(args);
                  }

                  return null;
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
