import { AppError } from '../errors/AppError';
import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

interface IRequest {
  user_id: string
  avatarFile: Express.Multer.File
}

export class UpdateAvatarService {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async execute({ 
    user_id,
    avatarFile =  undefined,
  }: IRequest) {

    if(!avatarFile) {
      throw new AppError('Invalid Format')
    }

    const avatar = avatarFile.filename

    const user = await this.usersRepository.update({ 
      user_id,
      avatar
    })

    delete user.password

    return user
  }
}