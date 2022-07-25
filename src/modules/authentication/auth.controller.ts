import { Request, Response } from 'express';
import { SignTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  //#region User section
  async login(req: Request, res: Response): Promise<SignTokenResponse> {
    return res.handler(this.authService.login({ body: req.body, res: res }));
  }

  async register(req: Request, res: Response) {
    return res.handler(this.authService.register(req.body));
  }
  //#endregion Admin section

  //#region User section
  //#end region User section
}
