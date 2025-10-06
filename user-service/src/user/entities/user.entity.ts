import "reflect-metadata";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../common/decorators/roles.decorator";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;


    @Column({ length: 150, unique: true })
    email: string;


    @Column({ select: false }) // never select password by default
    password: string;


    @Column({ type: 'varchar', default: 'user' })
    role: UserRole;


    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;


    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}