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
      name: 'Lucas',
      email: 'lucas.o.mota@gmail.com',
      password: 'rA21343639',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);
    await createUserService.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
