const jwt = require("jsonwebtoken");

const otpStore = new Map();

const verifyJwtAndOtp = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token missing" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const otp = req.headers["x-otp"] || req.body.otp;
        if (!otp) {
            return res.status(401).json({ message: "OTP required" });
        }

        const stored = otpStore.get(decoded.userId);
        if (!stored) {
            return res.status(401).json({ message: "OTP not found" });
        }

        if (stored.expiresAt < Date.now()) {
            otpStore.delete(decoded.userId);
            return res.status(401).json({ message: "OTP expired" });
        }

        if (stored.otp !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        otpStore.delete(decoded.userId);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};

module.exports = { verifyJwtAndOtp, otpStore };