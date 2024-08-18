import { NextFunction, Request, Response } from "express";
import users from "../models/user.js"
import { hash } from "bcrypt";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await users.find();
        return res.status(200).json({ message: "OK", user });
    } catch (error) {
        return res.json({ message: "ERROR", cause: error.message });
    }
}

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = (await hash(password, 10)).toString();
        const user = new users({ name, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        return res.json({ message: "ERROR", cause: error.message });
    }
}