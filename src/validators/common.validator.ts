import { param } from 'express-validator';

export const queryRequirements = [
  param('id').not().isEmpty().withMessage('You need to provide an Id'),
];
