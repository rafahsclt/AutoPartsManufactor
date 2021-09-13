import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Company } from './Company'

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: null })
  avatar: string

  @Column({ default: null })
  avatar_url: string

  @Column(type => Company)
  company: Company

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}