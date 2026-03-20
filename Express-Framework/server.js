import express from "express"

const app = express()
app.use(express.json())

const PORT = 8000;

import studentsRouter from "./routes/student.routes.js"
app.use('/api/v1/students', studentsRouter);

app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
})