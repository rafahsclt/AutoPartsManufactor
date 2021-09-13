import { IMachinesRepository } from '../repositories/types/IMachinesRepository'
import { MachinesRepository } from '../repositories/MachinesRepository'
import { IUnitsRepository } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'
import { AppError } from '../errors/AppError'

interface IRequest {
  name: string
  image: Express.Multer.File
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  unit_id: string
}

export class CreateMachineService {
  private machinesRepository: IMachinesRepository
  private unitsRepository: IUnitsRepository

  constructor() {
    this.machinesRepository = new MachinesRepository()
    this.unitsRepository = new UnitsRepository()
  }

  public async execute({ name, image, description, model, owner, status, health_level, unit_id }: IRequest) {
    const unit = await this.unitsRepository.show(unit_id)

    if(!unit) {
      throw new AppError('Unit does not exist')
    }

    const imageData = {}

    if(image) {
      Object.assign(imageData, { 
        image: image.filename,
        image_url: `https://localhost:3333/files/${image.filename}`
      })
    }

    const machine = await this.machinesRepository.create({
      name,
      description,
      model,
      owner,
      status,
      health_level: Number(health_level),
      unit,
      ...imageData
    })

    return machine
  }
}