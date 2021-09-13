import { Unit } from '../../schemas/Unit'
import { Company } from '../../schemas/Company'

export interface ICreateUnitDTO {
  local: string
  company: Company
}

export interface IUpdateUnitDTO {
  unit_id: string
  local?: string
  company?: Company
  company_id?: string
}


export interface IUnitsRepository {
  create(data: ICreateUnitDTO): Promise<Unit>
  list(): Promise<Unit[]>
  update(data: IUpdateUnitDTO): Promise<Unit>
  delete(unit_id: string): Promise<void> 
  show(unit_id: string): Promise<Unit>
}