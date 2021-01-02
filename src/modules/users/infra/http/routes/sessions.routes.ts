/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionRouter = Router();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
