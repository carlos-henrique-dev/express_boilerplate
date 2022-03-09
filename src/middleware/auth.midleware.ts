import { Request, NextFunction, Response } from 'express';
import { TokenService } from '../utils';

export const Authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization || '';

    if (!token) {
      throw new Error('Token not provided');
    }

    const splitToken = token.split(' ')[1];

    const validateToken = new TokenService().validateToken(splitToken);

    if (!validateToken) {
      throw new Error('Invalid Token');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `User not authenticated: ${error}`,
    });
  }
};
