import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService } from '../services';
import { RoleController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { queryRequirements, roleBodyRequirements } from '../validators';
import { Authorization } from '../middleware';

const router = express.Router();

const RoleRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['RoleRepository'];

  const userService = new RoleService(connection);

  const roleController = new RoleController(userService);

  router.get('/', Authorization, roleController.getAll);

  router.get('/find',Authorization, queryRequirements, roleController.getOne);

  router.post('/', Authorization, roleBodyRequirements, roleController.create);

  router.put(
    '/:id',
    Authorization,
    [...queryRequirements, ...roleBodyRequirements],
    roleController.update,
  );

  router.delete('/:id', Authorization, queryRequirements, roleController.delete);

  return router;
};
export default RoleRoute;
