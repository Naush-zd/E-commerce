import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

const registeruser = async (req,res) => {
    try{
        const {name, email, password, address}= req.body;
        if(!name || !email || !password || !address){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const userExists = await User.findOne({ email: email }); 
        if(userExists){
            return res.status(200).json({
                message: "User already exists"
            })
        } 
        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
           password: hashedPassword,
            address
        }).save();

        res.status(201).json({
            message: "User created successfully",
            user: user
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        const passwordMatch = await comparePassword(password, user.password);
        if(passwordMatch){
            return res.status(200).json({
                message: "Logged in successfully",
                user: user,
                token: jwt.sign({ _id: user._id, email: user.email },'supersecret' ),
            })
        }
        else{
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export {registeruser, login} 