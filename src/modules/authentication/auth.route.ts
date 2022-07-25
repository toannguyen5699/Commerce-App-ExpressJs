import { expressRouter, indexRouter } from '../../common/router';
import { AuthController } from './auth.controller';

const authController = new AuthController();

//Login
indexRouter.post('/auth/login', [authController.login.bind(authController)]);

// Register
indexRouter.post('/auth/register', [
  authController.register.bind(authController),
]);

export default expressRouter;
