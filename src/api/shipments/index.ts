import { randomUUID } from 'crypto';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { shipmentSubStepSchema, shipmentWorkStepSchema } from '@/models/shipments';
import { shipmentSubStepSchemas } from '@/models/shipments/substeps';
import { zValidator } from '@hono/zod-validator';

import { randomRef } from './helpers';
import { createShipmentsService } from './service';

const service = createShipmentsService();

const shipmentsRoutes = new Hono()
  .post('/', async (c) => {
    const shipment_id = randomUUID();

    const shipment_ref = randomRef();

    const shipment = await service.setShipment({
      shipment_id,
      shipment_ref,
      created_at: new Date(),
      updated_at: new Date(),
      work_steps: [],
    });

    return c.json(shipment);
  })

  .get('/', async (c) => {
    const list = await service.listShipments();
    return c.json(list.map((item) => item.value));
  });

const shipmentRoutes = new Hono({})
  .get('/:shipment_id/state', async (c) => {
    const { shipment_id } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    return c.json({ updated_at: shipment.updated_at });
  })

  .get('/:shipment_id', async (c) => {
    const { shipment_id } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    const work_steps_map = await service.listWorkStepsMap(shipment);

    const sub_steps_map = await service.listSubStepsMap(shipment);

    return c.json({
      ...shipment,
      work_steps: shipment.work_steps.map((work_step_key) => {
        const work_step = work_steps_map[work_step_key];

        return {
          ...work_step,

          sub_steps: work_step.sub_steps.map((sub_step_key) => {
            const sub_step = sub_steps_map[sub_step_key];
            return sub_step;
          }),
        };
      }),
    });
  })

  .delete('/:shipment_id', async (c) => {
    const { shipment_id } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    await service.removeShipment(shipment);

    return c.json({ message: 'Shipment deleted' });
  })

  .post('/:shipment_id/worksteps', zValidator('json', shipmentWorkStepSchema), async (c) => {
    const data = c.req.valid('json');

    const { shipment_id } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    const workStep = await service.setWorkStep(shipment, data);

    shipment.work_steps.push(workStep.step_key);

    shipment.updated_at = new Date();
    await service.setShipment(shipment);

    return c.json(workStep);
  })

  .delete('/:shipment_id/worksteps/:work_step_key', async (c) => {
    const { shipment_id, work_step_key } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    const workStep = await service.getWorkStep(shipment, work_step_key);

    if (!workStep) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Workstep not found' });
    }

    await service.removeWorkStep(shipment, workStep);

    return c.json({ message: 'Workstep deleted' });
  })

  .post(
    '/:shipment_id/worksteps/:work_step_key/substeps',
    zValidator('json', shipmentSubStepSchema),
    async (c) => {
      const data = c.req.valid('json');

      const { shipment_id, work_step_key } = c.req.param();

      const shipment = await service.getShipment(shipment_id);

      if (!shipment) {
        throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
      }

      const workStep = await service.getWorkStep(shipment, work_step_key);

      if (!workStep) {
        throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Workstep not found' });
      }

      const subStep = await service.setSubStep(shipment, data);

      workStep.sub_steps.push(subStep.sub_step_key);
      const validation = shipmentWorkStepSchema.safeParse(workStep);

      if (!validation.success) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, validation.error);
      }

      await service.setWorkStep(shipment, workStep);

      shipment.updated_at = new Date();
      await service.setShipment(shipment);

      return c.json(subStep);
    },
  )

  .get('/:shipment_id/worksteps/:work_step_key/substeps/:sub_step_key', async (c) => {
    const { shipment_id, work_step_key, sub_step_key } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    const workStep = await service.getWorkStep(shipment, work_step_key);

    if (!workStep) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Workstep not found' });
    }

    const subStep = await service.getSubStep(shipment, sub_step_key);

    if (!subStep) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Substep not found' });
    }

    return c.json(subStep);
  })

  .put(
    '/:shipment_id/worksteps/:work_step_key/substeps/:sub_step_key',
    zValidator('json', shipmentSubStepSchemas),
    async (c) => {
      const { shipment_id, work_step_key } = c.req.param();

      const shipment = await service.getShipment(shipment_id);

      if (!shipment) {
        throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
      }

      const workStep = await service.getWorkStep(shipment, work_step_key);

      if (!workStep) {
        throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Workstep not found' });
      }

      const data = c.req.valid('json');

      await service.setSubStep(shipment, data);

      shipment.updated_at = new Date();
      await service.setShipment(shipment);

      return c.json({ message: 'Workstep updated' });
    },
  )

  .delete('/:shipment_id/worksteps/:work_step_key/substeps/:sub_step_key', async (c) => {
    const { shipment_id, work_step_key, sub_step_key } = c.req.param();

    const shipment = await service.getShipment(shipment_id);

    if (!shipment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Shipment not found' });
    }

    const workStep = await service.getWorkStep(shipment, work_step_key);

    if (!workStep) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Workstep not found' });
    }

    const subStep = await service.getSubStep(shipment, sub_step_key);

    if (!subStep) {
      throw new HTTPException(StatusCodes.NOT_FOUND, { message: 'Substep not found' });
    }

    await service.removeSubStep(shipment, workStep, subStep);

    shipment.updated_at = new Date();
    await service.setShipment(shipment);

    return c.json({ message: 'Workstep deleted' });
  });

export { shipmentsRoutes, shipmentRoutes };
