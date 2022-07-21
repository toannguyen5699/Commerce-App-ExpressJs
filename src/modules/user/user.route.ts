import { expressRouter, indexRouter } from '../../common/router';
import { UserController } from './user.controller';

const userController = new UserController();

indexRouter.post('/users', [userController.create.bind(userController)]);

indexRouter.get('/admin/users', [userController.create.bind(userController)]);

indexRouter.patch('/profile/:id', [userController.create.bind(userController)]);

export default expressRouter;
