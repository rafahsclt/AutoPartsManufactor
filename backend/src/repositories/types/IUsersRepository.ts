import { User } from '../../schemas/User'
import { Company } from '../../schemas/Company'

export interface ICreateUserDTO {
  name: string
  email: string
  password: string
  isAdmin: boolean
  company: Company
}

export interface IUpdateUserDTO {
  user_id: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  isAdmin?: boolean
  company?: Company
  company_id?: string
}


export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  list(): Promise<User[]>
  update(data: IUpdateUserDTO): Promise<User>
  delete(user_id: string): Promise<void> 
  show(user_id: string): Promise<User>
  findByEmail(email: string): Promise<User>
}