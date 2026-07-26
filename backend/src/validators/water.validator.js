import { check, validationResult } from 'express-validator';

export const validateWaterUsage = [
  check('amount', 'Water amount in liters is required').isNumeric(),
  check('category', 'Valid category is required').isIn(['Drinking', 'Bathing', 'Washing Clothes', 'Cooking', 'Cleaning', 'Gardening', 'Other']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
