import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppError';

import { IUsersRepository } from '../repositories/types/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'

interface IRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  isAdmin: boolean,
  company_id: string
}

export class CreateUserService {
  private usersRepository: IUsersRepository
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.usersRepository = new UsersRepository()
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ name, email, password, password_confirmation, isAdmin = false, company_id }: IRequest) {
    const foundCompany = await this.companiesRepository.show(company_id)

    if(!foundCompany) {
      throw new AppError('Company does not exist')
    }

    const foundUser = await this.usersRepository.findByEmail(email)

    if(foundUser) {
      throw new AppError('Email already exist')
    }

    if(password !== password_confirmation) {
      throw new AppError('Password is not equal to password confirmation!')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: !isAdmin && false,
      company: foundCompany
    })

    delete user.password

    return user
  }
}