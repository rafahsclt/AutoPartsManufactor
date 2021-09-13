import { IMachinesRepository } from '../repositories/types/IMachinesRepository'
import { MachinesRepository } from '../repositories/MachinesRepository'

interface IRequest {
  machine_id: string
}

export class ShowMachineService {
  private machinesRepository: IMachinesRepository

  constructor() {
    this.machinesRepository = new MachinesRepository()
  }

  public async execute({ machine_id }: IRequest) {
    const machine = await this.machinesRepository.show(machine_id)

    return machine
  }
}