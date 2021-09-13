import { getMongoRepository, MongoRepository } from "typeorm"
import { ObjectId } from 'mongodb'

import { IMachinesRepository, ICreateMachineDTO, IUpdateMachineDTO } from './types/IMachinesRepository'
import { Machine } from '../schemas/Machine'
import { deleteFile } from '../utils/file'

export class MachinesRepository implements IMachinesRepository {
  private ormRepository: MongoRepository<Machine>

  constructor() {
    this.ormRepository = getMongoRepository(Machine)
  }

  public async create({ name, image, owner, model, status, health_level, unit, image_url }: ICreateMachineDTO) {
    
    const machine = this.ormRepository.create({
      name,
      image,
      owner,
      model,
      status,
      health_level,
      unit,
      image_url
    })

    await this.ormRepository.save(machine);

    return machine
  }

  public async list(): Promise<Machine[]> {
    const machines = await this.ormRepository.find()

    return machines
  }

  public async update({ machine_id, name, image, owner, model, status, health_level, unit}: IUpdateMachineDTO): Promise<Machine> {
    const machine = await this.ormRepository.findOne(machine_id)

    const changes = { }

    if(name) Object.assign(changes, { name })
    if(owner) Object.assign(changes, { owner })
    if(model) Object.assign(changes, { model })
    if(status) Object.assign(changes, { status })
    if(health_level) Object.assign(changes, { health_level })
    if(unit) Object.assign(changes, { unit })
    if(image) {
      if(machine.image) {
        await deleteFile(`./tmp/${machine.image}`)
      }
      Object.assign(changes, { image, image_url: `http://localhost:3000/files/${image}` })
    } 

    await this.ormRepository.updateOne(
      { _id: new ObjectId(machine_id)  },
      { $set: { ...changes } },
      { upsert: true }
    )

    const updatedMachine = {
      ...machine,
      ...changes
    }

    return updatedMachine
  }

  public async delete(machine_id: string): Promise<void> {
    const machine = await this.ormRepository.findOne(machine_id)

    await this.ormRepository.deleteOne(machine)
  }

  public async show(machine_id: string): Promise<Machine> {
    const machine = await this.ormRepository.findOne(machine_id)

    return machine
  }
}