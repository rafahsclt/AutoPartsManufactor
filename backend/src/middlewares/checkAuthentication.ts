import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'

interface IPayload {
  sub: string
}

export async function checkAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [_, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, 'bc980cfc3b7d6dbba09205904c5e2789') as IPayload
    
    request.user = user_id

    next()
  } catch(err) {
    throw new AppError('Invalid Token', 401)
  }
}