import { Request, NextFunction, Response } from 'express';
import { TokenService } from '../utils';

export const Authorization =
  (requiredRoles = ['admin']) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization || '';

      if (!token) {
        throw new Error('Token not provided');
      }

      const splitToken = token.split(' ')[1];

      const decodedToken = new TokenService().decode(splitToken);

      if (!decodedToken?.role) {
        throw new Error('Invalid Token');
      }

      const { role } = decodedToken;

      if (role.slug !== 'admin' && !requiredRoles.includes(role.slug)) {
        throw new Error('User not authorized');
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: `User cannot consume this route: ${error}`,
      });
    }
  };
