import { Request, Response } from 'express'

import { CreateUserService } from '../services/CreateUserService'
import { DeleteUserService } from '../services/DeleteUserService'
import { ShowUserService } from '../services/ShowUserService'
import { UpdateUserService } from '../services/UpdateUserService'
import { UpdateAvatarService } from '../services/UpdateAvatarService'
import { ListUsersService } from '../services/ListUsersService'

export class UserController {
  public async read(req: Request, resp: Response) {
    try {
      const { id } = req.params

      const showUserService = new ShowUserService()

      const user = await showUserService.execute({
        user_id: id
      })

      return resp.status(200).json(user)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
    
  }

  public async create(req: Request, resp: Response) {
    try {
      const { name, email, password, password_confirmation, isAdmin, company_id } = req.body

      const createUserService = new CreateUserService()

      const user = await createUserService.execute({
        name,
        email,
        password,
        password_confirmation,
        isAdmin,
        company_id
      })

      return resp.status(201).json(user)
    }
    catch (err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async list(req: Request, resp: Response) {
    try {
      const listUsersService = new ListUsersService()
  
      const users = await listUsersService.execute()
  
      return resp.status(200).json(users)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async update(req: Request, resp: Response) {
    try {
      const { id } = req.params
      const { name, email, password, isAdmin, company_id } = req.body
  
      const updateUserService = new UpdateUserService()
  
      const user = await updateUserService.execute({
        user_id: id,
        name,
        email,
        password,
        isAdmin,
        company_id,
      })
  
      return resp.status(200).json(user)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const deleteUserService = new DeleteUserService()
  
      const user = await deleteUserService.execute({
        user_id: id
      })
  
      return resp.status(204).json(user)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async updateAvatar(req: Request, resp: Response) {
    try {
      const { id } = req.params
      const avatarFile = req.file
  
      const updateAvatarService = new UpdateAvatarService()
  
      const user = await updateAvatarService.execute({
        user_id: id,
        avatarFile
      })
  
      return resp.status(200).json(user)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }
}