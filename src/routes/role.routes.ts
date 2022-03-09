import express from 'express';
import { CustomDatabaseConnector } from '../interfaces/database';
import { RoleService } from '../services';
import { RoleController } from '../controllers';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { queryRequirements, roleBodyRequirements } from '../validators';
import { Authentication, Authorization } from '../middleware';

const router = express.Router();

const RoleRoute = (DbConnection: CustomDatabaseConnector) => {
  const connection: SqlEntityRepository<any> = DbConnection['RoleRepository'];

  const userService = new RoleService(connection);

  const roleController = new RoleController(userService);

  router.get('/', Authentication, Authorization(['user']), roleController.getAll);

  router.get(
    '/find',
    Authentication,
    Authorization(['user']),
    queryRequirements,
    roleController.getOne,
  );

  router.post(
    '/',
    Authentication,
    Authorization(['admin']),
    roleBodyRequirements,
    roleController.create,
  );

  router.put(
    '/:id',
    Authentication,
    Authorization(['admin']),
    [...queryRequirements, ...roleBodyRequirements],
    roleController.update,
  );

  router.delete('/:id', Authentication, queryRequirements, roleController.delete);

  return router;
};
export default RoleRoute;
