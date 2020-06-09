/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default sessionRouter;
