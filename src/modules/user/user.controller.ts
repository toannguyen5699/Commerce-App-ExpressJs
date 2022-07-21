import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  //#region Admin section
  async create(req: Request, res: Response): Promise<any> {
    console.log(req.body);
    return res.handler(this.userService.create(req.body));
  }

  async list(req: Request, res: Response): Promise<any[]> {
    return res.handler(this.userService.list());
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
