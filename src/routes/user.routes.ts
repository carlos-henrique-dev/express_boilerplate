import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService, UserService } from '../services';
import { UserController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { userBodyRequirements, queryRequirements, passwordValidator } from '../validators';
import { Authorization } from '../middleware';

const router = express.Router();

const UserRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['UserRepository'];

  const userService = new UserService(connection);
  const roleService = new RoleService(connection);

  const userController = new UserController(userService, roleService);

  router.get('/', Authorization, userController.getAll);

  router.get('/find', Authorization, queryRequirements, userController.getOne);

  router.post(
    '/',
    Authorization,
    [...userBodyRequirements, ...passwordValidator],
    userController.create,
  );

  router.put(
    '/:id',
    Authorization,
    [...queryRequirements, ...userBodyRequirements],
    userController.update,
  );

  router.delete('/:id', Authorization, queryRequirements, userController.delete);

  return router;
};
export default UserRoute;
