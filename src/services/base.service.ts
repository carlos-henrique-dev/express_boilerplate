import { wrap } from '@mikro-orm/core';
import { SqlEntityRepository } from '@mikro-orm/postgresql';
import { DefaultItemFilterQuery } from 'interfaces/controller';
import { DEFAULT_FILTER, DEFAULT_PAGINATION } from '../utils';

export class BaseService {
  private connection = {} as SqlEntityRepository<any>;

  constructor(connection: SqlEntityRepository<any>) {
    this.connection = connection;
  }

  getMany = async (pagination = DEFAULT_PAGINATION, relationships?: string[] | []) => {
    const [result, count] = await this.connection.findAndCount(
      { deleted: false },
      // @ts-ignore
      { ...pagination, populate: relationships },
    );

    return {
      data: result,
      total: count,
    };
  };

  getOne = async (
    filter: DefaultItemFilterQuery = DEFAULT_FILTER,
    relationships?: string[] | [],
  ) => {
    return this.connection.findOneOrFail(
      { [filter.field]: filter.value, deleted: false },
      // @ts-ignore
      { populate: relationships },
    );
  };

  create = async (data: any) => {
    const entity = await this.connection.create(data);

    await this.connection.persistAndFlush(entity);

    return entity;
  };

  update = async (entity: any, newData: any) => {
    wrap(entity).assign(newData, { mergeObjects: true });

    await this.connection.flush();

    return entity;
  };

  delete = async (entity: any) => {
    const deletedData = { deleted: true, deletedAt: new Date() };

    return this.update(entity, deletedData);
  };
}
