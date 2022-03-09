import { Request, Response } from 'express';
import { BaseService } from '../services/base.service';
import { parsePagination, parseFilter, parseId } from '../utils/services';

export class BaseController {
  service = {} as BaseService;
  relationships: string[] | [] = [];

  constructor(service: any, relationships: string[] | [] = []) {
    this.relationships = relationships;
    this.service = service;
  }

  getAll = async (req: Request, res: Response) => {
    const pagination = parsePagination(req.query);

    try {
      const result = await this.service.getMany(pagination, this.relationships);

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.log('getAll Error', error);

      res.status(500).json({ message: 'Unable to get the data', success: false });
    }
  };

  getOne = async (req: Request, res: Response) => {
    const filter = parseFilter(req.query);

    try {
      const result = await this.service.getOne(filter, this.relationships);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log('getOne Error', error);

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
