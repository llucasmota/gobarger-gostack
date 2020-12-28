import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
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
    await userRepository.save(user);
    return user;
  }
}
