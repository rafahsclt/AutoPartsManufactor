import { Entity, ObjectID, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('companies')
export class Company {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}