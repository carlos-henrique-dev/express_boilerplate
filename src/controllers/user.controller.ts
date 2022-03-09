import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { validationResult } from 'express-validator';
import { BaseService } from 'services/base.service';

export class UserController extends BaseController {
  roleService = {} as BaseService;

  constructor(userService: any, roleService: any) {
    super(userService, ['role']);

    this.roleService = roleService;
  }

  create = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, roleId } = req.body;

    try {
      const data = {
        name,
        email,
        password,
        role_id: roleId,
      };
      //  const [token, refreshToken] = context.tokenService.generateTokens({ id, role: slug });
      //   const [newToken, newRefreshToken] = context.tokenService.generateTokens({ id, role: slug })

      const getUserRole = await this.roleService.getOne({ field: 'id', value: roleId });

      if (!getUserRole) {
        throw new Error('Unable to find a role with the provided Id');
      }

      const user = await this.service.create({ ...data, role: getUserRole });

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.log('Create user error', error);

      res.status(500).json({
        success: false,
        message: 'Unable to create User',
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
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
