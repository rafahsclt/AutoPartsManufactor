import { ICompaniesRepository, IUpdateCompanyDTO } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'


export class UpdateCompanyService {
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ company_id, name }: IUpdateCompanyDTO) {
    const company = await this.companiesRepository.update({ company_id, name })

    return company
  }
}