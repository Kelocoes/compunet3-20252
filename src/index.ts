import express, { Express, Request, Response } from 'express';

import { db } from './config/connectionDB';
import { userRouter, gamesRouter } from './routes';

const app: Express = express();

process.loadEnvFile();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter.router);
app.use("/api/games", gamesRouter.router);

app.get("/", (req: Request, res: Response) => {
    res.send('Hola Mundo');
});

db.then(() =>
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
);