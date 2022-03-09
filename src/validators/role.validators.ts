import { body } from 'express-validator';

export const roleBodyRequirements = [
  body('name').not().isEmpty().trim().escape().withMessage('Field "name" Is required!'),
  body('slug').not().isEmpty().trim().escape().withMessage('Field "slug" Is required!'),
];

