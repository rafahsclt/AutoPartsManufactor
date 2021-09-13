import { IUnitsRepository } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'
import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'
import { AppError } from '../errors/AppError'

interface IRequest {
  local: string
  company_id: string
}

export class CreateUnitService {
  private unitsRepository: IUnitsRepository
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.unitsRepository = new UnitsRepository()
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ local, company_id }: IRequest) {
    const company = await this.companiesRepository.show(company_id)

    if(!company) {
      throw new AppError('Company does not exist')
    }
    
    const unit = await this.unitsRepository.create({
      local,
      company
    })

    return unit
  }
}