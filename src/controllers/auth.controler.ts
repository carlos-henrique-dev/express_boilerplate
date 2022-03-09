import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { validationResult } from 'express-validator';
import { BaseService } from '../services/base.service';
import { PasswordService, TokenService } from '../utils';

export class AuthController extends BaseController {
  roleService = {} as BaseService;

  constructor(userService: any, roleService: any) {
    super(userService, ['role']);

    this.roleService = roleService;
  }

  signIn = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const getUser = await this.service.getOne({ field: 'email', value: email }, ['role']);

      if (!getUser) {
        throw new Error('User not found. Email or password invalid');
      }

      const { password: hashedPassword, id, role, ...rest } = getUser;

      if (!new PasswordService().verify(hashedPassword, password)) {
        throw new Error('Invalid credentials');
      }

      const payload = {
        user: { id: getUser.id, name: getUser.name },
        role: { id: getUser.role.id, slug: getUser.role.slug },
      };
      const [token, refreshToken] = new TokenService().generateTokens(payload);

      res.status(201).json({
        success: true,
        data: {
          user: rest,
          token,
          refreshToken,
        },
      });
    } catch (error: any) {
      console.log('SignIn user error', error);

      res.status(500).json({
        success: false,
        message: 'Unable to authenticate user',
      });
    }
  };
}
