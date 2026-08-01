import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../config/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import {ENV} from "../config/env.js";
import cloudinary from "../config/cloudinary.js";

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
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            try{
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch(error){
                console.error("Failed to send welcome email: ", error);
            }

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
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({
            message: "Invalid email or password"
        })

        const isPawwsordCorrect = await bcrypt.compare(password, user.password);
        if(!isPawwsordCorrect) return res.status(400).json({
            message: "Invalid email or password"
        })

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch(error){
        console.error("Error in login controller: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// user logout
export const logout = async (_, res) => {
    res.cookie("jwt", "", {
        maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
}


// user profile update

export const updateProfile = async (req, res) => {
    try{

        const { profilePic} = req.body;
        if(!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser  = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser);


    } catch(error){
        console.error("Error in updateProfile controller: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
