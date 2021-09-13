import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

export class ListUsersService {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async execute() {
    const users = await this.usersRepository.list()

    return users
  }
}