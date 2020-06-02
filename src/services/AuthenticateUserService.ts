import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';

interface Response {
  user: Users;
  token: string;
}

interface Request {
  email: string;
  password: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
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
    if (!passwordMatched) {
      throw new Error('Incorrect  email/password combination');
    }

    const token = sign({}, '4156bb586ce4ca0258d82e7d58bef62f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
