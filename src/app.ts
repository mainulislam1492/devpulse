import express, { type Application, type Express, type Request, type Response } from 'express';

const app: Application = express();
const port = 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "The server is running !",
        author: "Mahim"
    });
});

// app.use("/api/auth/signup", );


export default app;
