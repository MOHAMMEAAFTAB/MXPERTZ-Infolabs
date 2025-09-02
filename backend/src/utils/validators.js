import { body, param, query } from 'express-validator';


export const registerValidator = [
body('name').trim().notEmpty(),
body('email').isEmail(),
body('password').isLength({ min: 6 }),
body('role').isIn(['patient', 'doctor'])
];


export const loginValidator = [
body('email').isEmail(),
body('password').isLength({ min: 6 })
];


export const appointmentCreateValidator = [
body('doctorId').isMongoId(),
body('date').isISO8601().toDate(),
body('reason').optional().isString()
];


export const appointmentIdParam = [
param('id').isMongoId()
];