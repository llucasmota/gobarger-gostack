/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '@modules/appointments/services/appointments/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  // const appointment = await appointmentRepository.find();
  // return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createApointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createApointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
