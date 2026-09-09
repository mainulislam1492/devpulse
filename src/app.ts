import express, { type Application, type Express, type Request, type Response } from 'express';
import { authRoute } from './modules/auth/auth.route';
import { issuesRoute } from './modules/issues/issues.route';

const app: Application = express();
const port = 8000;

app.use(express.json());
app.use(express.text());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "The server is running !",
        author: "Mahim"
    });
});

app.use("/api/auth", authRoute);
app.use("/api/issues", issuesRoute);

export default app;
