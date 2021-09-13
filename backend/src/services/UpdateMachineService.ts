import { IMachinesRepository } from '../repositories/types/IMachinesRepository'
import { MachinesRepository } from '../repositories/MachinesRepository'
import { IUnitsRepository } from '../repositories/types/IUnitsRepository'
import { UnitsRepository } from '../repositories/UnitsRepository'
import { AppError } from '../errors/AppError'

interface IRequest {
  machine_id: string
  name: string
  image: Express.Multer.File
  description: string
  model: string
  owner: string
  status: string
  health_level: number
  unit_id: string
}

export class UpdateMachineService {
  private machinesRepository: IMachinesRepository
  private unitsRepository: IUnitsRepository

  constructor() {
    this.machinesRepository = new MachinesRepository()
    this.unitsRepository = new UnitsRepository()
  }

  public async execute({ 
    machine_id, 
    name = undefined, 
    description = undefined,
    owner = undefined,
    model = undefined,
    status = undefined,
    image = undefined, 
    health_level = undefined,
    unit_id = undefined,
  }: IRequest) {
    let unit = undefined

    if(unit_id) {
      unit = await this.unitsRepository.show(unit_id)

      if(!unit) {
        throw new AppError('Unit does not exist.')
      }
    }

    const imageData = {}

    if(image) {
      Object.assign(imageData, {
        image: image.filename,
        image_url: `https://localhost:3333/files/${image.filename}`
      })
    }
    
    const machine = await this.machinesRepository.update({ 
      machine_id,
      name,
      description,
      owner,
      model,
      status,
      health_level,
      ...imageData
    })

    return machine
  }
}