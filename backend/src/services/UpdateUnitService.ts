import { IUnitsRepository, IUpdateUnitDTO } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'
import { ICompaniesRepository } from '../repositories/types/ICompaniesRepository'
import { CompaniesRepository } from '../repositories/CompaniesRepository'
import { AppError } from '../errors/AppError'

export class UpdateUnitService {
  private unitsRepository: IUnitsRepository
  private companiesRepository: ICompaniesRepository

  constructor() {
    this.unitsRepository = new UnitsRepository()
    this.companiesRepository = new CompaniesRepository()
  }

  public async execute({ unit_id, local, company_id = undefined }: IUpdateUnitDTO) {
    let company = undefined

    if(company_id) {
      company = await this.companiesRepository.show(company_id)

      if(!company) {
        throw new AppError('Company does not exist')
      }
    }

    const unit = await this.unitsRepository.update({ unit_id, local, company })

    return unit
  }
}