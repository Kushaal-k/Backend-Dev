const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/requests.log");

const requestLogger = (req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

        const log = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${responseTime} ms\n`;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) console.error("Logging error:", err);
        });
    });

    next();
};

module.exports = requestLogger;