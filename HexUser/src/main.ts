import * as express from  "express";
import { Request, Response, NextFunction } from "express";
import { userRouter } from "./lib/User/infrastructure/UserRouter";

const app = express();

app.use(express.json());
app.use(userRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error){
        console.error(err.stack);
        return res.status(500).json({message: err.message});
    }
    console.error(err);
    return res.status(500).json({message: "Algo salió mal"});
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})