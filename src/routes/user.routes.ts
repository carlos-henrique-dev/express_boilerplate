import express from 'express';
import { CustomDatabaseConnector } from 'interfaces/database';
import { UserService } from '../services';
import { UserController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';

const router = express.Router();

const UserRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['UserRepository'];

  const userService = new UserService(connection);

  const userController = new UserController(userService);

  router.get('/', userController.getAll);

  router.get('/find', userController.getOne);

  router.post('/', userController.create);

  router.put('/:id', userController.update);

  router.delete('/:id', userController.delete);

  return router;
};
export default UserRoute;
