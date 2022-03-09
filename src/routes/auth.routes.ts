import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService, UserService } from '../services';
import { AuthController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { authRequirements } from '../validators';

const router = express.Router();

const AuthRoutes = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['UserRepository'];

  const userService = new UserService(connection);
  const roleService = new RoleService(connection);

  const authController = new AuthController(userService, roleService);

  router.post('/sign-in', authRequirements, authController.signIn);

  return router;
};
export default AuthRoutes;
