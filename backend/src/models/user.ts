import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatScheme = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const userScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password:
        {
            type: String,
            required: true,
        },
        chats: [chatScheme],
    }
);

export default mongoose.model("users", userScheme);