import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [_, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, 'bc980cfc3b7d6dbba09205904c5e2789') as IPayload

    request.user = user_id
    
    const usersRepository = new UsersRepository()

    const user = await usersRepository.show(user_id)

    if(!user) {
      throw new AppError('User does not exist', 401)
    }

    next()
  } catch(err) {
    throw new AppError('Invalid Token', 401)
  }
}