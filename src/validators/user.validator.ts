import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares';

export const userValidations = {
    create: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
            .withMessage('Name can only contain letters and spaces'),
        
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address'),
        
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
        
        handleValidationErrors
    ],

    update: [
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
            .withMessage('Name can only contain letters and spaces'),
        
        body('email')
            .optional()
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email address'),
        
        handleValidationErrors
    ],

    id: [
        param('id')
            .isMongoId()
            .withMessage('Invalid user ID format'),
        
        handleValidationErrors
    ]
};
