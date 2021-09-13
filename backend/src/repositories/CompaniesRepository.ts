import { getMongoRepository, MongoRepository } from "typeorm"
import { ObjectId } from 'mongodb'

import { ICompaniesRepository, ICreateCompanyDTO, IUpdateCompanyDTO } from './types/ICompaniesRepository'
import { Company } from '../schemas/Company'

export class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: MongoRepository<Company>

  constructor() {
    this.ormRepository = getMongoRepository(Company)
  }

  public async create({ name }: ICreateCompanyDTO) {
    const company = this.ormRepository.create({ name })

    await this.ormRepository.save(company);

    return company
  }

  public async list(): Promise<Company[]> {
    const companies = await this.ormRepository.find()

    return companies
  }

  public async update({ company_id, name }: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.ormRepository.findOne(company_id)

    const changes = { }

    if(name) Object.assign(changes, { name })

    await this.ormRepository.updateOne(
      { _id: new ObjectId(company_id)  },
      { $set: { ...changes } },
      { upsert: true }
    )

    const updatedCompany = {
      ...company,
      ...changes
    }

    return updatedCompany
  }

  public async delete(company_id: string): Promise<void> {
    const company = await this.ormRepository.findOne(company_id)

    await this.ormRepository.deleteOne(company)
  }

  public async show(company_id: string): Promise<Company> {
    const company = await this.ormRepository.findOne(company_id)

    return company
  }

  public async findByName(name: string): Promise<Company> {
    const company = await this.ormRepository.findOne({ where: { name }})

    return company
  }
}