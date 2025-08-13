import express, { Express, Request, Response } from 'express';

import { db } from './config/connectionDB';

const app: Express = express();

process.loadEnvFile();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
    res.send('Hola Mundo');
});

db.then(() =>
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
);