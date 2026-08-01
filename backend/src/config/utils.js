import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res)=>{
    const token = jwt.sign({
        userId
    }, ENV.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        masAge: 7*24*60*60*1000,
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    })

    return token;
}