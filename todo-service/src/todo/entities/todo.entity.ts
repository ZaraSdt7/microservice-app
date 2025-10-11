import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('todos')
export class TodoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Todo title' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'Implement a new feature for the app' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'in_progress', 'done'] })
  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'done'], default: 'pending' })
  status: 'pending' | 'in_progress' | 'done';

  @ApiProperty({ example: '2b79d17e-4e01-45a8-9507-0e1cf9a4a912' })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
