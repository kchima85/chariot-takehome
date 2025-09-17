import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
