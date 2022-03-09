import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User, Role } from 'models';

// getRepository<T extends AnyEntity<T>, U extends EntityRepository<T> = EntityRepository<T>>(entityName: EntityName<T>): GetRepository<T, U>;

export type CustomDatabaseConnector = MikroORM<IDatabaseDriver<Connection>> & {
  UserRepository: EntityRepository<User>;
  RoleRepository: EntityRepository<Role>;
  [key: string]: EntityRepository<any>;
};
