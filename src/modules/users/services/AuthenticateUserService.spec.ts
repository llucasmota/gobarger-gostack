import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import HashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';

interface IError {
  message: string;
  status: number;
}

describe('CreateUser', () => {
  it('should be able authenticateUser', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new HashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      hashProvider,
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

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should be not able authenticateUser with invalid user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new HashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      hashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'john.secada@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be not able authenticateUser with invalid password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new HashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      hashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      hashProvider,
    );
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'john.doe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
