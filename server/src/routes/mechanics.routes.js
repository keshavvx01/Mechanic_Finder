import { Router } from 'express';
import {
  listMechanics,
  registerMechanic,
} from '../services/mechanics.service.js';

const router = Router();

router.get('/', async (request, response, next) => {
  try {
    const payload = await listMechanics({
      lat: request.query.lat,
      lng: request.query.lng,
      distanceKm: request.query.distanceKm,
      maxBudget: request.query.maxBudget,
    });

    response.json(payload);
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (request, response, next) => {
  try {
    const mechanic = await registerMechanic(request.body);
    response.status(201).json({
      message: 'Mechanic registered successfully.',
      data: mechanic,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
