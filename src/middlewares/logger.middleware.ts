import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function (body) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const logEntry = `[${timestamp}] ${req.method} ${req.baseUrl} ${req.path} | Status: ${res.statusCode} | Time: ${responseTime}ms\n`;

        const logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const date = new Date().toISOString().split('T')[0];
        const fileName = `api-${date}.log`;
        const filePath = path.join(logDir, fileName);

        fs.appendFileSync(filePath, logEntry, 'utf8');

        return originalSend.call(this, body);
    };

    next();
};