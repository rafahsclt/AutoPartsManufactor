import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'

export class ListCompaniesService {
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute() {
    const companies = await this.companiesRepository.list()

    return companies
  }
}