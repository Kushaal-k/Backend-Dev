import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


const sendEmail = (email, link) => {
    console.log(`Sending email to ${email} with link: ${link}`);
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return  res.status(400).json({message: "All fields are required!"})
    }

    try {
        const user = await User.findOne({email});

        if(user) {
            res.status(401).json({message: "Email is already registerd!!"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const Token = crypto.randomBytes(32).toString("hex");


        await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken: Token
        })

        const link = `http://localhost:8000/verify?token=${Token}`;

        sendEmail(email, link);

        res.status(200).json({"message" : "Registered"})
    } catch (error) {
        res.status(500).json({"message" : "Internal Server Error"});
    }
}


const verifyEmail = async (req, res) => {
    const token = req.query.token;

    const user = await User.findOne({ verificationToken: token})

    if(!user) {
        return res.status(400).json({message: "Invalid Token"});
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({message: "Email Verified"})
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "All fields are required!!"})
    }

    try {
        
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({message: "User does not exist"})
        }

        if(!user.isVerified) {
            return res.status(400).json({message: "Please verify your email first!"})
        }

        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = await jwt.sign(
            {id: user._id, role: user.role, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        ) 

        res.status(200).json({message: "Login successful", token})
    } 
    catch (error) {
        res.status(500).json({"message" : "Internal Server Error"});
    }
}

export {register, verifyEmail, login}