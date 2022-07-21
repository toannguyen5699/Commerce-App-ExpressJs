import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfo } from '../user_info/user_info.entity';

@Entity()
export class UserPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  paymentType: string;

  @Column({ type: 'text', nullable: true })
  provider: string;

  @Column({ type: 'text', nullable: true })
  accountNo: string;

  @Column({ type: 'date', nullable: false })
  expiry: Date;

  @OneToOne((type) => UserInfo)
  @JoinColumn()
  user: UserInfo;
}
