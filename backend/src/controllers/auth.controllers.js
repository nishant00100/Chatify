import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../config/utils.js";

// user register
export const register = async (req, res) => {
    const {fullName, email, password} = req.body;

    try{
        if(!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        // check if emails valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format"
            })
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({
            message: "User already exists"
        })

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating New User
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else{
            return res.status(400).json({ message: "Invalid user data"});
        }

  
    } catch(error){
        console.log("Error in register controller: ", error);
        return res.status(500).json({ message: "Invalid server error" });
    }

}

// user login
export const login = async (req, res) => {
    return res.send("Login endPoint");
}

// user logout
export const logout = async (req, res) => {
    return res.send("Logout endPoint");
}
