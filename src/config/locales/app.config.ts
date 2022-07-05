import { normalize } from 'path';
import { AppConfig } from '../../common/interface/app-config.interface';
import { AppEnvironment } from '../../common/interface/app-environment.interface';

const setupEnvironment = (): AppEnvironment => {
  const mode = process.env.NODE_ENV ?? 'production';
  return require(`../environments/${mode}.env`).ENV;
};

export default {
  ROOT: normalize(__dirname + '../'),
  ENV: setupEnvironment(),
} as AppConfig;
