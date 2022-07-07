import { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import APP_CONFIG from './app.config';
import { ErrorHandler } from '../libs/error';
import i18n from './i18n.config';

export const expressConfig = (app: Application): void => {
  app.use(helmet()); // Security
  app.use(cors());
  app.use(compression()); // Zip data but incre time request
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(morgan('dev')); // request logger
  app.use(i18n.init);
  app.use(cookieParser(APP_CONFIG.ENV.SECURE.COOKIE_SECRET_KEY));

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ErrorHandler) {
      return res.error(err);
    }
  });
};
