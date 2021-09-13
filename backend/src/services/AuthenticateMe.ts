import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

interface IRequest {
  user_id: string
}

interface IResponse {
  user: {
    name: string
    email: string
    isAdmin: boolean
  }
}

export class AuthenticateMe {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.show(user_id)

    if(!user) {
      throw new AppError('User not found.')
    }

    const response = {
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }

    return response
  }
}