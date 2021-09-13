import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

interface IRequest {
  user_id: string
}

export class DeleteUserService {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async execute({ user_id }: IRequest) {
    const user = await this.usersRepository.delete(user_id)

    console.log(user)

    return user
  }
}