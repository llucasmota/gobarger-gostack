import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const checkUserExists = await this.userRepository.findByMail(email);
    if (checkUserExists) {
      throw new AppError('Email address already exist', 400);
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
