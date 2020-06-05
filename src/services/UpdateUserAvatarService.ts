import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new Error('Only authenticated users can change avatar');
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
