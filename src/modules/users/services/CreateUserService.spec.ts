import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

interface IError {
  message: string;
  status: number;
}

describe('CreateUser', () => {
  it('should be able create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with email from another', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
