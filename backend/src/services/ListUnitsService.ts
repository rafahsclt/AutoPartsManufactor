import { IUnitsRepository } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'

export class ListUnitsService {
  private unitsRepository: IUnitsRepository

  constructor() {
    this.unitsRepository = new UnitsRepository()
  }

  public async execute() {
    const units = await this.unitsRepository.list()

    return units
  }
}