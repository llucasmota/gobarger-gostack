import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/Users';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private ormRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.ormRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      // deletar avatar anterior
      // criando o caminho que será utilizado para o arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userFileExist = await fs.promises.stat(userAvatarFilePath);
      if (userFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await this.ormRepository.save(user);
    return user;
  }
}
