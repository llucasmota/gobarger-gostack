import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

interface IError {
  message: string;
  status: number;
}

describe('CreateUser', () => {
  it('should be able authenticateUser', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
    );
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });
    const response = await authenticateUserService.execute({
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
