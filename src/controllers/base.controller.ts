import { Request, Response } from 'express';

export class BaseController {
  getAll(req: Request, res: Response) {
    res.status(200).send([]);
  }
}
