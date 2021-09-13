import { Machine } from '../../schemas/Machine'
import { Unit } from '../../schemas/Unit'

export interface ICreateMachineDTO {
  name: string
  image?: string
  image_url?: string
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  unit: Unit
}

export interface IUpdateMachineDTO {
  machine_id: string
  name?: string
  image?: string
  image_url?: string
  description?: string
  model?: string
  owner?: string
  status?: string
  health_level?: number
  unit?: Unit
  unit_id?: string
}


export interface IMachinesRepository {
  create(data: ICreateMachineDTO): Promise<Machine>
  list(): Promise<Machine[]>
  update(data: IUpdateMachineDTO): Promise<Machine>
  delete(machine_id: string): Promise<void> 
  show(machine_id: string): Promise<Machine>
}