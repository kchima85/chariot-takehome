import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 3, nullable: false })
  currency: string;

  @Column({ type: 'date', nullable: false, name: 'scheduled_date' })
  scheduledDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  recipient: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'pending' })
  status: string;
}
