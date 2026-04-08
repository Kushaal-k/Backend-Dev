import express from "express";
import dotenv from "dotenv"
dotenv.config();

const app = express();

const PORT = 8000;

import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt(10);

const pepper = "SECRET_KEY";

const password = "123456" * pepper;

console.log(process.env.SECRET_KEY);
const hashPassword = await bcrypt.hash(password, salt)

console.log(salt);
console.log(hashPassword);

const password_2 = "123456" + pepper;

const isMatch = await bcrypt.compare(password_2, hashPassword);
console.log(isMatch);

app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
}) 