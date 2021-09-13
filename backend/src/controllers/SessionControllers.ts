import { request, Request, response, Response } from 'express'
import { AuthenticateUser } from '../services/AuthenticateUser'
import { AuthenticateMe } from '../services/AuthenticateMe'

export class SessionController {
  public async handle(req: Request, resp: Response) {
    try {
      const { email, password } = req.body
  
      const authenticateUser = new AuthenticateUser()
  
      const token = await authenticateUser.execute({
        email,
        password
      })
  
      return resp.status(200).json(token)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async self(req: Request, resp: Response) {
    try {
      const user_id = req.user

      const authenticateMe = new AuthenticateMe()

      const user = await authenticateMe.execute({ user_id })

      return resp.status(200).json(user)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }
}