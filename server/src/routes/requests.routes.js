import { Router } from 'express';
import {
  createAssistanceRequest,
  getAssistanceRequest,
  listAssistanceRequests,
  updateAssistanceRequestStatus,
} from '../services/requests.service.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const requests = await listAssistanceRequests();
    response.json({
      data: requests,
      count: requests.length,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const assistanceRequest = await getAssistanceRequest(request.params.id);
    response.json({ data: assistanceRequest });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const assistanceRequest = await createAssistanceRequest(request.body);
    response.status(201).json({
      message: 'Assistance request created successfully.',
      data: assistanceRequest,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', async (request, response, next) => {
  try {
    const assistanceRequest = await updateAssistanceRequestStatus(
      request.params.id,
      request.body.status,
    );
    response.json({
      message: 'Assistance request updated successfully.',
      data: assistanceRequest,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
