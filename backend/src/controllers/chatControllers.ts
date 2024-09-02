import { Request, Response, NextFunction } from "express";
import users from "../models/user.js";

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await users.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered");
        }
        user.chats.splice(0, user.chats.length);
        await user.save();
        return res.status(200).json({ message: "CHATS DELETED" });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};