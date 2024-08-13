import { Request, Response } from "express"
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const signup = async (req:Request, res:Response) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender ) {
            return  res.status(400).json({error: "Please fill in all fields"})
        }

        if(password !== confirmPassword) {
            return  res.status(400).json({error: "Passwords don't match"});
        }

        //SQL query(select * from user where username = {username};)
        const user = await prisma.user.findUnique({where: {username}});
        if (user) {
            return  res.status(400).json({error: "Username already exists"});
        }

        //Hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //Avatar
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //Create newUser
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            }
        });
        console.log("**newUser**", newUser)

        if(newUser) {
            //JWT token
            generateToken(newUser.id, res)

            res.status(201).json ({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                boyProfilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ error: "Invalid user data"})
        }

    } catch (error: any) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const login = async (req:Request, res:Response) => {
    try {
        const { username, password } = req.body;

        //SQL query to find the same username
        const user = await prisma.user.findUnique({ where: {username }});

        if (!user) {
            return res.status(400).json({ error: "Invalid username"})
        }

        // validation password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials"})
        }

        //JWT token
        generateToken(user.id, res)

        res.status(201).json ({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            boyProfilePic: user.profilePic,
        })

    } catch (error: any) {
        console.log("Error in login controller", error.message)
        res.status(500).json({error: "Internal Sever Error"});

    };
};

export const logout = async (req:Request, res:Response) => {
    //change JWT token maxAge 
    try {
        res.cookie("jwt", "", {maxAge: 0 });
        res.status(200).json( { message: "Logged out successfully"});
    } catch (error: any) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const getMe = async(req: Request, res: Response) => {
    console.log("req in get():",req)
    try {
        //SQL query to find the same username
        const user = await prisma.user.findUnique({where: {id: req.user.id}});

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error: any) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};