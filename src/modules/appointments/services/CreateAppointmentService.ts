import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IResquestDTO {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    date,
    provider_id,
  }: IResquestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    // recuperando agendamentos com a mesma data
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    /**
     * O método create apenas cria a instância;
     * para de persistência é preciso utilizar o save()
     */
    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
