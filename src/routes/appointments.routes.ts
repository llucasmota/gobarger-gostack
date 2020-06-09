/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentRepository = getCustomRepository(AppointmentsRepository);

  const appointment = await appointmentRepository.find();
  return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createApointment = new CreateAppointmentService();

  const appointment = await createApointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
