const express = require('express')
const User = require('../model/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
//registering a user:
exports.registerUser=async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            throw new Error("All fields are neeeded for registration")
        }
        const userAva= await User.findOne({email})
        if(userAva){
            throw new Error("User already exist")
        }
        //hashing password:
        const hashedPass =  await bcrypt.hash(password,14);
        const user = await User.create({
            username,email,password:hashedPass
        })
        //sending back response:
        res.status(200).json({
            status:"success",
            message:"Registered"
        })
        }catch(err){
            console.log(err,"peroblem beroo")
        }
}
//logging a user:

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are needed for login" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id
            },
        }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" }); 

        res.status(200).json({
            status: "success",
            message: "Logged in",
            token: {
                accessToken
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//current user:
exports.currentUser=async(req,res)=>{
    try{
        const user =  req.user
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
        }catch(err){
            console.log(err,"peroblem beroo")
        }
}