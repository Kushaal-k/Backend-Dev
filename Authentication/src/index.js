import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import userRouter from "./routes/user.routes.js"

dotenv.config();
await connectDB();
const app = express();

app.use(express.json());
app.use('/auth', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})