import { getMongoRepository, MongoRepository } from "typeorm"
import { ObjectId } from 'mongodb'

import { IUsersRepository, ICreateUserDTO, IUpdateUserDTO } from './types/IUsersRepository'
import { User } from '../schemas/User'
import { deleteFile } from '../utils/file'

export class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(User)
  }

  public async create({ name, email, password, isAdmin = false, company }: ICreateUserDTO) {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      isAdmin,
      company
    })
 
    await this.ormRepository.save(user);

    return user
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.find()

    return users
  }

  public async update({ user_id, email, name, password, avatar, isAdmin, company }: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.findOne(user_id)

    const changes = { }

    if(name) Object.assign(changes, { name })
    if(email) Object.assign(changes, { email })
    if(password) Object.assign(changes, { password })
    if(isAdmin) Object.assign(changes, { isAdmin })
    if(company) Object.assign(changes, { company })
    
    if(avatar) {
      if(user.avatar) {
        await deleteFile(`./tmp/avatar/${user.avatar}`)
      }

      Object.assign(changes, { avatar, avatar_url: `http://localhost:3000/avatar/${avatar}` })
    }

    await this.ormRepository.updateOne(
      { _id: new ObjectId(user_id)  },
      { $set: { ...changes } },
      { upsert: true }
    )

    const updatedUser = {
      ...user,
      ...changes
    }

    return updatedUser
  }

  public async delete(user_id: string): Promise<void> {
    const user = this.ormRepository.findOne(user_id)

    await this.ormRepository.deleteOne(user)
  }

  public async show(user_id: string): Promise<User> {
    const user = await this.ormRepository.findOne(user_id)

    return user
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { email }})

    return user
  }
}