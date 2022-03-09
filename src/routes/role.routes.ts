import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService } from '../services';
import { RoleController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { queryRequirements, roleBodyRequirements } from '../validators';

const router = express.Router();

const RoleRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['RoleRepository'];

  const userService = new RoleService(connection);

  const roleController = new RoleController(userService);

  router.get('/', roleController.getAll);

  router.get('/find', queryRequirements, roleController.getOne);

  router.post('/', roleBodyRequirements, roleController.create);

  router.put('/:id', [...queryRequirements, ...roleBodyRequirements], roleController.update);

  router.delete('/:id', queryRequirements, roleController.delete);

  return router;
};
export default RoleRoute;
