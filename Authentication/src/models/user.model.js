import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
            required: true
        },
        role: [{
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }],
        verificationToken: {
            type: String,
        },
        resetToken: {
            type: String,
        },
        resetTokenExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);