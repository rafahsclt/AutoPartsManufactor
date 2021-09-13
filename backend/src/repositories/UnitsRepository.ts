import { getMongoRepository, MongoRepository } from "typeorm"
import { ObjectId } from 'mongodb'

import { IUnitsRepository, ICreateUnitDTO, IUpdateUnitDTO } from './types/IUnitsRepository'
import { Unit } from '../schemas/Unit'

export class UnitsRepository implements IUnitsRepository {
  private ormRepository: MongoRepository<Unit>

  constructor() {
    this.ormRepository = getMongoRepository(Unit)
  }

  public async create({ local, company }: ICreateUnitDTO) {
    const unit = this.ormRepository.create({ local, company })

    await this.ormRepository.save(unit);

    return unit
  }

  public async list(): Promise<Unit[]> {
    const companies = await this.ormRepository.find()

    return companies
  }

  public async update({ unit_id, local, company }: IUpdateUnitDTO): Promise<Unit> {
    const unit = await this.ormRepository.findOne(unit_id)

    const changes = { }

    if(local) Object.assign(changes, { local })
    if(company) Object.assign(changes, { company })

    await this.ormRepository.updateOne(
      { _id: new ObjectId(unit_id)  },
      { $set: { ...changes } },
      { upsert: true }
    )

    const updatedUnit = {
      ...unit,
      ...changes
    }

    return updatedUnit
  }

  public async delete(unit_id: string): Promise<void> {
    const unit = await this.ormRepository.findOne(unit_id)

    await this.ormRepository.deleteOne(unit)
  }

  public async show(unit_id: string): Promise<Unit> {
    const unit = await this.ormRepository.findOne(unit_id)

    return unit
  }
}