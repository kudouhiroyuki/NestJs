import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 60 })
  user_name: string

  @Column({ length: 60 })
  password: string

  @Column({ length: 11 })
  department_id: string
}
