import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Company } from './Company'

@Entity('units')
export class Unit {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  local: string

  @Column(type => Company)
  company: Company

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}