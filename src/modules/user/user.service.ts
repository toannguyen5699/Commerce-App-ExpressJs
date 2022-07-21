import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ParamsCommonList } from '../../common/interface';
import { ErrorHandler } from '../../libs/error';
import { UserRepository } from './user.repository';
import { UserInfo } from './user_info/user_info.entity';
import { UserInfoModel } from './user_info/user_info.interface';

export class UserService {
  private static instance: UserService;
  private userRepository: UserRepository;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    this.userRepository = getCustomRepository(UserRepository);
    UserService.instance = this;
  }

  async detailByConditions(params: ParamsCommonList): Promise<UserInfoModel> {
    return this.userRepository.detailByConditions(params);
  }

  async getUserByConditions(params: ParamsCommonList): Promise<UserInfoModel> {
    const userFound = await this.detailByConditions(params);

    if (!userFound) {
      throw new ErrorHandler({ message: 'userNotFound' });
    }

    if (userFound.status === AppObject.COMMON_STATUS.UNVERIFIED) {
      throw new ErrorHandler({ message: 'accountUnverified' });
    }

    if (userFound.status === AppObject.COMMON_STATUS.INACTIVE) {
      throw new ErrorHandler({ message: 'accountInactive' });
    }

    return userFound;
  }

  async create(params) {
    const userNameExists = await this.userRepository.count({
      where: { userName: params.userName },
    });

    if (userNameExists > 0) {
      throw new ErrorHandler({ message: 'userNameExist' });
    }

    const user = new UserInfo();
    user.userName = params.userName;
    user.password = params.password;
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async getById() {}

  async list() {
    console.log('get user list');
  }

  async getProfile(userId) {
    return this.getUserByConditions({ conditions: { id: userId } });
  }
}
