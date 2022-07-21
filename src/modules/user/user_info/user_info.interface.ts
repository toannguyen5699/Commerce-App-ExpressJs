import { UserInfo } from './user_info.entity';

export type UserInfoModel = UserInfo;

export interface RegisterAccount {
  userName: string;
  password: string;
}
