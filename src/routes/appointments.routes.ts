/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentRepository from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentRepository.all();
  return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createApointment = new CreateAppointmentRepository(
      appointmentRepository,
    );

    const appointment = createApointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
