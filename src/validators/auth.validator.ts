import { body } from 'express-validator';

export const authRequirements = [
  body('email')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Field "email" Is required!')
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage('Insert an valid email'),
  body('password')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Field "password" Is required!')
    .not()
    .isLength({ min: 1, max: 3 })
    .withMessage('The password must have at least 3 characters'),
];
