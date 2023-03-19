import bcrypt from "bcrypt";
import jwt from "jasonwebtoken";
import User from "../models/User.js";

// REGISTER USER 
export const register = async(req, res) => {
    // async is API sync from DB
    try{
        // Array of parameters from req.body. 
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt(); 
        const passwordHash = await bcrypt.hash(password, salt); //Keeps password safe & sound

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash, //Hides Password
            picturePath,
            friends,
            location,
            occupation,
            viewdProfile: Math.floor(Math.random()*10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save(); // Save user
        res.status(201).json(savedUser) // Send user 201 status in correct format
    }catch(err){
        res.status(500).json({error: err.message}); // Sends error message
    }
}