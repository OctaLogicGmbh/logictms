import React from 'react';
import { useMatch } from 'react-router-dom';

import { ShipmentResponse } from './loader';

const context: ShipmentResponse = {
  shipment_id: 'shipment_id',
  shipment_ref: 'shipment_ref',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  work_steps: [],
};

const ShipmentContext = React.createContext(context);
ShipmentContext.displayName = 'ShipmentContext';

export const useShipmentContext = () => {
  const context = React.useContext(ShipmentContext);

  const match = useMatch({
    path: '/shipment/:shipment_id/:work_step_key/:sub_step_key?',
  });

  const params = match?.params;

  const currentWorkStep = React.useMemo(() => {
    return context.work_steps.find((step) => step.step_key === params?.work_step_key);
  }, [context.work_steps, params?.work_step_key]);

  const currentSubStep = React.useMemo(() => {
    return currentWorkStep?.sub_steps.find((step) => step.sub_step_key === params?.sub_step_key);
  }, [currentWorkStep, params?.sub_step_key]);

  return {
    ...context,
    created_at: new Date(context.created_at),
    updated_at: new Date(context.updated_at),
    work_step_key: params?.work_step_key || null,
    sub_step_key: params?.sub_step_key || null,
    current: {
      work_step: currentWorkStep,
      sub_step: currentSubStep,
    },
  };
};

export default ShipmentContext;
