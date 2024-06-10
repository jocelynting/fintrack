import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import User from '../models/User.js';
import Bill from '../models/Bill.js';
import { BILL_TYPE } from '../utils/constants.js';

const validateErrors = (validateValue) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      throw new BadRequestError(errorMessages);
    }
    next();
  };
};

export const validateRegisterInput = validateErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('Email is already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]);

export const validateLoginInput = validateErrors([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
]);

export const validateBillInput = validateErrors([
  body('amount').notEmpty().withMessage('Amount is required'),
  body('type').isIn(Object.values(BILL_TYPE)).withMessage('Invalid type'),
  body().custom((value, { req }) => {
    if (req.body.type === BILL_TYPE.EXPENSE && !req.body.subcategory) {
      throw new BadRequestError('Subcategory is required for expense type');
    }
  }),
]);

export const validateBillID = validateErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const bill = await Bill.findById(value);
    if (!bill) throw new NotFoundError(`no bill with id : ${value}`);
  }),
]);
