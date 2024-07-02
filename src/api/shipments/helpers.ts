import { randomBytes } from 'crypto';

export const workStepsDBPrefix = (shipment_key: string, work_step_key: string) =>
  `${shipment_key}:${work_step_key}`;

export const subStepsDBPrefix = (shipment_key: string, sub_step_key: string) =>
  `${shipment_key}:${sub_step_key}`;

export const randomRef = () => {
  return [
    randomBytes(2).toString('hex').toUpperCase(),
    randomBytes(2).toString('hex').toUpperCase(),
  ].join('-');
};
