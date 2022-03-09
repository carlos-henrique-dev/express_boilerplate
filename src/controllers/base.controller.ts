import { Request, Response } from 'express';
import { DEFAULT_FILTER, DEFAULT_PAGINATION } from '../utils';
import { BaseService } from '../services/base.service';
import { DefaultItemFilterQuery, DefaultPagination } from '../interfaces/controller';

const parsePagination = (query: Request['query']): DefaultPagination => {
  const { limit, offset } = query || DEFAULT_PAGINATION;

  return {
    limit: Number(limit),
    offset: Number(offset),
  };
};

const parseFilter = (query: Request['query']): DefaultItemFilterQuery => {
  const { field, value } = query || DEFAULT_FILTER;

  const parseField = typeof field === 'string' ? field : 'id';
  const parseValue = typeof value === 'string' || typeof value === 'number' ? value : 0;

  return { field: parseField, value: parseValue };
};

const parseId = (params: Request['params']) => {
  let id = 0;

  if (params && params.id) {
    id = Number(params.id);
  }

  return id;
};

export class BaseController {
  service = {} as BaseService;

  constructor(service: any) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response) => {
    const pagination = parsePagination(req.query);

    try {
      const result = await this.service.getMany(pagination);

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.log('getAll Error', error);

      res.status(500).json({ message: 'Unable to get the data', success: false });
    }
  };

  getOne = async (req: Request, res: Response) => {
    const filter = parseFilter(req.query);

    try {
      const result = await this.service.getOne(filter);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log('getAll Error', error);

      res.status(500).json({ message: 'Unable to get the data', success: false });
    }
  };

  delete = async (req: Request, res: Response) => {
    const entityId = parseId(req.params);

    try {
      const findEntity = await this.service.getOne({ field: 'id', value: entityId });

      await this.service.delete(findEntity);

      res.status(200).send({ success: true });
    } catch (error) {
      console.log('Delete Error Item', error);

      res.status(500).send({ message: 'Unable do delete this item', success: false });
    }
  };
}
