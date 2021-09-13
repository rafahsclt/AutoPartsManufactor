import { hash } from 'bcryptjs';

import { IUsersRepository, IUpdateUserDTO } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'
import { AppError } from '../errors/AppError';

export class UpdateUserService {
  private usersRepository: IUsersRepository
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.usersRepository = new UsersRepository()
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ 
    user_id,
    email =  undefined,
    name = undefined,
    password = undefined,
    company_id = undefined
  }: IUpdateUserDTO) {
    let hashedPassword = undefined
    let company = undefined

    if(password) {
      hashedPassword = await hash(password, 8)
    }

    if(company_id) {
      company = await this.companiesRepository.show(company_id)

      if(!company) {
        throw new AppError('Company does not exist')
      }
    }

    const user = await this.usersRepository.update({ 
      user_id,
      name,
      email,
      password: hashedPassword,
      company
    })

    delete user.password

    return user
  }
}