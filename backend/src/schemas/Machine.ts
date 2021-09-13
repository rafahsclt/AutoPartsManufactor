import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { Unit } from './Unit'

@Entity('machines')
export class Machine {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  image: string

  @Column()
  image_url: string

  @Column()
  description: string

  @Column()
  model: string

  @Column()
  owner: string

  @Column()
  status: string

  @Column()
  health_level: number

  @Column(type => Unit)
  unit: Unit

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}