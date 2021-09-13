import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
    isAdmin: boolean
  },
  token: string
}

export class AuthenticateUser {
  private usersRepository: IUsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({ isAdmin: user.isAdmin,  }, 'bc980cfc3b7d6dbba09205904c5e2789', {
      subject: String(user.id),
      expiresIn: "1d"
    })

    const response = {
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
    }

    return response
  }
}