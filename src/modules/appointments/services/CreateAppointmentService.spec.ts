import AppError from '@shared/errors/AppError';
import { response } from 'express';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

interface IError {
  message: string;
  status: number;
}

describe('CreateAppointment', () => {
  it('should be able create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1234',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const dateForAppointment = new Date(2021, 1, 6, 11);
    await createAppointmentService.execute({
      date: dateForAppointment,
      provider_id: '123455',
    });
    expect(
      createAppointmentService.execute({
        date: dateForAppointment,
        provider_id: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
