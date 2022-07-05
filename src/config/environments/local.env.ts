import { AppEnvironment } from '../../common/interface/app-environment.interface';

export const ENV: AppEnvironment = {
  NAME: 'local',
  APP: {
    PORT: 8080,
  },
  SECURE: {
    COOKIE_SECRET_KEY: 'local-cookie#123456a@A',
    PASSWORD_SECRET_KEY: 'passwordsecretkey#123456a@A',
    JWT_ACCESS_TOKEN: {
      EXPIRED_TIME: 30 * 60,
      SECRET_KEY: 'local-access-token#123456a@A',
    },
    JWT_REFRESH_TOKEN: {
      EXPIRED_TIME: 30 * 60,
      SECRET_KEY: 'local-refresh-token#123456a@A',
    },
  },
  DATABASE: {
    POSTGRES: {
      USERNAME: 'postgres',
      PASSWORD: 'postgres',
      HOST: 'localhost',
      PORT: 5432,
      NAME: 'postgres',
    },
    REDIS: {
      HOST: 'localhost',
      PORT: 6379,
      // PASSWORD: 'mjqobYRnaOkgaa3HS9d4SrNiDsKrlbNO',
      DATABASE: 0,
      // HOST: 'localhost',
      // PORT: 6379,
      // PASSWORD: '',
      // DATABASE: 0,
    },
  },
  // todo
  OAUTH2: {
    GOOGLE: {
      CLIENT_ID: 'aaaa.apps.googleusercontent.com',
      CLIENT_SECRET: 'sdsd',
    },
    FACEBOOK: {
      CLIENT_ID: 'aaaa.apps.googleusercontent.com',
      CLIENT_SECRET: 'sdsd',
    },
  },
};
