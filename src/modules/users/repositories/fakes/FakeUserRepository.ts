import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import { uuid } from 'uuidv4';

interface ICreateAppointmentDTO {
  provider: string;
  date: Date;
}
class UsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findByMail(email: string): Promise<Users | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = this.users.find(itemUser => itemUser.id === id);
    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const user = new Users();
    Object.assign(user, { id: uuid(), email, name, password });
    this.users.push(user);
    return user;
  }

  public async save(user: Users): Promise<Users> {
    const findUserByIndex = this.users.findIndex(
      findUser => findUser.id === user.id,
    );
    this.users[findUserByIndex] = user;
    return user;
  }
}

export default UsersRepository;
