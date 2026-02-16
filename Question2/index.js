const express = require("express")

const app = express();

const responseTimeLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
    });

    next();
};

app.use(responseTimeLogger);