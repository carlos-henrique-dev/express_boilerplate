import { MikroORM } from '@mikro-orm/core';
import { CustomDatabaseConnector } from '../../interfaces/database';
import * as allModels from '../../models';

export const initializeORM = async () => {
  const Database = {} as CustomDatabaseConnector; //MikroORM<IDatabaseDriver<Connection>>;

  const { em } = await MikroORM.init();

  Database.em = em;

  for (const entityInstance of Object.entries(allModels)) {
    const repository: any = await Database.em.getRepository(entityInstance[0]);

    Database[`${repository.entityName}Repository`] = repository;
  }

  return Database;
};
