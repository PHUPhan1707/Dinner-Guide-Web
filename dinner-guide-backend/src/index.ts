import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";

const app=express();
app.use(cors());

app.get('/test', async (req: Request, res: Response) => {

    res.json('Hello World');
});
app.listen(7000, () => {
    console.log('Server is running on port 7000');
});

