import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column({ unique: true })
	email!: string

	@Column()
	password!: string

	@Column()
	firstName!: string

	@Column()
	lastName!: string

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date
}
