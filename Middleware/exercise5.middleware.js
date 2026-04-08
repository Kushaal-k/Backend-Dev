const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (data) => {
    if (typeof data === "string") {
        let sanitized = sanitizeHtml(data, {
            allowedTags: [],
            allowedAttributes: {}
        });

        sanitized = sanitized
            .replace(/(\$|\{|\}|\[|\]|;|--)/g, "")
            .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b/gi, "");

        return sanitized;
    }

    if (Array.isArray(data)) {
        return data.map(sanitizeInput);
    }

    if (typeof data === "object" && data !== null) {
        const result = {};
        for (const key in data) {
            result[key] = sanitizeInput(data[key]);
        }
        return result;
    }

    return data;
};

const sanitizeMiddleware = (req, res, next) => {
    if (req.body) req.body = sanitizeInput(req.body);
    if (req.query) req.query = sanitizeInput(req.query);
    if (req.params) req.params = sanitizeInput(req.params);
    next();
};

module.exports = sanitizeMiddleware;