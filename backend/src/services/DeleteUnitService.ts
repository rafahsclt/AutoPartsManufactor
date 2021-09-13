import { IUnitsRepository } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'

interface IRequest {
  unit_id: string
}

export class DeleteUnitService {
  private unitsRepository: IUnitsRepository

  constructor() {
    this.unitsRepository = new UnitsRepository()
  }

  public async execute({ unit_id }: IRequest) {
    const unit = await this.unitsRepository.delete(unit_id)

    return unit
  }
}