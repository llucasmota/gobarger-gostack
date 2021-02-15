import 'reflect-metadata';

import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const checkUserExists = await this.userRepository.findByMail(email);
    if (checkUserExists) {
      throw new AppError('Email address already exist');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
