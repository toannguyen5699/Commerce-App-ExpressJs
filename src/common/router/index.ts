import { Router } from 'express';
import { RouteOptions } from './router.interface';

export const expressRouter = Router();

export class indexRouter {
  public static get(
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    return indexRouter.router('get', path, fn, options);
  }

  public static post(
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    return indexRouter.router('post', path, fn, options);
  }

  public static put(
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    return indexRouter.router('put', path, fn, options);
  }

  public static patch(
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    return indexRouter.router('patch', path, fn, options);
  }

  public static delete(
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    return indexRouter.router('delete', path, fn, options);
  }

  public static router(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    fn: any[],
    options?: RouteOptions
  ): indexRouter {
    if (options) {
      if (options.allowAnonymous) {
        console.log('Verify token base');
        // fn.unshift('token');
      } else {
        if (options.roles) {
          console.log('Role');
        }
        // fn.unshift('token');
      }
    }
    return expressRouter[method](path, fn);
  }
}
