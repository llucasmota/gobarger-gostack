import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Users from '../models/Users';

interface Request {
  email: string;
  password: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<void> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Incorrect  email/password combination');
    }
    const passwordMatched = await compare(password, user.password);
    if (!password) {
      throw new Error('Incorrect  email/password combination');
    }
  }
}
