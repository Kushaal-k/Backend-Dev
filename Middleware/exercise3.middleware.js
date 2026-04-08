const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    loginAt: Date,
    logoutAt: Date,
    lastActiveAt: Date
}, { timestamps: true });

userSchema.methods.markLogin = function () {
    this.loginAt = new Date();
    this.lastActiveAt = new Date();
    return this.save();
};

userSchema.methods.markLogout = function () {
    this.logoutAt = new Date();
    return this.save();
};

userSchema.pre("save", function (next) {
    if (this.isModified()) {
        this.lastActiveAt = new Date();
    }
    next();
});

userSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
    this.set({ lastActiveAt: new Date() });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;