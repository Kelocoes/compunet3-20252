import { Request, Response, NextFunction } from 'express';

// Interfaz para errores personalizados
interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

// Clase para crear errores personalizados
export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware para manejar errores
export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('🚨 Error Handler ejecutado!');
    console.log('Error:', error.message);
    console.log('Status Code:', error.statusCode || 500);
    console.log('URL:', req.url);
    console.log('Método:', req.method);

    // Si es un error personalizado (AppError)
    if (error.isOperational) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }

    // Error genérico (no operacional)
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'dev' ? error.message : 'Algo salió mal'
    });
};

// Función helper para crear errores
export const createError = (message: string, statusCode: number = 500) => {
    return new AppError(message, statusCode);
};
