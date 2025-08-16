import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middlewares';

export const gameValidations = {
    create: [
        body('title')
            .trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('Title must be between 1 and 100 characters'),

        body('genre')
            .trim()
            .isLength({ min: 1, max: 50 })
            .withMessage('Genre must be between 1 and 50 characters'),

        body('releaseDate')
            .isISO8601()
            .withMessage('Release date must be a valid date'),

        body('createdBy')
            .isMongoId()
            .withMessage('Invalid user ID format'),

        handleValidationErrors
    ],

    update: [
        body('title')
            .optional()
            .trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('Title must be between 1 and 100 characters'),

        body('genre')
            .optional()
            .trim()
            .isLength({ min: 1, max: 50 })
            .withMessage('Genre must be between 1 and 50 characters'),

        body('releaseDate')
            .optional()
            .isISO8601()
            .withMessage('Release date must be a valid date'),

        handleValidationErrors
    ],

    id: [
        param('id')
            .isMongoId()
            .withMessage('Invalid game ID format'),

        handleValidationErrors
    ],

    userId: [
        param('userId')
            .isMongoId()
            .withMessage('Invalid user ID format'),

        handleValidationErrors
    ]
};
