import { IMachinesRepository } from '../repositories/types/IMachinesRepository'
import { MachinesRepository } from '../repositories/MachinesRepository'

export class ListMachinesService {
  private machinesRepository: IMachinesRepository

  constructor() {
    this.machinesRepository = new MachinesRepository()
  }

  public async execute() {
    const machines = await this.machinesRepository.list()

    return machines
  }
}