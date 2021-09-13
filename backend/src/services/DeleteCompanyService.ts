import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'

interface IRequest {
  company_id: string
}

export class DeleteCompanyService {
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ company_id }: IRequest) {
    const company = await this.companiesRepository.delete(company_id)

    return company
  }
}