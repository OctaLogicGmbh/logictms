import { createStorage, Storage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';

import { Shipment, ShipmentSubStep, ShipmentWorkStep } from '@/models/shipments';
import { getMockStoragePath } from '@/utils/server';

import { subStepsDBPrefix, workStepsDBPrefix } from './helpers';

class ShipmentsService {
  #shipments: Storage<Shipment>;
  #workSteps: Storage<ShipmentWorkStep>;
  #subSteps: Storage<ShipmentSubStep>;

  constructor() {
    this.#shipments = createStorage({
      driver: fsDriver({ base: getMockStoragePath('data/shipments/items') }),
    });

    this.#workSteps = createStorage({
      driver: fsDriver({ base: getMockStoragePath('data/shipments/worksteps') }),
    });

    this.#subSteps = createStorage({
      driver: fsDriver({ base: getMockStoragePath('data/shipments/substeps') }),
    });
  }

  // SHIPMENTS
  setShipment = async (shipment: Shipment) => {
    this.#shipments.setItem(shipment.shipment_id, shipment);
    return shipment;
  };

  getShipment = async (shipmentId?: string | null) => {
    if (!shipmentId) return null;

    return this.#shipments.getItem(shipmentId);
  };

  removeShipment = async (shipment: Shipment) => {
    const workSteps = await this.listWorkSteps(shipment);

    const workStepsKeys = shipment.work_steps;
    const subStepsKeys = workSteps.flatMap((workStep) => workStep.sub_steps);

    // Remove all work steps and sub steps
    await Promise.all([
      ...workStepsKeys.map((workStep) => {
        return this.#workSteps.removeItem(workStepsDBPrefix(shipment.shipment_id, workStep));
      }),
      ...subStepsKeys.map((subStep) => {
        return this.#subSteps.removeItem(subStepsDBPrefix(shipment.shipment_id, subStep));
      }),
    ]);

    await this.#shipments.removeItem(shipment.shipment_id);
  };

  listShipments = async () => {
    const keys = await this.#shipments.getKeys();
    return this.#shipments.getItems(keys);
  };

  // WORK STEPS
  setWorkStep = async (shipment: Shipment, workStep: ShipmentWorkStep) => {
    const workStepsKey = workStepsDBPrefix(shipment.shipment_id, workStep.step_key);

    this.#workSteps.setItem(workStepsKey, workStep);

    return workStep;
  };

  getWorkStep = async (shipment: Shipment, workStepKey: string) => {
    const workStepsKey = workStepsDBPrefix(shipment.shipment_id, workStepKey);

    return this.#workSteps.getItem(workStepsKey);
  };

  removeWorkStep = async (shipment: Shipment, workStep: ShipmentWorkStep) => {
    // Need to skip sub steps removal if they are used in other work steps
    const skipSubStepRemoval = new Map<string, number>();

    const workSteps = await this.listWorkSteps(shipment);
    const subStepsKeys = workSteps.flatMap((workStep) => workStep.sub_steps);

    subStepsKeys.forEach((subStepKey) => {
      skipSubStepRemoval.set(subStepKey, (skipSubStepRemoval.get(subStepKey) || 0) + 1);
    });

    // Remove sub steps
    await Promise.all([
      ...workStep.sub_steps.map((subStep) => {
        if (skipSubStepRemoval.get(subStep) === 1) {
          return this.#subSteps.removeItem(subStepsDBPrefix(shipment.shipment_id, subStep));
        }

        return Promise.resolve();
      }),
    ]);

    // Remove work step
    const workStepsKey = workStepsDBPrefix(shipment.shipment_id, workStep.step_key);
    await this.#workSteps.removeItem(workStepsKey);

    // Remove work step from shipment
    const newWorkSteps = shipment.work_steps.filter((step_key) => step_key !== workStep.step_key);
    await this.setShipment({ ...shipment, updated_at: new Date(), work_steps: newWorkSteps });
  };

  listWorkSteps = async (shipment: Shipment) => {
    const allKeys = await this.#workSteps.getKeys();
    const keys = allKeys.filter((key) => key.startsWith(shipment.shipment_id));

    const list = await this.#workSteps.getItems(keys);

    return list.map((item) => item.value);
  };

  listWorkStepsMap = async (shipment: Shipment) => {
    const workSteps = await this.listWorkSteps(shipment);

    return workSteps.reduce(
      (acc, workStep) => {
        acc[workStep.step_key] = workStep;
        return acc;
      },
      {} as Record<string, ShipmentWorkStep>,
    );
  };

  // SUB STEPS
  setSubStep = async (shipment: Shipment, subStep: ShipmentSubStep) => {
    const subStepsKey = subStepsDBPrefix(shipment.shipment_id, subStep.sub_step_key);

    this.#subSteps.setItem(subStepsKey, subStep);

    return subStep;
  };

  getSubStep = async (shipment: Shipment, subStepKey: string) => {
    const subStepsKey = subStepsDBPrefix(shipment.shipment_id, subStepKey);
    return this.#subSteps.getItem(subStepsKey);
  };

  removeSubStep = async (
    shipment: Shipment,
    workStep: ShipmentWorkStep,
    subStep: ShipmentSubStep,
  ) => {
    // Need to skip sub step removal if they are used in other work steps
    let subStepUsageCount = 0;

    const workSteps = await this.listWorkSteps(shipment);
    const subStepsKeys = workSteps.flatMap((workStep) => workStep.sub_steps);

    subStepsKeys.forEach((subStepKey) => {
      if (subStepKey === subStep.sub_step_key) {
        subStepUsageCount += 1;
      }
    });

    // Remove sub step
    workStep.sub_steps = workStep.sub_steps.filter((step_key) => step_key !== subStep.sub_step_key);

    await this.setWorkStep(shipment, workStep);

    if (subStepUsageCount === 1) {
      const subStepsKey = subStepsDBPrefix(shipment.shipment_id, subStep.sub_step_key);
      await this.#subSteps.removeItem(subStepsKey);
    }
  };

  listSubSteps = async (shipment: Shipment) => {
    const allKeys = await this.#subSteps.getKeys();
    const keys = allKeys.filter((key) => key.startsWith(shipment.shipment_id));

    const list = await this.#subSteps.getItems(keys);

    return list.map((item) => item.value);
  };

  listSubStepsMap = async (shipment: Shipment) => {
    const subSteps = await this.listSubSteps(shipment);

    return subSteps.reduce(
      (acc, subStep) => {
        acc[subStep.sub_step_key] = subStep;
        return acc;
      },
      {} as Record<string, ShipmentSubStep>,
    );
  };
}

export function createShipmentsService() {
  const service = new ShipmentsService();

  return service;
}
