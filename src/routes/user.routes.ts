import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService, UserService } from '../services';
import { UserController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { userBodyRequirements, queryRequirements, passwordValidator } from '../validators';

const router = express.Router();

const UserRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['UserRepository'];

  const userService = new UserService(connection);
  const roleService = new RoleService(connection);

  const userController = new UserController(userService, roleService);

  router.get('/', userController.getAll);

  router.get('/find', queryRequirements, userController.getOne);

  router.post('/', [...userBodyRequirements, ...passwordValidator], userController.create);

  router.put('/:id', [...queryRequirements, ...userBodyRequirements], userController.update);

  router.delete('/:id', queryRequirements, userController.delete);

  return router;
};
export default UserRoute;
