import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../libs/extensions/base.repository';
import { UserInfo } from './user_info/user_info.entity';
import { UserInfoModel } from './user_info/user_info.interface';
import { UserPayment } from './user_payment/user_payment.entity';

@EntityRepository(UserInfo)
// @EntityRepository(UserPayment)
export class UserRepository extends BaseRepository<UserInfoModel> {}
