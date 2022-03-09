import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { validationResult } from 'express-validator';
import { parsePagination } from '../utils/services';
import { CacheService } from '../services/cache';
import slugify from 'slug';

export class RoleController extends BaseController {
  create = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cacheClient = await new CacheService();

    const { name, slug } = req.body;

    try {
      const data = {
        name,
        slug,
      };

      const newSlug = slugify(slug, '_');
      const roleExists = await this.service.getOne({ field: 'slug', value: newSlug });
      if (roleExists) {
        throw new Error('There is already a role with this slug');
      }

      const role = await this.service.create(data);

      await cacheClient.deleteValue('roles');

      res.status(201).json({
        success: true,
        data: role,
      });
    } catch (error: any) {
      console.log('Create role error', error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, slug } = req.body;

    const cacheClient = await new CacheService();

    try {
      const findRole = await this.service.getOne({ field: 'id', value: id });

      if (!findRole) {
        throw new Error('No role found for this ID');
      }

      const data = {
        name,
        slug,
      };

      const newRole = await this.service.update(findRole, data);

      await cacheClient.deleteValue('roles');

      res.status(201).json({
        success: true,
        data: newRole,
      });
    } catch (error: any) {
      console.log('Update role error', error);

      res.status(500).json({
        success: false,
        message: 'Unable do create role',
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const cacheClient = await new CacheService();
      const getCachedRoles = await cacheClient.getValue('roles');

      if (getCachedRoles) {
        console.log('⏳ Returning cached roles... ');
        res.status(200).json({ success: true, ...getCachedRoles });
        return;
      }

      const pagination = parsePagination(req.query);

      const result = await this.service.getMany(pagination, this.relationships);

      await cacheClient.setValue('roles', result);

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.log('getAll Error', error);

      res.status(500).json({ message: 'Unable to get the data', success: false });
    }
  };
}
