import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'

interface IRequest {
  name: string
}

export class CreateCompanyService {
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ name }: IRequest) {
    const company = await this.companiesRepository.create({
      name
    })

    return company
  }
}