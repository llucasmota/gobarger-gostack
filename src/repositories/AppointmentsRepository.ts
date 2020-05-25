import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   *
   * Uma promise Async/Await sempre retornará um Promise, por isso o retorno
   * foi alterado para uma Promise
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
