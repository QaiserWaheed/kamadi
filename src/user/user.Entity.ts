import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 

@Entity()

export class User{

@PrimaryGeneratedColumn()
id: number

@Column()
userEmail: string

@Column()
userName: string

@Column()
userPassword: string

 @Column()
 otp: number

 @Column()
 status: string
}

