import { Request, Response } from 'express';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  create = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
      if (!name || !email) {
        throw new Error(
          'Required fields missing. Please check if you are sending the fields "name" and "email"',
        );
      }

      const data = {
        name,
        email,
      };

      const user = await this.service.create(data);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.log('Create user error', error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      if (!id) {
        throw new Error('You need to provide the ID of the entity to update');
      }

      if (!name || !email) {
        throw new Error(
          'Required fields missing. Please check if you are sending the fields "name" and "email"',
        );
      }

      const findUser = await this.service.getOne({ field: 'id', value: id });

      if (!findUser) {
        throw new Error('No user found for this ID');
      }

      const data = {
        name,
        email,
      };

      const newUser = await this.service.update(findUser, data);

      res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (error: any) {
      console.log('Update user error', error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}
