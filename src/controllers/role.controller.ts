import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { validationResult } from 'express-validator';

export class RoleController extends BaseController {
  create = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, slug } = req.body;

    try {
      const data = {
        name,
        slug,
      };

      const role = await this.service.create(data);

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
}
