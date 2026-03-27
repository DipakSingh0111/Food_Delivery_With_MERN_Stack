import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import genToken from '../utils/token.js';


// REGISTER CONTROLLER
// ===========================

export const signUp = async (req, res)=>{
    try {
        const {fullName, email, password, mobile, role} = req.body;
        // check if user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        // password length check
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }
        
        // Mobile number check
        if(mobile.length <10){
            return res.status(400).json({message: "mobile number must be at least 10 disgits"});
        };

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        // token 
        const token = await genToken(newUser._id);
        res.cookie("token", token,{
            secure: false,
            sameSite: "strict",
            maxAge: 7*24 * 60 * 60 * 1000,
            httpOnly: true
        });

        await newUser.save();
        res.status(201).json({message: "User registered successfully", newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// LOGIN CONTROLLER
// ===========================

export const signIn = async (req, res)=>{
    try {
        const {email, password} = req.body;
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        // token
        const token = await genToken(user._id);
        res.cookie("token", token,{
            secure: false,
            sameSite: "strict",
            maxAge: 7*24 * 60 * 60 * 1000,
            httpOnly: true
        });
        res.status(200).json({message: "User logged in successfully", user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// LOGOUT CONTROLLER
// ===========================

export const signOut = async (req, res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }   
}