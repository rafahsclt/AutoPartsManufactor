import { IMachinesRepository } from '../repositories/types/IMachinesRepository'
import { MachinesRepository } from '../repositories/MachinesRepository'

interface IRequest {
  machine_id: string
}

export class DeleteMachineService {
  private machinesRepository: IMachinesRepository

  constructor() {
    this.machinesRepository = new MachinesRepository()
  }

  public async execute({ machine_id }: IRequest) {
    const machine = await this.machinesRepository.delete(machine_id)

    return machine
  }
}