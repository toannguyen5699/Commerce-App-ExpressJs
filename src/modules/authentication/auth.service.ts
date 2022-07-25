import { getCustomRepository } from 'typeorm';
import { CookieOptions, Response } from 'express';

import { AppConst, AppObject } from '../../common/consts';
import { ParamsCommonList } from '../../common/interface';
import { ErrorHandler } from '../../libs/error';
import { TokenUtil } from '../../utils/token.util';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { UserInfo } from '../user/user_info/user_info.entity';
import { UserInfoModel } from '../user/user_info/user_info.interface';
import { LoginParams, SignTokenResponse } from './auth.interface';
import APP_CONFIG from '../../utils/app.config';

export class AuthService {
  private static instance: AuthService;
  private userRepository: UserRepository;
  private userService: UserService;
  private tokenUtil: TokenUtil;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.userService = new UserService();
    this.tokenUtil = new TokenUtil();

    this.userRepository = getCustomRepository(UserRepository);
    AuthService.instance = this;
  }

  async login(params: {
    body: LoginParams;
    res: Response;
  }): Promise<SignTokenResponse> {
    let userFound!: UserInfoModel;
    switch (params.body.grantType) {
      // case AppObject.GRANT_TYPES.FACEBOOK: {
      //   const facebookData: FacebookData = await got(
      //     'https://graph.facebook.com/me',
      //     {
      //       method: 'GET',
      //       searchParams: {
      //         fields: [
      //           'id',
      //           'email',
      //           'first_name',
      //           'last_name',
      //           'gender',
      //           'birthday',
      //         ].join(','),
      //         access_token: params.body.token,
      //       },
      //     }
      //   ).json();
      //   userFound = await this.userService.getUserByFacebookId(facebookData);
      //   break;
      // }
      // case AppObject.GRANT_TYPES.GOOGLE: {
      //   break;
      // }
      default: {
        userFound = await this.userService.getUserByConditions({
          conditions: { userName: params.body.userName },
          select: ['id', 'password', 'status'],
        });

        if (!(await userFound.comparePassword(params.body.password))) {
          throw new ErrorHandler({ message: 'wrongPassword' });
        }
        break;
      }
    }

    return this._signToken({ res: params.res, payload: { id: userFound.id } });
  }

  async register(params) {
    const userCreated = await this.userService.create(params);
    return userCreated;
  }

  private _signToken(params: {
    res: Response;
    payload: any;
  }): SignTokenResponse {
    const accessToken = this.tokenUtil.signToken({
      id: params.payload.id,
    });
    // console.log(accessToken);
    this.tokenUtil.signRefreshToken(params.payload.id, params.res);
    return { accessToken: accessToken, tokenType: AppConst.TOKEN_TYPE };
  }
}
