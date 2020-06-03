import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../config/auth';

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

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
