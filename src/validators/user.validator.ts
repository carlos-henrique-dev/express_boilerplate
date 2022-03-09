import { body } from 'express-validator';

export const userBodyRequirements = [
  body('name').not().isEmpty().trim().escape().withMessage('Field "name" Is required!'),
  body('email')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Field "email" Is required!')
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage('Insert an valid email'),
  body('roleId').not().isEmpty().withMessage('Field "roleId" Is required!'),
];

export const passwordValidator = [
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
