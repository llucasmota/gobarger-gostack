// findbyMail
// create
// findById
// save

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import User from '../infra/typeorm/entities/Users';

export default interface IUsersRepository {
  findByMail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUsersDTO): Promise<User | undefined>;
  save(data: User): Promise<User>;
}
